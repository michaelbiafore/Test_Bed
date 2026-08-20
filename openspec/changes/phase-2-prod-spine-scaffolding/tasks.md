## 1. Toolchain scaffolding

- [x] 1.1 Add a minimal `package.json` (`"type": "module"`, no deps; scripts: `test` → `node --test`, `gen:settings` → `node scripts/gen-settings.mjs`)
- [x] 1.2 Create `scripts/` and `scripts/__tests__/` (or `*.test.mjs` beside the script) so `node --test` discovers the generator test

## 2. Generator — test-first (risk-tier-permission-sync)

- [x] 2.1 RED: write `gen-settings.test.mjs` with a fixture tiers table (one row per tier + the Off-limits examples) asserting the exact `allow`/`ask`/`deny` arrays, including Off-limits `Read(<glob>)` + derived `Bash(*<token>*)`; run `node --test` and confirm it fails
- [x] 2.2 GREEN: implement `scripts/gen-settings.mjs` — parse the `## Path assignments` table (D2), apply the D3 mapping + token derivation, throw on unknown/blank tier; make the test pass
- [x] 2.3 Add tests + code for idempotency (byte-stable re-run) and key-preservation (existing `hooks` survives; `settings.local.json` never touched) per the spec's remaining scenarios
- [x] 2.4 REFACTOR: tidy the parser/emitter with tests green; confirm `node --test` still passes

## 3. Generate the committed settings

- [x] 3.1 Run `npm run gen:settings` against the current `RISK_TIERS.md` placeholder table to produce `.claude/settings.json` (permissions block)
- [x] 3.2 Add the `PreToolUse` hook entry to `.claude/settings.json` pointing at `scripts/warn-if-audit-path.ps1`; re-run the generator and confirm the hook entry is preserved (idempotent)

## 4. Audit-path guard hook (audit-path-edit-guard)

- [x] 4.1 Implement `scripts/warn-if-audit-path.ps1` — read tool payload on stdin, read `ask` globs from `.claude/settings.json`, require confirmation on match, fail-open on missing/malformed input (D5)
- [x] 4.2 Add `scripts/warn-if-audit-path.sh` as a documented WSL-only fallback (clearly marked secondary)
- [x] 4.3 Manually exercise the hook on the Windows host: feed a sample ask-path payload (expect confirmation) and a non-sensitive payload (expect pass-through); capture the output as evidence

  **Evidence (run on the Windows/PowerShell host):**
  - `{"tool_input":{"file_path":"src/rules/pricing.js"}}` -> `{"hookSpecificOutput":{"permissionDecision":"ask",...}}`, exit 0 (ask-tier match)
  - `{"tool_input":{"file_path":"src/reports/monthly.audit.ts"}}` -> `permissionDecision:"ask"`, exit 0 (audit glob match)
  - `{"tool_input":{"file_path":"src/ui/button.js"}}` -> no output, exit 0 (safe path passes through)
  - `not json` -> no output, exit 0 (malformed input fails open)

## 5. CI workflows (golden-regression-ci)

- [x] 5.1 Add `.github/workflows/golden-gate.yml` — `on: pull_request`, a green `TODO(phase-3)` placeholder test step
- [x] 5.2 Add `.github/workflows/golden-drift-check.yml` — weekly `schedule` cron + `workflow_dispatch`, same placeholder, `actions/github-script` opening an issue under `if: failure()`
- [x] 5.3 Validate both files are well-formed YAML (parse-check locally)

## 6. Verify & close

- [x] 6.1 Run the full check: `npm test` green; `git diff` shows only the intended files; regenerating `settings.json` produces no diff
- [x] 6.2 `openspec validate phase-2-prod-spine-scaffolding --strict` passes
- [x] 6.3 Route through `/ce-code-review` (or the code-review skill), then commit as Phase 2 on `br_ZZUpgrade`

## 7. Applied from code review (Phase 2)

- [x] 7.1 `.env*` -> `**/.env*` in `RISK_TIERS.md` so nested dotenv files are denied (native boundary fix); regenerated `settings.json`
- [x] 7.2 `bashToken` keeps the dot (`.env*` -> `Bash(*.env*)` not `Bash(*env*)`) to stop over-blocking `printenv`/`conda env`; documented as best-effort defense-in-depth
- [x] 7.3 Added tests: missing-section-header throw, empty-token (all-wildcard) silent-skip, real round-trip idempotency; simplified the unknown-tier test

## 8. Deferred to Phase 4 (from code review — see design.md "Known limitations")

- [ ] 8.1 Fix hook glob->regex matching: anchor the match, treat a leading `**/` as zero-or-more directories, relativize the payload path to the repo root
- [ ] 8.2 Have `gen-settings.mjs` emit a pre-computed, unit-tested pattern/glob list into `settings.json` so `.ps1`/`.sh` stop re-implementing translation (kills M1 duplication + M2 entry-format coupling)
- [ ] 8.3 Add hook automated tests (Pester / BATS) covering match, non-match, and all fail-open branches, as part of Phase 4's adversarial enforcement proof
