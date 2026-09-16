# STATUS — ZZ-Upgrade Execution (snapshot 01)

**Date:** 2026-08-28
**Branch:** `br_ZZUpgrade`
**Governing plan:** `Plans/PLAN_ZZ_Upgrade_01.md`
**Purpose of this file:** a point-in-time record of what has actually been built vs. what the plan
still calls for. Verified against disk + git history, not just commit messages.

---

## 1. How the source documents relate

- `Close_the_Gap_03.pdf` — the raw recommendation source (R1–R10, §0–§5).
- `Close_the_Gap_04.md` / `Close_the_Gap_05.md` — the critique lens applied to `_03`.
- `PLAN_ZZ_Upgrade_01.md` — the live working plan. It **folds `_04` and `_05` in as the critique
  lens** ("apply the useful recommendations from `_03`, filtered through the critiques in `_04`/`_05`
  and the four decisions locked on 2026-08-19"). `_04`'s specific additions (A1 generator, B1
  promotion scorecard, Windows-native hooks, branch-protection step, consolidate behavioral markdown,
  dogfood the reference app) are explicitly folded into the plan.
- **Note:** `Close_the_Gap_05.md` still exists on disk as a standalone file. It was folded *in as the
  lens*, not deleted. `Close_the_Gap_04.md` and `Close_the_Gap_03.pdf` likewise remain on disk.

The plan reorganizes `_03` into three buckets:
1. **Track S** — clean pure-software default template.
2. **PROD-promotion spine** — the only structurally enforced part (R3 golden CI, R4 risk tiers,
   A1 generator). Everything else (R1/R2/R5/R6/R7/R10) is advisory markdown, labeled as such.
3. **Track E** — optional in-repo elicitation front-end (`product-definition/`), off by default.

---

## 2. Phase-by-phase status

| Phase | What | Status | Evidence |
|-------|------|--------|----------|
| **0** — Housekeeping & install verify | reconcile plugin scope; fix `_03` §0 scope claim | ✅ **done** | commit `e70bb0b` |
| **1** — Core Track S markdown (PROD-spine) | `RISK_TIERS.md`, `DEPLOYMENT_CHECKLIST.md`, `PROMOTION_LOG.md`, `PROJECT_CONTEXT.md.template`, PR template | ✅ **done** | commit `666c8ba`; all files present on disk |
| **2** — Structural scaffolding (inert until app exists) | `scripts/gen-settings.mjs` (+ test), `warn-if-audit-path.ps1`/`.sh`, `.claude/settings.json`, `golden-gate.yml`, `golden-drift-check.yml` | ✅ **done** | commit `59cf389`; all files present on disk |
| **3** — Reference app (dogfood the pipeline) | `src/`, `tests/golden/`, filled `PROJECT_CONTEXT.md` | ⛔ **not started** | no `src/`, no `tests/` on disk |
| **4** — Prove enforcement enforces | branch protection + adversarial CI/hook tests | ⛔ pending (needs Phase 3) | — |
| **5** — Optional Track E module | `product-definition/` + BMAD elicitation spike | ⛔ pending (independent; needs spike first) | no `product-definition/` |
| **6** — Compounding / registry / verdict | R7 decision; wire `PROMOTION_LOG.md` into loop; `Compare_to_ZZ.md` | ⛔ pending | `Compare_to_ZZ.md` does not exist yet |

---

## 3. Files confirmed on disk

**Phase 1 (present):**
- `RISK_TIERS.md`
- `DEPLOYMENT_CHECKLIST.md`
- `PROMOTION_LOG.md`
- `PROJECT_CONTEXT.md.template`
- `.github/PULL_REQUEST_TEMPLATE.md`

**Phase 2 (present):**
- `scripts/gen-settings.mjs` (+ `scripts/gen-settings.test.mjs`)
- `scripts/warn-if-audit-path.ps1` (+ `scripts/warn-if-audit-path.sh` fallback)
- `.claude/settings.json` (generated)
- `.github/workflows/golden-gate.yml`
- `.github/workflows/golden-drift-check.yml`

**Not yet present (expected in later phases):**
- `PROJECT_CONTEXT.md` (filled instance — Phase 3)
- `src/`, `tests/`, `tests/golden/` (Phase 3)
- `product-definition/` (Phase 5)
- `Compare_to_ZZ.md` (Phase 6)
- `CAPABILITY_REGISTRY.md` (Phase 6 decision — may fold into Compound `docs/solutions/` instead)

---

## 4. Working tree state

- Clean except one untracked file: `Plans/ai-programming-like-a-god-sample.pdf` — a stray sample PDF,
  unrelated to this plan.

---

## 5. Next action

**Phase 3 — build the reference app through the full pipeline.** This is the pivot from inert
scaffolding to something the golden-gate CI and risk-tier hooks actually bite on.

- **Open question to resolve first (plan §7.4):** which small, non-trivial capability best exercises
  the risk tiers? Plan suggests a rules-evaluation / validation utility that mirrors ZZ's risk classes
  so `tests/golden/EXCEPTIONS.md` is meaningful.
- **Code-bearing → runs through the pipeline** per `SE_Discipline.md`:
  `/openspec-propose` → human approve → `/ce-plan` → `/ce-work` (Superpowers TDD, red→green→refactor)
  → `/ce-code-review` → human approve → `/ce-compound` → `/openspec-archive-change`.
- As part of it: create `tests/golden/<capability>/` (5–10 `*.input.json` + `*.expected.json`) +
  `tests/golden/EXCEPTIONS.md`; point `golden-gate.yml`'s test command at the real runner; populate
  `RISK_TIERS.md` with the app's actual folders and regenerate `.claude/settings.json`.

---

## 6. Other unresolved open questions (plan §7)

2. **Plugin scope** (Phase 0.2): project-enable all three plugins, or document a global
   compound-engineering exception? (Phase 0 reconciled scope; confirm this specific choice is settled.)
3. **R7 registry vs Compound `docs/solutions/`** (Phase 6.1): who, if anyone, owns a manual registry?
4. **Reference-app capability choice** (Phase 3.1): which small domain best exercises the risk tiers?
   *(This one gates Phase 3 and must be answered next.)*
