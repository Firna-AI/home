# The Cloudflare Workers build fails on each branch

- **Severity:** Medium. **Effort:** Small. **Confidence:** High. **Harder later:** No.
- **Kind:** Needs decision.
- **Added:** 2026-11-10, from branch `calummoore/conductive-app-addition`, in the CI step of its pull request.
- **Location:** None. The work is in the Cloudflare dashboard, in the Workers project `home`.
- **Reason:** Only the user can change the Cloudflare account, and the fix depends on which Cloudflare product hosts the site.

- **Terms:**
  - **Workers Builds:** the Cloudflare service that builds a Cloudflare Worker from a GitHub repository. It reports its result on each commit as a GitHub check.
  - **Cloudflare Pages:** the Cloudflare product that `docs/deploy-setup.md` sets up to build and host this site.
- **Background:** The repository `Firna-AI/home` builds a static Astro site. `docs/protocol/deploy.md` says that Cloudflare Pages hosts the site and that its Git connection builds each push to `main`. That doc also records that the user rejected a Cloudflare Worker with static assets. The item `plans/follow-ups/connect-cloudflare-pages.md` holds the Pages setup, which is not done yet. By 2026-11-10, a Cloudflare Workers project named `home` was connected to the repository.
- **Problem:** The check "Workers Builds: home" failed on 2026-11-10 on the head commit of each open pull request: `670b47d` on `calummoore/conductive-app-addition` and `2eceec4` on `calummoore/oslo-mn8i`. The GitHub check gives no failure text. It only links to a build in the Cloudflare dashboard, which needs the user's login. The GitHub Actions check `gate` passed on both commits. Nobody reran the check, because it does not come from GitHub Actions. The suspected source is a Workers project that expects a Worker to deploy, such as a Wrangler configuration, and the repository has none.
- **Impact if no action:** Each pull request shows a red check, so a real failure is harder to see. A build of `main` in the Workers project fails too, so that project deploys nothing.
- **Root question:** Which Cloudflare product builds and hosts the site?
- **Options:**
  - **A.** Disconnect the Workers project `home` from the repository. Then set up Cloudflare Pages, as `plans/follow-ups/connect-cloudflare-pages.md` says. The deploy docs stay as they are. Effort: Small.
  - **B.** Keep the Workers project, and make it serve the built site: add a Wrangler configuration with `dist/` as its static assets, and set its build command to `npm run build`. This changes the hosting decision in `docs/protocol/deploy.md`. So update that doc, `docs/deploy-setup.md`, and the Pages follow-up item in the same change. Effort: Medium.
- **Left out:** Change nothing: the red check stays on every pull request, so this fails the goal.
- **Wider fix:** None. This is one setup error in the Cloudflare account, not a class of defect in the code.
- **Previous examples:** None found.
- **Related:** `plans/follow-ups/connect-cloudflare-pages.md`: the Pages setup. Option A completes it, and option B replaces it.
- **Recommendation:** A. The deploy protocol already chose Cloudflare Pages, and a Pages project needs no code in the repository.
- **Action:** ask the user, because the fix needs the user's Cloudflare account, and option B changes a decision in `docs/protocol/deploy.md`.
