import { defineScreen } from "@mokly/mokly";

import { company } from "../../src/company";
import { Homepage } from "../../src/components/Homepage";
import { projects } from "../../src/projects";
import "../../src/styles/site.css";
import { StillField } from "./StillField";

/**
 * The page that the still field draws in each view: the page at 1440 × 900,
 * and the whole page at 390 px wide. On a larger page the field repeats.
 */
const fieldSize = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 1399 },
} as const;

export const homepage = defineScreen({
  title: "Homepage",
  description:
    "The Firna homepage: the Firna logo and the contact email, the projects as frosted cards on the grain field, and the legal footer.",
  rationale:
    "The catalogue runs no scripts, so this screen draws the grain field once, at rest, from the field's own layout. On the site the field moves: the pointer pushes the grains aside, and a hovered or focused card gathers an outline of grains in its logo colour. The still field is the site's field at rest on a 1440 × 900 desktop page and on a 390 px wide phone page, and it repeats on a larger page. The catalogue's desktop frame is narrower than 1396 px, so the six cards sit there in two rows of three. At 1440 px they sit in one row.",
  relatedDocs: ["docs/protocol/homepage.md"],
  address: "https://firna.dev/",
  render: (_props, context) => (
    <>
      <StillField {...fieldSize[context.viewport]} />
      <Homepage company={company} projects={projects} />
    </>
  ),
});
