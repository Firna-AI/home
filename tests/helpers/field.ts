import { expect, type Page } from "@playwright/test";

interface FrameCounter {
  requested: number;
  ran: number;
  cancelled: number;
  pending: Set<number>;
}

declare global {
  interface Window {
    fieldTestFrames: FrameCounter;
    fieldTestPixels?: ImageData;
  }
}

/** Observe the browser boundary without reading the field's internal state. */
export async function openField(page: Page) {
  // Freeze time before load so machine speed cannot change the frame order.
  // Count requests, runs, and cancellations to distinguish rest from a stopped clock.
  await page.clock.install({ time: new Date("2026-11-03T12:00:00Z") });
  await page.clock.pauseAt(new Date("2026-11-03T12:00:01Z"));
  await page.addInitScript(() => {
    const request = window.requestAnimationFrame.bind(window);
    const cancel = window.cancelAnimationFrame.bind(window);
    const counts: FrameCounter = {
      requested: 0,
      ran: 0,
      cancelled: 0,
      pending: new Set(),
    };
    window.fieldTestFrames = counts;
    window.requestAnimationFrame = (callback) => {
      counts.requested++;
      const id = request((now) => {
        counts.pending.delete(id);
        counts.ran++;
        callback(now);
      });
      counts.pending.add(id);
      return id;
    };
    window.cancelAnimationFrame = (id) => {
      if (counts.pending.delete(id)) counts.cancelled++;
      cancel(id);
    };
  });
  await page.goto("/");
  // Font readiness prevents a late layout change from rebuilding the canvas.
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("canvas")).toBeAttached();
  await expect
    .poll(
      async () => {
        await page.clock.runFor(16);
        return (await canvasState(page)).grains;
      },
      { intervals: [0] },
    )
    .toBeGreaterThan(0);
  await settleField(page);
}

export async function frames(page: Page) {
  // The hidden canvas has no accessible handle. Its frame counts are test evidence.
  return page.evaluate(() => {
    const counts = window.fieldTestFrames;
    return {
      requested: counts.requested,
      ran: counts.ran,
      cancelled: counts.cancelled,
      pending: counts.pending.size,
    };
  });
}

export async function settleField(page: Page) {
  // Advance all due callbacks until no frame remains, rather than sleep for rest.
  await expect
    .poll(
      async () => {
        await page.clock.runFor(160);
        return (await frames(page)).pending;
      },
      { intervals: [0] },
    )
    .toBe(0);
}

export async function sweepPointer(page: Page) {
  // Sweep the open field above the cards. Each move gets a simulation step.
  await page.mouse.move(80, 200);
  for (let x = 112; x <= 1360; x += 32) {
    await page.mouse.move(x, 200);
    await page.clock.runFor(16);
  }
}

export async function canvasState(page: Page, remember = false) {
  // Read pixels because the decorative canvas is hidden from assistive technology.
  return page.locator("canvas").evaluate((canvas: HTMLCanvasElement, keep) => {
    const context = canvas.getContext("2d");
    if (!context) throw new Error("The grain field needs a 2D canvas.");
    const image = context.getImageData(0, 0, canvas.width, canvas.height);
    const before = window.fieldTestPixels;
    let grains = 0;
    let changedPixels = 0;
    for (let i = 0; i < image.data.length; i += 4) {
      if (image.data[i + 3] > 0) grains++;
      if (
        before &&
        (image.data[i] !== before.data[i] ||
          image.data[i + 1] !== before.data[i + 1] ||
          image.data[i + 2] !== before.data[i + 2] ||
          image.data[i + 3] !== before.data[i + 3])
      ) {
        changedPixels++;
      }
    }
    if (keep) window.fieldTestPixels = image;
    return { grains, changedPixels, width: image.width, height: image.height };
  }, remember);
}
