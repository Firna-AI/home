import { expect, test, type Locator } from "@playwright/test";

import { expectedLegalDetails, expectedProjects } from "./helpers/content";
import {
  canvasState,
  frames,
  openField,
  settleField,
  sweepPointer,
} from "./helpers/field";

test("The field stops when the grains rest", async ({ page }) => {
  await openField(page);
  const atRest = await frames(page);
  await canvasState(page, true);

  await sweepPointer(page);
  const moving = await frames(page);
  expect(moving.requested).toBeGreaterThan(atRest.requested);
  expect(moving.ran).toBeGreaterThan(atRest.ran);
  expect((await canvasState(page)).changedPixels).toBeGreaterThan(0);

  await settleField(page);
  const settled = await frames(page);
  expect(settled.pending).toBe(0);
  await page.clock.runFor(1000);
  expect(await frames(page)).toEqual(settled);
});

test("With reduced motion the field draws once and stays still", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openField(page);
  const pixels = await canvasState(page, true);
  expect(pixels.grains).toBeGreaterThan(0);
  const still = await frames(page);
  expect(still.requested).toBeGreaterThan(0);
  expect(still.ran).toBeGreaterThan(0);
  expect(still.pending).toBe(0);

  await sweepPointer(page);
  expect(await canvasState(page)).toEqual(pixels);
  await page.getByRole("link", { name: "Mokly", exact: true }).hover();
  // Advance the hover intent timer and every frame it could request.
  await page.clock.runFor(1000);
  expect(await canvasState(page)).toEqual(pixels);
  expect(await frames(page)).toEqual(still);
});

test.describe("Without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("The page works without JavaScript", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: "Firna", level: 1 }),
    ).toBeVisible();
    const list = page.getByRole("list", { name: "Projects" });
    await expect(list.getByRole("link")).toHaveText(
      expectedProjects.map(({ name }) => name),
    );
    for (const { name, href } of expectedProjects) {
      const link = list.getByRole("link", { name, exact: true });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", href);
    }
    const email = page.getByRole("link", {
      name: "hello@firna.ai",
      exact: true,
    });
    await expect(email).toBeVisible();
    await expect(email).toHaveAttribute("href", "mailto:hello@firna.ai");
    const footer = page.getByRole("contentinfo");
    await expect(footer).toBeVisible();
    for (const detail of expectedLegalDetails) {
      await expect(footer).toContainText(detail);
    }
  });
});

test("The page loads every resource from its own origin", async ({
  page,
  baseURL,
}) => {
  const requests: { url: string; type: string }[] = [];
  page.on("request", (request) => {
    requests.push({ url: request.url(), type: request.resourceType() });
  });
  await openField(page);
  await sweepPointer(page);
  await settleField(page);

  const origin = new URL(baseURL ?? page.url()).origin;
  expect(requests.filter(({ url }) => new URL(url).origin !== origin)).toEqual(
    [],
  );
  // Prove the listener saw the document and its script, stylesheet, and fonts.
  expect(requests.map(({ type }) => type)).toEqual(
    expect.arrayContaining(["document", "script", "stylesheet", "font"]),
  );
});

/** The number of cards in each row of the list, from the top row down. */
async function rowSizes(cards: Locator): Promise<number[]> {
  const sizes = new Map<number, number>();
  for (const card of await cards.all()) {
    const box = await card.boundingBox();
    if (!box) throw new Error("Each project card needs a visible box.");
    const top = Math.round(box.y);
    sizes.set(top, (sizes.get(top) ?? 0) + 1);
  }
  return [...sizes.values()];
}

test("The project cards fill even rows at each page width", async ({
  page,
}) => {
  await page.goto("/");
  const cards = page
    .getByRole("list", { name: "Projects" })
    .getByRole("listitem");
  // Hand-worked from the homepage design: one column on a phone, then two,
  // three, and six.
  for (const { width, rows } of [
    { width: 390, rows: [1, 1, 1, 1, 1, 1] },
    { width: 768, rows: [2, 2, 2] },
    { width: 1280, rows: [3, 3] },
    { width: 1440, rows: [6] },
  ]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(() => rowSizes(cards), { message: `rows at ${width} px` })
      .toEqual(rows);
  }
});
