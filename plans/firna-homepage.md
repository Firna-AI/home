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

## Open decisions

The user answered every decision of the planning rounds on 2026-11-03.
The reports of their options checks are in `.context/firna-homepage/` of
the round 1 workspace and in
`.context/firna-home-records/review-records/reports/` of the review
workspace.

The decisions below came up during the implementation, on 2026-11-03.
They continue the numbers of the earlier decisions. The reports of their
options checks are in `.context/firna-homepage/m4/` of the build
workspace.

### 16. The browser test cannot run in Cloudflare's build

- **Severity:** High. **Effort:** Medium.
- **Source:** Implementation.
- **Category:** Process.
- **Location:** `package.json` (the Cloudflare build command), `README.md`
  (the one-time setup), and `docs/protocol/homepage.md` (the deploy
  rules).
- **Terms:**
  - **Complete gate:** the npm script `gate`: the typecheck, the lint, the
    format check, the tests, the build, and the mockup check.
  - **Browser test:** the Playwright test that loads the built page in
    headless Chromium and checks the grain field and the page without
    JavaScript.
  - **Build image:** the container in which Cloudflare Pages runs the build
    command of a Git connection.
  - **Required check:** a GitHub ruleset setting that lets a pull request
    merge into `main` only when a named check passed.
- **Background:** On 2026-11-03 the user chose that Cloudflare's Git
  connection builds each push to `main`, so that GitHub stores no
  Cloudflare token. The user also chose that the deploy runs the complete
  gate first and stops on a failure, inside Cloudflare's build command.
  The complete gate holds a browser test. Chromium needs system
  libraries, such as `libatk-1.0.so.0` and `libnss3.so`.
- **Problem:** Cloudflare's build image cannot install system libraries.
  The build user is not root, and `sudo` is blocked. A Cloudflare Pages
  build log from 2026-11-01 shows that Chromium could not start, because
  `libatk-1.0.so.0` was missing. Playwright's headless shell needs that
  same library. So the browser test is expected to fail in Cloudflare's
  build, and then every deploy stops.
- **Impact if no action:** The first Cloudflare build fails at the browser
  test, and the site does not go live until a further change.
- **Root question:** How does a failed browser check keep a broken page
  from going live, when Cloudflare's build cannot start a browser?
