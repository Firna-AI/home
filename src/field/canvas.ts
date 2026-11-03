// The field's canvas, and the class names that the stylesheet gives it.

/** The class of the field's canvas: one layer behind the page's content. */
export const fieldClass = "field";

/** The class that fades the field in once the first build has drawn it. */
export const shownClass = "on";

/**
 * Adds the field's canvas as the first child of `host`. It returns null,
 * and adds nothing, when the browser cannot draw the field.
 */
export function addCanvas(host: HTMLElement) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx || !("ResizeObserver" in window)) return null;
  canvas.className = fieldClass;
  canvas.setAttribute("aria-hidden", "true");
  host.prepend(canvas);
  return { canvas, ctx };
}
