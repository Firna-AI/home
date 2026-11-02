# Firna homepage

Status: Active. On branch `calummoore/firna-astro-website`, no pull request yet. The pull request that completes the work deletes this plan, as the `plans` skill says.

Firna Ltd needs a company homepage. The repository `Firna-AI/home` holds
only a README. The change builds a static Astro site with one page: the
Firna logo, the contact email, the list of Firna's projects, and the legal
footer that UK law requires. Cloudflare hosts the site, and each push to
`main` deploys it. A blog can come later. This change does not build the
blog, analytics, or a privacy page, because the page sets no cookies.

The page follows the "Firn, projects" design: white, Schibsted Grotesk and
IBM Plex Mono, ink with one grey and one orange accent. The projects are
layers: an orange cap on the top rule, hairlines between the rows, and an
ink "bedrock" rule under the last row. Each row shows the project's logo,
name, kind, one line, and link, and the whole row is the link. The design
exploration is in `.context/design-options/` on the workspace machine. Its
final page is `claude/firn-projects/`, with screenshots in its `shots/`.

## Decisions

- **Codex designs (2026-11-01).** Codex Astra could not run: the model
  proxy answered `model_not_found` for `gpt-6-astra`. The user chose to run
  the brief on Codex `gpt-6.1-sol` at max effort. The alternatives were to
  fix the proxy first, or to skip Codex. Later the proxy accepted Astra,
  and the user asked for an Astra run too. Both runs added directions.
- **Design direction (2026-11-01).** The user chose "Firn, white" and
  asked for the projects only: no hero, and no "British company" line. The
  alternatives were four full Claude directions, three other white Claude
  directions, three Codex Sol directions, three Codex Astra directions, and
  a copy of instinct.com, which the user rejected.
- **What the page says about Firna (2026-11-01).** The page has no
  statement about Firna. It shows the logo and the projects. The user asked
  not to say "British company". The alternatives were a neutral sentence, a
  sentence that leads with AI, or the user's own sentence.
- **Projects at launch (2026-11-01).** The page lists Mokly
  (`https://mokly.ai`), Bookfolio (`https://bookfolio.net`), Redloop
  (`https://github.com/futex-ai/redloop`), and Bowser
  (`https://github.com/futex-ai/bowser`), in that order. Firna UI is not
  listed. The user gave this list. Mokly and Bookfolio keep their real
  logos. Redloop and Bowser get new logos, as the user asked.

## Design calls

These are my calls, made on 2026-11-01.

- **One set of components for the mockup and the site.** React components
  make the page. Mokly renders them in the mockup catalogue, and Astro
  renders the same components to static HTML with no client JavaScript.
  So the mockup and the site cannot drift apart. The alternative was Astro
  components plus a second copy in the mockups.
- **One typed project list** in a TypeScript module that the page and the
  mockup both import. A new project is one entry and one logo component.
  Astro content collections stay for the future blog.
- **Logos as inline SVG components,** so that the Astro and the Mokly asset
  pipelines treat them the same way.
- **Self-hosted fonts** from Fontsource, so that the page makes no
  third-party requests.
- **Tooling** follows the `typescript` skill: `strict: true`, ESLint with
  the `typescript-eslint` recommended configuration, and Prettier.
- **Names.** The site address is `https://firna.ai`, because the domain is
  on Cloudflare DNS and its mail is on Google Workspace. The Cloudflare
  project name is `firna-home`.
- **Copy.** Each project's kind and line come from the project's own site
  or README. The contact email stays `hello@firna.ai` until decision 6 has
  an answer.

## Open decisions

The options check of 2026-11-02 changed decisions 3 and 6 and found
decisions 7 and 8. Its report is in `.context/firna-homepage/`.

### 3. How the site goes live on Cloudflare

- **Severity:** High. **Effort:** Small.
- **Source:** Design. The options check added options C and D.
- **Category:** Process.
- **Location:** None. The work is in the settings of `Firna-AI/home` and in the Cloudflare dashboard.
- **Terms:**
  - **Pages project:** the Cloudflare object that hosts the built files and gives the site its web addresses.
  - **GitHub environment:** a named set of secrets in the repository settings that only the branches that it allows can use.
  - **wrangler-action:** Cloudflare's GitHub Action. It uploads a build with the Wrangler command-line tool.
