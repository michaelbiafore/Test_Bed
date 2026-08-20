## Purpose

Provide the CI surface that will gate merges on golden + regression tests and detect drift on a
schedule, wired now so Phase 3 only has to point it at a real test command.

## ADDED Requirements

### Requirement: Golden gate runs on pull requests

A workflow SHALL run golden + regression tests on every pull request, positioned to become a required
status check once a real runner exists (Phase 4). The workflow file SHALL be valid YAML.

#### Scenario: Workflow triggers on a pull request
- **WHEN** a pull request is opened or updated
- **THEN** the golden-gate workflow is triggered and runs its test step

#### Scenario: Placeholder command does not spuriously fail before Phase 3
- **WHEN** the workflow runs while the test command is still the Phase-2 placeholder (no app yet)
- **THEN** the step is a clearly-marked no-op that exits successfully, so the workflow is committable and
  green without yet being a meaningful gate

### Requirement: Weekly drift check opens an issue on failure

A scheduled workflow SHALL re-run golden + regression tests weekly and open a GitHub issue when they
fail, so silent drift surfaces without a human remembering to re-run.

#### Scenario: Scheduled run on a weekly cron
- **WHEN** the weekly cron fires
- **THEN** the drift-check workflow runs the same golden + regression step

#### Scenario: Failure raises an issue
- **WHEN** the scheduled run's test step fails
- **THEN** the workflow opens (or updates) a GitHub issue reporting the drift, rather than failing silently
