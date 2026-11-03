# Firna homepage

This repository holds the homepage of Firna Ltd: one static page at
`https://firna.dev`. The page shows the Firna logo, the contact email, the
list of Firna's projects, and the legal details of the company. A field of
fine grey grains covers the white page, like firn, which is old, granular
snow. The pointer pushes the grains aside like wind. A card under the
pointer or the keyboard focus gathers an outline of grains in the colour of
its logo.

Astro renders the shared React components to static HTML. TypeScript
checks the code. The built page loads no React runtime.

[docs/protocol/homepage.md](docs/protocol/homepage.md) holds the
requirements and the decisions in force.

The site is not live yet. A push deploys nothing until someone connects
this repository to Cloudflare Pages.

## Get started

1. Use the Node version that `.nvmrc` names.
2. Run `npm ci` to install the dependencies. npm can warn that it did not
   run the install script of `esbuild`. The commands work without it.
3. Run `npx playwright install chromium` to install the browser for the tests.
4. Run `npm run dev`, and open the address that it prints. Astro serves
   the page and shows each change while it runs.
5. Run `npm run mockups`, and open the address that it prints. There,
   Mokly serves the mockup catalogue: the screens of the product as static
   pages. It shows the Homepage screen at desktop and phone sizes.

The catalogue runs no scripts. So the screen draws the grain field once,
at rest.

## Commands

- `npm run dev` serves the Astro page. It shows each change while it runs.
- `npm run build` writes the static site to `dist/`.
- `npm run preview` serves the built site from `dist/`.
- `npm test` builds the site, then runs the render and browser tests with
  Playwright Test. The render tests run in Node without a browser.
  Playwright starts `astro preview` for the browser tests.
- `npm test -- tests/homepage.render.spec.tsx` runs the render tests.
- `npm test -- tests/homepage.browser.spec.ts` runs the browser tests.
  After a build, `npx playwright test tests/homepage.browser.spec.ts`
  runs them without another build.
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
   with the page.
5. Run `npm run mockups`, and check the Homepage screen at both sizes.
6. Run `npm run format`.
7. Run `npm run gate`.

## Deploy

Cloudflare Pages hosts the site. Its Git connection builds each push to
`main` and deploys it to `https://firna.dev`. The build runs all the checks
of the repository first. So a failed check stops the deploy, and the live
site stays as it was. Cloudflare also builds a preview of each other branch
at a `pages.dev` address.

The repository is not connected to Cloudflare yet. The
[deploy section](docs/protocol/homepage.md#deploy) of the protocol doc
gives the rules and the decisions.

## Key code

- `astro.config.mjs`: the site address, static output, the browsers that
  the built CSS supports, and the React renderer for static HTML.
- `src/pages/index.astro`: the Astro page. It sets the head, imports the
  shared stylesheet, renders the shared homepage component with the company
  and project data, and loads the grain field as the page's only script.
  Its description names the projects from `src/projects.ts`.
- `public/favicon.svg`: the favicon, the Close-off mark in ink. It turns
  light when the browser uses a dark theme.
- `public/favicon.ico`: the same mark in ink at 32 × 32 px, for browsers
  that show no SVG favicon, such as Safari before version 26. Render it
  again from `favicon.svg` when the mark changes.
- `src/projects.ts`: the projects, in the order that the page shows them,
  and the `Project` type.
- `src/company.ts`: the contact email and the legal details of Firna Ltd.
- `src/components/Homepage.tsx`: the content of the page: the header, the
  project list, and the footer. It takes the company and the projects as
  props.
- `src/components/projectListContract.ts`: the id of the project list and
  the name of the colour property of a card. The grain field finds the
  cards through them.
- `src/field/main.ts`: the entry module of the grain field, the only script
  of the page.
- `src/styles/site.css`: the shared stylesheet. It imports the fonts and
  `src/styles/cards.css`, the styles of the project list.
- `src/logos/`: one component for each logo.
- `docs/mockups/homepage.mockup.tsx`: the Homepage screen of the
  catalogue. `docs/mockups/StillField.tsx` draws its grain field at rest.
- `tests/homepage.render.spec.tsx`: the project links, legal details,
  and contact link of the shared homepage component, rendered in Node.
- `tests/homepage.browser.spec.ts`: the grain field, reduced motion,
  the page without JavaScript, and requests to the page's own origin.
- `playwright.config.ts`: the test runner and the preview server.

## Related docs

- [docs/protocol/homepage.md](docs/protocol/homepage.md): the requirements
  and the decisions in force.
- [src/README.md](src/README.md): the rules for work on the code.
- [src/logos/README.md](src/logos/README.md): the source of each logo.
- [AGENTS.md](AGENTS.md): the rules for agents in this repository.
