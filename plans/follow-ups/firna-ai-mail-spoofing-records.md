# firna.ai has no SPF or DMARC record

- **Severity:** Medium. **Effort:** Small. **Confidence:** High. **Harder later:** No.
- **Kind:** Outside the scope.
- **Added:** 2026-11-02, from branch `calummoore/firna-astro-website`, the options check of the homepage plan.
- **Location:** None. The records belong in the `firna.ai` DNS zone on Cloudflare.
- **Reason:** The fix is a DNS change in the Cloudflare dashboard, not a change to this repository.

- **Terms:**
  - **SPF:** a DNS text record that lists the servers that may send mail for a domain.
  - **DMARC:** a DNS text record that tells receivers what to do with mail that fails the domain's checks.
- **Background:** Mail for `firna.ai` runs on Google Workspace: its MX record is `1 smtp.google.com`, and the zone has a Google DKIM key. On 2026-11-02 a DNS-over-HTTPS lookup found no SPF record and no DMARC record. The new homepage will publish a contact address at `firna.ai`.
- **Problem:** Without SPF and DMARC, other senders can forge mail from `firna.ai` more easily, and receivers may mark real Firna mail as spam.
- **Impact if no action:** A forged mail from the public contact address can reach clients, and real mail can land in spam.
- **Root question:** How do receivers tell real `firna.ai` mail from forged mail?
- **Options:**
  - **A.** Add the SPF record `v=spf1 include:_spf.google.com ~all` and a DMARC record that only reports, `v=DMARC1; p=none; rua=mailto:<address>`. Move DMARC to `quarantine` after a few weeks of clean reports. Effort: Small.
  - **B.** As A, but start DMARC at `p=quarantine`. Faster protection, with a risk that a forgotten sender loses mail. Effort: Small.
  - **C.** Change nothing. Effort: Small.
- **Left out:** Moving mail to another provider, because Google Workspace already signs mail with DKIM.
- **Wider fix:** None. This is one zone.
- **Previous examples:** None found.
- **Recommendation:** A. It protects the domain with no risk of lost mail, and the reports show any sender that is missing.
- **Action:** Ask the user, because only the user can change the DNS zone and knows which services send mail for `firna.ai`.
- **Decision (2026-11-03):** The user chose A. The user adds the records in the Cloudflare DNS of `firna.ai`:
  - A TXT record at `firna.ai`: `v=spf1 include:_spf.google.com ~all`. When another service also sends mail as `firna.ai`, such as the Firna product, its include goes into the same record.
  - A DMARC record at `_dmarc.firna.ai`: `v=DMARC1; p=none; rua=mailto:<report address>`. Cloudflare's DMARC Management, under Email in the dashboard, can add it with a Cloudflare report address.
  - After a few weeks of clean reports, `p=none` becomes `p=quarantine`.
