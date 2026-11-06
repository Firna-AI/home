// The geometry of the cards: the distance to a card's rounded edge, and the
// outline of grains that runs GAP outside it. Pure functions. They write
// their second results to an object that the caller passes, so that they
// allocate nothing.

import { GAP } from "./tuning";

/** A card's box in CSS pixels from the field's top-left, and its radius. */
export interface Box {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
  readonly r: number;
}

/** An outward unit normal. */
export interface Normal {
  nx: number;
  ny: number;
}

/** A point on an outline, with its outward unit normal. */
export interface OutlinePoint extends Normal {
  x: number;
  y: number;
}

/**
 * The outline of a card that is raised by a lift. It runs clockwise from
 * the top-left end of the top edge: straight sides `a` and `b`, and corners
 * of length `q` on the radius `R`. `L` is its whole length.
 */
export interface Track {
  readonly top: number;
  readonly a: number;
  readonly b: number;
  readonly q: number;
  readonly R: number;
  readonly L: number;
}

/** The outline of card `c` when it is raised by `lift`. */
export function trackOf(c: Box, lift: number): Track {
  const top = c.y - lift;
  const a = c.w - 2 * c.r;
  const b = c.h - 2 * c.r;
  const R = c.r + GAP;
  const q = (Math.PI / 2) * R;
  const L = 2 * (a + b) + 4 * q;
  return { top, a, b, q, R, L };
}

/**
 * The signed distance from a point to a card's rounded rectangle, raised by
 * `lift`. It is negative inside. The outward normal goes to `out`.
 */
export function edge(
  c: Box,
  px: number,
  py: number,
  lift: number,
  out: Normal,
): number {
  const dx = px - (c.x + c.w / 2);
  const dy = py - (c.y - lift + c.h / 2);
  const qx = Math.abs(dx) - (c.w / 2 - c.r);
  const qy = Math.abs(dy) - (c.h / 2 - c.r);
  let d: number;
  if (qx > 0 && qy > 0) {
    const q = Math.hypot(qx, qy);
    d = q - c.r;
    out.nx = qx / q;
    out.ny = qy / q;
  } else if (qx > qy) {
    d = qx - c.r;
    out.nx = 1;
    out.ny = 0;
  } else {
    d = qy - c.r;
    out.nx = 0;
    out.ny = 1;
  }
  if (dx < 0) out.nx = -out.nx;
  if (dy < 0) out.ny = -out.ny;
  return d;
}

/** The normal that `cardAt` does not need. */
const unused: Normal = { nx: 0, ny: 0 };

/** The index of the card that covers a point, or -1. */
export function cardAt(cards: readonly Box[], px: number, py: number): number {
  for (let k = 0; k < cards.length; k++) {
    if (edge(cards[k], px, py, 0, unused) < -0.5) return k;
  }
  return -1;
}

/** How far along the outline of card `c` a point lies. */
export function arc(c: Box, t: Track, px: number, py: number): number {
  const { top, a, b, q, R } = t;
  const dx = px - (c.x + c.w / 2);
  const dy = py - (top + c.h / 2);
  const qx = Math.abs(dx) - c.w / 2 + c.r;
  const qy = Math.abs(dy) - c.h / 2 + c.r;
  const clamp = (v: number, hi: number) => Math.max(0, Math.min(hi, v));
  if (qx > 0 && qy > 0) {
    if (dx > 0 && dy < 0) return a + R * Math.atan2(qx, qy);
    if (dx > 0) return a + q + b + R * Math.atan2(qy, qx);
    if (dy > 0) return 2 * a + 2 * q + b + R * Math.atan2(qx, qy);
    return 2 * a + 3 * q + 2 * b + R * Math.atan2(qy, qx);
  }
  if (qx > qy) {
    return dx > 0
      ? a + q + clamp(py - top - c.r, b)
      : 2 * a + 3 * q + b + clamp(top + c.h - c.r - py, b);
  }
  return dy < 0
    ? clamp(px - c.x - c.r, a)
    : a + 2 * q + b + clamp(c.x + c.w - c.r - px, a);
}

/** The point at length `s` along the outline of card `c`, written to `out`. */
export function pointAt(c: Box, t: Track, s: number, out: OutlinePoint) {
  const { top, a, b, q, R } = t;
  const xl = c.x + c.r;
  const xr = c.x + c.w - c.r;
  const yt = top + c.r;
  const yb = top + c.h - c.r;
  const side = (px: number, py: number, mx: number, my: number) => {
    out.x = px;
    out.y = py;
    out.nx = mx;
    out.ny = my;
  };
  const turn = (cx: number, cy: number, angle: number) =>
    side(
      cx + Math.cos(angle) * R,
      cy + Math.sin(angle) * R,
      Math.cos(angle),
      Math.sin(angle),
    );
  let rest = s;
  if (rest < a) return side(xl + rest, top - GAP, 0, -1);
  if ((rest -= a) < q) return turn(xr, yt, -Math.PI / 2 + rest / R);
  if ((rest -= q) < b) return side(c.x + c.w + GAP, yt + rest, 1, 0);
  if ((rest -= b) < q) return turn(xr, yb, rest / R);
  if ((rest -= q) < a) return side(xr - rest, top + c.h + GAP, 0, 1);
  if ((rest -= a) < q) return turn(xl, yb, Math.PI / 2 + rest / R);
  if ((rest -= q) < b) return side(c.x - GAP, yb - rest, -1, 0);
  turn(xl, yt, Math.PI + (rest - b) / R);
}
