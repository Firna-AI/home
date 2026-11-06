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
[deploy section](docs/protocol/homepage.md#deploy) of the protocol doc
gives the rules and the decisions.

### One-time setup

The owner of the repository does this setup once. Do it after the site is
on `main`, because Cloudflare builds `main` as soon as you connect it. The
setup needs no API token. In Cloudflare, a zone is a domain with its DNS
records and its settings.

#### 1. Create the Pages project

1. Sign in to the Cloudflare account that holds the zone `firna.dev`.
   Pages can serve a bare domain only from a zone in its own account.
2. Open **Workers & Pages**. Select **Create application**, the **Pages**
   tab, and **Import an existing Git repository**.
3. Select GitHub. Give the GitHub app **Cloudflare Workers and Pages**
   access to `Firna-AI/home`. Cloudflare advises access to selected
   repositories only.
4. Select `Firna-AI/home`, then **Begin setup**. Enter these values:
   - Project name: `firna-home`. The project then also answers at
     `https://firna-home.pages.dev`.
   - Production branch: `main`.
   - Build command: `npm run build`.
   - Build output directory: `dist`.
5. Add no environment variable. The build image reads the Node version
   from `.nvmrc`.
6. Select **Save and Deploy**. Cloudflare builds and deploys `main`.
7. In the project, open **Settings** > **Builds** > **Branch control**.
   Keep the automatic production deployments on. Keep the preview
   branches at **All non-Production branches**.

#### 2. Check the zone settings

Some Cloudflare features change the page on its way to a visitor. They
break the rules of the protocol doc on scripts, cookies, other origins,
and the page without JavaScript. Set these in the zone `firna.dev` before
you add the domains:

1. **Security** > **Settings**: turn **Email Address Obfuscation** off.
   Cloudflare turns it on in each new zone. It hides the mail address,
   and it adds a script that decodes it. The mail link then needs
   JavaScript.
2. **Security** > **Settings**: keep **Bot Fight Mode** off. It adds a
   script and the cookies `__cf_bm` and `cf_clearance`.
3. **Speed** > **Settings** > **Content Optimization**: keep
   **Rocket Loader** off. It loads the page's script through a script of
   its own.
4. Keep Web Analytics off. Do not enable it under **Metrics** in the
   Pages project, and add no site for `firna.dev` under **Web Analytics**.
   It adds a script from another origin.
5. Turn on no other feature that adds a script or a cookie, such as
   Zaraz.
6. **SSL/TLS** > **Edge Certificates**: turn **Always Use HTTPS** on. A
   request over plain HTTP then gets a redirect to HTTPS.

#### 3. Add the domains

Pages cannot redirect one domain to another. So a Bulk Redirect of the
Cloudflare account sends `www.firna.dev` to `https://firna.dev`. The
redirect steps follow Cloudflare's guide
[Redirecting www to domain apex](https://developers.cloudflare.com/pages/how-to/www-redirect/).

1. In the Pages project, open **Custom domains**, and select
   **Set up a domain**. Enter `firna.dev`, and select **Continue**.
   Cloudflare adds the DNS record. Wait until the domain is **Active**.
2. In the zone `firna.dev`, open **Rules** > **Settings**, and select the
   **Bulk Redirects** tab. Select **Create Bulk Redirect List**.
3. Give the list a name. Add one URL redirect manually:
   - Source URL: `www.firna.dev`
   - Target URL: `https://firna.dev`
   - Status: `301`
   - Under **Edit parameters**, select **Preserve query string** and
     **Subpath matching**. Keep **Preserve path suffix** selected.
4. Select **Next** until you see **Continue to Redirect Rules**, and
   select it. Create a Bulk Redirect Rule that uses the list, and select
   **Save and Deploy**.
5. In **DNS** > **Records** of the zone, give `www` this record: type `A`,
   IPv4 address `192.0.2.1`, and proxy status **Proxied**. If a `www`
   record exists, first check that no service still uses it. On
   2026-11-06, `www` pointed to `35.255.149.11`, an address that did not
   answer. Then change the record to these values. The address is a
   placeholder. Cloudflare answers each request for `www` with the
   redirect, so no request reaches the address.

#### 4. Protect `main` in GitHub

Do these steps after the workflow ran once, for example on a pull request.
GitHub knows the check `gate` only after that first run. GitHub's guide
[Creating rulesets for a repository](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository)
describes each setting.

1. In `Firna-AI/home`, open **Settings**. In the left sidebar, under
   **Code, planning, and automation**, select **Rulesets**, then
   **Rulesets** again. Select **New ruleset** > **New branch ruleset**.
2. Enter the name `Protect main`. Set **Enforcement status** to
   **Active**.
3. Under **Bypass list**, select **Add bypass**, and add the role
   **Repository admin**. Keep **Always allow**.
4. Under **Target branches**, select **Add target** >
   **Include by pattern**, and enter `main`.
5. Keep **Restrict deletions** and **Block force pushes**. GitHub selects
   them by default.
6. Select **Require a pull request before merging**. Keep
   **Required approvals** at 0, because GitHub does not let you approve
   your own pull request.
7. Select **Require status checks to pass**, then **Add checks**. Select
   only `gate`. GitHub lists it only after the workflow ran once. Set its
   source to **GitHub Actions**, so that only the workflow can pass it.
8. Leave the other settings as GitHub sets them. Select **Create**.

GitHub lets a role, a team, or an app bypass a ruleset, but not one
person. So each admin of the repository can bypass it. While you are the
only admin, only you can bypass it. A direct push through the bypass
skips the pull request and the check `gate`. Cloudflare then builds and
deploys that push. The workflow still runs on it, and it reports its
result on the commit. The bypass also lets you merge a pull request
before `gate` passed.

#### 5. Check the setup

1. In **Deployments** of the project, the first production build passed.
   Its log shows the Node version of `.nvmrc`.
2. `https://firna-home.pages.dev/` shows the page.
3. `curl -sI https://firna.dev/` shows status 200 and no `set-cookie`
   header.
4. `curl -sI https://www.firna.dev/` shows status 301 and a `location`
   header that points to `https://firna.dev`.
5. `curl -sI http://firna.dev/` shows a redirect to `https://firna.dev/`.
6. `curl -s https://firna.dev/ | grep -o '<script[^>]*>'` prints one
   line: the script of the grain field, under `/_astro/`.
7. `curl -s https://firna.dev/ | grep -o 'href="mailto:[^"]*"'` prints
   `href="mailto:hello@firna.ai"`.
8. The next pull request lists `gate` as a required check.

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