- **Background:** The user asked for Cloudflare Pages, with a deploy from CI on each push to `main`. `firna.ai` uses Cloudflare DNS. Today `firna.ai` and `www.firna.ai` have proxied records that answer error 522. Those records must go before a custom domain can attach. Cloudflare's Pages docs now say "Start new projects with Workers".
- **Problem:** A deploy needs Cloudflare credentials and a one-time setup. Only the user can do these.
- **Impact if no action:** The site builds, but it never goes live.
- **Root question:** How does each push to `main` go live at `https://firna.ai`?
- **Options:**
  - **A.** A GitHub Actions workflow builds the site and uploads it with `wrangler-action`. The user adds two repository secrets: `CLOUDFLARE_API_TOKEN` with "Cloudflare Pages: Edit", and `CLOUDFLARE_ACCOUNT_ID`. The token can change every Pages project in the account, which may include mokly.ai and bookfolio.net. Effort: Small.
  - **B.** Cloudflare's own Git connection. The user connects the repository in the dashboard, and Cloudflare builds each push to `main`. GitHub stores no token. The build runs outside GitHub CI, and Cloudflare builds a public preview of each branch until the user turns previews off. Effort: Small.
  - **C.** Workers static assets in place of Pages. The workflow runs `wrangler deploy`. The user first creates the Worker and its domains, so that the token can reach only this Worker. It changes "Pages" in the request. Effort: Small.
  - **D.** Option A, but the secrets live in a GitHub environment that only `main` can use. A separate upload job gets the built files and installs no project packages, so no other branch and no package script can read the token. The user sets up one more settings page. Effort: Small.
- **Left out:**
  - Cloudflare's `pages-action`. Cloudflare deprecated it, and `wrangler-action` is better on every point.
  - An upload from a laptop. It fails the goal of a deploy on each push.
  - A workflow that calls a deploy hook. It needs B's Git connection and a secret URL, so B alone is better on every point.
- **Wider fix:** None. This is a one-time setup choice.
- **Previous examples:** None found.
- **Related:** Decision 7: a gate before the deploy changes the workflow of A, C, and D, and the build command of B.
- **Recommendation:** D. It keeps the build in GitHub, and only the upload job on `main` can read the token. The first recommendation was A. B protects the account best, because GitHub stores no Cloudflare token.
- **Action:** Ask the user, because every option needs the user's Cloudflare account.

### 6. Which contact email to show

- **Severity:** Medium. **Effort:** Small.
- **Source:** Design. The options check changed the root question.
- **Category:** UX wording.
- **Location:** None. The email is in the page header.
- **Background:** The page shows `hello@firna.ai` as a placeholder. Mail for `firna.ai` runs on Google Workspace.
- **Problem:** Nobody has confirmed that this mailbox exists.
- **Impact if no action:** Emails from visitors can bounce.
- **Root question:** Which address should the page show, so that a visitor's email reaches Firna from the first deploy?
- **Options:**
  - **A.** `hello@firna.ai`. If it does not exist, the user adds it as an alias or a group in Google Workspace. Effort: Small.
  - **B.** Another address that the user gives. Effort: Small.
- **Left out:**
  - No email. UK e-commerce rules require an online service to give an email address.
  - A contact form. In place of the email it breaks the same rule, and it adds a server, spam control, and a privacy notice.
  - Cloudflare Email Routing. It needs Cloudflare mail records, which would move all `firna.ai` mail away from Google Workspace.
- **Wider fix:** None.
- **Previous examples:** None found.
- **Recommendation:** A. It is short, it is not tied to one person, and it can forward to any inbox.
- **Action:** Ask the user, because only the user knows which mailboxes exist.

### 7. Whether a failed check stops a deploy

- **Severity:** Medium. **Effort:** Small.
- **Source:** Design. The options check found it.
- **Category:** Process.
- **Location:** None. It is the deploy that milestone 4 adds.
- **Terms:**
  - **Complete gate:** the command that runs every check: typecheck, lint, format check, tests, build, and the mockup check.
- **Background:** The plan runs the complete gate on a developer's machine. The deploy runs only the build. The user's rules say that only the user adds a new gate.
- **Problem:** A push that fails a check, such as the legal footer test, still goes live.
- **Impact if no action:** A broken page, or a page without the legal details, can go live until the next push.
- **Root question:** Should a push to `main` go live when a check fails?
- **Options:**
  - **A.** Yes. The deploy runs only the build and the upload. Effort: Small.
  - **B.** No. The deploy runs the complete gate first and stops on a failure. Effort: Small.
  - **C.** As B, and the same checks also run on each pull request. Effort: Small.
- **Left out:** None.
- **Wider fix:** None.
- **Previous examples:** None found.
- **Related:** Decision 3: the gate runs in the build job of A, C, and D, and in the build command of B.
- **Recommendation:** B. The gate takes about a minute, and it keeps a page without its legal details off the site.
- **Action:** Ask the user, because the user's rules reserve each new gate for the user.

### 8. Whether the footer needs a VAT number

