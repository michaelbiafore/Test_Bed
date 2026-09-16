# Close_the_Gap_04 — Critique of and Additions to `Close_the_Gap_03`

This document reviews `Close_the_Gap_03.pdf` (the gap-closing proposal that turns the ZZ
comparison into concrete file-level changes for `Test_Bed/`). It is a critique layer, not a
replacement: `_03`'s recommendations R1–R10 stand on their own and most are worth doing. What
follows is where `_03` is strong, where it has real problems, what it gets factually wrong about
the current repo, and what I would add that `_03` does not cover.

I read `CLAUDE.md`, `README.md`, `SE_Discipline.md`, and `Close_the_Gap_03.pdf`, then checked the
claims against the live repo state (`.claude/settings.local.json`, the repo root, `.github/`,
`tests/`, `scripts/`).

---

## Bottom line up front

`_03` is a careful, honest document. Its best instinct — separating pure-markdown templates (no
runtime dependency) from CI/hook pieces (need a real app) and phasing accordingly — is exactly
right. But it has one structural problem that runs through the whole thing, and a few factual
drifts from the repo as it actually stands today:

1. **`_03` criticizes karpathy for being "behavioral, not structural," then proposes six new
   behavioral markdown files as the fix.** Only **R3 (golden tests + CI gate)** and **R4
   (`settings.json` deny-rules + hooks)** are actually *enforced*. R1, R2, R5, R6, R7, R10 are all
   "the model reads a template and is asked to comply" — the very category `_03` says is
   insufficient. This is the doc's central internal inconsistency, and it should change the
   priority order.
2. **The additions quietly break the repo's headline promise.** `README.md` sells a ~1-minute
   per-project setup and "copy two files; state a goal; answer approve prompts." `_03` adds seven
   root files, a `settings.json`, CI workflows, hook scripts, and per-project human authoring of
   business rules, risk tiers, and golden cases. That may be correct for the Dymon-PROD mission —
   but the doc never reconciles the two audiences, and a reader will feel the whipsaw.
3. **`_03`'s §0 is factually out of date with the repo.** It claims all three plugins are
   installed and enabled at **user** scope. The committed `.claude/settings.local.json` enables
   only **two** plugins (superpowers, karpathy) at **project** scope and doesn't mention
   compound-engineering at all. See "Factual corrections" below.

None of this is fatal. It mostly means: **do R3 and R4 first and for real; consolidate the
markdown items; pick an audience; fix §0.**

---

## Part 1 — What `_03` gets right (keep these)

- **The template-vs-tooling split (§2, §3).** "Markdown templates work before any code exists;
  CI/hooks only activate once there's a runner" is the single most useful architectural call in the
  document, and the phasing follows from it correctly.
- **§4 "Deliberately not imported."** Refusing to import ZZ's staffing model, headcount, and
  named-lead hour commitments is the right boundary for a self-serve tooling repo. This is mature
  scoping and should not be softened.
- **R3 and R4 specifically.** These are the two recommendations with real teeth — a merge that
  can't happen if golden tests fail, and a `deny` rule the model *cannot* talk its way past. They
  are the heart of "PROD-conformant with minimal rework," and everything else is secondary to them.
- **The human-facing guideline paragraphs.** Written at the right reading level for the non-expert
  owner. Keep the voice; `README.md`/`SE_Discipline.md` already talk this way.
- **R10's "wear these hats on purpose."** The observation that a solo user silently collapses "I
  decided the rule" and "I confirmed the rule is right" into one step is genuinely sharp and is the
  most valuable *conceptual* addition in the doc, even though (see below) it's unenforceable.

---

## Part 2 — Substantive critiques

### C1. The doc's own thesis undercuts six of its ten recommendations

`_03` R4 says, correctly, that karpathy's guardrails "remain a *behavioral* rule the model follows
voluntarily, not a config-enforced boundary — installing the skill doesn't change that; only
`settings.json` deny-rules do." Good. But then R1, R2, R5, R6, R7, and R10 are all *more* markdown
that the model is asked to honor. R2 in particular calls its checkpoint a "**freeze gate**" and a
"**state machine**," but the enforcement is `openspec/config.yaml` `rules.proposal` — which is
guidance the AI *sees when generating*, not a validator that *blocks*. Nothing stops a proposal from
being written with an empty "Open items" list and the pipeline continuing. The word "gate" oversells
a prompt.

