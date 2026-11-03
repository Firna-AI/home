// The repaint. It draws again only the bins that changed, in runs along each
// row. It reuses its buffers and the context's own path, so that it makes
// almost no garbage. Each tone is one path and one fill.

import { binOf } from "./grains";
import type { Field } from "./state";
import { BEADS, BIN, FILL, LINE, SIZES } from "./tuning";

/** Repaints the bins that are marked dirty. */
export function paint(f: Field) {
  const { ctx, canvas, dpr, pix, tint, bins, grains: g } = f;
  const { cols, rows, dirty, runs, binStart, binItems } = bins;
  const { liveStart, liveNext, liveItems, seen, picks, beads } = bins;
  const { act, x, y, tone, size, state, owner, band } = g;

  let nRuns = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!dirty[r * cols + c]) continue;
      let e = c;
      while (e + 1 < cols && dirty[r * cols + e + 1]) e++;
      runs[nRuns++] = c;
      runs[nRuns++] = r;
      runs[nRuns++] = e;
      c = e;
    }
  }
  if (!nRuns) return;
  dirty.fill(0);

  // Bin the moving and parked grains by where they are now.
  const nAct = g.nAct;
  liveStart.fill(0);
  for (let j = 0; j < nAct; j++) {
    liveStart[binOf(bins, x[act[j]], y[act[j]]) + 1]++;
  }
  for (let b = 0; b < cols * rows; b++) liveStart[b + 1] += liveStart[b];
  liveNext.set(liveStart.subarray(0, cols * rows));
  for (let j = 0; j < nAct; j++) {
    liveItems[liveNext[binOf(bins, x[act[j]], y[act[j]])]++] = act[j];
  }

  // Pick each grain that touches a run once: by tone, or as an outline bead.
  const stamp = ++bins.stamp;
  const counts = [0, 0, 0];
  let nBeads = 0;
  const pick = (
    i: number,
    left: number,
    right: number,
    top: number,
    bottom: number,
  ) => {
    if (seen[i] === stamp) return;
    if (x[i] < left || x[i] > right || y[i] < top || y[i] > bottom) return;
    seen[i] = stamp;
    if (band[i] && tint[owner[i]] > 0) beads[nBeads++] = i;
    else picks[tone[i]][counts[tone[i]]++] = i;
  };
  ctx.save();
  ctx.beginPath();
  for (let k = 0; k < nRuns; k += 3) {
    const c0 = runs[k];
    const r = runs[k + 1];
    const c1 = runs[k + 2];
    const l = Math.floor(c0 * BIN * dpr);
    const t = Math.floor(r * BIN * dpr);
    const w = Math.min(canvas.width, Math.ceil((c1 + 1) * BIN * dpr)) - l;
    const h = Math.min(canvas.height, Math.ceil((r + 1) * BIN * dpr)) - t;
    ctx.rect(l, t, w, h);
    ctx.clearRect(l, t, w, h);
    const left = c0 * BIN - 3;
    const right = (c1 + 1) * BIN + 3;
    const top = r * BIN - 3;
    const bottom = (r + 1) * BIN + 3;
    for (let rr = Math.max(0, r - 1); rr <= Math.min(rows - 1, r + 1); rr++) {
      for (
        let cc = Math.max(0, c0 - 1);
        cc <= Math.min(cols - 1, c1 + 1);
        cc++
      ) {
        const b = rr * cols + cc;
        for (let q = binStart[b]; q < binStart[b + 1]; q++) {
          const i = binItems[q];
          if (!state[i]) pick(i, left, right, top, bottom);
        }
        for (let q = liveStart[b]; q < liveStart[b + 1]; q++) {
          pick(liveItems[q], left, right, top, bottom);
        }
      }
    }
  }
  ctx.clip();

  // Adds one grain to the current path, in canvas pixels. Small grains are
  // squares of one to three canvas pixels. The largest grains are round.
  const grain = (i: number) => {
    const cx = x[i] * dpr;
    const cy = y[i] * dpr;
    if (size[i] === 2) {
      const r = (SIZES[2] * dpr) / 2;
      ctx.moveTo(cx + r, cy);
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    } else {
      const w = pix[size[i]];
      ctx.rect(Math.round(cx - w / 2), Math.round(cy - w / 2), w, w);
    }
  };
  const bead = (i: number) => {
    const cx = x[i] * dpr;
    const cy = y[i] * dpr;
    const r = (BEADS[size[i]] * dpr) / 2;
    ctx.moveTo(cx + r, cy);
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  };
  for (let t = 0; t < 3; t++) {
    ctx.beginPath();
    for (let k = 0; k < counts[t]; k++) grain(picks[t][k]);
    ctx.fillStyle = FILL[t];
    ctx.fill();
  }
  // Outline grains fade from grey to their card's colour.
  for (let c = 0; c < tint.length && nBeads; c++) {
    const s = tint[c];
    if (!(s > 0)) continue;
    ctx.beginPath();
    for (let k = 0; k < nBeads; k++) {
      if (owner[beads[k]] === c) bead(beads[k]);
    }
    if (s < 1) {
      ctx.globalAlpha = 1 - s;
      ctx.fillStyle = FILL[1];
      ctx.fill();
    }
    ctx.globalAlpha = LINE * s;
    ctx.fillStyle = `rgb(${f.cards[c].rgb.join(",")})`;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  ctx.restore();
}
