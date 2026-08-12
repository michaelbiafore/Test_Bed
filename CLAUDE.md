# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Operating playbook — read this first

**Before doing any development work in this repo, read and follow `@SE_Discipline.md`.** It is the operating playbook: it tells you to run spec-first (OpenSpec) and test-first (Superpowers TDD) with human approval checkpoints, so that even a non-expert can just state a goal in plain language and let you drive the tools. Spec first, test first, code last — surgical diffs, verify before claiming done.

## What this repo is

`Test_Bed` is a **standalone git repo** (`github.com/michaelbiafore/Test_Bed`) used as a clean sandbox to validate one specific bundle of software-engineering-for-AI frameworks working *together*. It is **not** part of the parent `SE_for_AI/` workspace's git history — do not commit here expecting it to land in the survey workspace, and do not treat the parent `SE_for_AI/CLAUDE.md` (which describes a collection of vendored forks) as describing this repo.

Read `WHAT_THIS_DIR_IS.md` for the mission in the author's words. The short version: prove that this four-framework bundle produces code conformant enough to widely accepted SE norms that AI Fellows' output can be promoted to **Dymon PROD** with minimal rework by central IT. `SE_for_AI_09.md` / `.pdf` is the survey that selected the bundle and documents the full install procedure with figures — it is the source of truth for *why* these four, and how they were installed.

There is **no application code yet** (`src/` does not exist), and therefore **no build / test / lint** at this level. Any real project scaffolded here brings its own tooling; drive verification through the frameworks below, not a root-level script.

## The installed bundle (four layers)

The whole point of this repo is that these four are active simultaneously. Each owns a distinct layer; they are meant to be composed, not chosen between.

| Framework | Layer | How it's installed | You invoke it via |
|-----------|-------|--------------------|-------------------|
| **OpenSpec** | Spec — the *what/why*, front-loaded and reviewable | **Per-repo, committed** (`openspec/`, `.claude/skills/openspec-*`, `.claude/commands/opsx/`) | `/openspec-propose`, `/openspec-apply-change`, `/openspec-archive-change`, `/openspec-explore`, `/openspec-sync-specs`, `/openspec-update-change` (canonical alias: `/opsx:*`) |
| **Compound Engineering** | Workflow loop — Plan → Work → Review → Compound | Global plugin (`~/.claude`) | `/ce-plan`, `/ce-work`, `/ce-code-review`, `/ce-doc-review`, `/ce-compound`, `/ce-commit*`, `/lfg` (full autonomous run), and other `/ce-*` |
| **Superpowers** | Engineering discipline — the *how* (TDD, subagent-driven dev) | Global plugin | **Auto-triggers**; also `superpowers:*` skills (brainstorming, systematic-debugging, test-driven-development, verification-before-completion, …) |
| **karpathy-skills** | Guardrails — the *don't* (no silent assumptions, no over-engineering, no orthogonal edits, define verifiable success) | Global plugin | **Always-on** via `andrej-karpathy-skills:karpathy-guidelines` |

Superpowers and karpathy-skills are **not invoked explicitly** — they shape every response. Do not restate or re-implement their rules; let the skills do their job and follow them.

`.claude/settings.local.json` is what pins this repo to the bundle: it enables the `superpowers` and `andrej-karpathy-skills` plugins (compound-engineering is enabled globally). If a `/ce-*` or `/openspec-*` command doesn't autocomplete, the plugins/commands load at session start — restart the session or `/reload-plugins`; don't assume the framework is broken.

## The intended end-to-end workflow

When driving a substantial feature so all four layers engage (from `SE_for_AI_09.md` Step 7):

1. **Spec** — `/openspec-propose <change>`; review/edit the generated `proposal.md`, `specs/`, `design.md`, `tasks.md`. Skip for quick iterations.
2. **Plan** — `/ce-plan` turns the spec/idea into a concrete implementation plan.
3. **Work** — `/ce-work` or `/openspec-apply-change`. Superpowers auto-runs TDD (red→green→refactor); karpathy rules keep edits surgical.
4. **Review** — `/ce-code-review` (security/architecture/quality) + `/ce-doc-review` for the spec; corroborate with Superpowers' test gates.
5. **Compound** — `/ce-compound` documents learnings so the next cycle is faster.
6. **Archive** — `/openspec-archive-change` moves the finished change into a dated `openspec/changes/archive/` folder.

OpenSpec and Compound Engineering intentionally overlap on planning — that is by design. Lead with the Compound loop for day-to-day iteration; reach for OpenSpec when a change warrants a heavyweight, committed spec.

## OpenSpec mechanics

- Changes live under `openspec/changes/<name>/` (`proposal.md`, `specs/`, `design.md`, `tasks.md`); completed work archives to `openspec/changes/archive/<date>-<name>/`.
- `openspec/config.yaml` (`schema: spec-driven`) is where you add project context and per-artifact rules that the AI sees when generating artifacts — populate it before proposing if the project has a fixed tech stack or conventions.
- CLI: `openspec init` (already done here), `openspec update` (refresh agent instructions), `openspec --version`. Requires **Node.js ≥ 20.19.0**.

## Platform

Host is **Windows 11 / PowerShell** (see the parent workspace notes). OpenSpec is an npm CLI and runs natively; the Compound Engineering / Superpowers skills are cross-platform. Frameworks that ship Unix `.sh` helpers should be run via WSL/Git Bash or by calling the underlying `npm`/`node` command directly.
