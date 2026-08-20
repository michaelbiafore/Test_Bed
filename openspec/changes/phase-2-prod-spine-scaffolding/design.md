## Context

See `proposal.md — Why`. The repo has no `package.json`, no `scripts/`, and no test runner yet; the
host is Windows 11 / PowerShell with Node available. `RISK_TIERS.md` (Phase 1) already defines the
tier table this change consumes. `.claude/settings.local.json` exists (git-ignored: personal
`enabledPlugins` + allow-list) and Claude Code merges `settings.json` (committed) under it. The three
capabilities are specified in `specs/` — this doc covers only the *how*.

## Goals / Non-Goals

**Goals:**
- One authored source (`RISK_TIERS.md`) → generated, reviewable `.claude/settings.json` permissions.
- Zero new runtime dependencies; runs on the Windows host with no WSL.
- Every artifact committable and green *now*, biting only once Phase 3 supplies a real runner.

**Non-Goals:**
- Making the CI a *required* check or wiring a real test command (Phase 3/4).
- Adversarially proving the deny/ask actually blocks (Phase 4).
- Any package manager / bundler adoption.

## Decisions

**D1 — Test runner: Node's built-in `node:test` + `node:assert`.** Zero dependency, ships with Node,
runs `node --test` on Windows natively. *Alternatives:* Vitest/Jest (rejected — adds a dependency and a
`package.json` toolchain the repo deliberately doesn't have yet). A minimal `package.json` is added
only to declare `"type": "module"` and a `test`/`gen:settings` script.

**D2 — Markdown parsing: a small hand-rolled table reader, not a markdown library.** The generator
locates the `## Path assignments` section, then reads two-column pipe-table rows (`| glob | Tier |`),
skipping the header/separator and any `>` note lines. Scoping to that one section avoids a parser
dependency and avoids misreading the "four tiers" reference table. *Alternative:* a full markdown AST
(rejected — dependency + overkill for one fixed table).

**D3 — Tier → permission mapping (pinned by the test).**
- Low, Medium → `allow`; High → `ask`; Off-limits → `deny`.
- Each row emits `Edit(<glob>)` and `Write(<glob>)` into its class.
- Off-limits additionally emits `Read(<glob>)` into `deny`, plus a command boundary
  `Bash(*<token>*)` where `<token>` is derived deterministically from the glob: take the first
  path segment with wildcards and punctuation stripped (`secrets/**`→`secrets`, `**/prod_data/**`→
  `prod_data`, `.env*`→`env`). This gives the plan's `Bash(*prod*)` / `Read(**/prod_data/**)` shape
  from data, deterministically.
- Unknown/blank tier → throw with the offending row (fail loud, never emit a permissive partial).

**D4 — Generation preserves other keys.** The generator reads any existing `.claude/settings.json`,
replaces **only** the `permissions` key, and re-serialises with stable key ordering and a trailing
newline (idempotent output). It never reads or writes `settings.local.json`. Ordering within each
list is the table's row order, then a stable sort, so re-runs diff-clean.

**D5 — Hook sources its ask-list from the generated `settings.json`, not by re-parsing tiers.** The
PowerShell `PreToolUse` hook reads `.claude/settings.json`, extracts the globs from the `ask` entries,
reads the edit target path from the tool payload on stdin (`ConvertFrom-Json`), and requires
confirmation on a match. This keeps `RISK_TIERS.md` the single source (via generation) without
re-implementing tier logic in PowerShell. *Trade-off:* couples the hook to the entry-string format —
accepted because the format is simple and both are changed together. On missing/malformed payload or
missing settings the hook **fails open** (exits without blocking) so it can never wedge the session.

**D6 — CI placeholder is an explicit green no-op.** Both workflows run a step that echoes
"placeholder — Phase 3 wires the real runner" and exits 0, marked with a `TODO(phase-3)` comment.
`golden-gate.yml` triggers on `pull_request`; `golden-drift-check.yml` on a weekly `schedule` cron
plus `workflow_dispatch`, and on failure uses `actions/github-script` under `if: failure()` to open an
issue. Neither is marked required (that's Phase 4 branch protection).

## Risks / Trade-offs

- **Wrong permission-entry spelling → config ignored or over-restrictive.** → Pin exact strings in the
  generator test; keep entries additive; Phase 4 adversarially verifies a deny actually blocks.
- **Hook fails closed and wedges all edits.** → Fail-open on any parse/lookup failure (D5); scenario-tested.
- **Placeholder CI later mistaken for a real gate.** → Explicit echo + `TODO(phase-3)`; not required
  until Phase 4; exits 0 so it's visibly inert, not falsely passing real tests.
- **`.ps1` execution policy / CRLF on Windows.** → Invoke via `powershell -File`; document the WSL `.sh`
  fallback as secondary only.
- **Adding `package.json` changes repo shape.** → Keep it minimal (`type: module` + two scripts), no deps.

## Known limitations (surfaced in Phase 2 code review; deferred to Phase 4)

The hook's glob->regex matching (D5) has real defects that are **intentionally deferred** to Phase 4
(the phase whose job is to *prove and harden* enforcement against a real app + adversarial tests).
They are safe to defer because the hook is an **inert ask-tier convenience** today — the exact
boundary is the native `settings.json` Read/Edit/Write denies, which the Claude Code engine matches
correctly:

- **Unanchored match** — `-match` / `grep -Eq` match substrings, so an ask glob can fire on an
  unrelated path that merely contains it. (Over-fires = fail-safe for an ask gate.)
- **Leading `**/` treated as required** — `**/*.audit.*` misses a *root-level* audit file (false
  negative). Fix requires translating a leading `**/` to "zero or more directories".
- **Path not relativized** — payloads carry absolute paths while globs are repo-relative; today it
  "works" only by virtue of the unanchored match, so the anchoring fix and a relativization fix must
  land together.
- **Translation duplicated across `.ps1` and `.sh`** with divergent escaping (maintainability M1),
  and the hook re-parses the `Edit(<glob>)` entry format (M2). **Phase 4 plan:** have
  `gen-settings.mjs` emit a pre-computed, unit-tested pattern list (or extracted glob list) into
  `settings.json`, so both hooks *read* patterns instead of re-implementing translation — killing the
  duplication, the entry-format coupling, and the anchoring bug in one tested place. Add hook tests
  (Pester / BATS) at that point.

## Migration Plan

Purely additive. Deploy = commit the new files + generated `settings.json`. Rollback = delete the new
files; `settings.local.json` still governs and the repo returns to its Phase-1 state. No data migration.

## Open Questions

None that block implementation — the exact `allow`/`ask`/`deny` string spelling is settled by D3 and
locked by the generator's test before the workflows or hook depend on it.
