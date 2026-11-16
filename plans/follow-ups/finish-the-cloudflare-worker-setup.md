# Finish the setup of the Cloudflare Worker and the redirects

- **Severity:** High. **Effort:** Small. **Confidence:** Medium. **Harder later:** No.
- **Kind:** Post-merge task.
- **Added:** 2026-11-16, from branch `calummoore/delft-6qlc`, decisions 2, 4, and 5 of its session. It replaces the item "Connect the site to Cloudflare Pages".
- **Location:** None. The work is in the Cloudflare dashboard. `docs/deploy-setup.md`, sections 1, 2, 3, and 5, gives each step.
- **Reason:** Only the user can change the Cloudflare account. A Wrangler login cannot read a build log, change a zone setting, or add a redirect rule.

- **Terms:**
  - **Worker `home`:** the Cloudflare Worker that serves the site at `firna.ai` from the files of `dist/`.
  - **Workers Builds:** the Git connection of Cloudflare Workers. Its check on each commit is "Workers Builds: home".
  - **Zone:** a domain in Cloudflare, with its DNS records and its settings.
- **Background:** On 2026-11-16 the user chose to keep the homepage at `firna.ai`, served by the Worker `home`, and to redirect `www.firna.ai`, `firna.dev`, and `www.firna.dev` to it. `wrangler.jsonc` now holds the configuration of the Worker. The live version came from a Wrangler upload on 2026-11-06.
- **Problem:** On 2026-11-10 and 2026-11-16, each build of "Workers Builds: home" failed in 0 seconds, before it built anything. That also happened on a branch with a valid Wrangler configuration. The build log is only in the dashboard. On 2026-11-16, `http://firna.ai/` had no redirect to HTTPS, `www.firna.ai` had no DNS record, and nothing served `firna.dev`.
- **Task:**
  1. Open the log of a failed build, and fix its cause. Check the build settings of section 1 of `docs/deploy-setup.md`. If the fix needs a change in the repository, give the log to an agent.
  2. Check the zone settings of section 2, and turn Always Use HTTPS on in `firna.ai` and `firna.dev`.
  3. Add the DNS records and the redirect rules of section 3.
- **Impact if no action:** A merge to `main` does not change the live site, which still lists Bookfolio. Each pull request shows a failed check. `www.firna.ai` and `firna.dev` do not answer.
- **Needs:** The user's Cloudflare account, which holds the zones `firna.ai` and `firna.dev`.
- **Done when:** Checks 1 to 9 of section 5 of `docs/deploy-setup.md` pass.
