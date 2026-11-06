// Where the grains rest. A pure function of the field's size: it needs no
// DOM, so that the mockup can draw the same grains that the page draws.

import { CELL, SIZES } from "./tuning";

/** The grains of a field at rest. Each array holds `count` grains. */
export interface GrainLayout {
  readonly count: number;
  /** The home of each grain, in CSS pixels from the field's top-left. */
  readonly x: Float32Array;
  readonly y: Float32Array;
  /** 0, 1, or 2: an index into FILL. A slow wave shifts the tones. */
  readonly tone: Uint8Array;
  /** 0, 1, or 2: an index into SIZES. */
  readonly size: Uint8Array;
  /** How hard each grain's spring pulls it home. */
  readonly spring: Float32Array;
  /** How strongly the wind moves each grain. */
  readonly ease: Float32Array;
}

/**
 * Lays out the grains of a field of `width` × `height` CSS pixels: a
 * jittered grid with one grain per cell, relaxed twice so that no two grains
 * sit too close. The same size always gives the same grains.
 */
export function layOutGrains(width: number, height: number): GrainLayout {
  const gx = Math.ceil(width / CELL);
  const gy = Math.ceil(height / CELL);
  const m = gx * gy;
  const rnd = random(1102);
  const px = new Float32Array(m);
  const py = new Float32Array(m);
  for (let k = 0; k < m; k++) {
    px[k] = ((k % gx) + 0.5 + (rnd() - 0.5) * 0.9) * CELL;
    py[k] = (((k / gx) | 0) + 0.5 + (rnd() - 0.5) * 0.9) * CELL;
  }
  relax(px, py, gx, gy);

  const x = new Float32Array(m);
  const y = new Float32Array(m);
  const tone = new Uint8Array(m);
  const size = new Uint8Array(m);
  const spring = new Float32Array(m);
  const ease = new Float32Array(m);
  let n = 0;
  for (let k = 0; k < m; k++) {
    const gpx = px[k];
    const gpy = py[k];
    const t = rnd();
    const s = rnd();
    const sp = rnd();
    const e = rnd();
    if (gpx < 0 || gpy < 0 || gpx >= width || gpy >= height) continue;
    x[n] = gpx;
    y[n] = gpy;
    // Faint drifts, like wind ripples on snow: a slow wave shifts the tones.
    const w =
      0.5 +
      0.5 *
        Math.sin(
          (gpx * 0.8 + gpy * 0.6) / 26 + 1.6 * Math.sin(gpx / 190 + gpy / 260),
        );
    tone[n] = t < 0.1 + 0.16 * w ? 2 : t < 0.48 + 0.24 * w ? 1 : 0;
    size[n] = s < 0.12 ? 2 : s < 0.45 ? 1 : 0;
    spring[n] = 0.003 + sp * 0.0015;
    ease[n] = 0.75 + e * 0.5;
    n++;
  }
  return { count: n, x, y, tone, size, spring, ease };
}

/**
 * The side of a square grain of each size, in device pixels at the pixel
 * ratio `dpr`. The grains of the largest size are drawn round.
 */
export function grainPixels(dpr: number): number[] {
  return SIZES.map((d) => Math.max(1, Math.round(d * dpr)));
}

/** Pushes apart neighbouring grains that sit too close, in two passes. */
function relax(px: Float32Array, py: Float32Array, gx: number, gy: number) {
  const DI = [1, -1, 0, 1];
  const DJ = [0, 1, 1, 1];
  const R = CELL * 0.8;
  const m = gx * gy;
  for (let pass = 0; pass < 2; pass++) {
    for (let a = 0; a < m; a++) {
      const i = a % gx;
      const j = (a / gx) | 0;
      for (let e = 0; e < 4; e++) {
        if (i + DI[e] < 0 || i + DI[e] >= gx || j + DJ[e] >= gy) continue;
        const b = a + DJ[e] * gx + DI[e];
        const dx = px[b] - px[a];
        const dy = py[b] - py[a];
        const d = Math.hypot(dx, dy);
        if (d >= R || d === 0) continue;
        const f = ((R - d) / d) * 0.25;
        px[a] -= dx * f;
        py[a] -= dy * f;
        px[b] += dx * f;
        py[b] += dy * f;
      }
    }
  }
}

/** A seeded pseudo-random number generator. It returns numbers in [0, 1). */
function random(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
