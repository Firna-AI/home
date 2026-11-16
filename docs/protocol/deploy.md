# Deploy

This doc holds the requirements and the decisions in force for the hosting
and the deploy of the site of Firna Ltd at `firna.ai`. Each decision
gives the choice, the rejected alternatives, and the reason. The
[homepage doc](homepage.md) holds all other requirements and decisions of
the site.

## Terms

- **Worker:** a Cloudflare Worker. The Worker `home` serves the site.
- **Static assets:** the files that a Worker serves as they are, here the
  files of `dist/`.
- **Workers Builds:** the Git connection of Cloudflare Workers. It builds
  the Worker in Cloudflare from its GitHub repository, and it reports the
  result on each commit as the check "Workers Builds: home".
- **Complete gate:** all the checks of the repository, the tests included.
- **User:** the owner of this repository, who made the decisions in this
  doc.

## Hosting and checks

- The Cloudflare Worker `home` hosts the site.
- The Worker serves the files of `dist/` as static assets. It runs no
  script of its own.
- `wrangler.jsonc` in the repository holds the configuration of the
  Worker.
- Workers Builds builds each push to `main` and deploys it.
- Cloudflare's build runs no checks.
- When Cloudflare's build fails, the live site stays as it was.
- GitHub stores no Cloudflare token.
- GitHub runs the complete gate on each pull request and on each push to
  `main`.
- A change reaches `main` only through a pull request whose complete gate
  passed.
- Only the user can bypass that rule, with a direct push to `main` or a
  merge before the gate passed.
- A change through the bypass goes live without a passed gate. GitHub
  still runs the complete gate on it and reports the result.
- Cloudflare uploads a version of each other branch, with a preview
  address on `workers.dev`. It does not deploy that version.

**Decision:** a Cloudflare Worker with static assets, built by Workers
Builds. On 2026-11-16 the user found that the Worker `home` already serves
the site at `firna.ai`, and chose to keep it. Cloudflare advises Workers
over Pages for a new site. Workers Builds builds in Cloudflare, so GitHub
holds no token that can change the Cloudflare account. The user rejected
Cloudflare Pages, the choice of an earlier decision, and an upload from
GitHub Actions with a token, also one that only `main` can use.

**Decision:** GitHub runs the complete gate, and a change that fails it
cannot reach `main`, so it cannot go live. Cloudflare's build cannot start
a browser, which the complete gate needs, so it runs no checks. The user
rejected checks in Cloudflare's build, a workflow that moves a production
branch after the gate, and checks that report but block nothing.

**Decision:** the branch previews stay on, because they help to review a
pull request, and the site holds no secrets.
