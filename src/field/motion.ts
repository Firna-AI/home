// The motion of the grains: the wind of the pointer, the springs that pull
// each grain to its target, and the frame loop that runs only while grains
// move.

import { mark, near, wake } from "./grains";
import { paint } from "./paint";
import type { Field } from "./state";
import { DRAG, DRIFT, PUSH, STEP, WIND } from "./tuning";

/** Starts the frame loop, unless it runs or the field must stay still. */
export function kick(f: Field) {
  if (!f.raf && f.shown && f.inView && !f.calm && f.grains.n) {
    f.raf = requestAnimationFrame((now) => frame(f, now));
  }
}

/** Stops the frame loop. */
export function stop(f: Field) {
  if (f.raf) cancelAnimationFrame(f.raf);
  f.raf = 0;
  f.last = f.lag = 0;
}

/** Runs the 60 Hz steps that are due, repaints, and asks for the next frame while anything moves. */
function frame(f: Field, now: number) {
  f.raf = 0;
  f.lag = Math.min(f.lag + (f.last ? now - f.last : STEP), STEP * 4);
  f.last = now;
  let busy = false;
  let steps = 0;
  while (f.lag >= STEP) {
    busy = step(f, steps === 0) || busy;
    f.lag -= STEP;
    steps++;
  }
  paint(f);
  if (busy || !steps) f.raf = requestAnimationFrame((t) => frame(f, t));
  else f.last = f.lag = 0;
}

/** The pointer pushes grains aside and drags them a little along its path. */
function blow(
  f: Field,
  px: number,
  py: number,
  wx: number,
  wy: number,
  push: number,
) {
  const g = f.grains;
  const { x, y, vx, vy, ease, gathered } = g;
  const reach = WIND + DRIFT;
  near(f.bins, px - reach, py - reach, px + reach, py + reach, (i) => {
    if (gathered[i]) return;
    const dx = x[i] - px;
    const dy = y[i] - py;
    const d2 = dx * dx + dy * dy;
    if (d2 >= WIND * WIND || d2 < 0.01) return;
    const d = Math.sqrt(d2);
    const force = (1 - d / WIND) ** 2 * ease[i];
    vx[i] += ((dx / d) * push + wx * DRAG) * force;
    vy[i] += ((dy / d) * push + wy * DRAG) * force;
    wake(g, i);
  });
}

/** One 60 Hz step. It returns true while anything still moves. */
function step(f: Field, first: boolean) {
  const ptr = f.pointer;
  const ax = first ? ptr.ax : 0;
  const ay = first ? ptr.ay : 0;
  if (first) ptr.ax = ptr.ay = 0;
  ptr.wx = ptr.wx * 0.6 + ax * 0.4;
  ptr.wy = ptr.wy * 0.6 + ay * 0.4;
  const speed = Math.min(Math.hypot(ptr.wx, ptr.wy), 30);
  // No wind while the pointer rests on the card that holds the outline.
  let busy = (!f.windless && speed > 0.05) || ptr.press > 0;
  if (ptr.on && !f.windless && (speed > 0.2 || ptr.press)) {
    blow(f, ptr.x, ptr.y, ptr.wx, ptr.wy, speed * PUSH + ptr.press);
  }

  const g = f.grains;
  const { act, x, y, vx, vy, tx, ty, hx, hy, state, owner, band } = g;
  const { spring, damp, gathered } = g;
  const bins = f.bins;
  // An outline that turns to or from its colour repaints its beads.
  for (let k = 0; k < f.tint.length; k++) {
    if (f.tint[k] === f.goal[k]) continue;
    f.tint[k] += (f.goal[k] - f.tint[k]) * 0.12;
    if (Math.abs(f.goal[k] - f.tint[k]) < 0.004) f.tint[k] = f.goal[k];
    for (let j = 0; j < g.nAct; j++) {
      const i = act[j];
      if (owner[i] === k && band[i]) mark(bins, x[i], y[i]);
    }
    busy = true;
  }

  // Springs pull each moving grain to its target. Grains close enough snap
  // into place and rest, so the loop can stop.
  for (let j = 0; j < g.nAct;) {
    const i = act[j];
    if (state[i] !== 1) {
      j++;
      continue;
    }
    const held = gathered[i] === 1;
    const k = held ? 0.03 : spring[i];
    const d = held ? 0.78 : damp[i];
    let px = x[i];
    let py = y[i];
    mark(bins, px, py);
    let ux = (vx[i] + (tx[i] - px) * k) * d;
    let uy = (vy[i] + (ty[i] - py) * k) * d;
    px += ux;
    py += uy;
    if (!held) {
      const ex = px - hx[i];
      const ey = py - hy[i];
      const e2 = ex * ex + ey * ey;
      if (e2 > DRIFT * DRIFT) {
        const s = DRIFT / Math.sqrt(e2);
        px = hx[i] + ex * s;
        py = hy[i] + ey * s;
        ux *= 0.5;
        uy *= 0.5;
      }
    }
    if (
      Math.abs(tx[i] - px) < 0.25 &&
      Math.abs(ty[i] - py) < 0.25 &&
      Math.abs(ux) < 0.04 &&
      Math.abs(uy) < 0.04
    ) {
      px = tx[i];
      py = ty[i];
      ux = uy = 0;
      state[i] = held ? 2 : 0;
    }
    x[i] = px;
    y[i] = py;
    vx[i] = ux;
    vy[i] = uy;
    mark(bins, px, py);
    if (state[i] === 0) {
      owner[i] = -1;
      band[i] = 0;
      act[j] = act[--g.nAct];
      continue;
    }
    if (state[i] === 1) busy = true;
    j++;
  }
  return busy;
}
