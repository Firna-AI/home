// The tuning of the grain field. Lengths are CSS pixels. Forces are per
// 60 Hz step.

/** One grain per CELL × CELL pixels. */
export const CELL = 9;
/** The size of a lookup and repaint bin. */
export const BIN = 48;
/** A cool, icy grey. */
export const GREY = [134, 145, 158] as const;
/** The fills of the three tones, from the lightest to the darkest. */
export const FILL: readonly string[] = [0.3, 0.45, 0.62].map(
  (alpha) => `rgba(${GREY.join(",")},${alpha})`,
);
/** Grain diameters. The largest grains are drawn round. */
export const SIZES = [1.3, 1.7, 2.2] as const;
/** The diameters of outline grains, by grain size. */
export const BEADS = [1.7, 2, 2.3] as const;
/** The reach of the pointer. */
export const WIND = 64;
/** The push aside, per pixel of pointer speed. */
export const PUSH = 0.09;
/** The pull along the pointer's path. */
export const DRAG = 0.02;
/** The push around a finger on the screen. */
export const PRESS = 0.6;
/** The farthest that the wind moves a grain. */
export const DRIFT = 36;
/** The gap from a card's edge to its outline of grains. */
export const GAP = 8;
/** The spacing between the grains of an outline. */
export const SPACING = 5.5;
/** An outline takes its grains from this close to the card. */
export const SOURCE = 30;
/** The other grains near the card clear out to this distance. */
export const MOAT = 15;
/** The opacity of an outline grain. */
export const LINE = 0.85;
/** The lift of a hovered card: the same as `--lift` in the stylesheet. */
export const LIFT = 3;
/** One step of the simulation, in milliseconds. */
export const STEP = 1000 / 60;
