# Firna homepage

This repository holds the static site of Firna Ltd at `https://firna.dev`.
It has two pages. The homepage shows the Firna logo, the contact email, the
list of Firna's projects, and the legal details of the company. At every
address with no page or file, the site shows the not-found page with
status 404. That page has the same header and footer, a short message, and
a link to the homepage.

A field of fine grey grains covers the white pages, like firn, which is
old, granular snow. The pointer pushes the grains aside like wind. A card
under the pointer or the keyboard focus gathers an outline of grains in
the colour of its logo.

Astro renders the shared React components to static HTML. TypeScript
checks the code. The built pages load no React runtime.

The protocol docs hold the requirements and the decisions in force.
[docs/protocol/homepage.md](docs/protocol/homepage.md) covers the pages,
and [docs/protocol/deploy.md](docs/protocol/deploy.md) covers the hosting
and the deploy.

The site is not live yet. A push deploys nothing until someone connects
this repository to Cloudflare Pages.

## Get started

1. Use the Node version that `.nvmrc` names.
2. Run `npm ci` to install the dependencies. npm can warn that it did not
   run the install script of `esbuild`. The commands work without it.
3. Run `npx playwright install chromium` to install the browser for the tests.
4. Run `npm run dev`, and open the address that it prints. Astro serves
   the site and shows each change while it runs.
5. Run `npm run mockups`, and open the address that it prints. There,
   Mokly serves the mockup catalogue: the screens of the product as static
   pages. It shows the Homepage screen and the Not-found page screen, each
   at desktop and phone sizes.

The catalogue runs no scripts. So each screen draws the grain field once,
at rest.

## Commands

- `npm run dev` serves the site. It shows each change while it runs.
- `npm run build` writes the static site to `dist/`.
- `npm run preview` serves the built site from `dist/`.
- `npm test` builds the site, then runs the render and browser tests with
  Playwright Test. The render tests run in Node without a browser.
  Playwright starts `astro preview` for the browser tests.
- `npm test -- tests/homepage.render.spec.tsx` runs the render tests.
- `npm test -- tests/*.browser.spec.ts` runs the browser tests. After a
  build, `npx playwright test tests/*.browser.spec.ts` runs them without
  another build.
- `npm run typecheck` checks Astro, TypeScript, and React files in strict
  mode. It generates Astro types under `.astro/`.
- `npm run lint` checks the code with the recommended ESLint and
  `typescript-eslint` rules.
- `npm run format` formats code, styles, and configuration files with
  Prettier. It leaves Markdown out.
- `npm run format:check` checks the same files without changing them.
- `npm run mockups` serves the mockup catalogue. It shows each change to a
  screen while it runs.
- `npm run mockups:check` builds the catalogue into `mokly-static/`. It
  fails on any warning.
- `npm run gate` runs typecheck, lint, format check, build, tests, and the
  mockup check, in that order. It stops at the first failed command.
  `npm test` owns the build, so the gate builds once.
  A test failure names the case and shows the failed assertion.
  Playwright saves its failure trace under `test-results/`.

## Add a project

1. Add the logo of the project as one component in `src/logos/`. Add a row
   for it, with the source of the logo, to the table in
   [src/logos/README.md](src/logos/README.md).
2. Add one entry for the project to the list in `src/projects.ts`, at its
   place in the order. The comments on the `Project` type say what each
   field holds.
