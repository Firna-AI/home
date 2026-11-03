# Firna homepage

Status: Active. On branch `calummoore/firna-astro-website`, no pull request yet. The pull request that completes the work deletes this plan, as the `plans` skill says.

Firna Ltd needs a company homepage. The repository `Firna-AI/home` holds
only a README. The change builds a static Astro site with one page: the
Firna logo, the contact email, the list of Firna's projects, and the legal
footer that UK law requires. Cloudflare hosts the site at
`https://firna.dev`, and each push to `main` deploys it. A blog can come later. This change does not build the
blog, analytics, or a privacy page, because the page sets no cookies.

The page follows the "Cursor" design, option M of the third design round.
A field of fine grey grains, like firn, covers the white page. One canvas
behind the content draws it. The pointer pushes the grains aside like
wind, and they drift back. When the pointer or the keyboard focus rests on
a project, its nearest grains line up as a dotted outline in the colour of
its logo, and its card lifts. The projects sit on top as a row of
frosted cards: translucent white over a blur of the grains, so that the
grains show softly behind the text. The header shows the Firna logo: the Close-off mark and the name in Lora. Each
card shows the project's logo, name, kind, one line, and link, and the
whole card is the link. With reduced motion, the field is still. Without
JavaScript, the page shows the cards on white. The prototype is
`.context/firna-home/claude/cursor/` of the Conductor workspace "Firna
Homepage Design", on the `futex-ai/skills` repository.

## Decisions

- **Codex designs (2026-11-01).** Codex Astra could not run: the model
  proxy answered `model_not_found` for `gpt-6-astra`. The user chose to run
  the brief on Codex `gpt-6.1-sol` at max effort. The alternatives were to
  fix the proxy first, or to skip Codex. Later the proxy accepted Astra,
  and the user asked for an Astra run too. Both runs added directions. In
  the later rounds, Codex Astra designed beside Claude.
- **Design direction (2026-11-01).** The user chose "Firn, white" and
  asked for the projects only: no hero, and no "British company" line. The
  alternatives were four full Claude directions, three other white Claude
  directions, three Codex Sol directions, three Codex Astra directions, and
  a copy of instinct.com, which the user rejected.
- **Design direction, changed (2026-11-02).** The user restarted the design
  with a new brief: interesting and unique but simple, the projects front
  and center, and a logo for each project. Round 2 showed eight options.
  The user removed Wayfinding, its white-panel version, Gallery, and Big
  Type as "terrible". Round 3 added the user's own ideas: blocks with a fun
  hover, a game, and a cool pointer effect, each built by Claude and by
  Codex Astra. The user chose M, "Cursor" by Claude, the grain field. The
  other options were Glimpse, Stamps, Intervals, Branch, a mix, the round 1
  "Firn, projects" page, Blocks by Claude and by Astra, Game by Claude and
  by Astra, and Cursor by Astra.
- **What the page says about Firna (2026-11-01).** The page has no
  statement about Firna. It shows the logo and the projects. The user asked
  not to say "British company". The alternatives were a neutral sentence, a
  sentence that leads with AI, or the user's own sentence.
- **Projects at launch (2026-11-01).** The page lists Mokly
  (`https://mokly.ai`), Bookfolio (`https://bookfolio.net`), Redloop
  (`https://github.com/futex-ai/redloop`), and Bowser
  (`https://github.com/futex-ai/bowser`), in that order. Firna UI is not
  listed. The user gave this list.
- **Projects at launch, changed (2026-11-03).** The user chose option A of
  decision 10: five projects, with Firna UI
  (`https://github.com/futex-ai/ui`) as the third. The alternatives were
  the recorded four, another list, and adding the Firna product of
  firna.ai.
- **Common project logos (2026-11-02).** Every design uses one set of
  project logos. Mokly and Bookfolio keep their real logos. Firna UI is a
  white switch on blue, Redloop a loop around a job on brick red, and
  Bowser a command prompt on plum. They come from the Glimpse direction of
  round 2, which the user named. The alternative was a different logo set
  in each direction.
- **Refining the chosen design (2026-11-02).** The user asked to start
  refining option M. Three refinements each changed one part of it:
  Clearings, Drift, and Freeze.
- **No refinements (2026-11-03).** The user chose option D of decision 12,
  the chosen design as it is: "go with 9M remove the others". The
  alternatives were Clearings, which removes the card boxes, Drift, which
  adds a snowfall and drifts, Freeze, which turns the hover outline into a
  line of ice, any combination of them, and one more round of
  refinements.
- **Firna name in a modern serif (2026-11-02).** The user asked for the
  name mark "in a modern serif font". The alternative was the sans
  wordmark of the earlier rounds.
- **No hard white behind text (2026-11-02).** The user asked that the text
  "use opacity or blur background" in place of "a hard white background".
  Decision 13 held the choice, and the user chose on 2026-11-03.
