# PLAN — ZZ-Influenced Upgrade of Test_Bed (v01)

**Goal:** apply the useful recommendations from `Close_the_Gap_03.pdf` to `Test_Bed`, filtered
through the critiques in `Close_the_Gap_04.md` / `Close_the_Gap_05.md` and the four decisions locked
on 2026-08-19. The result is a single repo that (a) is a clean **Track S (pure-software)** template by
default, (b) carries a shared **PROD-promotion spine** that makes "promotable to Dymon PROD with
minimal rework" structurally enforced rather than aspirational, and (c) offers an **optional
product-definition front-end** for **Track E (elicitation-first)** work — all without a second repo
and without changing the spec/build/learn backbone.

This plan document is itself just a plan. Any step that writes *code* (the risk-tier generator, the
hooks, the CI workflows, the reference app) MUST run through the repo's own pipeline per
`SE_Discipline.md`: spec first (OpenSpec), test first (Superpowers TDD), surgical diffs, verify before
claiming done. Pure-markdown template steps are lighter but still get a review pass.

---

## 0. Decisions locked (the lens for everything below)

These supersede the corresponding branches in `Close_the_Gap_03/04/05`:

1. **Superpowers is the permanent build layer. gstack is rejected under all circumstances.** No
   gstack-forced fork; the "integrated all-in-one" branch is dead.
2. **One repo with an optional front-end.** Track E is a switchable module *inside* Test_Bed, not a
   separate project.