**Implication:** rank by *enforceability*, not by narrative leverage. R3 and R4 are structural.
Everything else is discipline-shaped documentation. That's fine — but the doc should say so, so the
author doesn't believe R2 gives them a hard stop it can't deliver.

### C2. Risk information is specified to live in three places with no generator

`_03` puts the same risk-tier information in `PROJECT_CONTEXT.md` §6 (R1), `RISK_TIERS.md` (R4),
*and* `.claude/settings.json` (R4) — and says `settings.json` is "generated from" `RISK_TIERS.md`
"the way `PROJECT_CONTEXT.md` §6 should match it." But **no generator is specified**, so in practice
a human hand-syncs three files that will inevitably drift. That is a textbook DRY violation and a
maintenance bug the moment a fourth risk folder is added and only two of the three files get updated.

**Fix:** make `RISK_TIERS.md` the single authored source and generate `settings.json` from it with
a tiny script (see A1 below), or don't duplicate — have `PROJECT_CONTEXT.md` §6 *reference*
`RISK_TIERS.md` rather than restate it. One source of truth, not three copies with a "should match"
comment.

### C3. Seven new root files fights the repo's simplicity promise, and the audience is never chosen

`README.md` opens with "You do not need to be an experienced coder… copy `SE_Discipline.md` and a
tiny `CLAUDE.md`… ~1 minute." `_03` adds `PROJECT_CONTEXT.md`, `RISK_TIERS.md`, `DECISION_LOG.md`,
`CAPABILITY_REGISTRY.md`, `DEPLOYMENT_CHECKLIST.md`, plus templates, plus CI, plus hooks — and,
more importantly, adds *ongoing human authoring work* (business rules, risk classification, 5–10
golden cases per capability) that the README explicitly promised the user would never have to do.

`_03` half-notices this — R10 says the collapse "works for a solo hobby project and breaks the moment
a Fellow is representing a team" — but it never resolves it. There are two distinct users hiding in
this repo:

- **The weekend hobbyist** the README addresses ("state a goal, answer prompts").
- **The Fellow producing Dymon-PROD-bound code** the mission (`WHAT_THIS_DIR_IS.md`) actually targets.

The governance layer is right for the second and crushing for the first. **Pick.** My
recommendation (G1 below): make the R-items an explicit opt-in "PROD-track profile," keep the
two-file "Lite profile" as the default the README already describes, and say plainly which is which.

### C4. `_03` imports ZZ's taxonomy largely uncritically

The five risk classes, the six named stages (R9), and the four tiers are all adopted from ZZ. But ZZ
is a vendor/consultant proposal for a *paid delivery engagement* — some of it is load-bearing and
some is enterprise process theater. `_03` pushes back on the staffing parts (§4, good) but accepts
the *mechanisms* as targets without asking which actually reduce rework. The most useful thing the
doc could add is a one-line "why this matters for PROD promotion" test applied to each R-item — and
that test would itself demote R9.

### C5. R9 (rename the pipeline stages) is negative-value churn