- **The Firna logo (2026-11-03).** The user chose option W of decision 11,
  "Close-off" by Codex Astra, with the name in Lora: "11W. Close-off with
  Lora". The mark is a rounded form with one pocket of air, the air that
  firn keeps when it turns to ice. The alternatives were 23 other marks,
  from frost ferns to grain clusters, and seven other serif fonts for the
  name, including Instrument Serif, which the pages showed until then.
- **The site address (2026-11-03).** The user chose option B of decision
  15: the homepage lives at `https://firna.dev`. On 2026-11-03 firna.ai
  served the Firna product site, "Firna — AI Agents That Work in the
  Background", so the homepage must not replace it. firna.dev uses the same
  Cloudflare name servers as firna.ai. The alternatives were a subdomain of
  firna.ai, another domain, moving the product away from firna.ai, and a
  path on firna.ai.
- **The deploy (2026-11-03).** The user chose option B of decision 3:
  Cloudflare's own Git connection builds each push to `main`, and GitHub
  stores no Cloudflare token. The alternatives were a GitHub Actions upload
  with `wrangler-action`, Workers static assets, and the upload in a GitHub
  environment that only `main` can use.
- **A failed check stops the deploy (2026-11-03).** The user chose option B
  of decision 7: the deploy runs the complete gate first and stops on a
  failure. With the Git connection, the gate runs in Cloudflare's build
  command. The alternatives were the build and the upload only, and the
  gate on each pull request too.
- **The contact email (2026-11-03).** The user chose option A of decision
  6: `hello@firna.ai`. The user adds it as an alias or a group in Google
  Workspace if it does not exist. The alternative was another address.
- **The VAT number (2026-11-03).** The user chose option B of decision 8:
  Firna Ltd is VAT-registered, with VAT number GB191373695, and the footer
  shows it.
- **Frosted panels (2026-11-03).** The user chose option A of decision 13:
  frosted panels, translucent white over a browser backdrop blur. The
  alternatives were plain translucent panels, the frost drawn inside the
  canvas, and frost on pointer devices only.
- **Mail records for firna.ai (2026-11-03).** The user chose option A of
  the follow-up item `plans/follow-ups/firna-ai-mail-spoofing-records.md`:
  an SPF record and a report-only DMARC record. The user adds them in the
  Cloudflare DNS of firna.ai.
- **Models for the build (2026-11-03).** The user chose to follow the
  `models` skill: "we should follow the /model skill". The build uses the
  model of each action in its table, with no override. The alternatives
  were Codex Astra for the non-UI work and the first review pass, or for
  the first review pass only.
- **A separate Firna logo (2026-11-02).** The user asked for a Firna logo
  "like a firn or fern" that does not include the letter F. Every page
  shows one shared logo file, so that the choice changes one file.
  Decision 11 held the candidates, and the user chose on 2026-11-03.

## Design calls

These are my calls. The round 1 calls date from 2026-11-01, and the calls
for the grain field date from 2026-11-02.

- **One set of components for the mockup and the site.** React components
  make the page. Mokly renders them in the mockup catalogue, and Astro
  renders the same components to static HTML. So the mockup and the site
  cannot drift apart. The alternative was Astro components plus a second
  copy in the mockups.
- **The grain field is one client script.** A plain TypeScript module
  draws the field on one canvas and loads on the page after the content.
  It needs no framework runtime. The page works without it. The
  alternative was a React island, which ships a runtime for one canvas.
- **The field runs under the text, softened.** The cards and the plates
  behind the logo, the email, and the footer are translucent panels over
  the grains, frosted as the user chose. Every text keeps AA
  contrast, measured over the densest grains that can sit under it. With
  reduced transparency, the panels fall back to almost opaque white. This
  call replaces the opaque white panels of 2026-11-02, after the user's
  request.
- **The name drawn as paths (2026-11-03).** The logo sets "Firna" in Lora
  at weight 500, drawn as paths with the font's own kerning, so that the
  page loads no font for it. On 2026-11-02 my call was Instrument Serif,
  until the user chose Lora.
- **The favicon (2026-11-03).** The favicon is the Close-off mark in ink,
  with a light version when the browser uses a dark theme, in one SVG.
- **The field's budget.** The loop runs only while grains move. It stops
  when they rest, when the tab is hidden, and when the field is off
  screen. Script work stays near 2 ms per frame.
- **One typed project list** in a TypeScript module that the page and the
  mockup both import. A new project is one entry and one logo. Each entry
  carries its logo colour for the outline. Astro content collections stay
  for the future blog.
- **Logos as SVG files in one shared set,** rendered as inline SVG
  components, so that the Astro and the Mokly asset pipelines treat them
  the same way.
- **Self-hosted fonts** from Fontsource: Instrument Sans and Geist Mono,
  the fonts of the chosen design. The page makes no third-party requests.
- **Tooling** follows the `typescript` skill: `strict: true`, ESLint with
  the `typescript-eslint` recommended configuration, and Prettier.
- **Names.** The Cloudflare project name is `firna-home`.
  `www.firna.dev` redirects to `https://firna.dev`. The site address is the
  user's decision of 2026-11-03.
