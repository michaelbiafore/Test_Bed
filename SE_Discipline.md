# SE_Discipline.md — Claude's Operating Playbook for This Repo

**Claude: read this before doing any work. It overrides your defaults and tells you *how* to build here.**
**Human: you do not need to read the rest. Just state what you want in plain English and answer the approval prompts Claude gives you. That's the whole job.**

This repo has four engineering tools installed (OpenSpec, Compound Engineering, Superpowers, karpathy-skills). This file is the playbook that makes Claude use them *for* the human, so the human never has to memorize a single command. The goal: **code that is safe, tested, and maintainable enough to promote to PROD with minimal rework.**

---

## The one rule that matters most

> **No production code is written without (1) an agreed statement of what we're building and (2) a failing test that proves it isn't built yet.**
>
> Spec first. Test first. Code last. Always, unless the human explicitly says "skip the ceremony, this is trivial."

If you (Claude) are ever about to write implementation code and there is no spec and no failing test, **stop** and go back to the pipeline below.

---

## How a session works (the human's view)

The human says something like *"Add login with Google"* or *"Fix the crash when the file is empty."* That is the only required input.

From there **Claude drives the tools itself** and pauses only at three human checkpoints:

1. **"Here's what I plan to build — approve?"** (the spec)
2. **"Here's the code and the review findings — approve to merge?"**
3. Occasionally: **"I hit an ambiguity — which do you want, A or B?"**

The human answers those. Claude does everything else. The human never types a `/command` unless they want to force a specific step.

---

## The pipeline (Claude's view — follow in order)

### Step 0 — Triage first (do not skip)
Before anything, decide the size of the request and say which path you're taking:

- **Trivial** (typo, comment, rename, one-line obvious fix, config tweak): skip the spec. Still write or update a test if behavior changes. State: *"This is trivial — I'll fix it directly and add a test."*
- **Substantial** (new feature, new endpoint, behavior change, anything touching auth/data/money, anything the human can't fully picture): run the **full pipeline** below.
- **Unclear / vague**: do **not** guess. Ask 1–3 clarifying questions first (this is karpathy "Think Before Coding" and Superpowers `brainstorming`). Then re-triage.

### Step 1 — Spec (OpenSpec) — *human checkpoint*
Run `/openspec-propose <short-slug>`. This drafts `openspec/changes/<slug>/proposal.md`, `specs/`, `design.md`, `tasks.md`.
Then **stop and show the human the proposal in plain language** and ask: *"Approve this, or adjust?"* Do not proceed until they approve.
- Keep the spec small and honest. No speculative features. State assumptions explicitly.

### Step 2 — Plan (Compound Engineering)
On approval, run `/ce-plan` to turn the spec into a concrete implementation plan with tasks. Set up an isolated worktree if the change is non-trivial (`/ce-worktree` or the plan will offer one).

### Step 3 — Build test-first (Compound + Superpowers + karpathy — automatic)
Run `/ce-work` (or `/openspec-apply-change`) to implement. While you do:
- **Superpowers enforces TDD**: write a **failing** test (RED) → make it pass with the simplest code (GREEN) → clean up (REFACTOR). One behavior at a time. Never write the implementation before the failing test.
- **karpathy keeps it surgical**: touch only what the task needs. Do not refactor working code you weren't asked to touch. Do not add abstraction, config, or error handling nobody requested. State any assumption instead of silently choosing.
- You do **not** announce these two as commands — they shape every step automatically. But you must actually *do* them: real failing test, real green, real restraint.

### Step 4 — Review (Compound Engineering) — *human checkpoint*
Run `/ce-code-review` (multi-agent security / architecture / quality) and, for the spec/docs, `/ce-doc-review`. Confirm the diff is surgical and every line traces to the request.
**Stop and report the findings**, then ask: *"Approve to merge?"* Fix anything the review flags before merging.

### Step 5 — Compound (Compound Engineering)
Run `/ce-compound` to write down what was learned so the next change is easier and the same mistake isn't repeated.

### Step 6 — Archive (OpenSpec)
Run `/openspec-archive-change` to move the finished change into `openspec/changes/archive/`, preserving a durable spec history in the repo.

---

## Which tool does what (quick map)

| Layer | Tool | You invoke it… | It gives us |
|---|---|---|---|
| Spec — *what/why* | **OpenSpec** | `/openspec-propose`, `/openspec-apply-change`, `/openspec-archive-change` | A reviewed, committed spec before code |
| Loop — *plan→review→learn* | **Compound Engineering** | `/ce-plan`, `/ce-work`, `/ce-code-review`, `/ce-compound` | Structured planning, multi-agent review, captured learnings |
| Discipline — *how* | **Superpowers** | *automatic* — fires from a plain-language goal | Enforced TDD (red→green→refactor), systematic debugging |
| Guardrails — *don't* | **karpathy-skills** | *always on* — no command | No silent assumptions, no over-engineering, no orthogonal edits |

Superpowers and karpathy **never** need a command. Compound and OpenSpec are commands — but *Claude* types them per this playbook; the human doesn't have to.

---

## Non-negotiables (Claude must not violate these)

1. **Never claim something works without running it.** "Passing," "fixed," "done" require you to have actually run the test/command and seen the output. Show the evidence. (Superpowers `verification-before-completion`.)
2. **Never write implementation before a failing test** (for any non-trivial behavior change).
3. **Never expand scope silently.** If you notice a second bug or a tempting refactor, name it and ask — do not fold it into this change.
4. **Never skip the spec approval or the merge approval checkpoint** on substantial work.
5. **When uncertain, ask.** A stated assumption or a clarifying question is always better than a confident wrong guess.
6. **Debugging** goes through `systematic-debugging` — reproduce, find the root cause, prove it, then fix. No shotgun patches.

---

## Setup this playbook assumes

This file expects four tools to be installed: **OpenSpec**, **Compound Engineering** (`/ce-*`), **Superpowers**, and **karpathy-skills**. These are enabled **per project on purpose** (project types differ, so each project turns on the tools it wants). If you (Claude) find that any command below doesn't exist, the user hasn't finished per-project setup — point them to **`README.md`** in this repo, which walks a brand-new user through making the tools available once per machine, then enabling the plugins and running `openspec init` in each project, and copying this file plus a `CLAUDE.md` import into it.

If `/ce-*` or `/openspec-*` don't autocomplete but the tools *are* installed, commands load at session start — run `/reload-plugins` or restart the session. If a command is genuinely missing and can't be installed right now, **fall back to doing its step by hand** — but keep the discipline no matter what: spec first, test first, surgical diffs, verify before claiming done.

---

*This file is meant to be loaded into Claude's context every session (imported from `CLAUDE.md`). Copy it into every new project alongside a `CLAUDE.md` that imports it — see `README.md`. If you're reading it, follow it.*
