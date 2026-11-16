# Deploy setup

This doc gives the one-time setup of the deploy. The setup connects this
repository, `Firna-AI/home`, to the Cloudflare Worker `home`, adds the
redirects to `firna.ai`, and protects `main` in GitHub. The
[Deploy](../README.md#deploy) section of the README says how a change goes
live after the setup. The protocol doc
[docs/protocol/deploy.md](protocol/deploy.md) gives the rules and the
decisions.

In this doc, "the workflow" is the GitHub Actions workflow "Gate", in
[.github/workflows/gate.yml](../.github/workflows/gate.yml). Its check is
named `gate`. In Cloudflare, a zone is a domain with its DNS records and
its settings.

The owner of the repository does this setup once, in the Cloudflare
account that holds the zones `firna.ai` and `firna.dev`. The setup needs
no API token. A Wrangler login cannot do these steps: it can read a zone,
but not change it, and it cannot see Workers Builds.

## 1. Check the build settings of the Worker

The Worker `home` exists, and its Git connection to `Firna-AI/home` is
on. [wrangler.jsonc](../wrangler.jsonc) holds the rest of the
configuration, so the dashboard needs only the commands.

1. Open **Workers & Pages**, select the Worker `home`, and open
   **Settings** > **Build**.
2. Check **Git repository**: `Firna-AI/home`. If Cloudflare shows a
   problem with the connection, connect the repository again. Give the
   GitHub app **Cloudflare Workers and Pages** access to `Firna-AI/home`.
3. Set **Build configuration** to these values:
   - Build command: empty. Wrangler runs `npm run build`, as
     `wrangler.jsonc` says.
   - Deploy command: `npx wrangler deploy`.
   - Non-production branch deploy command: `npx wrangler versions upload`.
   - Root directory: `/`.
4. Under **Branch control**, set the production branch to `main`, and
   turn on the builds for non-production branches.
5. Add no build variable. The build image reads the Node version from
   `.nvmrc`.
6. When a build fails, open the build from the check
   "Workers Builds: home" on GitHub, or from **Deployments** of the
   Worker. The log names the failed step.

## 2. Check the zone settings

Some Cloudflare features change a page on its way to a visitor. They
break the rules of [docs/protocol/homepage.md](protocol/homepage.md)
on scripts, cookies, other origins, and pages without JavaScript. Set
these in the zone `firna.ai`:

1. **Security** > **Settings**: turn **Email Address Obfuscation** off.
   It hides the mail address, and it adds a script that decodes it. The
   mail link then needs JavaScript. On 2026-11-16 the live page had no
   such script.
2. **Security** > **Settings**: keep **Bot Fight Mode** off. It adds a
   script and the cookies `__cf_bm` and `cf_clearance`.
3. **Speed** > **Settings** > **Content Optimization**: keep
   **Rocket Loader** off. It loads the page's script through a script of
   its own.
4. Keep Web Analytics off. Do not enable it on the Worker, and add no
   site for `firna.ai` under **Web Analytics**. It adds a script from
   another origin.
5. Turn on no other feature that adds a script or a cookie, such as
   Zaraz.
6. **SSL/TLS** > **Edge Certificates**: turn **Always Use HTTPS** on. A
   request over plain HTTP then gets a redirect to HTTPS. On 2026-11-16,
   `http://firna.ai/` answered with status 200 and no redirect.

Turn **Always Use HTTPS** on in the zone `firna.dev` too.

## 3. Add the redirects

`wrangler.jsonc` keeps the custom domain `firna.ai` on the Worker. Three
other addresses redirect to it with status 301. A redirect rule needs a
proxied DNS record for its host, so that the request reaches Cloudflare.
The records below point to `192.0.2.1`, a placeholder address. Cloudflare
answers each request with the redirect, so no request reaches the
address.

### `www.firna.ai`

1. In **DNS** > **Records** of the zone `firna.ai`, add this record:
   type `A`, name `www`, IPv4 address `192.0.2.1`, proxy status
   **Proxied**. On 2026-11-16, `www.firna.ai` had no record.
2. Open **Rules** > **Overview**, and select **Create rule** >
   **Redirect Rule**. Select the template **Redirect from WWW to root**.
3. Check that the rule sends `https://www.*` to `https://${1}`, with
   status 301, and keeps the query string. Select **Deploy**.

### `firna.dev` and `www.firna.dev`

1. In **DNS** > **Records** of the zone `firna.dev`, give `www` this
   record: type `A`, IPv4 address `192.0.2.1`, proxy status **Proxied**.
   First check that no service still uses the old record. On 2026-11-16,
   `www` pointed to `35.255.149.11`, an address that did not answer.
   Keep the proxied record of `firna.dev` itself.
2. Open **Rules** > **Overview**, and select **Create rule** >
   **Redirect Rule**. Give it the name `firna.dev to firna.ai`.
3. Under **If incoming requests match**, select **All incoming requests**.
4. Under **Then**, set these values:
   - Type: **Dynamic**.
   - Expression: `concat("https://firna.ai", http.request.uri.path)`.
   - Status code: `301`.
   - Select **Preserve query string**.
5. Select **Deploy**.

## 4. Protect `main` in GitHub

Do these steps after the workflow ran once, for example on a pull request.
GitHub knows the check `gate` only after that first run. GitHub's guide
[Creating rulesets for a repository](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository)
describes each setting.

1. In `Firna-AI/home`, open **Settings**. In the left sidebar, under
   **Code, planning, and automation**, select **Rulesets**, then
   **Rulesets** again. Select **New ruleset** > **New branch ruleset**.
2. Enter the name `Protect main`. Set **Enforcement status** to
   **Active**.
3. Under **Bypass list**, select **Add bypass**, and add the role
   **Repository admin**. Keep **Always allow**.
4. Under **Target branches**, select **Add target** >
   **Include by pattern**, and enter `main`.
5. Keep **Restrict deletions** and **Block force pushes**. GitHub selects
   them by default.
6. Select **Require a pull request before merging**. Keep
   **Required approvals** at 0, because GitHub does not let you approve
   your own pull request.
7. Select **Require status checks to pass**, then **Add checks**. Select
   only `gate`. GitHub lists it only after the workflow ran once. Set its
   source to **GitHub Actions**, so that only the workflow can pass it.
8. Leave the other settings as GitHub sets them. Select **Create**.

GitHub lets a role, a team, or an app bypass a ruleset, but not one
person. So each admin of the repository can bypass it. While you are the
only admin, only you can bypass it. A direct push through the bypass
skips the pull request and the check `gate`. Cloudflare then builds and
deploys that push. The workflow still runs on it, and it reports its
result on the commit. The bypass also lets you merge a pull request
before `gate` passed.

## 5. Check the setup

1. In **Deployments** of the Worker `home`, the last build of `main`
   passed. The check "Workers Builds: home" on the next pull request
   passes too.
2. `https://home.firna.workers.dev/` shows the homepage.
3. `curl -sI https://firna.ai/` shows status 200 and no `set-cookie`
   header.
4. `curl -sI https://firna.ai/no-such-page` shows status 404 and no
   `set-cookie` header.
5. `curl -sI https://www.firna.ai/a?b=c` shows status 301 and a
   `location` header of `https://firna.ai/a?b=c`.
6. `curl -sI http://firna.ai/` shows a redirect to `https://firna.ai/`.
7. `curl -sI https://firna.dev/a?b=c` and
   `curl -sI https://www.firna.dev/a?b=c` each show status 301 and a
   `location` header of `https://firna.ai/a?b=c`.
8. `curl -s https://firna.ai/ | grep -o '<script[^>]*>'` prints one
   line: the script of the grain field, under `/_astro/`.
9. `curl -s https://firna.ai/ | grep -o 'href="mailto:[^"]*"'` prints
   `href="mailto:hello@firna.ai"`.
10. The next pull request lists `gate` as a required check.