3. **OpenSpec stays the sole spec tool for both tracks.** Spec Kit is withdrawn (it was floated on
   *auditability*, not brownfield grounds; audit defensibility instead comes from the PROD-spine +
   OpenSpec's committed change archive). Reconfirmed: OpenSpec is the brownfield/iterative tool, Spec
   Kit is the greenfield/governance tool — revisit Spec Kit only if an external risk committee ever
   makes a ratified constitution a hard requirement, as a separate whole-repo decision.
4. **Track E's front-end = BMAD's planning phase used *selectively* (Analyst/PM elicitation → product
   brief), handing its output into `/openspec-propose`.** Not full BMAD ceremony; not markdown that
   re-simulates elicitation. All target projects are greenfield.

**The discriminator between tracks** (apply *per requirement*, not per project): *Can the developer
write the golden/acceptance cases themselves now, or must they be elicited from a business owner who
hasn't articulated them?* Developer-can → Track S. Must-elicit → turn on the Track E front-end for
those requirements.

---

## 1. Recap of every suggestion in `Close_the_Gap_03.pdf`

| # | `_03` recommendation | ZZ mechanism it replicates |
|---|----------------------|----------------------------|
| §0 | Priority-zero: confirm the three plugins are installed/enabled (claimed done at **user** scope) | — |
| R1 | `PROJECT_CONTEXT.md.template` — 6 sections (business context, process/data, rules, technical, tests/commands, risk boundaries) | ZZ's `AGENTS.md` business-context schema |
| R2 | `openspec/templates/requirement-ticket.md` + `config.yaml` `rules.proposal`; named owner + "freeze" gate + blocking "Open items" list | ZZ's 5-state requirement ticket (Submit→AI check→Review→Confirm→Freeze) |
| R3 | `tests/golden/<capability>/` assets + `.github/workflows/golden-gate.yml` (required check) + `golden-drift-check.yml` (weekly) | ZZ's golden cases + merge-blocking CI + drift re-run |
| R4 | `.claude/settings.json.template` (allow/ask/deny) + `RISK_TIERS.md` + PreToolUse hooks | ZZ's 4-tier (Low/Med/High/Off-limits) config-enforced permissions |
| R5 | `.github/PULL_REQUEST_TEMPLATE.md` with business questions | ZZ's fixed PR questionnaire |
| R6 | `DECISION_LOG.md` + `SE_Discipline.md` Step 4.5 "Business trial" | ZZ's business-trial → decision-log → test loop |
| R7 | `CAPABILITY_REGISTRY.md` + `SE_Discipline.md` Step 5 makes registry update required | ZZ's cross-project reusable-capability registry |
| R8 | `DEPLOYMENT_CHECKLIST.md` (guidance-only, no tooling) | ZZ's on-prem/masked-data/2-person-approval compliance choreography |
| R9 | Rename `SE_Discipline.md` pipeline stages to ZZ's six names | ZZ's stage taxonomy |
| R10 | README "Who does what" role table (business owner ≠ domain confirmer ≠ deployment approver) | ZZ's named-role hour commitments |
| §2 | Proposed repo layout after R1–R10 | — |
| §3 | 5-phase rollout (templates → pipeline gate → reference app → prove CI blocks → update verdict table) | ZZ's 5-phase rollout |
| §4 | Deliberately **not** imported: 3-person delivery units, 10-person org, named-lead hours, client-tied 5-phase rollout, Shadow→Guided→Solo transfer | (ZZ staffing/org — correctly out of scope) |
| §5 | Next 3 actions: verify install fires; add the 6 markdown templates; scaffold a reference app | — |

**Additions from `_04` folded into this plan:** A1 (single source of truth for risk tiers + generator),
B1 (promotion scorecard), Windows-native hooks (not `.sh`), explicit branch-protection step, consolidate
behavioral markdown, dogfood the reference app through the pipeline.

---

## 2. Disposition of each item under the locked decisions

Legend — **Disposition:** KEEP (into core, ~as proposed) · TRIM (into core, business parts removed) ·
MOVE→E (into the optional Track E front-end) · SHARED (PROD-spine, both tracks) · CUT.
**Enforcement:** Structural (config/CI/hook the model can't bypass) · Advisory (markdown the model is
asked to honor).

| # | Disposition | Enforcement | Where it lands |
|---|-------------|-------------|----------------|
| §0 | KEEP (as a fix) | — | Housekeeping: correct scope claim, verify plugins fire |
| R1 | TRIM + MOVE→E | Advisory | Core gets `PROJECT_CONTEXT` §4 tech / §5 tests / §6→refs RISK_TIERS. Business §1–3 → Track E front-end |
| R2 | MOVE→E | Advisory | Track E front-end (requirement ticket + named owner). Track S: developer is owner, so optional/light |
| R3 | KEEP | **Structural** | Core PROD-spine: `tests/golden/`, `golden-gate.yml`, `golden-drift-check.yml` |
| R4 | KEEP (via A1) | **Structural** | Core PROD-spine: `RISK_TIERS.md` → generator → `settings.json`; Windows-native hooks |
| R5 | TRIM | Advisory | Core: engineering questions. The "which business rule?" question → Track E variant |
| R6 | MOVE→E | Advisory | Track E front-end: `DECISION_LOG.md` + elicitation-addendum Step |
| R7 | SHARED (revised) | Advisory | Lightweight shared registry with an *owned, enforced* update step — or fold into Compound `docs/solutions/`. Decide in Phase 6 |
| R8 | SHARED | Advisory (guidance-only) | Core PROD-spine: `DEPLOYMENT_CHECKLIST.md` |
| R9 | **CUT** | — | Keep only a ZZ↔Test_Bed stage **mapping table** as an appendix; do **not** rename canonical stages |
| R10 | MOVE→E | Advisory | Track E front-end "who does what". Track S collapses roles into the solo developer |
| A1 (_04) | ADD | **Structural** | `RISK_TIERS.md` (sole source) + `scripts/gen-settings.mjs` → `.claude/settings.json` |
| B1 (_04) | ADD | Advisory→data | Core PROD-spine: `PROMOTION_LOG.md` (what central IT sent back and why) |

**Key consequence:** only **R3, R4, A1** are structurally enforced. Everything else is advisory
markdown — fine, but the plan invests real effort in the three structural items first, and does not
pretend the advisory ones are "gates."

---

## 3. Target repo layout after this upgrade

```
Test_Bed/
├─ .claude/
│  ├─ settings.json               # GENERATED from RISK_TIERS.md by scripts/gen-settings.mjs (R4/A1)
│  ├─ settings.local.json         # existing; reconcile scope (§0 fix)
│  ├─ skills/openspec-*/          # existing
│  └─ commands/opsx/*             # existing
├─ .github/
│  ├─ PULL_REQUEST_TEMPLATE.md    # R5 (engineering questions; business Q only if Track E on)
│  └─ workflows/
│     ├─ golden-gate.yml          # R3 — merge-blocking (needs branch protection, see Phase 4)
│     └─ golden-drift-check.yml   # R3 — weekly cron
├─ openspec/
│  ├─ config.yaml                 # existing; +rules.proposal ONLY if Track E on (R2)
│  ├─ templates/requirement-ticket.md   # R2 — lives here but referenced only by Track E
│  └─ changes/…                   # existing
├─ tests/golden/                  # R3 — created with the reference app (Phase 3)
│  ├─ <capability>/…
│  └─ EXCEPTIONS.md
├─ scripts/
│  ├─ gen-settings.mjs            # A1 — RISK_TIERS.md → .claude/settings.json (Node, cross-platform)
│  └─ warn-if-audit-path.ps1      # R4 — PreToolUse hook (PowerShell, NOT .sh)
├─ product-definition/            # ← OPTIONAL Track E front-end (whole dir is the switch)
│  ├─ README.md                   # how to turn Track E on; the golden-case test
│  ├─ PROJECT_CONTEXT.md.template # R1 business §1–3 (+ full 6 sections)
│  ├─ requirement-ticket.md       # R2 pointer/copy of openspec/templates/…
│  ├─ DECISION_LOG.md.template    # R6
│  ├─ who-does-what.md            # R10
│  └─ SE_Discipline_E_addendum.md # elicitation Step 0.5 + Step 4.5, feeding /openspec-propose
├─ RISK_TIERS.md                  # R4/A1 — SOLE source of truth for tiers
├─ DEPLOYMENT_CHECKLIST.md        # R8 — guidance-only
├─ PROMOTION_LOG.md               # B1 — the empirical measurement
├─ PROJECT_CONTEXT.md.template    # R1 (trimmed: §4 tech, §5 tests, §6 → refs RISK_TIERS)
├─ CAPABILITY_REGISTRY.md         # R7 — pending Phase 6 decision (may fold into Compound instead)
├─ CLAUDE.md  README.md  SE_Discipline.md  WHAT_THIS_DIR_IS.md  SE_for_AI_09.*   # existing, edited
└─ Plans/PLAN_ZZ_Upgrade_01.md   # this file
```

The `product-definition/` directory is the entire Track E switch: present + referenced from
`CLAUDE.md` = Track E on; absent/unreferenced = clean Track S.

---

## 4. Step-by-step plan (phased)

Each phase lists **actions**, the **files** touched, and **exit criteria**. Phases 0–2 add no runtime
risk (housekeeping + markdown + inert scaffolding). Phases 3–4 require a reference app. Phase 5 is the
optional Track E module. Phase 6 closes the loop.

### Phase 0 — Housekeeping & install verification (no code)
Fixes the factual/scope problems `_04` found before building on top of them.

1. **Verify the bundle actually fires.** In a fresh Claude Code session in this repo: `/plugins` lists
   superpowers + compound-engineering + andrej-karpathy-skills; confirm `/ce-code-review`, `/ce-plan`,
   `/ce-work`, `/ce-compound`, `/openspec-*` autocomplete, and that a Superpowers TDD skill +
   `karpathy-guidelines` appear in the session's skill listing.
2. **Reconcile plugin scope with the repo's stated philosophy.** Current `.claude/settings.local.json`
   enables only **two** plugins (superpowers@claude-plugins-official, andrej-karpathy-skills) and omits
   compound-engineering (assumed global). Decide and make consistent: either project-enable all three
   here (matches the "per project, on purpose" principle + the saved project-scope preference) or
   document the global exception explicitly. Fix `_03` §0's "all three at user scope" claim so it
   matches reality.
3. **Align marketplace references.** README Part A says install superpowers from
   `superpowers-marketplace`; the repo has `superpowers@claude-plugins-official`. Pick one and make
   README + settings agree.

**Exit:** all three plugins confirmed firing; `settings.local.json`, README, and any scope claims are
mutually consistent; no dangling "user vs project" contradiction.

### Phase 1 — Core Track S markdown (PROD-spine, no runtime dependency)
Pure markdown; can be added and reviewed immediately since there's no app yet.

1. **`RISK_TIERS.md`** — the sole source of truth: the 4-tier table (Low/Medium/High/Off-limits →
   handling) plus a per-project "which folder is which tier" section. Human-editable; nothing is
   generated *into* it. Add the `_04` human-facing note: "this is where you draw a line, not write
   prose."
2. **`DEPLOYMENT_CHECKLIST.md`** (R8) — guidance-only pre-PROD questions (on-prem boundary, masked
   data, two-person approval, audit log, rollback, named support owner). Explicitly "Claude will not
   fill this in — it's what central IT will ask you."
3. **`PROMOTION_LOG.md`** (B1) — one row per change sent toward Dymon PROD: what IT sent back and why.
   This is the mission's actual measurement; note in the header that each rejection reason should
   become a new golden case / risk rule / context entry.
4. **`PROJECT_CONTEXT.md.template`** (R1, **trimmed for Track S**) — keep §4 Technical, §5
   Tests/commands, and §6 Risk boundaries *as a reference to `RISK_TIERS.md`* (not a restatement).
   Business §1–3 are deferred to the Track E module (Phase 5).
5. **`.github/PULL_REQUEST_TEMPLATE.md`** (R5, **trimmed**) — engineering questions: golden/regression
   coverage, does-this-touch-High-tier, rollback plan, AI-authored-vs-human-reviewed. The "which
   business rule does this serve?" question is added only by the Track E module.
6. **Edit `CLAUDE.md`** — add `RISK_TIERS.md` and (later) `PROJECT_CONTEXT.md` to the "read this first"
   pointers; add Step-0 triage note: "if a High/Off-limits tier is touched, escalate to human review."
7. **Edit `SE_Discipline.md`** — **do NOT rename stages (R9 cut).** Instead append a small appendix:
   a ZZ-stage ↔ Test_Bed-step **mapping table** for readers arriving from the ZZ proposal.
8. **Edit `README.md`** — add a short "profiles" note pointing to Track S (default) vs the optional
   Track E front-end, and reference `PROMOTION_LOG.md`.

**Exit:** the four new root markdown files exist, are cross-referenced from CLAUDE/README/SE_Discipline,
contain no duplicated risk data (everything points at `RISK_TIERS.md`), and R9 is handled as an
appendix mapping only.

### Phase 2 — Structural scaffolding (built through the pipeline; inert until an app exists)
These are code. Run each through OpenSpec → TDD → review. They can be *added* now but only *bite* once
Phase 3 exists.

1. **`scripts/gen-settings.mjs`** (A1) — reads `RISK_TIERS.md`, emits the `permissions`
   (allow/ask/deny) block of `.claude/settings.json`. Node so it runs on the Windows host with no WSL.
   Write a failing test first (given a sample tiers table, asserts the generated JSON). This closes the
   three-places-for-risk-data drift `_04` flagged: `RISK_TIERS.md` is authored, `settings.json` is
   generated, `PROJECT_CONTEXT` §6 only references.
2. **`scripts/warn-if-audit-path.ps1`** (R4) — PreToolUse hook (PowerShell, **not** `.sh`) that
   stop-and-confirms on edits to `ask`-tier / audit paths. Add a `.sh` fallback only as a documented
   alternative for WSL users.
3. **`.claude/settings.json`** — generated by step 1; wire the PreToolUse hook entry. Keep
   `settings.local.json` for personal overrides (git-ignored where appropriate).
4. **`.github/workflows/golden-gate.yml`** (R3) — PR-triggered golden+regression job. Templated; the
   test command adapts to the reference app's stack in Phase 3.
5. **`.github/workflows/golden-drift-check.yml`** (R3) — weekly cron re-running golden+regression,
   opening an issue on failure.

**Exit:** generator has a passing test and correctly regenerates `settings.json` from `RISK_TIERS.md`;
hook script exists and is Windows-runnable; both workflow files are valid YAML committed but not yet
required (nothing to run against).

### Phase 3 — Reference app, built by dogfooding the pipeline (D1 from _04)
The reference app is simultaneously the proof the bundle works *and* the thing R3/R4 enforce against.

1. Choose a small but non-trivial capability (e.g., a rules-evaluation or validation utility — mirrors
   ZZ's risk classes so `EXCEPTIONS.md` is meaningful).
2. Build it **through the full pipeline**: `/openspec-propose` → human approve → `/ce-plan` →
   `/ce-work` under Superpowers TDD (red→green→refactor) → `/ce-code-review` → human approve →
   `/ce-compound` → `/openspec-archive-change`.
3. As part of it, create `tests/golden/<capability>/` (5–10 `*.input.json` + `*.expected.json`) and
   `tests/golden/EXCEPTIONS.md`. Point `golden-gate.yml`'s test command at the real runner.
4. Populate `RISK_TIERS.md` with the app's actual folders and regenerate `settings.json`.

**Exit:** a real app exists; `npm test` (or the app's runner) executes golden + unit tests locally and
in `golden-gate.yml`; a filled `PROJECT_CONTEXT.md` (Track S trim) describes it.

### Phase 4 — Prove the enforcement actually enforces (the point of R3/R4)
Structural claims are worthless unverified.

1. **Configure branch protection** in GitHub → Settings → Branches: mark `golden-gate` a **required
   status check** on `master`. (This is the step `_04` flagged as missing — a workflow existing does
   NOT make it required.)
2. **Adversarial CI test:** open a PR that deliberately breaks a golden case; confirm `golden-gate.yml`
   fails and the PR is un-mergeable.
3. **Adversarial hook test:** attempt an edit to a `deny`-listed path (e.g. `secrets/**`) and to an
   `ask`-tier path; confirm the deny is blocked and the ask triggers stop-and-confirm.
4. Record both results in `PROMOTION_LOG.md` / a short verification note (Superpowers
   verification-before-completion: show the output, don't assert).

**Exit:** documented evidence that (a) a bad golden case blocks merge and (b) a deny-path edit is
structurally refused. Only now are R3/R4 "real."

### Phase 5 — Optional Track E front-end module (`product-definition/`) — one repo, switchable
Build only if the golden-case test (§0) shows real elicitation-heavy work exists. Start with a spike.

1. **Spike first (validate before building the whole module):** run ONE real elicitation scenario
   using BMAD's planning phase *selectively* — Analyst (Mary) requirements elicitation → product brief
   → hand the brief into `/openspec-propose`. Confirm the product-intent layer earns its complexity for
   this team (the historical survey twice warns full BMAD is "overkill" unless genuinely ambiguous).
2. If validated, create `product-definition/`:
   - `README.md` — the golden-case test + how to turn Track E on (make BMAD planning available;
     reference this dir from `CLAUDE.md`).
   - `PROJECT_CONTEXT.md.template` — the full 6 sections incl. business §1–3 (R1).
   - `requirement-ticket.md` (R2) + wire `openspec/config.yaml` `rules.proposal` so `/openspec-propose`
     fills the ticket table + a blocking "Open items" list + a **named** requirement owner. State
     honestly in the doc that this is advisory (OpenSpec config is guidance, not a hard validator) —
     the human enforces the freeze.
   - `DECISION_LOG.md.template` (R6) + `SE_Discipline_E_addendum.md` adding Step 0.5 (elicit →
     product brief → propose) and Step 4.5 (business trial → log → convert each item to a golden case
     before code).
   - `who-does-what.md` (R10) — business owner ≠ domain confirmer ≠ deployment approver; "wear the hats
     on purpose."
3. Wire BMAD's planning-phase handoff so its brief feeds `/openspec-propose` (OpenSpec remains the only
   spec tool; BMAD does intake only, no second spec format).

**Exit:** turning on `product-definition/` makes elicitation run before OpenSpec on flagged
requirements; turning it off leaves a clean Track S repo. The spike is recorded (kept or killed).

### Phase 6 — Compounding, registry decision, verdict update
1. **R7 decision:** either (a) keep `CAPABILITY_REGISTRY.md` as a lightweight shared table with an
   *owned, enforced* update step in `SE_Discipline.md` Step 5, or (b) fold reusable-component tracking
   into Compound's existing `docs/solutions/` to avoid a rot-prone parallel file. Pick one; don't run
   both. (Recommendation leans (b) unless a human owner commits to maintaining the registry.)
2. **Wire `PROMOTION_LOG.md` into the loop:** `SE_Discipline.md` Step 5 (`/ce-compound`) also asks
   "did central IT send anything back? → log it → convert to a golden case / risk rule."
3. **Update the ZZ comparison verdict table** (`Compare_to_ZZ.md`) as each row moves Missing→Present;
   treat it as living, re-run rather than one-shot.

**Exit:** every `_03` gap row is either Present (with evidence) or explicitly deferred with a reason;
the registry question is resolved to a single mechanism.

---

## 5. Explicitly NOT doing (and why)

- **R9 stage rename** — CUT. Negative-value churn to match a doc most readers never see; appendix
  mapping table only.
- **gstack / any second implementation framework** — rejected by decision (Superpowers always).
- **Spec Kit / any second spec tool** — withdrawn; OpenSpec is sole spec backbone ("two spec tools = ✗").
- **A second repo** — rejected; Track E is an in-repo optional module.
- **ZZ §4 staffing/org** — 3-person units, 10-person org, named-lead hours, client-tied phases,
  Shadow→Guided→Solo transfer. Organizational, not a tooling-repo concern (matches `_03` §4).
- **Treating R1/R2/R5/R6/R7/R10 as "gates."** They are advisory markdown; the plan labels them as such.
  Only R3/R4/A1 are structural.

---

## 6. Exit criteria for the whole upgrade

1. Bundle verified firing; scope/marketplace claims consistent (Phase 0).
2. PROD-spine present and **proven**: a bad golden case blocks merge; a deny-path edit is refused;
   risk data lives in exactly one authored file (`RISK_TIERS.md`) with `settings.json` generated
   (Phases 1–4).
3. A reference app exists, built through the pipeline, with golden tests it must pass (Phase 3).
4. `PROMOTION_LOG.md` is in use as the empirical measure of "minimal rework" (Phases 1, 6).
5. Track E front-end is available and switchable, validated by one spike, and off by default (Phase 5).
6. The ZZ verdict table shows every row Present or deferred-with-reason (Phase 6).

---

## 7. Open questions to resolve before / during execution

1. ~~**Is Track E workload actually real** for the Fellows, or does "intent is supplied" still hold?~~
   **RESOLVED 2026-08-19:** the user base now explicitly includes experienced developers facing
   ZZ-like situations (business needs unknown at the outset). Track E is real; Phase 5 stays in scope.
2. **Plugin scope** (Phase 0.2): project-enable all three, or document a global compound-engineering
   exception?
3. **R7 registry vs Compound `docs/solutions/`** (Phase 6.1): who, if anyone, owns a manual registry?
4. **Reference-app capability choice** (Phase 3.1): which small domain best exercises the risk tiers?

---

*Sequenced dependencies: Phase 0 → 1 → 2 gate nothing external and can proceed now. Phase 3 unblocks
4. Phase 5 is independent and optional (needs the spike first). Phase 6 closes after 3–4. Code-bearing
steps (Phase 2, 3, and the hook/generator) run through OpenSpec + Superpowers TDD per SE_Discipline.md;
markdown steps get a lighter review pass.*
