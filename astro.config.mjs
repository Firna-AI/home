// @ts-check

import react from "@astrojs/react";
import { defineConfig } from "astro/config";

const reactIntegration = react();
const setupReact = reactIntegration.hooks["astro:config:setup"];

export default defineConfig({
  site: "https://firna.dev/",
  output: "static",
  vite: {
    build: {
      // Without an explicit target, the CSS minifier assumes current browsers
      // and drops the -webkit-backdrop-filter that Safari 16.4 to 17 needs for
      // the frosted panels. This is Vite's default list of browsers.
      cssTarget: [
        "chrome111",
        "edge111",
        "firefox114",
        "safari16.4",
        "ios16.4",
      ],
    },
  },
  integrations: [
    {
      ...reactIntegration,
      hooks: {
        ...reactIntegration.hooks,
        "astro:config:setup": (options) =>
          setupReact?.({
            ...options,
            addRenderer(renderer) {
              // Astro 7 builds every renderer's client entrypoint, even when
              // no component uses client:*. This site renders React only to HTML.
              const staticRenderer = { ...renderer };
              delete staticRenderer.clientEntrypoint;
              options.addRenderer(staticRenderer);
            },
          }),
      },
    },
  ],
});
