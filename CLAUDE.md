# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Operating playbook — read this first

**Before doing any development work in this repo, read and follow `@SE_Discipline.md`.** It is the operating playbook: it tells you to run spec-first (OpenSpec) and test-first (Superpowers TDD) with human approval checkpoints, so that even a non-expert can just state a goal in plain language and let you drive the tools. Spec first, test first, code last — surgical diffs, verify before claiming done.

## What this repo is

`Test_Bed` is a **standalone git repo** (`github.com/michaelbiafore/Test_Bed`) used as a clean sandbox to validate one specific bundle of software-engineering-for-AI frameworks working *together*. It is **not** part of the parent `SE_for_AI/` workspace's git history — do not commit here expecting it to land in the survey workspace, and do not treat the parent `SE_for_AI/CLAUDE.md` (which describes a collection of vendored forks) as describing this repo.

Read `WHAT_THIS_DIR_IS.md` for the mission in the author's words. The short version: prove that this framework bundle produces code conformant enough to widely accepted SE norms that AI Fellows' output can be promoted to **Dymon PROD** with minimal rework by central IT. `SE_for_AI_09.md` / `.pdf` is the survey that selected the original **four** and documents their install procedure with figures — it is the source of truth for *why* those four. The **fifth** layer (mattpocock-skills) was added later; its selection rationale and install procedure are in `Plans/PLAN_Pocock_01.md`, decided in `Mandates/Pocock_MANDATE_02.md`.

There is **no application code yet** (`src/` does not exist), and therefore **no build / test / lint** at this level. Any real project scaffolded here brings its own tooling; drive verification through the frameworks below, not a root-level script.

## The installed bundle (five layers)

The whole point of this repo is that these five are active simultaneously. Each owns a distinct layer; they are meant to be composed, not chosen between.

| Framework | Layer | How it's installed | You invoke it via |
|-----------|-------|--------------------|-------------------|
| **OpenSpec** | Spec — the *what/why*, front-loaded and reviewable | **Per-repo, committed** (`openspec/`, `.claude/skills/openspec-*`, `.claude/commands/opsx/`) | `/openspec-propose`, `/openspec-apply-change`, `/openspec-archive-change`, `/openspec-explore`, `/openspec-sync-specs`, `/openspec-update-change` (canonical alias: `/opsx:*`) |
| **Compound Engineering** | Workflow loop — Plan → Work → Review → Compound | Plugin: installed machine-wide, **enabled per project** | `/ce-plan`, `/ce-work`, `/ce-code-review`, `/ce-doc-review`, `/ce-compound`, `/ce-commit*`, `/lfg` (full autonomous run), and other `/ce-*` |
| **Superpowers** | Engineering discipline — the *how* (TDD, subagent-driven dev) | Plugin: installed machine-wide, **enabled per project** | **Auto-triggers**; also `superpowers:*` skills (brainstorming, systematic-debugging, test-driven-development, verification-before-completion, …) |
| **karpathy-skills** | Guardrails — the *don't* (no silent assumptions, no over-engineering, no orthogonal edits, define verifiable success) | Plugin: installed machine-wide, **enabled per project** | **Always-on** via `andrej-karpathy-skills:karpathy-guidelines` |
| **mattpocock-skills** | Alignment and design — the *are we sure* (adversarial grilling, deep-module vocabulary, shared glossary) | **Per-repo, committed** (`.claude/skills/`, 12 of 25 skills) | `/grill-me`, `/grill-with-docs`, `/improve-codebase-architecture`, `/wait-what`, `/handoff`, `/wizard`; the other six auto-trigger |

Superpowers and karpathy-skills are **not invoked explicitly** — they shape every response. Do not restate or re-implement their rules; let the skills do their job and follow them.

`.claude/settings.local.json` (per-user, git-ignored) is what pins this repo to the bundle: the Part B `/plugin install` commands project-enable all three plugins — `superpowers`, `compound-engineering`, and `andrej-karpathy-skills` — for this repo, keeping them project-scoped on purpose rather than globally enabled. Nothing here is on for every project by default; that is deliberate, because project types differ. The fifth layer is not a plugin at all: the Pocock skills are committed files under `.claude/skills/`, so they arrive with a clone and need no per-user enablement.

If a `/ce-*` or `/openspec-*` command doesn't autocomplete, the plugins/commands load at session start — restart the session or `/reload-plugins`; don't assume the framework is broken.

## The Pocock layer

Twelve skills from `mattpocock/skills` are installed as committed, editable files under `.claude/skills/`. Unlike the three plugins, these are ordinary files in this repo: they travel with a clone, and they can be edited. Installation and verification are in `README.md`; the selection rationale is in `Plans/PLAN_Pocock_01.md`.

**Six are user-invoked** and you cannot reach them — only the human can type them: `/grill-me`, `/grill-with-docs`, `/improve-codebase-architecture`, `/wait-what`, `/handoff`, `/wizard`.

**Six fire on their own** or are pulled in by another skill: `grilling`, `domain-modeling`, `codebase-design`, `tdd`, `diagnosing-bugs`, `writing-for-agents`.

### CONTEXT.md belongs to this layer

`CONTEXT.md` at the repo root is **this project's glossary** — the shared vocabulary the human and you use for domain terms. It exists to serve the Pocock skills, and four of them read it: `domain-modeling` writes and sharpens it, while `tdd`, `diagnosing-bugs`, and `improve-codebase-architecture` read it so that test names, module descriptions, and architecture candidates all use the project's own words.

- **Read it before exploring the codebase.** If it does not exist yet, the human has not run `/grill-with-docs`; say so rather than inventing vocabulary.
- **Keep it free of implementation detail.** It is a glossary, not a spec. Specs live in `openspec/`; architectural decisions live in `docs/adr/`.
- Merely *reading* it for vocabulary is a one-line habit, not the `domain-modeling` skill. That skill is for when you are actively *changing* the model.

### Precedence and exclusions

Where these overlap the other layers, the precedence rules are in `SE_Discipline.md` — follow them rather than picking whichever skill description matches first.

Do **not** attempt to run Pocock's `to-spec`, `to-tickets`, `implement`, `triage`, or `code-review`. They are deliberately not installed, because OpenSpec and Compound Engineering own those steps.

## The intended end-to-end workflow

When driving a substantial feature so all five layers engage (from `SE_for_AI_09.md` Step 7, plus the alignment step added in `Plans/PLAN_Pocock_01.md`):

0. **Align** — the human runs `/grill-me` (or `/grill-with-docs` when the work touches domain vocabulary). You cannot start this yourself; if substantial work arrives without it, say so and recommend it. The resulting conversation is the input to step 1.
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
