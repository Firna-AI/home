import { defineConfig } from "@playwright/test";

const site = "http://127.0.0.1:4323";

export default defineConfig({
  testDir: "./tests",
  expect: { timeout: 10_000 },
  reporter: "list",
  use: {
    baseURL: site,
    browserName: "chromium",
    viewport: { width: 1440, height: 900 },
    locale: "en-GB",
    timezoneId: "UTC",
    reducedMotion: "no-preference",
    trace: "retain-on-failure",
  },
  webServer: {
    // --ignore-lock keeps Astro in the foreground under agent environments.
    // npm test builds first. The gate uses that same build for the browser.
    command: "npm run preview -- --host 127.0.0.1 --port 4323 --ignore-lock",
    url: site,
    reuseExistingServer: false,
    stdout: "pipe",
  },
});
