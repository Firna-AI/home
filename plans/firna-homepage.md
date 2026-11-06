# Firna homepage

Status: Active. On branch `calummoore/firna-astro-website`, no pull request yet. The pull request that completes the work deletes this plan, as the `plans` skill says.

Firna Ltd needs a company homepage. The repository `Firna-AI/home` holds
only a README. The change builds a static Astro site with one page: the
Firna logo, the contact email, the list of Firna's projects, and the legal
footer that UK law requires. Every other address of the site shows a
"page not found" page with status 404. Cloudflare hosts the site at
`https://firna.dev`, and each push to `main` deploys it. GitHub runs the
complete gate on each pull request and each push to `main`, and a
required check keeps a failing change off `main`. A blog can come later. This change does not build the
blog, analytics, or a privacy page, because the site stores nothing on a
visitor's device.

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

- **The checks run in GitHub (2026-11-06).** The user chose option B of
  decision 16, in the words that the user saw: "GitHub runs the complete
  gate on each pull request and each push to `main`. You make it a
  required check and block direct pushes to `main`. You can let yourself
  bypass that block. Cloudflare only builds. A change that fails a check
  cannot reach `main`, so it cannot go live." So Cloudflare's build
  command is the build alone, with no checks. The plan's text of B had
  Cloudflare's build run the gate without the browser test. The user
  chose the version with no check in Cloudflare's build, after asking:
  "why do you want to run tests in the build process?" This changes how
  the decision "A failed check stops the deploy" works: a failed check
  still keeps a change from going live, but the required check on `main`
  does it now. The reason: Cloudflare's build image cannot start a
  browser, so it cannot run the browser test. The alternatives were A,
  the gate in Cloudflare's build as planned; C, an upload from GitHub
  with a Cloudflare token; D, a Chromium that carries its own libraries;
  E, the browser test in the local gate only; F, a deploy hook after the
  gate; G, a workflow that moves a production branch after the gate; H,
  a Cloudflare build that waits for the GitHub check; I, Chromium's
  libraries unpacked in Cloudflare's build; J, a hosted browser; and K,
  Cloudflare only builds, and a GitHub workflow reports the checks but
  blocks nothing. The recommendation was G, then B. Setting up the
  required check, the ruleset that blocks direct pushes to `main`, and
  the user's bypass are repository settings. An agent changes them only
  after the user confirms.
- **A page for other addresses (2026-11-06).** The user chose option C of
  decision 17: a "page not found" page with status 404, a short message,
  and a link to the homepage. It is a new screen, so it needs a mockup
  first. The alternatives were A, Cloudflare's default, which shows the
  homepage with status 200 at every address; B, the homepage with status
  404; and D, a redirect of each unknown address through a Pages
  Function.
- **What the site may store (2026-11-06).** The user chose option C of
  decision 18: no response of the site sets a cookie, and the page writes
  no other site data on the device, such as local storage, session
  storage, IndexedDB, or a service worker. The browser's cache of the
  site's own files stays allowed. The alternatives were A, nothing on
  the device, which also forbids the browser's cache; B, the rule on
  cookies alone; D, only storage that UK rules treat as strictly
  necessary; and E, C with a lint on the browser storage APIs.
- **The favicon where the theme cannot change it (2026-11-06).** The user
  chose option C of decision 19: a browser that cannot change a favicon
  with its theme shows the mark in ink. The user wrote only "C" on the
  fourth line of the answer, and it answers decision 19. The
  alternatives were A, no rule; B, the same rule for browsers without SVG
  favicons only; D, the fallback icon on a light tile; E, the mark on a
  light tile in every browser; and F, C with a general rule for every
  requirement that needs a browser feature.

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
  A 32 px ICO of the ink mark is the fallback for browsers that show no
  SVG favicon, such as Safari before 26. Chrome still takes the SVG. A
  light tile behind the mark stays out, because it changes the approved
  look.
- **The CSS browser target (2026-11-03).** The build writes CSS for
  Vite's default browsers: Chrome and Edge 111, Firefox 114, and Safari
  16.4. Without an explicit target, the CSS minifier dropped the
  `-webkit-backdrop-filter` that Safari 16.4 to 17 needs for the frost.
- **The field's budget.** The loop runs only while grains move. It stops
  when they rest, when the tab is hidden, and when the field is off
  screen. Script work stays near 2 ms per frame. The reference setup
  (2026-11-03) is the prototype's measurement: headless Chrome at
  1440 × 900 and a pixel ratio of 2, during a 3 s pointer sweep, with a
  mean of 2.25 ms.
- **The accessibility level (2026-11-03).** The page meets WCAG 2.2 at
  level AA. Milestone 2 asks the protocol doc for the level, and the
  design already keeps AA contrast over the grains. WCAG 2.2 is the
  current version.
