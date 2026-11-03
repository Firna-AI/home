import { expect, test } from "@playwright/test";
import { renderToStaticMarkup } from "react-dom/server";

import { company } from "../src/company";
import { Homepage } from "../src/components/Homepage";
import { projects } from "../src/projects";
import { expectedLegalDetails, expectedProjects } from "./helpers/content";

function renderHomepage() {
  return renderToStaticMarkup(
    <Homepage company={company} projects={projects} />,
  );
}

// Read the rendered HTML in Node. These tests need no browser or DOM library.
function section(html: string, tag: "header" | "main" | "footer") {
  return (
    html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`))?.[1] ?? ""
  );
}

test("The page lists each project in order with its link", () => {
  const main = section(renderHomepage(), "main");
  const links = Array.from(
    main.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gs),
    ([, href, name]) => ({ name, href }),
  );

  expect(links).toEqual(expectedProjects);
});

test("The footer shows the company legal details and VAT number", () => {
  const footer = section(renderHomepage(), "footer")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ");

  for (const detail of expectedLegalDetails) {
    expect(footer, detail).toContain(detail);
  }
});

test("The header offers the contact email as a mail link", () => {
  const header = section(renderHomepage(), "header");

  expect(header).toMatch(
    /<a\b[^>]*href="mailto:hello@firna\.ai"[^>]*>hello@firna\.ai<\/a>/,
  );
});
