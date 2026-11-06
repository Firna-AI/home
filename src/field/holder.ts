// Which card holds the outline. The pointer that rests on a card and the
// keyboard focus on a card's link each pick a card. The card handlers, the
// hover intent, and the return from the back-forward cache only change these
// inputs, and the build only makes new grains. Each of them then calls
// `updateOutline`, the only caller of `gather` and `release`. So every path
// follows one rule: the later input gives the outline, and when it ends, the
// other input gives it back.

import { gather, release } from "./outline";
import type { CardInput, Field } from "./state";

/**
 * Follows the pointer and the keyboard focus on the cards, and the page's
 * return from the back-forward cache.
 */
export function listenToCards(f: Field) {
  const input = f.input;
  f.cardElements.forEach((el, k) => {
    el.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "touch") return;
      window.clearTimeout(input.intent);
      // The pointer rests on the card after 60 ms on it.
      input.intent = window.setTimeout(() => {
        input.resting = k;
        input.latest = "pointer";
        updateOutline(f);
      }, 60);
    });
    el.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "touch") return;
      window.clearTimeout(input.intent);
      if (input.resting === k) {
        input.resting = -1;
        updateOutline(f);
      }
    });
    el.addEventListener("focusin", (e) => {
      const target = e.target;
      if (target instanceof Element && target.matches(":focus-visible")) {
        input.focused = k;
        input.latest = "focus";
        updateOutline(f);
      }
    });
    el.addEventListener("focusout", () => {
      if (input.focused === k) {
        input.focused = -1;
        updateOutline(f);
      }
    });
  });

  // A page that comes back from the back-forward cache forgets the resting
  // pointer, because the pointer can have moved while the page was away.
  // Keyboard focus stays, so a focused card keeps its outline.
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      window.clearTimeout(input.intent);
      input.resting = -1;
      updateOutline(f);
    }
  });
}

/**
 * Gives the outline to the card that the inputs pick, or releases it when
 * no input is on a card. Then it decides whether the pointer causes wind.
 */
export function updateOutline(f: Field) {
  const k = pick(f.input);
  if (k >= 0) gather(f, k);
  else release(f, f.current);
  // While the pointer rests on the card that holds the outline, it causes no
  // wind, so that the outline stays calm. Elsewhere the wind blows.
  f.windless = f.current >= 0 && f.current === f.input.resting;
}

/** The card for the outline. The later input wins while both are on cards. */
function pick({ resting, focused, latest }: CardInput) {
  if (resting < 0) return focused;
  if (focused < 0) return resting;
  return latest === "focus" ? focused : resting;
}
