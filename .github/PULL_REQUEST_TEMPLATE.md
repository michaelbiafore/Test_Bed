<!-- Track S (engineering) PR template. The optional Track E front-end adds a
     "which business rule / requirement ticket does this serve?" question on top. -->

## Golden / regression coverage
- [ ] New or changed golden cases included for this change (`tests/golden/`)
- [ ] Full regression suite passes (see the `golden-gate` CI check)

## Does this touch a High / Off-limits tier? (`RISK_TIERS.md`)
- [ ] Yes — needs human sign-off on the actual diff before merge (no auto-merge)
- [ ] No

## Rollback plan
<!-- One sentence: how do we undo this if it's wrong in production? -->

## AI-generated vs. human-reviewed
<!-- Which parts were Claude-authored, which were hand-written or hand-edited,
     and who reviewed the diff line-by-line. -->

---
> **Don't approve a merge just because the CI checkbox is green.** If this touches a High or
> Off-limits tier, read the actual diff, not just the test output.
