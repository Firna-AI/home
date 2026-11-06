# Homepage

This doc holds the requirements and the decisions in force for the site of
Firna Ltd at `firna.dev`: the homepage and the not-found page. Each
decision gives the choice, the rejected alternatives, and the reason.

## Terms

- **Homepage:** the page that lists Firna's projects.
- **Not-found page:** the page that says that an address has no page.
- **Grain field:** the layer of fine grey grains that covers each page
  behind the content. The grains look like firn, which is old, granular
  snow.
- **Card:** the box of one project in the project list.
- **Panel:** a translucent background behind text. Each card is a panel.
  The logo, the email, the footer, and the message of the not-found page
  each sit on a small panel too.
- **Outline:** the dotted line of grains that gathers around a card.
- **Pointer:** a mouse, a trackpad, or a pen. A finger on a touch screen is
  not a pointer in this doc.
- **Reduced motion:** the browser setting `prefers-reduced-motion: reduce`.
- **Reduced transparency:** the browser setting
  `prefers-reduced-transparency: reduce`.
- **Complete gate:** all the checks of the repository, the tests included.
- **User:** the owner of this repository, who made the decisions in this
  doc. A person who opens a page of the site is a visitor.

## Address

- The site lives at `https://firna.dev`.
- `https://www.firna.dev` redirects to `https://firna.dev`.
- The homepage is at `https://firna.dev/`.
- An address with no page or file of the site answers with status 404 and
  shows the not-found page.

**Decision:** the homepage lives at `firna.dev`, because `firna.ai` serves
the Firna product site, and the homepage must not replace it. The user
rejected a subdomain or a path of `firna.ai`, another domain, and a move of
the product away from `firna.ai`.

**Decision:** an address with no page or file gets the not-found page with
status 404. So a visitor and a search engine both learn that the address
has no page. The user rejected the homepage with status 200, which is
Cloudflare's default, the homepage with status 404, and a redirect to the
homepage.

## Page content

The site has two static pages: the homepage and the not-found page. Each
page has three parts, from top to bottom:

1. The header: the Firna logo and the contact email.
2. The main part: the project list on the homepage, and a short message
   with a link to the homepage on the not-found page.
3. The footer: the legal details of the company.

- Each page shows only these three parts.
- The message has the main heading "Page not found", the line
  "Firna's projects are on the homepage.", and the link
  "Go to the homepage".
- The not-found page shows no project list.
- No page has a statement about Firna.
- No page has a large banner at the top.
- The layout, the type, and the colours follow the Homepage and Not-found
  page screens of the [mockup catalogue](../../README.md#get-started), at
  desktop and at phone widths.

**Decision:** the homepage shows the projects, with no statement about
Firna. The user rejected a neutral sentence about Firna, a sentence that
leads with AI, and a "British company" line.

## Firna logo

- The logo is the Close-off mark with the name "Firna" in Lora, a modern
  serif font.
- The Close-off mark is a rounded form with one pocket of air. It holds no
  letter F.
- On the homepage, the logo is the main heading.
- On the not-found page, the logo is a link to the homepage.
- The text alternative of the logo is "Firna".

**Decision:** the user asked for a logo like firn or a fern, with no letter
F, and chose Close-off with Lora. The user rejected 23 other marks, the
name in a sans-serif font, and seven other serif fonts, including
Instrument Serif.

## Projects

The homepage lists these projects, in this order:

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

- The homepage has a title and a description.
- The title and the description make no statement about Firna.
- The canonical address of the homepage is `https://firna.dev/`.
- The favicon of each page is the Close-off mark in ink.
- When the browser uses a dark theme, the favicon is light.
- A browser that cannot change a favicon with its theme shows the mark in
  ink.

**Decision:** in such a browser, the ink mark is the intended favicon,
also in a dark theme. The rule names that ability, not SVG support,
because Safari 26 and later show an SVG favicon but ignore its theme rule.
The user rejected no rule, a rule for browsers without SVG favicons only,
and a light tile behind the mark, which changes the approved look. The
user also rejected a general rule for every requirement that needs a
browser feature.

## Grain field

- On each page, the grain field covers the white background behind all
  content.
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

- Each page draws the field once, and the field stays still.
- No outline gathers.
- A hovered or focused card gets a flat tint of its logo colour and a
  stronger border. It does not lift.

## Without JavaScript

- Each page works without the grain field.
- Without JavaScript, a page shows no field, and its content sits on
  white.
- All content and every link work without JavaScript.

## Accessibility

- Each page meets WCAG 2.2 at level AA.
- Every text keeps AA contrast, measured over the densest grains that can
  sit under it.
- Keyboard focus is visible on every link.
- Each page hides the grain field from assistive technology.
- The project logos are decorative. The homepage hides them from assistive
  technology, because each card names its project.

## Scripts and requests

- Each page loads one script: the grain field.
- No page loads a framework runtime, such as React.
- Each page loads every resource from its own origin, fonts included.

**Decision:** the grain field is a plain script. A React component that
runs in the browser is out, because it ships the React runtime for one
canvas.

**Decision:** the site hosts its fonts itself, so that no page makes a
request to another origin. A font service, such as Google Fonts, is out.

## Privacy

- No response of the site sets a cookie.
- No page writes other site data on the visitor's device, such as local
  storage, session storage, IndexedDB, or a service worker.
- The browser's cache of the site's own files is allowed.
- The site has no analytics.

**Decision:** the site has no privacy page and no cookie banner, because
it writes no site data on a visitor's device. The rule covers more than
cookies, as the UK rules on storage on a device do. The user rejected the
rule on cookies alone, a rule that also forbids the browser's cache, and
an allowance for strictly necessary storage. The user also rejected a lint
on the browser storage APIs.

## Deploy

- Cloudflare Pages hosts the site.
- Cloudflare's Git connection builds each push to `main` and deploys it.
- Cloudflare's build runs no checks.
- When Cloudflare's build fails, the live site stays as it was.
- GitHub stores no Cloudflare token.
- GitHub runs the complete gate on each pull request and on each push to
  `main`.
- A change reaches `main` only through a pull request whose complete gate
  passed.
- Only the user can bypass that rule, with a direct push to `main` or a
  merge before the gate passed.
- A change through the bypass goes live without a passed gate. GitHub
  still runs the complete gate on it and reports the result.
- Cloudflare builds a preview of each other branch at a `pages.dev`
  address.

**Decision:** Cloudflare's Git connection, so that GitHub holds no token
that can change the Cloudflare account. The user rejected an upload from
GitHub Actions with a token, also one that only `main` can use, and a
Cloudflare Worker with static assets.

**Decision:** GitHub runs the complete gate, and a change that fails it
cannot reach `main`, so it cannot go live. Cloudflare's build cannot start
a browser, which the complete gate needs, so it runs no checks. The user
rejected checks in Cloudflare's build, a workflow that moves a production
branch after the gate, and checks that report but block nothing.

**Decision:** the branch previews stay on, because they help to review a
pull request, and the site holds no secrets.
