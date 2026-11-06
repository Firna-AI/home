// Starts the grain field, and connects it to the pointer, the keyboard
// focus, touch, and the page's visibility, size, and motion setting.

import { build } from "./build";
import { addCanvas } from "./canvas";
import { createGrains, index } from "./grains";
import { layOutGrains } from "./layout";
import { kick, stop } from "./motion";
import { gather, release } from "./outline";
import type { Field } from "./state";
import { PRESS } from "./tuning";

/** The elements that the field works on. */
export interface FieldTargets {
  /** The element that the field covers: the page's body. */
  readonly host: HTMLElement;
  /**
   * The project list, or null on a page without one. Each child element of
   * the list is one card.
   */
  readonly list: HTMLElement | null;
}

/**
 * Starts the grain field behind the content of `host`. Without a 2D canvas
 * or ResizeObserver, it adds nothing, and the page shows its content on
 * white.
 */
export function startField({ host, list }: FieldTargets) {
  const surface = addCanvas(host);
  if (!surface) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const grains = createGrains(layOutGrains(0, 0), []);
  const f: Field = {
    host,
    cardElements: list
      ? Array.from(list.children).filter((el) => el instanceof HTMLElement)
      : [],
    canvas: surface.canvas,
    ctx: surface.ctx,
    pointer: {
      x: 0,
      y: 0,
      cx: 0,
      cy: 0,
      ax: 0,
      ay: 0,
      wx: 0,
      wy: 0,
      on: false,
      press: 0,
    },
    calm: reduce.matches,
    width: 0,
    height: 0,
    dpr: 1,
    pix: [],
    grains,
    bins: index(grains, 0, 0),
    cards: [],
    tint: [],
    goal: [],
    current: -1,
    hovered: -1,
    intent: 0,
    raf: 0,
    last: 0,
    lag: 0,
    shown: !document.hidden,
    inView: true,
  };
  listenToCards(f);
  listenToPointer(f);
  listenToPage(f, list, reduce);
}

/** The pointer resting on a card, or the keyboard focus, gathers its outline. */
function listenToCards(f: Field) {
  f.cardElements.forEach((el, k) => {
    el.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "touch") return;
      f.hovered = k;
      window.clearTimeout(f.intent);
      f.intent = window.setTimeout(() => gather(f, k), 60);
    });
    el.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "touch") return;
      window.clearTimeout(f.intent);
      if (f.hovered === k) f.hovered = -1;
      if (f.current === k) release(f, k);
    });
    el.addEventListener("focusin", (e) => {
      const target = e.target;
      if (target instanceof Element && target.matches(":focus-visible")) {
        gather(f, k);
      }
    });
    el.addEventListener("focusout", () => {
      if (f.current === k && f.hovered !== k) release(f, k);
    });
  });
}

/** A moving pointer, or a finger that is down, blows the grains aside. */
function listenToPointer(f: Field) {
  const ptr = f.pointer;
  // Over a gathered card there is no wind, so the outline stays calm.
  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType === "touch") return;
      const calmHere = f.current >= 0;
      if (ptr.on && !calmHere) {
        ptr.ax += e.clientX - ptr.cx;
        ptr.ay += e.clientY - ptr.cy;
      }
      ptr.cx = e.clientX;
      ptr.cy = e.clientY;
      ptr.x = e.pageX;
      ptr.y = e.pageY;
      ptr.on = true;
      if (!calmHere) kick(f);
    },
    { passive: true },
  );
  document.documentElement.addEventListener("pointerleave", () => {
    ptr.on = false;
  });
  window.addEventListener("blur", () => {
    ptr.on = false;
  });

  // Touch: the grains part around the finger while it is down, and follow
  // its drag.
  const touch = (e: TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    if (ptr.on) {
      ptr.ax += t.pageX - ptr.x;
      ptr.ay += t.pageY - ptr.y;
    }
    ptr.x = t.pageX;
    ptr.y = t.pageY;
    ptr.on = true;
    kick(f);
  };
  const untouch = (e: TouchEvent) => {
    if (!e.touches.length) {
      ptr.press = 0;
      ptr.on = false;
    }
  };
  const passive = { passive: true };
  window.addEventListener(
    "touchstart",
    (e) => {
      ptr.on = false;
      ptr.press = PRESS;
      touch(e);
    },
    passive,
  );
  window.addEventListener("touchmove", touch, passive);
  window.addEventListener("touchend", untouch, passive);
  window.addEventListener("touchcancel", untouch, passive);
}

/** The field pauses while it cannot be seen, and builds again on a resize. */
function listenToPage(
  f: Field,
  list: HTMLElement | null,
  reduce: MediaQueryList,
) {
  // A page that comes back from the back-forward cache drops a stale outline.
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      f.hovered = -1;
      release(f, f.current);
    }
  });

  // Pause when the tab is hidden or the field is off screen.
  document.addEventListener("visibilitychange", () => {
    f.shown = !document.hidden;
    if (f.shown) kick(f);
    else stop(f);
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      f.inView = entries[entries.length - 1].isIntersecting;
      if (f.inView) kick(f);
      else stop(f);
    }).observe(f.canvas);
  }

  // Build again in the next frame when the page or the list changes size.
  let queued = 0;
  const rebuild = () => {
    if (queued) return;
    queued = requestAnimationFrame(() => {
      queued = 0;
      stop(f);
      build(f);
      kick(f);
    });
  };
  const sizes = new ResizeObserver(rebuild);
  sizes.observe(f.host);
  if (list) sizes.observe(list);
  reduce.addEventListener("change", () => {
    f.calm = reduce.matches;
    rebuild();
  });
}
