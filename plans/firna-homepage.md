# Firna homepage

Status: Active. On branch `calummoore/firna-astro-website`, no pull request yet. The pull request that completes the work deletes this plan, as the `plans` skill says.

Firna Ltd needs a company homepage. The repository `Firna-AI/home` holds
only a README. The change builds a static Astro site with one page: the
Firna logo, the contact email, the list of Firna's projects, and the legal
footer that UK law requires. Cloudflare hosts the site, and each push to
`main` deploys it. A blog can come later. This change does not build the
blog, analytics, or a privacy page, because the page sets no cookies.

The page follows the "Cursor" design, option M of the third design round.
A field of fine grey grains, like firn, covers the white page. One canvas
behind the content draws it. The pointer pushes the grains aside like
wind, and they drift back. When the pointer or the keyboard focus rests on
a project, its nearest grains line up as a dotted outline in the colour of
its logo, and its card lifts. The projects sit on top as a row of
translucent cards, so that the grains show softly behind the text.
Decision 13 chooses between a frosted and a plain translucent style. The
header shows the Firna logo: the Close-off mark and the name in Lora. Each
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
  listed. The user gave this list. Open decision 10 asks whether Firna UI
  joins it, because the user's message of 2026-11-02 names Firna UI.
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
  Open decision 13 holds the choice between the two.
- **The Firna logo (2026-11-03).** The user chose option W of decision 11,
  "Close-off" by Codex Astra, with the name in Lora: "11W. Close-off with
  Lora". The mark is a rounded form with one pocket of air, the air that
  firn keeps when it turns to ice. The alternatives were 23 other marks,
  from frost ferns to grain clusters, and seven other serif fonts for the
  name, including Instrument Serif, which the pages showed until then.
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
  the grains, in the style that decision 13 chooses. Every text keeps AA
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
- **Names.** The site address is `https://firna.ai`, because the domain is
  on Cloudflare DNS and its mail is on Google Workspace. The Cloudflare
  project name is `firna-home`.
- **Copy.** Each project's kind and line come from the project's own site
  or README. The contact email stays `hello@firna.ai` until decision 6 has
  an answer.

## Open decisions

The options check of 2026-11-02 changed decisions 3 and 6 and found
decisions 7 and 8. Its report is in `.context/firna-homepage/`.
Decisions 10 and 13 came from the design rounds of 2026-11-02. An options
check of 2026-11-02 changed both. Decisions 11 and 12 are closed: the user
chose the Firna logo and the design as it is on 2026-11-03. The reports
of the options checks are in
`.context/firna-home-records/review-records/reports/` of the review
workspace.

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

### 10. Whether Firna UI is on the page

- **Severity:** Medium. **Effort:** Small.
- **Source:** Design. The options check changed the recommendation.
- **Category:** Docs or spec.
- **Location:** None. It is the project list of the page.
- **Terms:**
  - **Firna UI:** the npm package `@firna/ui`, under the MIT license. It is the shared React and React Native component library of Firna's apps.
- **Background:** On 2026-11-01 the user gave the launch list: Mokly, Bookfolio, Redloop, and Bowser. The user gave it after round 1 had recommended "Mokly and Firna UI only". The user's message of 2026-11-02 says that Firna owns "mokly, firna ui, etc". Those words repeat the first message of 2026-11-01. Every design of rounds 2 and 3 shows Firna UI as the third project, so that the layout is tested with it.
- **Problem:** The recorded list and the later message disagree.
- **Impact if no action:** The page can show a project that the user wants to keep off it, or leave out one that the user wants on it.
- **Root question:** Which projects does the homepage show at launch?
- **Options:**
  - **A.** Five projects: Mokly, Bookfolio, Firna UI, Redloop, and Bowser. Firna UI links to `https://github.com/futex-ai/ui`. Effort: Small.
  - **B.** The recorded four, without Firna UI. The card grid then needs `auto-fit` or a centred row, so that four cards fill the width. Effort: Small.
  - **C.** Another list or order that the user gives. Effort: Small.
- **Left out:**
  - A smaller place for Firna UI, such as a line under the cards. It breaks the chosen design, which gives each project one equal card.
  - A hidden entry for Firna UI. B is better on every point, because adding it later is one entry and one existing logo file.
  - A list built from GitHub or npm. It fails the goal, because someone must still choose the projects.
