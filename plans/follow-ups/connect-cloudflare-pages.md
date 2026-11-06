# Connect the site to Cloudflare Pages

- **Severity:** High. **Effort:** Small. **Confidence:** High. **Harder later:** No.
- **Kind:** Post-merge task.
- **Added:** 2026-11-06, from branch `calummoore/firna-astro-website`, the post-merge tasks of the plan `plans/firna-homepage.md`.
- **Location:** None. The work is in the Cloudflare dashboard. `docs/deploy-setup.md` gives each step.
- **Reason:** Cloudflare builds `main` as soon as someone connects the repository, so the connection waits until the site is on `main`.

- **Terms:**
  - **Cloudflare Pages:** the Cloudflare product that builds the site from GitHub and hosts it.
  - **Zone:** a domain in Cloudflare, with its DNS records and its settings.
- **Background:** The repository `Firna-AI/home` builds the site of Firna Ltd with Astro. GitHub runs the complete gate on each pull request and each push to `main`. Cloudflare Pages builds each push to `main` with `npm run build`, and it deploys `dist/`. On 2026-11-03 the user chose the address `https://firna.dev`, and Cloudflare's Git connection, so that GitHub stores no Cloudflare token. On 2026-11-06 the user chose that Cloudflare's build runs no checks. Only the user can change the Cloudflare account.
- **Task:** Follow `docs/deploy-setup.md`, sections 1, 2, 3, and 5:
  1. Create the Pages project `firna-home` with the production branch `main`, the build command `npm run build`, and the output folder `dist`.
  2. In the zone `firna.dev`, turn Email Address Obfuscation off, keep Bot Fight Mode, Rocket Loader, and Web Analytics off, and turn Always Use HTTPS on. Each of the first four adds a script or a cookie, against the rules of `docs/protocol/homepage.md`.
  3. Add the custom domain `firna.dev`, and the Bulk Redirect from `www.firna.dev` to `https://firna.dev`. Before you replace the `www` record, check that no service still uses it. On 2026-11-06 it pointed to `35.255.149.11`, an address that did not answer.
  4. Check the first production deploy at `https://firna-home.pages.dev/`, then at `https://firna.dev/`.
- **Impact if no action:** The site does not go live.
- **Needs:** The merged change on `main`, and the user's Cloudflare account that holds the zone `firna.dev`.
- **Done when:** Checks 1 to 8 of section 5 of `docs/deploy-setup.md` pass. They cover the first production build, status 200 at `https://firna.dev/`, status 404 at an unknown address, the `www` and `http` redirects, no cookie, one script, and the plain mail link.