- **The title and the description (2026-11-03).** The title is "Firna",
  as in the prototype. The description is "Firna's projects: Mokly,
  Bookfolio, Firna UI, Redloop, and Bowser.", built from the typed project
  list, so that a new project changes it. Neither says more about Firna,
  because the user asked that the page make no statement about Firna.
- **One typed project list** in a TypeScript module that the page and the
  mockup both import. A new project is one entry and one logo. Each entry
  carries its logo colour for the outline. Astro content collections stay
  for the future blog.
- **Logos as inline SVG components (2026-11-03).** Each logo is one TSX
  component in `src/logos/` that holds the logo's SVG markup, so that the
  Astro and the Mokly asset pipelines treat them the same way. A
  `README.md` beside them gives the source of each logo. The project marks
  are decorative, because each card names its project. On 2026-11-01 my
  call said SVG files, but Astro and Mokly would each need their own
  loader to inline a file.
- **The field reads the cards through a contract (2026-11-03).** The
  project list renders an id, and each card carries its logo colour as a
  CSS custom property. One small module without React holds both names,
  and the list and the field import it. The field finds no element by a
  class name of the components, as the `typescript` skill asks.
- **The mockup draws the field once (2026-11-03).** The Mokly catalogue
  runs no scripts in its preview frames. So the screen draws the field at
  rest from the field's own layout function, as a repeating SVG tile, and
  its notes say so. The site draws the field with its canvas, and shows
  plain white without JavaScript.
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
- **The not-found page (2026-11-06).** It is a sibling of the homepage:
  the same header, frosted panels, legal footer, and grain field. Its one
  `h1` is "Page not found", and on this page the logo links to the
  homepage. The line "Firna's projects are on the homepage." and the
  link "Go to the homepage" give the positive fact and one action, as the
  `product-ui` copy rules ask. It shows no project list. Its styles live
  in the site's one stylesheet, as the milestone 1 call says. So the
  homepage's stylesheet grows by about 90 compressed bytes, and the
  homepage renders the same.
- **The head of the not-found page (2026-11-06).** Its title names the
  page, as WCAG 2.2 AA asks of each page. It has no description and no
  canonical link, because the address has no page. It has the same
  favicon links, stylesheet, and script as the homepage.
- **Two protocol pages (2026-11-06).** The deploy rules move into their
  own protocol page, `docs/protocol/deploy.md`, because the homepage doc
  passed its length target of about 250 lines with the second page. The
  homepage doc states the not-found message as a rule. The mockup holds
  its words, because the user decided only "a short message, and a link
  to the homepage".

## Open decisions

The user answered every decision of the planning rounds on 2026-11-03,
and decisions 16 to 19 of the implementation on 2026-11-06. Decision 20
below is open.
The reports of the options checks of the planning rounds are in
`.context/firna-homepage/` of the round 1 workspace and in
`.context/firna-home-records/review-records/reports/` of the review
workspace. The reports of the options checks of decisions 16 to 19 are
in `.context/firna-homepage/m4/` of the build workspace. Commit `308d97b`
holds the full text of decisions 16 to 19.

### 20. No rule on out-of-date pull requests

- **Severity:** Medium. **Effort:** Small.
- **Source:** Implementation.
- **Category:** Process.
- **Location:** `README.md`, the one-time setup, step "Protect `main` in
  GitHub", and the deploy rules of the protocol doc.
- **Terms:**
  - **Up-to-date rule:** the ruleset setting "Require branches to be up to
    date before merging", under "Require status checks to pass".
- **Background:** Decision 16 makes the check `gate` required for `main`.
  GitHub runs the gate of a pull request on its code merged with the
  `main` of that moment. When `main` moves later, that result still
  counts. The up-to-date rule lets a pull request merge only when it holds
  the latest `main`. The README leaves the setting as the ruleset form
  sets it. The form most likely leaves the rule off.
- **Problem:** Without the rule, two pull requests can each pass, and
  their combined result on `main` can still fail a check. Cloudflare then
  deploys that `main`, unless the failure also breaks the build.
- **Impact if no action:** A rare pair of merges can put a broken page
  live, against the words of decision 16.
- **Root question:** Must the gate pass on the exact code that `main`
  gets?
