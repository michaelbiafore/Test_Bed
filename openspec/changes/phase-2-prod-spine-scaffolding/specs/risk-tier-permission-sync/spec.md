## Purpose

Derive the enforced Claude Code permission config from the human-authored risk-tier table, so risk
data lives in exactly one place (`RISK_TIERS.md`) and the config the model cannot bypass is generated
rather than hand-maintained.

## ADDED Requirements

### Requirement: Generate permissions from the risk-tier table

The generator SHALL read the "Path assignments" table in `RISK_TIERS.md` and produce the `permissions`
block (`allow` / `ask` / `deny`) of `.claude/settings.json`. It SHALL treat `RISK_TIERS.md` as the sole
input for tier data and MUST NOT read tier assignments from any other file.

#### Scenario: Each tier maps to its permission class
- **WHEN** the table assigns a path glob to a tier
- **THEN** a Low or Medium row produces an `allow` entry, a High row produces an `ask` entry, and an
  Off-limits row produces a `deny` entry, each referencing that path glob

#### Scenario: Off-limits paths also deny command and read access
- **WHEN** a path is assigned the Off-limits tier
- **THEN** the generated `deny` list additionally includes command and read boundaries derived from
  that path (e.g. a `Bash(...)` and a `Read(...)` entry) so the path cannot be reached via shell or read

#### Scenario: Unknown or blank tier is rejected, not silently allowed
- **WHEN** a table row names a tier that is not one of Low / Medium / High / Off-limits
- **THEN** the generator SHALL fail with a non-zero exit and a message naming the offending row, rather
  than emitting a partial or permissive config

### Requirement: Deterministic, idempotent output

The generator SHALL produce byte-stable output for a given `RISK_TIERS.md`, so regeneration produces no
diff when the source is unchanged and the result is safe to commit and review.

#### Scenario: Re-running on unchanged input yields no change
- **WHEN** the generator runs twice against the same `RISK_TIERS.md`
- **THEN** the second run's output is identical to the first (stable ordering, stable formatting)

#### Scenario: Runs on the Windows host without WSL
- **WHEN** the generator is invoked with the repo's Node runtime on the Windows 11 host
- **THEN** it completes without requiring bash, WSL, or any non-Node dependency

### Requirement: Generation preserves non-permission settings

Writing the generated `permissions` block SHALL NOT discard other keys in `.claude/settings.json` (such
as a `hooks` entry) and SHALL NOT modify `.claude/settings.local.json`.

#### Scenario: Existing hook wiring survives regeneration
- **WHEN** `.claude/settings.json` already contains a `hooks` entry and the generator regenerates
  `permissions`
- **THEN** the `hooks` entry is preserved in the written file and `settings.local.json` is left untouched
