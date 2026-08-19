# RISK_TIERS.md — the one place you draw the line

**This file is the single source of truth for what Claude may touch.** `.claude/settings.json`
(the config the model *cannot* talk its way past) is **generated from this file** by
`scripts/gen-settings.mjs` — do not hand-edit `settings.json`; edit here and regenerate.
`PROJECT_CONTEXT.md` §Risk-boundaries should *reference* this file, not restate it.

This is the file a human actually edits: which folders can Claude touch freely, which need your
review, and which it must never touch at all. It's a line, not prose — keep it short.

---

## The four tiers

| Tier | Examples | Handling | `settings.json` class |
|------|----------|----------|-----------------------|
| **Low** | UI copy, styling, pure utility functions | AI edits directly, normal review | `allow` |
| **Medium** | Business flow, data validation, report logic | Test coverage required + human review (enforced by the PR template + CI, not by a permission gate) | `allow` |
| **High** | Calc rules, permissions, audit, sensitive-data handling | Tech-lead / human review required, **no auto-merge**; Claude must ask before editing | `ask` |
| **Off-limits** | Prod data, secrets, deploy config, core permissions | AI must **not** touch — deny-listed, not just discouraged | `deny` |

---

## Path assignments (fill in per project)

Map this project's real folders/globs to a tier. The generator reads **this table** to build
`settings.json`. One row per path pattern. Anything not listed defaults to **Medium** (`allow`,
but review it).

| Path / glob | Tier |
|-------------|------|
| `src/ui/**` | Low |
| `src/utils/**` | Low |
| `src/rules/**` | High |
| `src/validation/**` | High |
| `**/*.audit.*` | High |
| `secrets/**` | Off-limits |
| `.env*` | Off-limits |
| `**/prod_data/**` | Off-limits |

> The rows above are **placeholder examples** (they mirror the reference layout, not a real app yet).
> Replace them with this project's actual folders once code exists (upgrade Phase 3).

---

## How this maps to `settings.json` (the generator's rule)

`scripts/gen-settings.mjs` (upgrade Phase 2) turns the table above into permission rules:

- **Low / Medium → `allow`** — Claude may edit without a prompt. (Medium's extra discipline —
  test coverage + human review — is carried by the PR template and the golden-gate CI check, not by
  a permission gate.)
- **High → `ask`** — Claude must stop and get human confirmation before the edit, even mid-session.
- **Off-limits → `deny`** — the edit/read/command is structurally refused.

Command/read boundaries that aren't file-edit paths (e.g. `Bash(*prod*)`, `Read(**/prod_data/**)`)
are emitted into `deny` from the Off-limits rows as well.

---

## Human-facing guideline

Fill this in **once per project**, right after `PROJECT_CONTEXT.md`. Karpathy-style guardrails ship
in the bundle, but they're advisory — a config-enforced deny-list is the difference between "the
model tries not to" and "it structurally can't." If a change touches a **High** or **Off-limits**
row, that PR needs your eyes on the actual diff, not just a green test.