- **Branch previews (2026-11-03).** Cloudflare builds a preview of each
  branch, at a `pages.dev` address. They stay on, because they help to
  review a pull request, and the page holds no secrets.
- **The review aid `?bg=opacity`** of the prototype does not go into the
  site, because the user chose the frosted panels.
- **Copy.** Each project's kind and line come from the project's own site
  or README.

## Open decisions

None. The user answered every open decision on 2026-11-03. The reports of
the options checks are in `.context/firna-homepage/` of the round 1
workspace and in `.context/firna-home-records/review-records/reports/` of
the review workspace.

## Milestone 1: Mockups

Tags: mockup

Depends on: none

Refine the chosen design with the user, set up the Mokly catalogue, and
build the homepage screen from shared components, at desktop and mobile
sizes.

- [x] Confirm the prototype with the user. The user chose it as it is, with
      frosted panels, on 2026-11-03.
- [ ] Copy the approved prototype into the branch as the source for the
      screen.
- [ ] Add `package.json` with npm, `.nvmrc` with Node 24, and `.gitignore`
      entries for `node_modules/`, `dist/`, `.astro/`, `mokly-static/`, and
      `.mokly-export-reservations/`.
- [ ] Add `@mokly/mokly`, React 19, and `mokly.config.json`. The catalogue
      reads `docs/mockups/`.
- [ ] Add the shared components: the header with the Firna logo and the
      email, the project list and its cards, and the footer. Add the shared
      stylesheet, the typed project list of the five projects, and their
      logo files.
- [ ] Add the grain field as one TypeScript module, ported from the
      prototype. Check whether the Mokly catalogue runs it. When it does
      not, the screen shows the field drawn once, and the screen notes say
      so.
- [ ] Add the homepage screen to `docs/mockups/`. Mokly renders it at
      mobile and desktop sizes. It shows the Firna logo: the Close-off
      mark with the name in Lora.
- [ ] Remove the prototype copy when the screen matches it.
- [ ] Run the mockup check. Smoke-test the catalogue pages.
- [ ] Update the design and the TODOs of this plan for each problem that
      the mockups show.

## Milestone 2: Documentation and protocol

Depends on: 1

- [ ] Add `AGENTS.md` from the `agents-md` template, and `CLAUDE.md` as a
      symlink to it.
- [ ] Add `docs/protocol/homepage.md`: the page content, the legal
      disclosure, the contact route, the accessibility level, the
      no-JavaScript and no-third-party rules, the reduced-motion rule for
      the grain field, and the deploy trigger.
- [ ] Rewrite `README.md`: what the site is, the commands, how to add a
      project, and how a deploy works.

## Milestone 3: Astro site

Tags: ui

Depends on: 2

- [ ] Add Astro with `@astrojs/react`, static output, and TypeScript with
      `strict: true`.
- [ ] Add ESLint with the `typescript-eslint` recommended configuration,
      and Prettier.
- [ ] Render the homepage from the shared components. Load the grain field
      module as the page's only client script. Add the fonts, the page
      title, the description, and the canonical address
      `https://firna.dev/`.
- [ ] Add a render test: each project appears with its link, and the footer
      holds the legal details, with the VAT number GB191373695. See each
      test fail once.
- [ ] Add a browser test of the field: it stops when the grains rest, it
      draws once with reduced motion, and the page works without
      JavaScript. Run it 10 times, as the `testing` skill says.
- [ ] Add the complete gate to `package.json` and `AGENTS.md`: typecheck,
      lint, format check, tests, build, and the mockup check.
- [ ] Show the contact email `hello@firna.ai`. Send a test email to it
      before the merge.
- [ ] Add the VAT number GB191373695 to the legal footer.
- [ ] Add the Firna logo and the favicon: the Close-off mark with the
      name in Lora, and the mark with a light version for dark browser
      tabs.
- [ ] Smoke-test the built site, and compare it with the mockup at 1440 px
      and 390 px wide.

## Milestone 4: Deploy

Depends on: 3

- [ ] Add one npm script that runs the complete gate and then the build. It
      is the build command of the Cloudflare Git connection, so a failed
      check stops the deploy.
- [ ] Check that Cloudflare's build image runs the complete gate, the
      browser test included. When it cannot run the browser test, stop and
      report it with options, because the user's decision is that a failed
      check stops the deploy.
- [ ] Describe the one-time setup in the README: connect `Firna-AI/home`
      to a Cloudflare Pages project `firna-home`, with production branch
      `main`, the build command, the output folder `dist`, and Node 24.
      Then add `firna.dev` and `www.firna.dev`, with `www` redirected to the
      bare domain.

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

- [ ] The user connects `Firna-AI/home` to Cloudflare Pages, as the README
      says, and adds the domains `firna.dev` and `www.firna.dev`.
- [ ] Check the first production deploy at its `pages.dev` address, then
      at `https://firna.dev`.
- [ ] The user adds the SPF and DMARC records of firna.ai, as the follow-up
      item `plans/follow-ups/firna-ai-mail-spoofing-records.md` says.