Renaming `SE_Discipline.md`'s canonical stage headers to match ZZ's names optimizes for a reader who
has the ZZ proposal open — a reader who does not exist for anyone cloning `Test_Bed` for their own
project. It costs muscle-memory and doc-consistency churn to match an external document most readers
never see. Keep the *mapping table* (§R9's own table is fine as a cross-reference appendix); do
**not** rename the canonical stages. This is the one recommendation I would cut outright.

### C6. R7 (capability registry) overlaps Compound Engineering and will rot

`_03` admits `/ce-compound` documents "learnings (process knowledge)" while R7's registry catalogs
"components (code assets)" — but the line is thin, and a hand-maintained markdown table of reusable
components is exactly the artifact that goes stale first: nobody updates it under deadline, and once
one entry is wrong the whole table stops being trusted. Compounding is supposed to be *automatic*;
a manual registry fights that principle. If R7 is kept, it needs an owner and an enforced update
step (R7 does extend Step 5 to "required, not optional" — good — but "required" is again just prose).
Consider instead pointing `/ce-compound`'s existing `docs/solutions/` mechanism at component reuse,
rather than a parallel hand-curated file.

### C7. Portability: a `.sh` hook in a Windows/PowerShell repo won't run

R4 proposes `scripts/warn-if-audit-path.sh` and R3 uses `npm test`. `CLAUDE.md` itself says the host
is Windows 11 / PowerShell and that `.sh` helpers need WSL/Git Bash. Shipping a `.sh` PreToolUse hook
as the reference is a portability miss for this repo specifically. Use a `.ps1` or a `node`
script for the hook so it runs on the stated platform without WSL. (Claude Code hooks invoke a shell
command — on Windows that should not assume bash.)

### C8. The "required check" claim skips the step that actually makes it required

R3 calls `golden-gate.yml` "a **required check** on the PR." A GitHub Actions workflow existing does
**not** make it required — that takes **branch-protection configuration in the GitHub U/API**, which
is (a) outside every file in the repo and (b) not something the non-expert owner can do from the
Claude chat. `_03` should call this out as an explicit human/admin step, or the "can't be talked
past" promise is false: a merge can proceed with a red-but-not-required check.

### C9. "Done in an afternoon" conflates Claude's authoring time with the human's fill-in time

Phase 1 says the six markdown templates are "done in an afternoon." Adding the *template files* is
indeed an afternoon of Claude's time. But R1's `PROJECT_CONTEXT.md` and R3's golden cases are only
valuable once a *human* fills them with real business rules and confirmed examples — that is ongoing
labor per project, forever, and it's the actual cost of the governance layer. The estimate should
separate "scaffold the template" (fast, one-time) from "the discipline is now in force" (recurring
human work).

### C10. No precedence rule for a now-crowded instruction stack

With OpenSpec spec + CE plan + Superpowers TDD + karpathy + seven new governance files, contradictions
are inevitable. Concrete example: karpathy says "don't add error handling / logging nobody asked
for," while R1 §6 / `RISK_TIERS.md` may *require* audit logging on any High-tier change. Which wins?
`_03` stacks layers without stating precedence. `SE_Discipline.md` should gain a short "when
instructions conflict, this order wins" note (e.g. Risk boundaries > spec > karpathy restraint >
model default), or the Fellow gets non-deterministic behavior at exactly the high-risk moments the
whole system exists to protect.

### C11. The mission is empirical, but nothing here measures the outcome

`WHAT_THIS_DIR_IS.md`/`README.md` frame `Test_Bed` as *proof* that the bundle yields code promotable
"with minimal rework." `_03` adds a lot of *process* and zero *measurement of whether the process
reduces rework*. There is no rework log, no promotion scorecard, no before/after. A test-bed that
adds ceremony without measuring its effect can't actually settle the question it exists to answer.
This is the single biggest missing piece — see B1.

---

## Part 3 — Factual corrections against the current repo

These are places where `_03`'s description of the repo doesn't match what's committed today
(checked against `.claude/settings.local.json` and the repo tree):

1. **§0 says "all three plugins installed and enabled at *user* scope."** The committed
   `.claude/settings.local.json` enables only **two** — `superpowers@claude-plugins-official` and
   `andrej-karpathy-skills@karpathy-skills` — at **project** scope, and does not list
   compound-engineering at all (per `CLAUDE.md`, compound-engineering is relied on being enabled
   *globally*). So the true state is "two project-enabled, one assumed-global," not "three at user
   scope." This matters because the repo's whole stated philosophy (README "per project, on
   purpose"; the saved user preference for project-scope plugins) is *project* scope — a user-scope
   install would contradict it. §0 should be corrected and reconciled with that philosophy.

2. **Marketplace drift.** `README.md` Part A tells users to `/plugin marketplace add
   obra/superpowers-marketplace` and install `superpowers@superpowers-marketplace`, but the repo
   actually has `superpowers@claude-plugins-official`. Harmless, but the README and the committed
   settings disagree on where superpowers comes from; pick one so a new user's `/plugins` list
   matches the instructions.

3. **The seven proposed root files do not exist yet.** Confirmed: root today holds only
   `CLAUDE.md`, `README.md`, `SE_Discipline.md`, `WHAT_THIS_DIR_IS.md`, `SE_for_AI_09.*`. So R1–R10
   are entirely net-new surface — the "existing" annotations in §2's tree refer only to `.claude/`,
   `openspec/`, and the docs, which is accurate, but the reader should know nothing else is there.

