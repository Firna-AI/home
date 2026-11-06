import { defineScreen, mockLink } from "@mokly/mokly";

import { company } from "../../src/company";
import { NotFoundPage } from "../../src/components/NotFoundPage";
import "../../src/styles/site.css";
import { homepage } from "./homepage.mockup";
import { StillField } from "./StillField";

/**
 * The page that the still field draws in each view. The not-found page is as
 * tall as the screen: 1440 × 900 on desktop, and 390 × 844 on a phone.
 */
const fieldSize = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
} as const;

export const notFound = defineScreen({
  title: "Not-found page",
  description:
    "The page that the site shows at any address without a page: the header, a short message with a link to the homepage, and the legal footer, on the grain field.",
  rationale:
    "The page is a sibling of the homepage: the same header, frosted panels, legal footer, and grain field. Its one heading names the page, so here the logo is a link to the homepage, not the heading. The message names what failed, says where the projects are, and gives one action: the link to the homepage. In the catalogue, the logo and the link open the Homepage screen. The site serves this page with status 404. The catalogue runs no scripts, so this screen draws the grain field once, at rest, from the field's own layout. The still field is the site's field at rest on a 1440 × 900 desktop page and on a 390 × 844 phone page. On the site the field moves as on the homepage: the pointer pushes the grains aside. The page has no cards, so no outline gathers.",
  relatedDocs: ["docs/protocol/homepage.md"],
  address: "https://firna.dev/no-such-page",
  render: (_props, context) => (
    <>
      <StillField {...fieldSize[context.viewport]} />
      <NotFoundPage company={company} homeHref={mockLink(homepage)} />
    </>
  ),
});
