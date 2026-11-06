# Deploy

This doc holds the requirements and the decisions in force for the hosting
and the deploy of the site of Firna Ltd at `firna.dev`. Each decision
gives the choice, the rejected alternatives, and the reason. The
[homepage doc](homepage.md) holds all other requirements and decisions of
the site.

## Terms

- **Git connection:** the feature of Cloudflare Pages that builds the site
  in Cloudflare from its GitHub repository.
- **Complete gate:** all the checks of the repository, the tests included.
- **User:** the owner of this repository, who made the decisions in this
  doc.

## Hosting and checks

- Cloudflare Pages hosts the site.
- Cloudflare's Git connection builds each push to `main` and deploys it.
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
- Cloudflare builds a preview of each other branch at a `pages.dev`
  address.

**Decision:** Cloudflare's Git connection, so that GitHub holds no token
that can change the Cloudflare account. The user rejected an upload from
GitHub Actions with a token, also one that only `main` can use, and a
Cloudflare Worker with static assets.

**Decision:** GitHub runs the complete gate, and a change that fails it
cannot reach `main`, so it cannot go live. Cloudflare's build cannot start
a browser, which the complete gate needs, so it runs no checks. The user
rejected checks in Cloudflare's build, a workflow that moves a production
branch after the gate, and checks that report but block nothing.

**Decision:** the branch previews stay on, because they help to review a
pull request, and the site holds no secrets.