- **Options:**
  - **A.** Keep the form's default in the README. It most likely acts as
    C, and the protocol doc must then say that a pair of pull requests
    can reach `main` untested. Effort: Small.
  - **B.** Tell the owner to turn the up-to-date rule on. When `main`
    moved, a pull request then needs **Update branch** and one more gate
    run. Effort: Small.
  - **C.** Tell the owner to turn the rule off. It saves runs, and a rare
    broken `main` stays possible. The protocol doc must say so. Effort:
    Small.
  - **D.** Turn on the repository setting **Always suggest updating pull
    request branches**, and tell the owner to update a branch that is
    behind and wait for `gate`. Nothing blocks a merge, so a merge in a
    hurry can still put an untested pair on `main`. Effort: Small.
  - **E.** Require a merge queue for `main`, and add the `merge_group`
    event to the workflow. GitHub then tests each pull request on the
    latest `main` before it merges. Each pull request runs the gate once
    more, the preview rule must leave out the queue branches, and the
    queue needs the repository to stay public on the Team plan. Effort:
    Medium.
- **Left out:**
  - A guard at the deploy, such as a production branch that moves after
    the gate: the user rejected it in decision 16.
  - An automatic revert of a failed `main` by the workflow: it needs a
    write token and a bypass for the workflow, and the broken page stays
    live until the revert deploys.
- **Wider fix:** B. It keeps every untested merge result off `main`. E
  does the same.
- **Previous examples:** The options check of decision 16, on 2026-11-03,
  noted that two passing pull requests can merge into a commit that
  nobody tested.
- **Recommendation:** B. For one owner who merges each pull request, it
  gives the same protection as E with one setting and no workflow change.
- **Action:** ask the user, because B adds a rejection of out-of-date pull
  requests, and the always-on rules keep each new rejection for the user.

## Milestone 1: Mockups

Tags: mockup

Depends on: none

Refine the chosen design with the user, set up the Mokly catalogue, and
build the homepage screen from shared components, at desktop and mobile
sizes.

- [x] Confirm the prototype with the user. The user chose it as it is, with
      frosted panels, on 2026-11-03.
- [x] Copy the approved prototype into the branch as the source for the
      screen. It is in `docs/prototype/`, with its notes and logos.
- [x] Add `package.json` with npm, `.nvmrc` with Node 24, and `.gitignore`
      entries for `node_modules/`, `dist/`, `.astro/`, `mokly-static/`, and
      `.mokly-export-reservations/`.
- [x] Add `@mokly/mokly`, React 19, and `mokly.config.json`. The catalogue
      reads `docs/mockups/`.
- [x] Add TypeScript with `strict: true` and the React types, so that the
      shared components typecheck from the start. TypeScript stays on 6.0,
      because `typescript-eslint` and the Astro check do not support
      TypeScript 7.
- [x] Add the shared components: the header with the Firna logo and the
      email, the project list and its cards, and the footer. Add the shared
      stylesheet, the typed project list of the five projects, and their
      logo files.
- [x] Add the grain field as one TypeScript module, ported from the
      prototype. Check whether the Mokly catalogue runs it. When it does
      not, the screen shows the field drawn once, and the screen notes say
      so.
- [x] Add the homepage screen to `docs/mockups/`. Mokly renders it at
      mobile and desktop sizes. It shows the Firna logo: the Close-off
      mark with the name in Lora.
- [x] Remove the prototype copy when the screen matches it.
- [x] Run the mockup check. Smoke-test the catalogue pages.
- [x] Update the design and the TODOs of this plan for each problem that
      the mockups show.

Evidence: `.context/firna-homepage/m1/` holds the screenshots, the script
check, and the field comparison with the prototype.

## Milestone 2: Documentation and protocol

Depends on: 1

- [x] Add `AGENTS.md` from the `agents-md` template, and `CLAUDE.md` as a
      symlink to it.
- [x] Add `docs/protocol/homepage.md`: the page content, the legal
      disclosure, the contact route, the accessibility level, the
      no-JavaScript and no-third-party rules, the reduced-motion rule for
      the grain field, and the deploy trigger.
- [x] Rewrite `README.md`: what the site is, the commands, how to add a
      project, and how a deploy works.
- [x] Add `src/README.md` with the rules for work on the code, and point
      the screen's related doc at the protocol doc, because the pull
      request deletes this plan.

## Milestone 3: Astro site

Tags: ui

Depends on: 2

- [x] Add Astro with `@astrojs/react`, static output, and TypeScript with
      `strict: true`.
- [x] Add ESLint with the `typescript-eslint` recommended configuration,
      and Prettier.
- [x] Render the homepage from the shared components. Load the grain field
      module as the page's only client script. Add the fonts, the page
      title, the description, and the canonical address
      `https://firna.dev/`.
- [x] Add a render test: each project appears with its link, and the footer
      holds the legal details, with the VAT number GB191373695. See each
      test fail once.
- [x] Add a browser test of the field: it stops when the grains rest, it
      draws once with reduced motion, and the page works without
      JavaScript. Run it 10 times, as the `testing` skill says.
- [x] Add the complete gate to `package.json` and `AGENTS.md`: typecheck,
      lint, format check, tests, build, and the mockup check.
