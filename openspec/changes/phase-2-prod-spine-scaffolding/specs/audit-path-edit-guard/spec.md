## Purpose

Interpose a human confirmation step before any edit lands on an audit-sensitive / `ask`-tier path, so
the High-tier boundary is felt at edit time and not only discovered later in review.

## ADDED Requirements

### Requirement: Confirm before editing an ask-tier path

A `PreToolUse` hook SHALL run before file-editing tools and, when the target path matches an `ask`-tier
/ audit-sensitive pattern, SHALL interrupt so a human must confirm before the edit proceeds.

#### Scenario: Edit to an ask-tier path is paused for confirmation
- **WHEN** an edit is about to be applied to a path matching an `ask`-tier pattern
- **THEN** the hook signals that confirmation is required and the edit does not proceed automatically

#### Scenario: Edit to a non-sensitive path is not interrupted
- **WHEN** an edit targets a path that matches no `ask`-tier pattern
- **THEN** the hook allows the edit to proceed without prompting

### Requirement: Runs natively on the Windows host

The hook SHALL be implemented in PowerShell so it runs on the Windows 11 / PowerShell host without WSL.
A `.sh` variant MAY be provided as a documented fallback for WSL users but SHALL NOT be the primary.

#### Scenario: Hook executes under PowerShell
- **WHEN** Claude Code invokes the `PreToolUse` hook on the Windows host
- **THEN** the PowerShell script runs and returns its decision without requiring bash or WSL

#### Scenario: Hook receives tool input on stdin and does not crash on unexpected shapes
- **WHEN** the hook is invoked with the tool-call payload
- **THEN** it reads the target path from that payload and, if the payload is missing or malformed, exits
  without blocking (fails open rather than hard-erroring), leaving other gates responsible