- **Options:**
  - **A.** Keep the plan. The Cloudflare build command runs the complete
    gate. The user connects Cloudflare Pages before the merge, and the
    preview build of this branch shows whether Chromium starts. If it does
    not, this decision comes back. Effort: Small, but the evidence says
    that it will fail.
  - **B.** Run the complete gate in GitHub Actions on each pull request
    and each push to `main`, on a runner where Playwright installs
    Chromium with its libraries. The user makes that check a required
    check for `main`, and blocks direct pushes to `main`. Cloudflare's
    build command runs the gate without the browser test, then the build.
    GitHub still stores no Cloudflare token. A change that fails the
    browser test cannot reach `main`, so it cannot deploy. Effort: Small.
  - **C.** Move the upload to GitHub Actions: the workflow runs the
    complete gate, then uploads `dist/` with `wrangler pages deploy`. A
    failed check stops the upload itself. This needs a Cloudflare token
    in GitHub, which reverses the deploy decision of 2026-11-03. Effort:
    Medium.
  - **D.** Give the Cloudflare build a Chromium that carries its own
    libraries, such as `@sparticuz/chromium`, started through
    `playwright-core`. It adds a dependency, and the test then runs on a
    different Chromium in Cloudflare than on a laptop. Nobody has shown it
    to work in Cloudflare's gVisor container. Effort: Medium.
  - **E.** Leave the browser test out of the Cloudflare build. The build
    runs the rest of the gate. The browser test runs only in the local
    complete gate before a merge. A failed browser check then stops a
    deploy only when someone runs the gate. Effort: Small.
  - **F.** Turn off Cloudflare's automatic production deploys. A GitHub
    workflow runs the complete gate on each push to `main`. When the gate
    passes, a job calls a Cloudflare deploy hook, and Cloudflare builds
    `main`. The hook address is a secret in GitHub. It can only start a
    build, so it cannot change the Cloudflare account. A hook names no
    commit, so two quick pushes can deploy a commit that has not passed
    yet. Effort: Medium.
  - **G.** A GitHub workflow runs the complete gate on each push to
    `main`, on a runner where Playwright installs Chromium. When the gate
    passes, a job pushes that exact commit to a production branch, such as
    `live`. Cloudflare's Git connection builds `live` as production, with
    the build alone, and keeps previews of the other branches. GitHub
    stores no Cloudflare credential, and no pull-request gate is added.
    A ruleset on `live` keeps out direct pushes. One real push must show
    that Cloudflare sees a push by the workflow. Effort: Medium.
  - **H.** A GitHub workflow runs the complete gate on each push to
    `main`. Cloudflare's build command first waits for that check on its
    own commit, then builds, and fails when the check fails or does not
    end in time. The repository is public, so it needs no token, but a
    read-only GitHub token in Cloudflare avoids GitHub's limit of 60
    requests an hour. The free plan's one build slot stays busy while the
    build waits. Effort: Medium.
  - **I.** Cloudflare's build downloads the Ubuntu packages that
    Playwright lists for Chromium, and unpacks them into a user folder,
    from where Chromium loads them. The test keeps the same Chromium as on
    a laptop. It needs the Ubuntu mirrors at build time, and only a real
    Cloudflare build can show that it works. Effort: Medium.
  - **J.** Cloudflare's build serves `dist/` on a local port, opens a
    tunnel to it, and runs the browser test in a hosted browser service.
    It adds a third-party service and its credential. Effort: Large.
- **Left out:**
  - Installing the libraries with `apt` in the build: Cloudflare gives no
    root and blocks `sudo`.
  - A test of the live site after each deploy, with a rollback on
    failure: the broken page is live until the rollback, and the rollback
    needs a Cloudflare token in GitHub.
  - Firefox or WebKit in place of Chromium: they also need system
    libraries, so they fail in the same way.
- **Wider fix:** G. The whole gate runs in one place that can install
  what each check needs, and Cloudflare builds only a commit that passed.
  A later check that Cloudflare's image cannot run then needs no new
  decision. F and H also cover this class.
- **Previous examples:** None found.
- **Recommendation:** G. It runs the complete gate once, on a runner that
  starts Chromium, and only the exact commit that passed goes live.
  GitHub holds no Cloudflare credential. The first recommendation was B,
  but B adds the pull-request gate that the user did not choose on
  2026-11-03, and it guards the merge, not the deploy.
- **Action:** ask the user, because option G changes how the deploy
  decisions of 2026-11-03 work: the production branch and the place of
  the gate. Both are requirements in `docs/protocol/homepage.md`.

### 17. No rule for other addresses of the site

- **Severity:** Low. **Effort:** Small.
- **Source:** Implementation.
- **Category:** Docs or spec.
- **Location:** `docs/protocol/homepage.md`, section "Address".
- **Background:** The site is one page at `https://firna.dev/`. When a
  Cloudflare Pages build has no top-level `404.html`, Pages serves the
  homepage for every path that has no file, with status 200. The page's
  canonical link names `https://firna.dev/`.
- **Problem:** No requirement says what a visitor or a search engine gets
  at an address that is not the homepage, such as `https://firna.dev/blog`.
- **Impact if no action:** Every unknown address shows the homepage as a
  valid page. Search engines can count those addresses as soft 404s. The
  canonical link limits the harm.
- **Root question:** What does a visitor or a search engine get at an
  address of the site that is not the homepage?
