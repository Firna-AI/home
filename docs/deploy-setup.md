# Deploy setup

This doc gives the one-time setup of the deploy. The setup connects this
repository, `Firna-AI/home`, to Cloudflare Pages, adds the domains
`firna.dev` and `www.firna.dev`, and protects `main` in GitHub. The
[Deploy](../README.md#deploy) section of the README says how a change goes
live after the setup. The protocol doc
[docs/protocol/deploy.md](protocol/deploy.md) gives the rules and the
decisions.

In this doc, "the workflow" is the GitHub Actions workflow "Gate", in
[.github/workflows/gate.yml](../.github/workflows/gate.yml). Its check is
named `gate`.

The owner of the repository does this setup once. Do it after the site is
on `main`, because Cloudflare builds `main` as soon as you connect it. The
setup needs no API token. In Cloudflare, a zone is a domain with its DNS
records and its settings.

## 1. Create the Pages project

1. Sign in to the Cloudflare account that holds the zone `firna.dev`.
   Pages can serve a bare domain only from a zone in its own account.
2. Open **Workers & Pages**. Select **Create application**, the **Pages**
   tab, and **Import an existing Git repository**.
3. Select GitHub. Give the GitHub app **Cloudflare Workers and Pages**
   access to `Firna-AI/home`. Cloudflare advises access to selected
   repositories only.
4. Select `Firna-AI/home`, then **Begin setup**. Enter these values:
   - Project name: `firna-home`. The project then also answers at
     `https://firna-home.pages.dev`.
   - Production branch: `main`.
   - Build command: `npm run build`.
   - Build output directory: `dist`.
5. Add no environment variable. The build image reads the Node version
   from `.nvmrc`.
6. Select **Save and Deploy**. Cloudflare builds and deploys `main`.
7. In the project, open **Settings** > **Builds** > **Branch control**.
   Keep the automatic production deployments on. Keep the preview
   branches at **All non-Production branches**.

## 2. Check the zone settings

Some Cloudflare features change a page on its way to a visitor. They
break the rules of [docs/protocol/homepage.md](protocol/homepage.md)
on scripts, cookies, other origins, and pages without JavaScript. Set
these in the zone `firna.dev` before you add the domains:

1. **Security** > **Settings**: turn **Email Address Obfuscation** off.
   Cloudflare turns it on in each new zone. It hides the mail address,
   and it adds a script that decodes it. The mail link then needs
   JavaScript.
2. **Security** > **Settings**: keep **Bot Fight Mode** off. It adds a
   script and the cookies `__cf_bm` and `cf_clearance`.
3. **Speed** > **Settings** > **Content Optimization**: keep
   **Rocket Loader** off. It loads the page's script through a script of
   its own.
4. Keep Web Analytics off. Do not enable it under **Metrics** in the
   Pages project, and add no site for `firna.dev` under **Web Analytics**.
   It adds a script from another origin.
5. Turn on no other feature that adds a script or a cookie, such as
   Zaraz.
6. **SSL/TLS** > **Edge Certificates**: turn **Always Use HTTPS** on. A
   request over plain HTTP then gets a redirect to HTTPS.

## 3. Add the domains

Pages cannot redirect one domain to another. So a Bulk Redirect of the
Cloudflare account sends `www.firna.dev` to `https://firna.dev`. The
redirect steps follow Cloudflare's guide
[Redirecting www to domain apex](https://developers.cloudflare.com/pages/how-to/www-redirect/).

1. In the Pages project, open **Custom domains**, and select
   **Set up a domain**. Enter `firna.dev`, and select **Continue**.
   Cloudflare adds the DNS record. Wait until the domain is **Active**.
2. In the zone `firna.dev`, open **Rules** > **Settings**, and select the
   **Bulk Redirects** tab. Select **Create Bulk Redirect List**.
3. Give the list a name. Add one URL redirect manually:
   - Source URL: `www.firna.dev`
   - Target URL: `https://firna.dev`
   - Status: `301`
   - Under **Edit parameters**, select **Preserve query string** and
     **Subpath matching**. Keep **Preserve path suffix** selected.
4. Select **Next** until you see **Continue to Redirect Rules**, and
   select it. Create a Bulk Redirect Rule that uses the list, and select
   **Save and Deploy**.
5. In **DNS** > **Records** of the zone, give `www` this record: type `A`,
   IPv4 address `192.0.2.1`, and proxy status **Proxied**. If a `www`
   record exists, first check that no service still uses it. On
   2026-11-06, `www` pointed to `35.255.149.11`, an address that did not
   answer. Then change the record to these values. The address is a
   placeholder. Cloudflare answers each request for `www` with the
   redirect, so no request reaches the address.

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

1. In **Deployments** of the project, the first production build passed.
   Its log shows the Node version of `.nvmrc`.
2. `https://firna-home.pages.dev/` shows the homepage.
3. `curl -sI https://firna.dev/` shows status 200 and no `set-cookie`
   header.
4. `curl -sI https://firna.dev/no-such-page` shows status 404 and no
   `set-cookie` header.
5. `curl -sI https://www.firna.dev/` shows status 301 and a `location`
   header that points to `https://firna.dev`.
6. `curl -sI http://firna.dev/` shows a redirect to `https://firna.dev/`.
7. `curl -s https://firna.dev/ | grep -o '<script[^>]*>'` prints one
   line: the script of the grain field, under `/_astro/`.
8. `curl -s https://firna.dev/ | grep -o 'href="mailto:[^"]*"'` prints
   `href="mailto:hello@firna.ai"`.
9. The next pull request lists `gate` as a required check.
