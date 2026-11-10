import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores([
    ".context/",
    "node_modules/",
    "dist/",
    ".astro/",
    "mokly-static/",
    ".mokly-export-reservations/",
    ".wrangler/",
    "test-results/",
    "playwright-report/",
  ]),
  {
    files: ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,astro}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },
  ...astro.configs.base,
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
    },
  },
);
