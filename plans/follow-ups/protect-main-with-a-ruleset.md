# Make the gate a required check for main

- **Severity:** Medium. **Effort:** Small. **Confidence:** High. **Harder later:** No.
- **Kind:** Post-merge task.
- **Added:** 2026-11-06, from branch `calummoore/firna-astro-website`, the post-merge tasks of the plan `plans/firna-homepage.md`.
- **Location:** None. The work is in the GitHub settings of `Firna-AI/home`. `docs/deploy-setup.md`, section 4, gives each step.
- **Reason:** GitHub lists the check `gate` only after the workflow ran once, and an agent may change a GitHub setting only after the user confirms it.

- **Terms:**
  - **Ruleset:** a set of GitHub rules for branches, such as "require a pull request before merging".
  - **Required check:** a ruleset rule that lets a pull request merge only when a named check passed.
- **Background:** On 2026-11-06 the user chose, in decision 16, that GitHub runs the complete gate on each pull request and each push to `main`, and that the gate is a required check for `main`. Direct pushes to `main` are blocked, and the user can bypass that block. Cloudflare only builds, so the required check is what keeps a failing change off the live site. The workflow `.github/workflows/gate.yml` runs `npm run gate`, and its check is named `gate`. `docs/protocol/deploy.md` states these rules.
- **Task:** Create the branch ruleset "Protect main", as section 4 of `docs/deploy-setup.md` says. It targets `main`, requires a pull request, requires the check `gate` from GitHub Actions, and lists the role Repository admin in its bypass list. The open item `plans/follow-ups/require-up-to-date-pull-requests.md` decides whether the ruleset also requires an up-to-date branch.
- **Impact if no action:** A change that fails the gate can reach `main`, and Cloudflare then puts it live.
- **Needs:** One run of the workflow, for example on the pull request of this change, the user's admin rights, and the user's confirmation when an agent sets it.
- **Done when:** The next pull request lists `gate` as a required check, and GitHub refuses a direct push to `main` from an account outside the bypass list.
- **Related:** `plans/follow-ups/require-up-to-date-pull-requests.md`: one setting of this ruleset waits for that decision.
