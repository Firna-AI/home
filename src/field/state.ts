// The state of one grain field. The modules of the field share it: each
// function takes the field as its first argument.

import type { Box } from "./geometry";
import type { Bins, Grains } from "./grains";

/** A card on the page, with the colour of its logo. */
export interface Card extends Box {
  readonly rgb: readonly [number, number, number];
}

/**
 * The pointer or the finger. `x` and `y` are page pixels, `cx` and `cy`
 * client pixels. `ax` and `ay` add up its movement until the next step,
 * and `wx` and `wy` smooth that movement into a wind.
 */
export interface Pointer {
  x: number;
  y: number;
  cx: number;
  cy: number;
  ax: number;
  ay: number;
  wx: number;
  wy: number;
  /** True while the pointer is over the page, or a finger is down. */
  on: boolean;
  /** The push of a finger that is down, or 0. */
  press: number;
}

export interface Field {
  /** The element that the field covers. Its top-left is the field's origin. */
  readonly host: HTMLElement;
  /** The cards, in the order of the project list. */
  readonly cardElements: readonly HTMLElement[];
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  readonly pointer: Pointer;
  /** True with reduced motion: the field is drawn once and stays still. */
  calm: boolean;
  /** The size of the host in CSS pixels, and the canvas pixel ratio. */
  width: number;
  height: number;
  dpr: number;
  /** The side of a square grain of each size, in canvas pixels. */
  pix: number[];
  grains: Grains;
  bins: Bins;
  /** The cards as measured by the last build. */
  cards: Card[];
  /** How far each card's outline has turned to its colour, from 0 to 1. */
  tint: number[];
  /** The tint that each card's outline moves to: 0 or 1. */
  goal: number[];
  /** The card whose outline is gathered, or -1. */
  current: number;
  /** The card under the pointer, or -1. */
  hovered: number;
  /** The timer that gathers an outline when the pointer rests on a card. */
  intent: number;
  /** The pending animation frame, or 0 while the loop rests. */
  raf: number;
  /** The time of the last frame, or 0 when the loop starts again. */
  last: number;
  /** The time that is not stepped yet, in milliseconds. */
  lag: number;
  /** False while the tab is hidden. */
  shown: boolean;
  /** False while the field is off screen. */
  inView: boolean;
}