4. **No `.github/`, `tests/`, or `scripts/` exist.** Confirms C8: there is no branch protection,
   no runner, and nothing for a "required check" to gate — R3/R4/R5 are 100% greenfield and cannot
   be exercised until a reference app exists (which `_03`'s own next-action #3 acknowledges).

---

## Part 4 — Additional recommendations (beyond R1–R10)

### A1. One source of truth for risk tiers, with a generator (fixes C2)

Author `RISK_TIERS.md` only. Add `scripts/gen-settings.mjs` (Node, cross-platform — runs on the
Windows host without WSL) that reads the tier table and emits the `permissions` block of
`.claude/settings.json`. Have `PROJECT_CONTEXT.md` §6 *link to* `RISK_TIERS.md` instead of copying
it. Now the three-file drift in C2 is impossible: there is one authored file and one generated file.

### B1. A promotion scorecard — the measurement the mission actually needs (fixes C11)

Add `PROMOTION_LOG.md` (or a section of `CAPABILITY_REGISTRY.md`): one row per change sent toward
Dymon PROD, recording **what central IT sent back and why**. This is the empirical evidence
`WHAT_THIS_DIR_IS.md` demands, and it feeds the compounding loop directly — every rework reason
becomes a new guardrail, golden case, or `PROJECT_CONTEXT` rule. This is higher-value than R7 and
should arguably replace it: a registry of *what got rejected and fixed* compounds harder than a
registry of *what was reusable*.

### C-fix. Consolidate the six behavioral markdown files into fewer surfaces (fixes C1/C3)

Rather than seven root files, fold R1/R6/R7/R10 into a single `GOVERNANCE.md` (business context,
decision log, capability registry, who-does-what) and keep only the two *structural* items —
`RISK_TIERS.md` (→ generates `settings.json`, R4) and the `tests/golden/` + CI (R3) — as first-class
artifacts. Same discipline, a quarter of the file sprawl, and the split visibly signals which items
are enforced vs. advisory.

### G1. Two explicit profiles, matching the per-project philosophy (fixes C3)

State them in `README.md`:
- **Lite profile (default):** the two files the README already describes. For scripts, notebooks,
  throwaways. No governance layer.
- **PROD-track profile:** Lite + the R-items. For anything bound for Dymon PROD.

This preserves the "per project, on purpose" principle the repo is built on (and the user's saved
project-scope preference) instead of silently making every project heavyweight.

### F1. Ship hooks and scripts as `.ps1`/`node`, not `.sh` (fixes C7)

Reference implementations should run on the stated Windows/PowerShell host with no WSL. Provide the
PreToolUse hook as `scripts/warn-if-audit-path.ps1` (or a `node` script), and note the WSL/Git-Bash
fallback only as an alternative.

### P1. Add the branch-protection step explicitly (fixes C8)

Wherever R3 says "required check," add a one-line human/admin action: "In GitHub → Settings →
Branches, mark `golden-gate` a required status check." Without it the gate is advisory.

### D1. Dogfood the pipeline to build the Phase-3 reference app

`_03`'s next-action #3 (scaffold a small reference app) is the right move — and it's also the
perfect first real exercise of the whole bundle. Build it *through* the pipeline (OpenSpec propose →
ce-plan → TDD → review), so the reference app is simultaneously (a) the thing R3/R4 enforce against
and (b) the first end-to-end proof the bundle works. Two birds.

---

## Part 5 — Revised priority order

`_03` orders R1–R10 "by leverage," but by *enforceability × mission-impact* I'd reorder:

1. **R4 + A1** — config-enforced permissions with a single generated source. Structural. Do first.
2. **R3 + P1** — golden tests, CI gate, and the branch-protection step that makes it real. Structural.
3. **D1** — the reference app, so R3/R4 have something to bite on (and the bundle gets proven).
4. **B1** — promotion scorecard. The measurement the mission needs.
5. **R2 / R5** — ticket + PR templates. Useful discipline; label them advisory, not "gates."
6. **Consolidated `GOVERNANCE.md`** (R1 + R6 + R7 + R10). Fold, don't sprawl.
7. **§0 + README factual fixes** (Part 5 corrections). Cheap, do alongside #1.
8. **R8** — deployment checklist. Guidance-only, correct as scoped.
9. **R9 — cut.** Keep only the mapping table as an appendix; do not rename canonical stages.

The `_03` document is worth acting on. The edits above mostly ask it to (1) be honest that only two
of its ten items are enforced, (2) stop duplicating risk data, (3) choose its audience, (4) fix the
Windows and branch-protection portability gaps, (5) add the one measurement its own mission implies,
and (6) correct §0 to match what's actually committed.
