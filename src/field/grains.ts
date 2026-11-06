// The grains as flat arrays, and the bins that find them fast: by home for
// lookups near a point, and by place for repaints.

import { cardAt, type Box } from "./geometry";
import type { GrainLayout } from "./layout";
import { BIN } from "./tuning";

/** The grains. Grain i is index i of each array. */
export interface Grains {
  readonly n: number;
  /** Home, place now, speed, and target. */
  readonly hx: Float32Array;
  readonly hy: Float32Array;
  readonly x: Float32Array;
  readonly y: Float32Array;
  readonly vx: Float32Array;
  readonly vy: Float32Array;
  readonly tx: Float32Array;
  readonly ty: Float32Array;
  readonly spring: Float32Array;
  readonly damp: Float32Array;
  readonly ease: Float32Array;
  readonly tone: Uint8Array;
  readonly size: Uint8Array;
  /** 0 at home, 1 moving, 2 parked at a card. */
  readonly state: Uint8Array;
  /** The card whose outline or moat holds the grain, or -1. */
  readonly owner: Int8Array;
  /** 1 while an outline or its moat holds the grain. */
  readonly gathered: Uint8Array;
  /** 1 while the grain is a bead of an outline. */
  readonly band: Uint8Array;
  /** The card that covers the grain's home, or -1. */
  readonly under: Int8Array;
  /** The grains that are not at home: the first `nAct` items. */
  readonly act: Int32Array;
  nAct: number;
}

/** The bins of BIN × BIN pixels, and the buffers of a repaint. */
export interface Bins {
  readonly cols: number;
  readonly rows: number;
  /** The grains by home bin: bin b holds items binStart[b] to binStart[b + 1]. */
  readonly binStart: Int32Array;
  readonly binItems: Int32Array;
  /** The grains that are not at home, by the bin that they are in now. */
  readonly liveStart: Int32Array;
  readonly liveNext: Int32Array;
  readonly liveItems: Int32Array;
  /** 1 for each bin that the next repaint draws again. */
  readonly dirty: Uint8Array;
  readonly runs: Int32Array;
  readonly seen: Int32Array;
  stamp: number;
  readonly picks: readonly [Int32Array, Int32Array, Int32Array];
  readonly beads: Int32Array;
}

/** The grains of a layout, at home, with the card that covers each one. */
export function createGrains(layout: GrainLayout, cards: readonly Box[]) {
  const n = layout.count;
  const m = layout.x.length;
  const f32 = () => new Float32Array(m);
  const grains: Grains = {
    n,
    hx: layout.x,
    hy: layout.y,
    x: layout.x.slice(),
    y: layout.y.slice(),
    vx: f32(),
    vy: f32(),
    tx: layout.x.slice(),
    ty: layout.y.slice(),
    spring: layout.spring,
    damp: f32(),
    ease: layout.ease,
    tone: layout.tone,
    size: layout.size,
    state: new Uint8Array(m),
    owner: new Int8Array(m),
    gathered: new Uint8Array(m),
    band: new Uint8Array(m),
    under: new Int8Array(m),
    act: new Int32Array(n),
    nAct: 0,
  };
  for (let i = 0; i < n; i++) {
    // A little under critical damping: a soft settle.
    grains.damp[i] = 1 - 1.9 * Math.sqrt(grains.spring[i]);
    grains.owner[i] = -1;
    grains.under[i] = cardAt(cards, grains.hx[i], grains.hy[i]);
  }
  return grains;
}

/** Bins the grains by home, for a field of `width` × `height` pixels. */
export function index(g: Grains, width: number, height: number, stamp = 0) {
  const cols = Math.ceil(width / BIN);
  const rows = Math.ceil(height / BIN);
  const n = g.n;
  const binStart = new Int32Array(cols * rows + 1);
  const binItems = new Int32Array(n);
  const bin = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    bin[i] = ((g.hx[i] / BIN) | 0) + ((g.hy[i] / BIN) | 0) * cols;
    binStart[bin[i] + 1]++;
  }
  for (let b = 0; b < cols * rows; b++) binStart[b + 1] += binStart[b];
  const fill = binStart.slice(0, -1);
  for (let i = 0; i < n; i++) binItems[fill[bin[i]]++] = i;
  const bins: Bins = {
    cols,
    rows,
    binStart,
    binItems,
    liveStart: new Int32Array(cols * rows + 1),
    liveNext: new Int32Array(cols * rows),
    liveItems: new Int32Array(n),
    dirty: new Uint8Array(cols * rows),
    runs: new Int32Array(cols * rows * 3),
    seen: new Int32Array(n),
    stamp,
    picks: [new Int32Array(n), new Int32Array(n), new Int32Array(n)],
    beads: new Int32Array(n),
  };
  return bins;
}

/** Calls `fn` for each grain whose home bin meets the box from a to b. */
export function near(
  bins: Bins,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  fn: (i: number) => void,
) {
  const { cols, rows, binStart, binItems } = bins;
  const c0 = Math.max(0, Math.floor(ax / BIN));
  const c1 = Math.min(cols - 1, Math.floor(bx / BIN));
  const r0 = Math.max(0, Math.floor(ay / BIN));
  const r1 = Math.min(rows - 1, Math.floor(by / BIN));
  for (let r = r0; r <= r1; r++) {
    for (let c = c0; c <= c1; c++) {
      const b = r * cols + c;
      for (let k = binStart[b], e = binStart[b + 1]; k < e; k++) {
        fn(binItems[k]);
      }
    }
  }
}

/** Sets grain i moving. */
export function wake(g: Grains, i: number) {
  if (g.state[i] === 0) g.act[g.nAct++] = i;
  g.state[i] = 1;
}

/** Marks the bins that a grain at px, py touches, for the next repaint. */
export function mark(bins: Bins, px: number, py: number) {
  const { cols, rows, dirty } = bins;
  const c0 = Math.max(0, ((px - 3) / BIN) | 0);
  const c1 = Math.min(cols - 1, ((px + 3) / BIN) | 0);
  const r0 = Math.max(0, ((py - 3) / BIN) | 0);
  const r1 = Math.min(rows - 1, ((py + 3) / BIN) | 0);
  for (let r = r0; r <= r1; r++) {
    for (let c = c0; c <= c1; c++) dirty[r * cols + c] = 1;
  }
}

/** The bin that a point is in, clamped to the field. */
export function binOf(bins: Bins, px: number, py: number) {
  const { cols, rows } = bins;
  return (
    Math.min(cols - 1, Math.max(0, (px / BIN) | 0)) +
    Math.min(rows - 1, Math.max(0, (py / BIN) | 0)) * cols
  );
}
