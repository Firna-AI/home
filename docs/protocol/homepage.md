# Homepage

This doc holds the requirements and the decisions in force for the
homepage of Firna Ltd. Each decision gives the choice, the rejected
alternatives, and the reason.

## Terms

- **Grain field:** the layer of fine grey grains that covers the page
  behind the content. The grains look like firn, which is old, granular
  snow.
- **Card:** the box of one project in the project list.
- **Panel:** a translucent background behind text. Each card is a panel.
  The logo, the email, and the footer each sit on a small panel too.
- **Outline:** the dotted line of grains that gathers around a card.
- **Pointer:** a mouse, a trackpad, or a pen. A finger on a touch screen is
  not a pointer in this doc.
- **Reduced motion:** the browser setting `prefers-reduced-motion: reduce`.
- **Reduced transparency:** the browser setting
  `prefers-reduced-transparency: reduce`.
- **Complete gate:** all the checks of the repository, the tests included.
- **User:** the owner of this repository, who made the decisions in this
  doc. A person who opens the page is a visitor.

## Address

- The site lives at `https://firna.dev`.
- `https://www.firna.dev` redirects to `https://firna.dev`.

**Decision:** the homepage lives at `firna.dev`, because `firna.ai` serves
the Firna product site, and the homepage must not replace it. The user
rejected a subdomain or a path of `firna.ai`, another domain, and a move of
the product away from `firna.ai`.

## Page content

The site is one static page. The page has three parts, from top to bottom:

1. The header: the Firna logo as the main heading, and the contact email.
2. The project list: one card for each project.
3. The footer: the legal details of the company.

