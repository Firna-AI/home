import { fieldClass, shownClass } from "../../src/field/canvas";
import {
  grainPixels,
  layOutGrains,
  type GrainLayout,
} from "../../src/field/layout";
import { CELL, FILL, SIZES } from "../../src/field/tuning";

export interface StillFieldProps {
  /** The size of the page that the tile draws, in CSS pixels. */
  readonly width: number;
  readonly height: number;
}

/**
 * The grain field at rest, drawn once. The catalogue runs no scripts, so
 * this mockup-only component draws the field's own layout as one SVG path
 * per tone, as the field's canvas draws it at a pixel ratio of 1. The
 * layout fills a tile of `width` × `height` CSS pixels, rounded up to whole
 * grain cells, and the tile repeats on a larger page. The site draws the
 * field with its canvas, and shows plain white without JavaScript.
 */
export function StillField({ width, height }: StillFieldProps) {
  const tileWidth = Math.ceil(width / CELL) * CELL;
  const tileHeight = Math.ceil(height / CELL) * CELL;
  return (
    <svg className={`${fieldClass} ${shownClass}`} aria-hidden="true">
      <defs>
        <pattern
          id="still-field"
          width={tileWidth}
          height={tileHeight}
          patternUnits="userSpaceOnUse"
        >
          {tracePaths(layOutGrains(tileWidth, tileHeight)).map((d, tone) => (
            <path key={tone} d={d} fill={FILL[tone]} />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#still-field)" />
    </svg>
  );
}

/** One path per tone. Small grains are squares of whole pixels, and the largest are circles. */
function tracePaths(layout: GrainLayout) {
  const pix = grainPixels(1);
  const r = SIZES[2] / 2;
  const paths: string[][] = [[], [], []];
  for (let i = 0; i < layout.count; i++) {
    const x = layout.x[i];
    const y = layout.y[i];
    const size = layout.size[i];
    const shape = size === 2 ? circle(x, y, r) : square(x, y, pix[size]);
    paths[layout.tone[i]].push(shape);
  }
  return paths.map((shapes) => shapes.join(""));
}

/** A square of side w, centred on x, y and snapped to whole pixels. */
function square(x: number, y: number, w: number) {
  const left = Math.round(x - w / 2);
  const top = Math.round(y - w / 2);
  return `M${left} ${top}h${w}v${w}h${-w}z`;
}

/** A circle of radius r: two clockwise half arcs, as the canvas draws it. */
function circle(x: number, y: number, r: number) {
  const half = `a${r} ${r} 0 0 1`;
  return `M${hundredths(x + r)} ${hundredths(y)}${half} ${-2 * r} 0${half} ${2 * r} 0z`;
}

const hundredths = (v: number) => Math.round(v * 100) / 100;
