# Send a test email to hello@firna.ai

- **Severity:** Medium. **Effort:** Small. **Confidence:** Medium. **Harder later:** No.
- **Kind:** Post-merge task.
- **Added:** 2026-11-06, from branch `calummoore/firna-astro-website`, a milestone 3 TODO of the plan `plans/firna-homepage.md`.
- **Location:** None. The address lives in the Google Workspace of `firna.ai`.
- **Reason:** Only the user can create the address and send the test email. The plan asked for the test before the merge, and it stays open when the pull request opens.

- **Background:** The site shows `hello@firna.ai` as its contact mail link, by the user's decision of 2026-11-03. The user adds the address as an alias or a group in Google Workspace if it does not exist. `docs/protocol/homepage.md` requires that mail to `hello@firna.ai` reaches Firna. UK e-commerce rules ask a business site for a contact email that works.
- **Task:** Make sure that `hello@firna.ai` exists. Send a test email to it from another account, and check that it arrives. Do it before the merge, or at the latest before the Cloudflare connection puts the site live.
- **Impact if no action:** A visitor can write to an address that bounces, and the site breaks a requirement of its protocol doc.
- **Needs:** The user's Google Workspace admin access.
- **Done when:** A test email to `hello@firna.ai` arrives.
