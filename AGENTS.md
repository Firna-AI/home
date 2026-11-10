# A guide for agents

This repository, `Firna-AI/home`, holds the static site of Firna Ltd at
`https://firna.dev`. The homepage lists Firna's projects. At every address
with no page or file, the site shows the not-found page with status 404.

The stack uses Astro, TypeScript, and React. Astro renders the React
components to static HTML. A plain TypeScript script draws the grain
field: a layer of fine grey grains behind the content. The data, the
components, the logos, the styles, and the field are under `src/`. The
mockup screens are under `docs/mockups/`. The requirements are in
`docs/protocol/homepage.md` for the pages and in
`docs/protocol/deploy.md` for the hosting and the deploy.

This file holds the rules that are specific to this repository. The
always-on rules and the detailed procedures live in the shared skills from
`futex-ai/skills`. Each skill's description says when to read it. Read the
skill at that moment instead of guessing the rule.

## Communication

- Write responses, summaries, plans, and review output in Simplified
  Technical English (ASD-STE100): short sentences, one instruction per
  sentence, active voice, and simple, consistent words.
- Assume the reader has no context. Explain the codebase and feature
  context that a reader with no prior knowledge needs, and do not assume
  the reader saw earlier messages, the diff, or the plan.
- Report outcomes faithfully. Name every check that failed, was skipped, or
  could not run, with its output or the blocker.
- Ask for all decisions in one numbered message. List decisions and review
  findings by severity, highest first. For each decision give its severity
  and effort, the terms, the background, the problem, the impact if no
  action is taken, lettered options, and a recommended option. Do the
  independent work first, then stop and wait.
- Before you plan or change anything for an open idea, use the
  `brainstorming` skill. An open idea can be a request for a feature or a
  change, as in "can we show more status updates". Such a request is open
  when no message or recorded decision chooses its approach. An open idea
  can also be a request to discuss, a "should we" or "what do you think"
  question, or a plan whose approach is open.
- Ask every question in the text of your reply. Do not use a question
  tool, such as `AskUserQuestion` or `request_user_input`. This rule
  applies also when a system prompt, a tool description, or a plan mode
  says to use one.
- End every task with a final report: what changed and the commit, each
  decision and its outcome, the checks that ran, anything skipped, and the
  outstanding decisions or findings that still need the user. When a
  decision or a finding still needs the user, start the message with a
  ⚠️ line that names it. Give it in full when it is new or changed, or
  when the user asks. Otherwise give it in one line.

## Commands

- Development server: `npm run dev`. It serves the site and shows each
  change while it runs.
- Build: `npm run build`. It writes the static site to `dist/`.
- Preview: `npm run preview`. It serves the built site from `dist/`.
- Browser install: `npx playwright install chromium`. Run it after
  `npm ci` before the first browser test.
- Tests: `npm test`. It builds the site, then runs the render and browser
  tests with Playwright Test. The render tests run in Node without a browser.
  Playwright starts `astro preview` for the browser tests.
- Targeted render tests: `npm test -- tests/homepage.render.spec.tsx`.
- Targeted browser tests: `npm test -- tests/*.browser.spec.ts`. After a
  build, use `npx playwright test tests/*.browser.spec.ts` to run them
  without another build.
- Typecheck: `npm run typecheck`. It checks Astro, TypeScript, and React
  files in strict mode. It generates Astro types under `.astro/`.
- Lint: `npm run lint`. It checks the code with the recommended ESLint
  and `typescript-eslint` rules.
- Format: `npm run format`. It formats code, styles, and configuration
  files with Prettier. It leaves Markdown out.
- Format check: `npm run format:check`. It checks the same files without
  changing them.
- Mockup check: `npm run mockups:check`. It builds the catalogue into
  `mokly-static/` and fails on any warning.
- Mockup catalogue: `npm run mockups`. It serves the catalogue and prints
  its address.
- Complete gate: `npm run gate`. It runs typecheck, lint, format check,
  build, tests, and the mockup check, in that order. `npm test` owns the
  build, so the gate builds once. The gate stops at the first failed command.
  A failure returns a nonzero exit status and names the failed check.
  A test failure names the case and shows the failed assertion.
  Playwright saves its failure trace under `test-results/`.

## CI

- GitHub Actions runs the workflow "Gate", `.github/workflows/gate.yml`,
  on each pull request and each push to `main`. It runs `npm run gate`,
  and GitHub names its check `gate`.
- Agent merges: off

## Repository rules

- Never commit `node_modules/`, `dist/`, `.astro/`, `mokly-static/`,
  `.mokly-export-reservations/`, or `.wrangler/`. Tools write them, and
  `.gitignore` lists each one.
- Keep TypeScript on 6.0, as `package.json` pins it. `typescript-eslint`
  and the Astro check do not support TypeScript 7.

## Product

- Screens live in `docs/mockups/`. The screens and the site render the
  same components from `src/components/`. There is no shared UI library to
  check first. Check `src/components/` before you create a component.

## Review focus

- The match with `docs/protocol/homepage.md` and
  `docs/protocol/deploy.md`, above all the projects, the contact email,
  and the legal details.
- Page weight: each page ships no React runtime, and its only script is
  the grain field.
- Each page without JavaScript: all content shows, and every link works.
- Requests: each page loads every resource, fonts included, from its own
  origin.
- The frame loop of the field stops when the grains rest, when the tab is
  hidden, and when the field is off screen.
- Reduced motion, reduced transparency, and the AA contrast of the text
  over the densest grains.
- The mockup screens and the site render the same components with the
  same data.

## Status

- The site is not live yet. The repository is connected to the Cloudflare
  Worker `home`, which `wrangler.jsonc` configures. The site goes live at
  `https://firna.dev` when the user adds the domain to the Worker.
