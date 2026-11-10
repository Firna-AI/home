import { expect, test, type Page } from "@playwright/test";

import {
  canvasState,
  frames,
  openField,
  outlinePixels,
  projectCard,
  settleField,
  sweepPointer,
} from "./helpers/field";

test.use({ viewport: { width: 1440, height: 900 } });

async function expectOutline(page: Page, project: "Mokly" | "Firna UI") {
  await expect
    .poll(
      async () => {
        await page.clock.runFor(160);
        return outlinePixels(page, project);
      },
      {
        message: `${project} has an outline in its logo colour`,
        intervals: [0],
      },
    )
    .toBeGreaterThan(100);
  await settleField(page);
}

async function focusMokly(page: Page) {
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "hello@firna.ai", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Conductive", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Mokly", exact: true }),
  ).toBeFocused();
  await expectOutline(page, "Mokly");
}

test.beforeEach(async ({ page }) => {
  await openField(page);
});

test("Mokly's focus outline returns after the pointer leaves Firna UI", async ({
  page,
}) => {
  await focusMokly(page);
  await page.getByRole("link", { name: "Firna UI", exact: true }).hover();
  // Wait for coloured grains, so the 60 ms hover intent must have completed.
  await expectOutline(page, "Firna UI");
  expect(await outlinePixels(page, "Mokly")).toBe(0);

  await page.mouse.move(80, 200);
  await expect(
    page.getByRole("link", { name: "Mokly", exact: true }),
  ).toBeFocused();
  await expectOutline(page, "Mokly");
  expect(await outlinePixels(page, "Firna UI")).toBe(0);
});

test("Mokly's focus outline returns after the field rebuilds on resize", async ({
  page,
}) => {
  await focusMokly(page);
  await page.setViewportSize({ width: 1360, height: 900 });
  await expect
    .poll(
      async () => {
        await page.clock.runFor(16);
        return (await canvasState(page)).width;
      },
      { message: "The canvas rebuilds at the new width", intervals: [0] },
    )
    .toBe(1360);
  await expect(
    page.getByRole("link", { name: "Mokly", exact: true }),
  ).toBeFocused();
  await expectOutline(page, "Mokly");
});

test("Firna UI's hover outline returns after keyboard focus leaves the cards", async ({
  page,
}) => {
  await page.getByRole("link", { name: "Firna UI", exact: true }).hover();
  await expectOutline(page, "Firna UI");
  await focusMokly(page);
  expect(await outlinePixels(page, "Firna UI")).toBe(0);

  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("link", { name: "Conductive", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("link", { name: "hello@firna.ai", exact: true }),
  ).toBeFocused();
  await expectOutline(page, "Firna UI");
  expect(await outlinePixels(page, "Mokly")).toBe(0);
});

test("Pointer wind moves the open field while Mokly keeps its focus outline", async ({
  page,
}) => {
  await focusMokly(page);
  const resting = await frames(page);
  await canvasState(page, true);

  await sweepPointer(page);
  expect
    .soft(
      (await canvasState(page)).changedPixels,
      "Pointer wind changes canvas pixels outside the focused card",
    )
    .toBeGreaterThan(0);
  expect
    .soft(
      (await frames(page)).ran - resting.ran,
      "Pointer wind runs animation frames outside the focused card",
    )
    .toBeGreaterThan(0);
  await expect(
    page.getByRole("link", { name: "Mokly", exact: true }),
  ).toBeFocused();
  await expectOutline(page, "Mokly");
});

test("Pointer movement inside an outlined hovered card causes no wind", async ({
  page,
}) => {
  const card = projectCard(page, "Mokly");
  await card.hover();
  await expectOutline(page, "Mokly");
  const box = await card.boundingBox();
  if (!box) throw new Error("Mokly needs a visible card.");
  await canvasState(page, true);

  for (const fraction of [0.1, 0.35, 0.65, 0.9]) {
    await card.hover({ position: { x: box.width * fraction, y: 20 } });
    await page.clock.runFor(16);
    expect(
      (await canvasState(page)).changedPixels,
      `No grain moves with the pointer at ${fraction} of the card width`,
    ).toBe(0);
  }
  await settleField(page);
  expect((await canvasState(page)).changedPixels).toBe(0);
  await expectOutline(page, "Mokly");
});