- **Options:**
  - **A.** Keep Cloudflare's default: every unknown address shows the
    homepage with status 200. Effort: Small.
  - **B.** A 404 page that renders the same homepage with status 404. A
    visitor still sees the projects, and a search engine sees that the
    address does not exist. Effort: Small.
  - **C.** A "page not found" page with status 404, a short message, and a
    link to the homepage. It is a second screen, so it needs a mockup
    first. Effort: Medium.
  - **D.** Redirect each address that has no file to `https://firna.dev/`
    with status 301, through a small Pages Function that acts only where
    the build has no file. It adds server code to a static site, and
    search engines can still count such redirects as soft 404s. Effort:
    Medium.
- **Left out:** One catch-all redirect rule in a `_redirects` file.
  Cloudflare Pages applies those rules also to paths that have a file, so
  the rule would also redirect the stylesheet, the fonts, and the
  script.
- **Wider fix:** None.
- **Previous examples:** None found.
- **Recommendation:** B. It keeps one design, and it gives search engines
  the right status.
- **Action:** ask the user, because each option adds behaviour at the
  boundary that no requirement covers.

### 18. The privacy rule names cookies only

- **Severity:** Low. **Effort:** Small.
- **Source:** Implementation.
- **Category:** Docs or spec.
- **Location:** `docs/protocol/homepage.md`, section "Privacy".
- **Background:** The plan builds no privacy page and no cookie banner,
  because the page sets no cookies. The UK rules on storage on a
  visitor's device, the Privacy and Electronic Communications
  Regulations, cover any such storage, such as local storage, not only
  cookies. The page stores nothing today.
- **Problem:** The requirement does not say whether other storage on the
  device is allowed.
- **Impact if no action:** A later change can use local storage without
  consent and still meet the written rule.
- **Root question:** What may the site store on a visitor's device
  without consent?
- **Options:**
  - **A.** Widen the rule: the page stores nothing on the visitor's
    device. Effort: Small.
  - **B.** Keep the rule as it is. Effort: Small.
  - **C.** Widen the rule, and name what it covers: no response of the
    site sets a cookie, and the page writes no other site data on the
    device, such as local storage, session storage, IndexedDB, or a
    service worker. The browser's cache of the site's own files stays
    allowed, which A's "nothing" forbids. Effort: Small.
  - **D.** Allow only storage that the UK rules treat as strictly
    necessary for what the visitor asks for. Each such change then needs
    a legal judgment that a reviewer cannot make from the code. Effort:
    Small.
  - **E.** As C, and add a lint that rejects the browser storage APIs in
    `src/`, such as `localStorage` and `document.cookie`. It is a new
    lint, and it cannot see cookies that Cloudflare sets. Effort: Small.
- **Left out:** A consent banner, because the user chose that the site has
  none.
- **Wider fix:** E, a detection fix.
- **Previous examples:** None found.
- **Recommendation:** C. It keeps the reason for no banner true for every
  kind of storage, and a reviewer can check it against the code and the
  live responses. The first recommendation was A, but "nothing" also
  forbids the browser's cache of the page's files. E best protects the
  codebase.
- **Action:** ask the user, because option C changes a requirement, and no
  recorded decision covers it.

### 19. The protocol doc has no rule for the favicon fallback

- **Severity:** Low. **Effort:** Small.
- **Source:** Implementation.
- **Category:** Docs or spec.
- **Location:** `docs/protocol/homepage.md`, section "Page metadata".
- **Background:** The protocol doc says that the favicon is the Close-off
  mark in ink, and that it is light when the browser uses a dark theme.
  The page links an SVG favicon whose style turns the mark light in a
  dark theme. Safari before version 26 shows no SVG favicon. So on
  2026-11-03 the orchestrator added a 32 px ICO of the ink mark as the
  fallback, as a design call. Chrome still takes only the SVG.
