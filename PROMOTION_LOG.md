# PROMOTION_LOG.md — what happened when work went toward Dymon PROD

This is the repo's **empirical measure of the mission**: "code conformant enough to promote to PROD
with minimal rework." One row per change sent toward PROD, recording **what central IT sent back and
why**. It is the evidence that the four-framework bundle actually reduces rework — without it, the
mission is an assertion, not a result.

**The loop that makes this compound:** every rework reason should become a new **golden case**
(`tests/golden/`), a new **risk rule** (`RISK_TIERS.md`), or a new **context entry**
(`PROJECT_CONTEXT.md`) so the same rejection can't happen twice. `SE_Discipline.md` Step 5
(`/ce-compound`) asks you to close that loop before archiving.

| Date | Change (slug) | Sent to PROD? | Rework requested by IT | Reason / category | Converted to (golden case / risk rule / context) | Status |
|------|---------------|---------------|------------------------|-------------------|--------------------------------------------------|--------|
| _(example)_ | `add-fx-rounding` | yes | rounding mode wrong on JPY | calc correctness | `tests/golden/fx/03-jpy-rounding.*` | closed |

> Replace the example row once real promotions start. Keep it append-only — a rejection you "fixed
> quietly" without a row here is a lesson the next person will have to relearn.

---

## Human-facing guideline

If central IT sends something back, that's not a failure to hide — it's the single most valuable
signal this repo produces. Log it, then turn it into a test or a rule so the bundle gets measurably
better at PROD-conformance each cycle. A promotion that went through clean is worth a row too (it's
the baseline the reworked ones are measured against).
