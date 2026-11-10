import { expect, test } from "@playwright/test";

import { unknownAddress } from "./helpers/content";
import { readHtml } from "./helpers/html";

test("Both built pages keep their required metadata and reachable favicons", async ({
  request,
}) => {
  // Literal requirements and design calls, independent of the layout and data.
  for (const expected of [
    {
      path: "/",
      status: 200,
      title: "Firna",
      descriptions: [
        "Firna's projects: Mokly, Bookfolio, Conductive, Firna UI, Redloop, and Bowser.",
      ],
      canonicals: ["https://firna.dev/"],
    },
    {
      path: unknownAddress,
      status: 404,
      title: "Page not found · Firna",
      descriptions: [],
      canonicals: [],
    },
  ]) {
    await test.step(expected.path, async () => {
      const response = await request.get(expected.path);
      expect(response.status()).toBe(expected.status);
      const html = readHtml(await response.text());

      expect(html.lang).toBe("en");
      expect(html.titles).toEqual([expected.title]);
      expect(
        html.meta
          .filter(({ name }) => name === "viewport")
          .map(({ content }) => content),
      ).toEqual(["width=device-width, initial-scale=1"]);
      expect(
        html.meta
          .filter(({ name }) => name === "description")
          .map(({ content }) => content),
      ).toEqual(expected.descriptions);
      expect(
        html.links
          .filter(({ rel }) => rel?.split(/\s+/).includes("canonical"))
          .map(({ href }) => href),
      ).toEqual(expected.canonicals);
      expect(html.scripts).toBe(1);

      const icons = html.links.filter(({ rel }) =>
        rel?.split(/\s+/).includes("icon"),
      );
      expect(icons.map(({ href }) => href).sort()).toEqual([
        "/favicon.ico",
        "/favicon.svg",
      ]);
      expect(icons.find(({ href }) => href === "/favicon.svg")?.type).toBe(
        "image/svg+xml",
      );
      for (const { href } of icons) {
        const address = new URL(href, response.url()).href;
        const icon = await request.get(address);
        expect(icon.status(), address).toBe(200);
        expect(icon.headers()["content-type"], address).toMatch(/^image\//);
      }
    });
  }
});

test("The linked SVG favicon uses ink in a light theme and light ink in a dark theme", async ({
  request,
  page,
}) => {
  const homepage = await request.get("/");
  const icon = readHtml(await homepage.text()).links.find(
    ({ rel, type }) =>
      rel?.split(/\s+/).includes("icon") && type === "image/svg+xml",
  );
  if (!icon) throw new Error("The homepage needs an SVG favicon link.");

  await page.emulateMedia({ colorScheme: "light" });
  await page.goto(new URL(icon.href, homepage.url()).href);
  // The mark's path has no accessible name. Its computed fill applies the theme.
  const mark = page.locator("path");
  await expect(mark).toHaveCSS("fill", "rgb(21, 23, 26)");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(mark).toHaveCSS("fill", "rgb(237, 241, 244)");
});