- **Problem:** Some browsers cannot change a favicon with their theme.
  Safari before 26 shows the ink ICO. Safari 26 and later show the SVG,
  but WebKit bug 309949, confirmed and still open, says that they ignore
  its dark-theme rule. So every Safari shows the ink mark in a dark
  theme. The doc does not say what such a browser shows.
- **Impact if no action:** A review against the doc finds the dark-theme
  rule broken in every Safari. A reader cannot tell that the ink mark
  there is intended.
- **Root question:** What does the tab show when the browser uses a dark
  theme but cannot change a favicon with its theme?
- **Options:**
  - **A.** Change nothing in the doc. Effort: Small.
  - **B.** Add one requirement to "Page metadata": a browser that cannot
    show an SVG favicon shows the mark in ink. Safari 26 and later still
    break the dark-theme rule after B. Effort: Small.
  - **C.** Add one requirement to "Page metadata": a browser that cannot
    change a favicon with its theme shows the mark in ink. It covers
    every Safari, and it stays true when WebKit fixes its bug. Effort:
    Small.
  - **D.** Render the fallback ICO as the ink mark on its own light
    rounded tile, and state the tile in the doc. Safari before 26 then
    shows the tile in both themes. The user has not seen the tile.
    Reports say that Safari already draws a white square behind a
    low-contrast favicon in dark mode, so the gain is unclear until a
    real Safari shows the tab. Effort: Small.
  - **E.** One favicon for every browser: the ink mark on a light rounded
    tile, with no dark-theme version. Every tab shows the mark in both
    themes. Chrome, Edge, and Firefox lose the bare light mark that they
    show today, and the user has not seen the look. Effort: Small.
  - **F.** C, plus one general rule in the protocol doc: a requirement
    that needs a browser feature holds in each browser that has the
    feature. A later requirement that some browsers cannot meet then
    needs no new decision. The rule changes how a reviewer reads every
    requirement, and a reviewer could excuse a real defect as a missing
    feature. Effort: Small.
- **Left out:**
  - A light ICO: it breaks the ink rule in Safari's default light theme.
  - A second icon link with a `media` query for a dark theme: WebKit's
    icon collector ignores `media`.
  - A script that swaps the icon in a dark theme: it breaks the rule that
    the grain field is the page's only script, and Safari reportedly
    keeps the icon of the first load.
  - No fallback: Safari before 26 then shows no mark at all.
- **Wider fix:** F. It is a structural default in the doc for every
  requirement that needs a browser feature.
- **Previous examples:** None found.
- **Recommendation:** C. Its condition covers every Safari, so the doc
  then matches the page in every browser. The first recommendation was
  B, but B names the file format, so Safari 26 still breaks the rule. F
  best protects the codebase.
- **Action:** ask the user, because option C adds a requirement, and the
  user reviews each new requirement.

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

- [ ] Add one npm script that runs the complete gate and then the build. It
      is the build command of the Cloudflare Git connection, so a failed
      check stops the deploy. Blocked: waits for decision 16.
- [x] Check that Cloudflare's build image runs the complete gate, the
      browser test included. When it cannot run the browser test, stop and
      report it with options, because the user's decision is that a failed
      check stops the deploy. It cannot: decision 16 holds the evidence
      and the options. Evidence:
      `.context/firna-homepage/m4/cloudflare-browser-evidence.md`.
- [ ] Describe the one-time setup in the README: connect `Firna-AI/home`
      to a Cloudflare Pages project `firna-home`, with production branch
      `main`, the build command, the output folder `dist`, and Node 24.
      Then add `firna.dev` and `www.firna.dev`, with `www` redirected to the
      bare domain. Then check that Email Address Obfuscation is off for
      `firna.dev`, and that Cloudflare adds no script or cookie to the
      page, such as Web Analytics, Rocket Loader, or Bot Fight Mode. Each
      would break the no-JavaScript, one-script, no-third-party, or
      no-cookie rule of the protocol doc. Blocked: the build command and
      the production branch wait for decision 16.

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
