// The outline of a card: its nearest grains line up as an even, dotted line
// in the colour of its logo, and the other grains close by clear a narrow
// moat around it. When the card is released, the grains drift home.

import {
  arc,
  edge,
  pointAt,
  trackOf,
  type Normal,
  type OutlinePoint,
} from "./geometry";
import { near, wake } from "./grains";
import { kick } from "./motion";
import type { Field } from "./state";
import { LIFT, MOAT, SOURCE, SPACING } from "./tuning";

/** A grain that can join an outline: its distance to the edge, and its place along the outline. */
interface Candidate {
  readonly i: number;
  readonly d: number;
  readonly s: number;
}

// The second results of the geometry functions. They are reused, so that a
// gather allocates no point objects.
const normal: Normal = { nx: 0, ny: 0 };
const point: OutlinePoint = { x: 0, y: 0, nx: 0, ny: 0 };

/** A fixed pseudo-random number from -1 to 1 for each grain. */
const jitter = (i: number) =>
  (Math.imul(i + 1, 2654435761) >>> 0) / 2147483648 - 1;

/** Gathers the outline of card k, and releases the card that had one. */
export function gather(f: Field, k: number) {
  if (f.calm || k === f.current || !f.cards[k]) return;
  if (f.current >= 0) release(f, f.current);
  f.current = k;
  f.goal[k] = 1;
  const c = f.cards[k];
  const t = trackOf(c, LIFT);
  const { top, L } = t;
  const { hx, hy, under } = f.grains;
  const found: Candidate[] = [];
  near(
    f.bins,
    c.x - SOURCE,
    top - SOURCE,
    c.x + c.w + SOURCE,
    top + c.h + SOURCE,
    (i) => {
      if (under[i] >= 0 && under[i] !== k) return;
      const d = edge(c, hx[i], hy[i], LIFT, normal);
      if (d > 0 && d < SOURCE) found.push({ i, d, s: arc(c, t, hx[i], hy[i]) });
    },
  );
  found.sort((u, v) => u.d - v.d);
  const count = Math.min(found.length, Math.round(L / SPACING));
  const line = found.slice(0, count).sort((u, v) => u.s - v.s);
  let s0 = 0;
  line.forEach((g, j) => {
    s0 += g.s - (j * L) / count;
  });
  s0 /= count || 1;
  // Even spacing, with a little jitter so that the line reads as grains.
  line.forEach((g, j) => {
    const s = (((s0 + ((j + 0.18 * jitter(g.i)) * L) / count) % L) + L) % L;
    pointAt(c, t, s, point);
    const off = 0.8 * jitter(g.i + 7919);
    aim(f, g.i, point.x + point.nx * off, point.y + point.ny * off, k, 1);
  });
  for (let j = count; j < found.length; j++) {
    const { i, d } = found[j];
    if (d >= MOAT) continue;
    edge(c, hx[i], hy[i], LIFT, normal);
    const to = MOAT + d * 0.4;
    aim(f, i, hx[i] + normal.nx * (to - d), hy[i] + normal.ny * (to - d), k, 0);
  }
  kick(f);
}

/** Releases the outline of card k: its grains drift home. */
export function release(f: Field, k: number) {
  if (k < 0) return;
  if (f.current === k) f.current = -1;
  f.goal[k] = 0;
  const g = f.grains;
  const { act, owner, gathered, tx, ty, hx, hy, state } = g;
  for (let j = 0; j < g.nAct; j++) {
    const i = act[j];
    if (owner[i] === k && gathered[i]) {
      tx[i] = hx[i];
      ty[i] = hy[i];
      gathered[i] = 0;
      state[i] = 1;
    }
  }
  kick(f);
}

/** Sends grain i to a target at card k, in its line or in its moat. */
function aim(
  f: Field,
  i: number,
  px: number,
  py: number,
  k: number,
  inLine: number,
) {
  const g = f.grains;
  g.tx[i] = px;
  g.ty[i] = py;
  g.owner[i] = k;
  g.gathered[i] = 1;
  g.band[i] = inLine;
  wake(g, i);
}