- [x] Show the contact email `hello@firna.ai`.
- [ ] Send a test email to `hello@firna.ai` before the merge. Only the
      user can send it, after the user adds the address in Google
      Workspace.
- [x] Add the VAT number GB191373695 to the legal footer.
- [x] Add the Firna logo and the favicon: the Close-off mark with the
      name in Lora, and the mark with a light version for dark browser
      tabs.
- [x] Smoke-test the built site, and compare it with the mockup at 1440 px
      and 390 px wide.

Evidence: `.context/firna-homepage/m3/` holds the page's smoke test, the
comparison with the mockup, and the contrast measurement.
`.context/firna-homepage/m3/tests-gate/` holds the failure proofs of the
tests and the 10-run result of the browser test.

## Milestone 4: Deploy

Depends on: 3

- [x] Add a GitHub Actions workflow that runs the complete gate, the
      browser test included, on each pull request and each push to
      `main`. Cloudflare's build command is the build alone,
      `npm run build`, as decision 16 says. The workflow replaces the npm
      script that would have run the gate and then the build in
      Cloudflare's build.
- [x] Check that Cloudflare's build image runs the complete gate, the
      browser test included. When it cannot run the browser test, stop and
      report it with options, because the user's decision is that a failed
      check stops the deploy. It cannot: decision 16 holds the evidence
      and the options. Evidence:
      `.context/firna-homepage/m4/cloudflare-browser-evidence.md`.
- [x] Describe the one-time setup in the README: connect `Firna-AI/home`
      to a Cloudflare Pages project `firna-home`, with production branch
      `main`, the build command `npm run build`, the output folder `dist`,
      and Node 24. Then add `firna.dev` and `www.firna.dev`, with `www`
      redirected to the bare domain. Then check that Email Address
      Obfuscation is off for `firna.dev`, and that Cloudflare adds no
      script or cookie to the page, such as Web Analytics, Rocket Loader,
      or Bot Fight Mode. Each would break the no-JavaScript, one-script,
      no-third-party, or no-cookie rule of the protocol doc. Then describe
      the GitHub settings of decision 16: the gate as a required check for
      `main`, and a ruleset that blocks direct pushes to `main`, with the
      user's own bypass.
- [x] Update the deploy rules of `docs/protocol/homepage.md` for decision
      16: GitHub runs the complete gate, the required check keeps a
      failing change off `main`, and Cloudflare only builds.

The workflow runs for the first time on the pull request of this change.
Milestone 5 watches that run.

## Milestone 4a: Mockup of the not-found page

Tags: mockup

Depends on: 3

Decision 17 adds a second page. So the mockup milestone comes first among
the new milestones, as the `plans` skill says.

- [x] Add the not-found screen to `docs/mockups/`, built from the shared
      components, at mobile and desktop sizes: the header, a short
      message, a link to the homepage, and the legal footer.
- [x] Run the mockup check. Smoke-test the catalogue pages, and check
      that the homepage screen did not change.
- [x] Update the design and the TODOs of this plan for each problem that
      the mockup shows.

Evidence: `.context/firna-homepage/m4a/` holds the screenshots, the
comparison of the homepage with its baseline, and the contrast values.

## Milestone 4b: Documentation for decisions 17 to 19

Depends on: 4a

- [x] Update `docs/protocol/homepage.md`: the not-found page at every
      other address, with status 404, from decision 17; the storage rule
      of decision 18; and the favicon rule of decision 19.
- [x] Update `README.md`, `src/README.md`, and `AGENTS.md` for the second
      page. The mockup showed that they still describe one page and a logo
      that is always the main heading.
- [x] Move the deploy rules into their own protocol page,
      `docs/protocol/deploy.md`, because the homepage doc passed its
      length target.

## Milestone 4c: The not-found page

Tags: ui

Depends on: 4b

- [ ] Render the not-found page from the shared components as the site's
      `404.html`, as its mockup shows.
- [ ] Add a test: an unknown address answers with status 404 and the
      not-found page, with its link to the homepage. See it fail once.
- [ ] Add a test of decision 18: no response sets a cookie, and the page
      writes no other site data on the device. See it fail once.
- [ ] Smoke-test the built not-found page, and compare it with its mockup
      at 1440 px and 390 px wide.

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
- [ ] The user sets up the GitHub settings of decision 16, as the README
      says: the gate as a required check for `main`, and a ruleset that
      blocks direct pushes to `main`, with the user's own bypass. An agent
      may set them only after the user confirms.
- [ ] Check the first production deploy at its `pages.dev` address, then
      at `https://firna.dev`.
- [ ] The user adds the SPF and DMARC records of firna.ai, as the follow-up
      item `plans/follow-ups/firna-ai-mail-spoofing-records.md` says.