- The page shows only these three parts.
- The page has no statement about Firna.
- The page has no large banner at the top.
- The layout, the type, and the colours follow the Homepage screen of the
  [mockup catalogue](../../README.md#get-started), at desktop and at phone
  widths.

**Decision:** the page shows the projects, with no statement about Firna.
The user rejected a neutral sentence about Firna, a sentence that leads
with AI, and a "British company" line.

## Firna logo

- The logo is the Close-off mark with the name "Firna" in Lora, a modern
  serif font.
- The Close-off mark is a rounded form with one pocket of air. It holds no
  letter F.
- The logo is the main heading of the page. Its text alternative is
  "Firna".

**Decision:** the user asked for a logo like firn or a fern, with no letter
F, and chose Close-off with Lora. The user rejected 23 other marks, the
name in a sans-serif font, and seven other serif fonts, including
Instrument Serif.

## Projects

The page lists these projects, in this order:

| Project | Link | Logo |
| --- | --- | --- |
| Mokly | `https://mokly.ai` | The real Mokly logo |
| Bookfolio | `https://bookfolio.net` | The real Bookfolio logo |
| Firna UI | `https://github.com/futex-ai/ui` | A white switch on blue |
| Redloop | `https://github.com/futex-ai/redloop` | A loop around a job, on brick red |
| Bowser | `https://github.com/futex-ai/bowser` | A command prompt, on plum |

- Each card shows its project's logo, name, kind, and one line about the
  project. The kind is a short phrase, such as "Design tool".
- Each card also shows a short label for its link.
- The whole card is one link to the project.
- The kind and the line come from the project's own site or README.

**Decision:** the user chose these five projects, in this order. The user
rejected the list without Firna UI, and a card for the Firna product of
`firna.ai`.

## Contact

- The header shows the contact email `hello@firna.ai` as a mail link.
- The text of the link is the address.
- Mail to `hello@firna.ai` reaches Firna.

**Decision:** the user chose `hello@firna.ai` over another address,
because it is short and not tied to one person. A contact form is out: UK
e-commerce rules require an email address, and a form adds a server, spam
control, and a privacy notice.

## Legal disclosure

The footer shows these details of the company:

- Firna Ltd
- Registered in England and Wales
- Company number 09018453
- Registered office: 26 John Hogan V C Road, Manchester, M40 7QU
- VAT number GB191373695

UK company law requires the name, the place of registration, the number,
and the registered office of a company on its website. UK e-commerce rules
require the VAT number of a VAT-registered business.

**Decision:** Firna Ltd is VAT-registered, so the footer shows its VAT
number. The user confirmed the registration and gave the number.

## Page metadata

- The page has a title and a description.
- The title and the description make no statement about Firna.
- The canonical address of the page is `https://firna.dev/`.
- The favicon is the Close-off mark in ink.
- When the browser uses a dark theme, the favicon is light.

## Grain field

- The grain field covers the white page behind all content.
- A moving pointer pushes the grains near it aside, like wind. The grains
  then drift back to their places.
- When the pointer rests on a card, the nearest grains gather into an
  outline around the card, in the colour of its logo. The card lifts.
- Keyboard focus on a card gives the same outline and lift.
- When the pointer or the focus leaves the card, the grains of the outline
  drift back.
- On a touch screen, the grains part around a finger and follow its drag.
  They drift back when the finger lifts.
- A touch does not block scrolling. A tap on a card opens the project.
- The field moves only in answer to the pointer, a finger, or the focus.
- The field draws frames only while grains move. It stops when the grains
  rest, when the tab is hidden, and when the field is off screen.
- While grains move, the script work of the field stays near 2 ms per
  frame. The reference is headless Chrome at 1440 × 900 and a pixel ratio
  of 2, during a pointer sweep.
- The panels are frosted: translucent white over a blur of the grains.
- With reduced transparency, the panels are almost opaque white.

**Decision:** the "Cursor" design, the grain field, as the user chose it
over the other designs. The user rejected the refinements that removed the
card boxes, added a snowfall, or made the outline a line of ice.

**Decision:** frosted panels, because the user asked for no hard white
background behind the text. The user rejected plain translucent panels,
frost that the field draws itself, and frost on pointer devices only.

## Reduced motion

With reduced motion:

- The page draws the field once, and the field stays still.
- No outline gathers.
- A hovered or focused card gets a flat tint of its logo colour and a
  stronger border. It does not lift.

## Without JavaScript

- The page works without the grain field.
- Without JavaScript, the page shows no field, and the cards sit on white.
- All content and every link work without JavaScript.

## Accessibility

- The page meets WCAG 2.2 at level AA.
- Every text keeps AA contrast, measured over the densest grains that can
  sit under it.
- Keyboard focus is visible on every link.
- The page hides the grain field from assistive technology.
- The project logos are decorative. The page hides them from assistive
  technology, because each card names its project.

## Scripts and requests

- The page loads one script: the grain field.
- The page loads no framework runtime, such as React.
- The page loads every resource from its own origin, fonts included.

**Decision:** the grain field is a plain script. A React component that
runs in the browser is out, because it ships the React runtime for one
canvas.

**Decision:** the page hosts its fonts itself, so that it makes no request
to another origin. A font service, such as Google Fonts, is out.

## Privacy

- The page sets no cookies.
- The page has no analytics.

**Decision:** the site has no privacy page and no cookie banner, because
the page sets no cookies.

## Deploy

- Cloudflare Pages hosts the site.
- Cloudflare's Git connection builds each push to `main` and deploys it.
- GitHub stores no Cloudflare token.
- The deploy of a push to `main` runs the complete gate first.
- A failed check stops the deploy. The live site then stays as it was.
- Cloudflare builds a preview of each other branch at a `pages.dev`
  address.

**Decision:** Cloudflare's Git connection, so that GitHub holds no token
that can change the Cloudflare account. The user rejected an upload from
GitHub Actions with a token, also one that only `main` can use, and a
Cloudflare Worker with static assets.

**Decision:** the gate runs before the deploy, so that a broken page, or a
page without its legal details, cannot go live. The user rejected a deploy
of the build alone, and a separate gate on each pull request.

**Decision:** the branch previews stay on, because they help to review a
pull request, and the page holds no secrets.
