# No rule on out-of-date pull requests

- **Severity:** Medium. **Effort:** Small. **Confidence:** High. **Harder later:** No.
- **Kind:** Needs decision.
- **Added:** 2026-11-06, from branch `calummoore/firna-astro-website`, decision 20 of the plan `plans/firna-homepage.md`.
- **Location:** `docs/deploy-setup.md`, section 4, "Protect `main` in GitHub", and the deploy rules of `docs/protocol/deploy.md`.
- **Reason:** Option B adds a rejection of out-of-date pull requests, and the always-on rules keep each new rejection for the user.

- **Terms:**
  - **Up-to-date rule:** the ruleset setting "Require branches to be up to date before merging", under "Require status checks to pass".
- **Background:** On 2026-11-06 the user chose, in decision 16, that GitHub runs the complete gate as the required check `gate` for `main`, and that Cloudflare only builds. GitHub runs the gate of a pull request on its code merged with the `main` of that moment. When `main` moves later, that result still counts. The up-to-date rule lets a pull request merge only when it holds the latest `main`. `docs/deploy-setup.md` leaves the setting as the ruleset form sets it, and the form most likely leaves the rule off.
- **Problem:** Without the rule, two pull requests can each pass, and their combined result on `main` can still fail a check. Cloudflare then deploys that `main`, unless the failure also breaks the build.
- **Impact if no action:** A rare pair of merges can put a broken page live, against the user's words for decision 16: "A change that fails a check cannot reach `main`, so it cannot go live."
- **Root question:** Must the gate pass on the exact code that `main` gets?
- **Options:**
  - **A.** Keep the form's default in the setup doc. It most likely acts as C, and `docs/protocol/deploy.md` must then say that a pair of pull requests can reach `main` untested. Effort: Small.
  - **B.** Tell the owner, in `docs/deploy-setup.md`, to turn the up-to-date rule on. When `main` moved, a pull request then needs **Update branch** and one more gate run. Effort: Small.
  - **C.** Tell the owner to turn the rule off. It saves runs, and a rare broken `main` stays possible. `docs/protocol/deploy.md` must say so. Effort: Small.
  - **D.** Turn on the repository setting **Always suggest updating pull request branches**, and tell the owner to update a branch that is behind and wait for `gate`. Nothing blocks a merge, so a merge in a hurry can still put an untested pair on `main`. Effort: Small.
  - **E.** Require a merge queue for `main`, and add the `merge_group` event to `.github/workflows/gate.yml`. GitHub then tests each pull request on the latest `main` before it merges. Each pull request runs the gate once more, the preview rule must leave out the queue branches, and the queue needs the repository to stay public on the Team plan. Effort: Medium.
- **Left out:**
  - A guard at the deploy, such as a production branch that moves after the gate: the user rejected it in decision 16.
  - An automatic revert of a failed `main` by the workflow: it needs a write token and a bypass for the workflow, and the broken page stays live until the revert deploys.
- **Wider fix:** B. It keeps every untested merge result off `main`. E does the same.
- **Previous examples:** On 2026-11-03, the options check of decision 16 noted that two passing pull requests can merge into a commit that nobody tested.
- **Related:** `plans/follow-ups/protect-main-with-a-ruleset.md`: the ruleset of that task holds this setting, so one of its steps waits for this answer.
- **Recommendation:** B. For one owner who merges each pull request, it gives the same protection as E with one setting and no workflow change.
- **Action:** ask the user, because B adds a rejection of out-of-date pull requests, and the always-on rules keep each new rejection for the user.
