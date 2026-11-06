import { expect, test, type Response } from "@playwright/test";

import { unknownAddress } from "./helpers/content";
import { openField, settleField, sweepPointer } from "./helpers/field";

test("An unknown address returns the not-found page with status 404 and a link home", async ({
  page,
}) => {
  const response = await page.goto(unknownAddress);
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Page not found",
  );
  await expect(
    page.getByText("Firna's projects are on the homepage.", { exact: true }),
  ).toBeVisible();
  const home = page.getByRole("link", {
    name: "Go to the homepage",
    exact: true,
  });
  await expect(home).toHaveAttribute("href", "/");
  await home.click();
  await expect(page).toHaveURL("/");
  await expect(
    page.getByRole("heading", { name: "Firna", exact: true, level: 1 }),
  ).toBeVisible();
});

test("Both pages keep cookies and other site storage empty", async ({
  context,
}) => {
  for (const { path, linkName, tabs } of [
    { path: "/", linkName: "Mokly", tabs: 2 },
    { path: unknownAddress, linkName: "Go to the homepage", tabs: 3 },
  ]) {
    await test.step(path, async () => {
      const page = await context.newPage();
      try {
        const responses: Response[] = [];
        page.on("response", (response) => {
          responses.push(response);
        });
        await openField(page, path);
        await sweepPointer(page);
        // The not-found page has no cards. Exercise its link home instead.
        const link = page.getByRole("link", { name: linkName, exact: true });
        await link.hover();
        // Run the hover intent timer and the frames that it can request.
        await page.clock.runFor(1000);
        await settleField(page);
        await page.mouse.move(0, 0);
        for (let tab = 0; tab < tabs; tab++) {
          await page.keyboard.press("Tab");
        }
        await expect(link).toBeFocused();
        await page.clock.runFor(1000);
        await settleField(page);

        // Prove the listener captured the page response, including its 404.
        expect(
          responses
            .filter((response) => response.request().isNavigationRequest())
            .map((response) => new URL(response.url()).pathname),
        ).toEqual([path]);
        for (const response of responses) {
          expect(
            await response.headerValues("set-cookie"),
            response.url(),
          ).toEqual([]);
        }
        expect(await context.cookies()).toEqual([]);
        // Storage has no page UI. Read the browser APIs to check device data.
        expect(
          await page.evaluate(async () => ({
            localStorage: Object.keys(localStorage),
            sessionStorage: Object.keys(sessionStorage),
            indexedDB: await indexedDB.databases(),
            serviceWorkers: (
              await navigator.serviceWorker.getRegistrations()
            ).map((registration) => registration.scope),
          })),
        ).toEqual({
          localStorage: [],
          sessionStorage: [],
          indexedDB: [],
          serviceWorkers: [],
        });
      } finally {
        await page.close();
      }
    });
  }
});
