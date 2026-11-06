// The build: it measures the page, lays out the grains for its size, and
// draws the field once. Layout is read only here: on load, on resize, and
// when the fonts arrive.

import { logoColorProperty } from "../components/projectListContract";
import { shownClass } from "./canvas";
import { createGrains, index } from "./grains";
import { updateOutline } from "./holder";
import { grainPixels, layOutGrains } from "./layout";
import { paint } from "./paint";
import type { Card, Field } from "./state";

/** Builds the field again for the page's layout, and draws it. */
export function build(f: Field) {
  measure(f);
  f.dpr = Math.min(2, window.devicePixelRatio || 1);
  f.canvas.width = Math.round(f.width * f.dpr);
  f.canvas.height = Math.round(f.height * f.dpr);
  f.pix = grainPixels(f.dpr);
  f.grains = createGrains(layOutGrains(f.width, f.height), f.cards);
  f.bins = index(f.grains, f.width, f.height, f.bins.stamp);
  f.tint = f.cards.map(() => 0);
  f.goal = f.cards.map(() => 0);
  f.current = -1;
  f.bins.dirty.fill(1);
  paint(f);
  f.canvas.classList.add(shownClass);
  // The new grains hold no outline. The resting pointer or the keyboard focus
  // gives it back.
  updateOutline(f);
}

/** Reads the cards and the size of the host. */
function measure(f: Field) {
  f.cards = f.cardElements.map((el) => measureCard(f.host, el));
  f.width = f.host.offsetWidth;
  f.height = f.host.offsetHeight;
}

/** A card's box from the host's top-left, its radius, and its logo colour. */
function measureCard(host: HTMLElement, el: HTMLElement): Card {
  let left = 0;
  let top = 0;
  for (
    let e: Element | null = el;
    e instanceof HTMLElement && e !== host;
    e = e.offsetParent
  ) {
    left += e.offsetLeft;
    top += e.offsetTop;
  }
  const style = getComputedStyle(el);
  const color = style.getPropertyValue(logoColorProperty).trim();
  const hex = parseInt(color.slice(1), 16) || 0;
  return {
    x: left,
    y: top,
    w: el.offsetWidth,
    h: el.offsetHeight,
    r: parseFloat(style.borderTopLeftRadius) || 0,
    rgb: [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255],
  };
}
