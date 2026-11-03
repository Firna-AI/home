// @ts-check

import react from "@astrojs/react";
import { defineConfig } from "astro/config";

const reactIntegration = react();
const setupReact = reactIntegration.hooks["astro:config:setup"];

export default defineConfig({
  site: "https://firna.dev/",
  output: "static",
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
