# DEPLOYMENT_CHECKLIST.md — fill this in before asking IT to promote to PROD

**Guidance only — Claude does not fill this in or execute it.** This is the list central IT will ask
you about anyway. Answering it yourself *before* you request a Dymon PROD promotion is faster than
finding out mid-review that you can't answer it.

- [ ] **Where does this run** — on-prem / Dymon's own environment, or does data leave the boundary?
- [ ] **Test data** — does the test environment use masked data only, or could real data have touched it?
- [ ] **Two-person approval** — do live parameter changes require two-person approval, and is that
      enforced **in code** (a High/Off-limits tier in `RISK_TIERS.md`), not just in policy?
- [ ] **Audit log** — is there an audit log for every change to money / permissions / audit-tier data?
- [ ] **Rollback** — what's the rollback plan if this needs to come back out of PROD?
- [ ] **Named owner** — who is the named support owner once this is live? (a person, not a team)

---

## Human-facing guideline

This checklist won't get filled in by Claude — it's the list central IT will ask you about anyway.
Answering it yourself before you ask for promotion is faster than finding out mid-review that you
can't answer it. Anything you can't answer here is a gap to close *before* the promotion request,
not during it.