- **Wider fix:** None. The list is one data file.
- **Previous examples:** The decision "Projects at launch" of 2026-11-01 above.
- **Recommendation:** B. The user gave the recorded list after round 1 recommended Firna UI, and the words of 2026-11-02 only repeat the first message. The first recommendation was A.
- **Action:** ask the user, because only the user knows whether the words of 2026-11-02 reopen the list.

### 13. Frosted or plain text backgrounds

- **Severity:** Medium. **Effort:** Medium.
- **Source:** Design. The options check added option D and changed the recommendation.
- **Category:** Mockup.
- **Location:** None. It is the background behind every text on the page.
- **Terms:**
  - **Panel:** the translucent background behind text: each card, and the plates behind the Firna name, the email, and the footer.
  - **Frosted:** a translucent white over a backdrop blur of the grains.
- **Background:** On 2026-11-02 the user asked for "opacity or blur background" in place of hard white behind the text. Every page now shows frosted panels by default and plain translucent panels with `?bg=opacity`. Both keep AA contrast over the densest grains. The four pages use different levels: 30 to 55 % white for frosted, and 74 to 88 % for plain. In headless Chrome without a GPU, the blur raises the time between frames while grains move, from about 19 to 21 ms to about 28 to 37 ms. At rest it costs nothing, because the animation loop stops. No page measured the blur at phone size. The round 2 brief excluded glass effects, and the user's request overrides it.
- **Problem:** The page needs one panel style.
- **Impact if no action:** The frosted default stays, and its cost on real laptops and phones is unknown.
- **Root question:** Which background behind the text shows the grains best and keeps the page smooth?
- **Options:**
  - **A.** Frosted, the current default. The grains show as a soft mottle. It costs compositor time while grains move. Effort: Small.
  - **B.** Plain translucent. The grains show as faint, sharp dots. It costs nothing measurable. Effort: Small.
  - **C.** Frost drawn inside the canvas: the field itself blurs and fades the grains behind each panel. It looks like A without the compositor cost on any device, but the field script grows. Effort: Medium.
  - **D.** Frosted with a mouse or a trackpad, and plain on touch screens, with one media query. The style then differs by device, and a slow laptop still pays for the blur. Effort: Small.
- **Left out:**
  - Solid white, because the user asked to drop the hard white background.
  - A stronger blur, because it hides the grains that the user wants to see under the text.
  - A halo around each letter, or darker text on the bare field, because both fail the request for an opacity or blur background.
  - Frost only at rest, because the panels would flicker at each pointer move.
  - A fixed frost texture, because the panel would no longer show the field behind it.
- **Wider fix:** C. When every effect draws through one painter, one contrast limit holds for all effects, in place of a guard and a measurement for each new effect.
- **Previous examples:** None found.
- **Recommendation:** C. It keeps the frosted look, which the user can judge on the pages now, with no compositor cost on any device. B stays the choice if the user prefers the plain look. The first recommendation was A.
- **Action:** ask the user, because the panel look is a choice of taste, and the user named both looks.

## Milestone 1: Mockups

Tags: mockup

Depends on: none

Refine the chosen design with the user, set up the Mokly catalogue, and
build the homepage screen from shared components, at desktop and mobile
sizes.

- [ ] Set the panel style of the prototype from the answer to decision 13.
      Then confirm the prototype with the user.
- [ ] Copy the approved prototype into the branch as the source for the
      screen.
- [ ] Add `package.json` with npm, `.nvmrc` with Node 24, and `.gitignore`
      entries for `node_modules/`, `dist/`, `.astro/`, `mokly-static/`, and
      `.mokly-export-reservations/`.
- [ ] Add `@mokly/mokly`, React 19, and `mokly.config.json`. The catalogue
      reads `docs/mockups/`.
- [ ] Add the shared components: the header with the Firna logo and the
      email, the project list and its cards, and the footer. Add the shared
      stylesheet, the typed project list, and the logo files of the listed
      projects.
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
      title, the description, and the canonical address.
- [ ] Add a render test: each project appears with its link, and the footer
      holds the legal details. See each test fail once.
- [ ] Add a browser test of the field: it stops when the grains rest, it
      draws once with reduced motion, and the page works without
      JavaScript. Run it 10 times, as the `testing` skill says.
- [ ] Add the complete gate to `package.json` and `AGENTS.md`: typecheck,
      lint, format check, tests, build, and the mockup check.
- [ ] Set the contact email from the answer to decision 6. Send a test
      email to it before the merge.
- [ ] Add the VAT number to the footer when the answer to decision 8 is B.
- [ ] Add the Firna logo and the favicon: the Close-off mark with the
      name in Lora, and the mark with a light version for dark browser
      tabs.
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