- **Severity:** Medium. **Effort:** Small.
- **Source:** Design. The options check found it.
- **Category:** Docs or spec.
- **Location:** None. It is the legal footer.
- **Background:** The footer gives the company name, number, place of registration, and registered office, as UK company law requires. Regulation 6 of the Electronic Commerce (EC Directive) Regulations 2002 also requires the VAT number of a VAT-registered business.
- **Problem:** The plan does not record whether Firna Ltd is VAT-registered.
- **Impact if no action:** If Firna Ltd is VAT-registered, the site misses a required detail.
- **Root question:** Does the footer need a VAT number?
- **Options:**
  - **A.** Firna Ltd is not VAT-registered. The footer stays as it is. Effort: Small.
  - **B.** Firna Ltd is VAT-registered. The footer adds its VAT number. Effort: Small.
- **Left out:** Fewer than three approaches, because the answer is a fact about the company.
- **Wider fix:** None.
- **Previous examples:** None found.
- **Recommendation:** A, unless Firna Ltd is VAT-registered. Then B.
- **Action:** Ask the user, because only the user knows the VAT status.

## Milestone 1: Mockups

Tags: mockup

Depends on: none

Set up the Mokly catalogue, and build the homepage screen from shared
components, at desktop and mobile sizes.

- [ ] Add `package.json` with npm, `.nvmrc` with Node 24, and `.gitignore`
      entries for `node_modules/`, `dist/`, `.astro/`, `mokly-static/`, and
      `.mokly-export-reservations/`.
- [ ] Add `@mokly/mokly`, React 19, and `mokly.config.json`. The catalogue
      reads `docs/mockups/`.
- [ ] Add the shared components: the header with the Firna logo and the
      email, the project list and its rows, the four project logos, and
      the footer. Add the shared stylesheet and the typed project list.
- [ ] Add the homepage screen to `docs/mockups/`. Mokly renders it at
      mobile and desktop sizes.
- [ ] Run the mockup check. Smoke-test the catalogue pages.
- [ ] Update the design and the TODOs of this plan for each problem that
      the mockups show.

## Milestone 2: Documentation and protocol

Depends on: 1

- [ ] Add `AGENTS.md` from the `agents-md` template, and `CLAUDE.md` as a
      symlink to it.
- [ ] Add `docs/protocol/homepage.md`: the page content, the legal
      disclosure, the contact route, the accessibility level, the
      no-JavaScript and no-third-party rules, and the deploy trigger.
- [ ] Rewrite `README.md`: what the site is, the commands, how to add a
      project, and how a deploy works.

## Milestone 3: Astro site

Tags: ui

Depends on: 2

- [ ] Add Astro with `@astrojs/react`, static output, and TypeScript with
      `strict: true`.
- [ ] Add ESLint with the `typescript-eslint` recommended configuration,
      and Prettier.
- [ ] Render the homepage from the shared components, with no client
      JavaScript. Add the fonts, the favicon, the page title, the
      description, and the canonical address.
- [ ] Add a render test: each project appears with its link, and the footer
      holds the legal details. See each test fail once.
- [ ] Add the complete gate to `package.json` and `AGENTS.md`: typecheck,
      lint, format check, tests, build, and the mockup check.
- [ ] Set the contact email from the answer to decision 6. Send a test
      email to it before the merge.
- [ ] Add the VAT number to the footer when the answer to decision 8 is B.
- [ ] Smoke-test the built site, and compare it with the mockup at 1440 px
      and 390 px wide.

## Milestone 4: Deploy

Depends on: 3, and the answers to decisions 3 and 7

- [ ] Add the deploy that the answer to decision 3 chooses, with the gate
      that the answer to decision 7 chooses. A workflow creates the Pages
      project `firna-home` with `--production-branch=main` when it is
      missing. When an AI agent runs Wrangler 4.108 or later to create the
      project, pass `--force`, or Wrangler makes a Worker.
- [ ] Describe the deploy and its one-time setup in the README.

## Milestone 5: Verification, commit, review, and pull request

Depends on: every other milestone

- [ ] Run the targeted tests and the complete gate named in `AGENTS.md`.
- [ ] Commit with Conventional Commits and push the branch.
- [ ] Review the complete local diff against `origin/main` with the
      `implementation-review` skill after the push. Report the findings,
      then apply the fix rule: fix the `fix now` findings, record
      follow-up items under `plans/follow-ups/` for the rest, re-review
      once, and report.
- [ ] Delete this plan when the `plans` skill says, under "Deleting the
      plan".
- [ ] Open the pull request. Its description gives the decisions and the
      design calls of this plan with their dates, a permalink to this plan,
      and the follow-up items that the change adds.

## Post-merge follow-up (non-blocking)

- [ ] Check the first production deploy at its `pages.dev` address.
- [ ] Remove the proxied records of `firna.ai` and `www.firna.ai` that
      answer error 522. Then add both names to the Cloudflare project, and
      redirect `www` to the bare domain.