3. Take the kind and the one line from the project's own site or README.
4. Add the project to the list in
   [docs/protocol/homepage.md](docs/protocol/homepage.md#projects). That
   list of the projects and their order is a requirement, so it changes
   with the homepage.
5. Make each column count of the grid in `src/styles/cards.css` divide the
   new number of projects. Then each row holds the same number of cards,
   as the protocol doc requires.
6. Add the project to `expectedProjects` in `tests/helpers/content.ts`, and
   its name to the homepage description in `tests/page-metadata.spec.ts`.
7. Run `npm run mockups`, and check the Homepage screen at both sizes.
8. Run `npm run format`.
9. Run `npm run gate`.

## Deploy

Cloudflare Pages hosts the site. A change goes live in three steps:

1. A pull request runs the GitHub Actions workflow "Gate" in
   [.github/workflows/gate.yml](.github/workflows/gate.yml). It runs
   `npm run gate`, the browser test included. Its check is named `gate`.
2. GitHub merges the pull request into `main` only after `gate` passed.
   A ruleset of the repository holds this rule, and it blocks direct
   pushes to `main`. The owner of the repository can bypass the ruleset.
3. Cloudflare's Git connection builds the new `main` with `npm run build`,
   and deploys `dist/` to `https://firna.dev`. The workflow also runs on
   that push, and it reports its result on the commit.

Cloudflare's build runs no checks. When it fails, the live site stays as
it was. Cloudflare also builds a preview of each other branch at a
`pages.dev` address, and it links the preview on the pull request. The
protocol doc [docs/protocol/deploy.md](docs/protocol/deploy.md) gives the
rules and the decisions.

The owner of the repository does a one-time setup in Cloudflare and
GitHub. [docs/deploy-setup.md](docs/deploy-setup.md) gives its steps: the
Pages project, the zone settings, the domains, the ruleset for `main`, and
the checks of the setup.

## Key code

- `astro.config.mjs`: the site address, static output, the browsers that
  the built CSS supports, and the React renderer for static HTML.
- `src/layouts/Page.astro`: the layout of each page. It holds the document
  of the page: the head, the shared stylesheet, the body, and the grain
  field as the only script. Each page gives the layout its own title. A
  page with an address of its own also gives its description and its
  canonical address.
- `src/pages/index.astro`: the Astro page of the homepage. It renders the
  shared homepage component with the company and project data in the
  layout. It gives the layout the title, the description, and the
  canonical address. Its description names the projects from
  `src/projects.ts`.
- `src/pages/404.astro`: the not-found page. Astro builds it as
  `dist/404.html`. The host serves that file with status 404 at every
  address with no page or file. So the page has no address of its own. It
  renders the shared not-found component in the layout, and it gives the
  layout only its title. Its link to the homepage is `/`.
- `public/favicon.svg`: the main favicon, the Close-off mark in ink. The
  file also holds a light version of the mark for a dark theme. The theme
  rules of the favicon are in
  [docs/protocol/homepage.md](docs/protocol/homepage.md#page-metadata).
- `public/favicon.ico`: the fallback favicon, the same mark in ink at
  32 × 32 px, for browsers that show no SVG favicon, such as Safari before
  version 26. Render it again from `favicon.svg` when the mark changes.
- `src/projects.ts`: the projects, in the order that the homepage shows
  them, and the `Project` type.
- `src/company.ts`: the contact email and the legal details of Firna Ltd.
- `src/components/Homepage.tsx`: the content of the homepage: the header,
  the project list, and the footer. It takes the company and the projects
  as props.
- `src/components/NotFoundPage.tsx`: the content of the not-found page:
  the header, a short message with a link to the homepage, and the footer.
  It takes the company and the address of the homepage as props. In its
  header, the logo is a link to the homepage.
- `src/components/projectListContract.ts`: the id of the project list and
  the name of the colour property of a card. The grain field finds the
  cards through them.
- `src/field/main.ts`: the entry module of the grain field, the only script
  of each page. It starts the field on every page. On the homepage, it
  also finds the project list.
- `src/styles/site.css`: the shared stylesheet. It imports the fonts,
  `src/styles/cards.css` for the project list, and
  `src/styles/not-found.css` for the message of the not-found page.
- `src/logos/`: one component for each logo.
- `docs/mockups/homepage.mockup.tsx`: the Homepage screen of the
  catalogue. `docs/mockups/StillField.tsx` draws the grain field of each
  screen at rest.
- `docs/mockups/not-found.mockup.tsx`: the Not-found page screen. Its logo
  and its link to the homepage open the Homepage screen.
- `tests/homepage.render.spec.tsx`: the project links, legal details,
  and contact link of the shared homepage component, rendered in Node.
- `tests/page-metadata.spec.ts`: the metadata and icon requests of both
  built pages, and the SVG favicon's colours in light and dark themes.
- `tests/homepage.browser.spec.ts`: the grain field, reduced motion,
  the page without JavaScript, requests to the page's own origin, and the
  even rows of the project list.
- `tests/site.browser.spec.ts`: the not-found page at an unknown address,
  with status 404 and its link to the homepage. It also checks that both
  pages set no cookie and write no other site data.
- `tests/homepage-field.browser.spec.ts`: the outline under the resting
  pointer and the keyboard focus, after each input and a resize, and the
  wind outside the card that holds the outline.
- `playwright.config.ts`: the test runner and the preview server.
- `.github/workflows/gate.yml`: the GitHub Actions workflow "Gate". It runs
  `npm run gate` on each pull request and each push to `main`.

## Related docs

- [docs/protocol/homepage.md](docs/protocol/homepage.md): the requirements
  and the decisions in force for the pages.
- [docs/protocol/deploy.md](docs/protocol/deploy.md): the requirements and
  the decisions in force for the hosting and the deploy.
- [docs/deploy-setup.md](docs/deploy-setup.md): the one-time setup of
  Cloudflare Pages, the domains, and the ruleset for `main`.
- [src/README.md](src/README.md): the rules for work on the code.
- [src/logos/README.md](src/logos/README.md): the source of each logo.
- [AGENTS.md](AGENTS.md): the rules for agents in this repository.
