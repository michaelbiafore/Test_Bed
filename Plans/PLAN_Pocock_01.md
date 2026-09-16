# Matt Pocock Skills for the Test_Bed Bundle

**Source:** Mandate `Mandates/Pocock_MANDATE_01.md`
**Analyst:** Claude Opus 5, working in `Test_Bed` on branch `br_Pocock`
**Repo under review:** `A:\Packages\External_Repos\POCOCK_skills` (`mattpocock/skills`, v1.2.3, MIT, 25 promoted skills)
**Evidence base:** 4 formatted transcripts (~43,000 words) plus every `SKILL.md` in the `engineering/` and `productivity/` buckets

> This document selects a high-priority subset of Matt Pocock's agent skills for addition to `Test_Bed`'s existing four-framework bundle, and specifies how to install them and how to make the top-level Claude agent aware of them. Three of the four source transcripts argue **for** the skills (Pocock's own conference talk, workshop, and long-form interview); the fourth is Theo's working review, which is sympathetic but critical. Where they disagree, the disagreement is recorded rather than smoothed over. Selection is deliberately conservative: the governing constraint is that the set must be small enough to actually use, and must not duplicate what `Test_Bed` already runs.

## Table of Contents

- [Why This List Is Short](#why-this-list-is-short)
  - [Procedures and Abilities](#procedures-and-abilities)
  - [Every Ability Costs Context](#every-ability-costs-context)
  - [The Four Tests I Applied](#the-four-tests-i-applied)
- [What the Bundle Already Covers](#what-the-bundle-already-covers)
- [The Selected Set at a Glance](#the-selected-set-at-a-glance)
- [Tier A Alignment Before Any Code](#tier-a-alignment-before-any-code)
  - [grill-me and grilling](#grill-me-and-grilling)
  - [grill-with-docs and domain-modeling](#grill-with-docs-and-domain-modeling)
- [Tier B Design and Architecture](#tier-b-design-and-architecture)
  - [codebase-design](#codebase-design)
  - [improve-codebase-architecture](#improve-codebase-architecture)
- [Tier C Build and Debug](#tier-c-build-and-debug)
  - [tdd](#tdd)
  - [diagnosing-bugs](#diagnosing-bugs)
  - [wizard](#wizard)
- [Tier D Working With the Agent](#tier-d-working-with-the-agent)
  - [writing-for-agents](#writing-for-agents)
  - [wait-what](#wait-what)
  - [handoff](#handoff)
- [What I Left Out and Why](#what-i-left-out-and-why)
- [Conflicts to Settle Before Installing](#conflicts-to-settle-before-installing)
  - [Two Debugging Disciplines Firing at Once](#two-debugging-disciplines-firing-at-once)
  - [Two Philosophies of Control](#two-philosophies-of-control)
  - [Context Load](#context-load)
  - [House Style](#house-style)
- [Installation](#installation)
  - [Choosing the Install Route](#choosing-the-install-route)
  - [Step 1 Install the Selected Skills](#step-1-install-the-selected-skills)
  - [Step 2 Seed CONTEXT.md](#step-2-seed-context.md)
  - [Step 3 Skip the Setup Skill Deliberately](#step-3-skip-the-setup-skill-deliberately)
  - [Step 4 Verify](#step-4-verify)
- [Proposed Changes to CLAUDE.md](#proposed-changes-to-claude.md)
- [Proposed Changes to SE_Discipline.md](#proposed-changes-to-se_discipline.md)
- [Decisions Taken](#decisions-taken)
- [Key Takeaways](#key-takeaways)

---

## Why This List Is Short

The mandate asks for a set small enough to use in one real project. That constraint is not a convenience, it is the single most important design rule in Pocock's own repo, and he states it plainly in the interview.

### Procedures and Abilities

Pocock splits every skill on one axis: who can invoke it.

> You can think of there being two types of skills. There are skills that are **procedures**, skills that you intend to run yourself. And then there are skills that are more like **abilities**, things that you intend the model to invoke itself.

A procedure carries `disable-model-invocation: true` in its frontmatter and is reachable only when the human types its name. An ability omits that flag and can fire on its own. Pocock strongly prefers procedures:

> I've always preferred to be in control myself, because I know my skills, I know my abilities. **I don't want to delegate my thinking to the model.**

He names the contrast directly: **Superpowers**, which `Test_Bed` already runs, takes the opposite position and prefers the model to be in control. That is a genuine architectural disagreement between a framework this repo already has and the one being proposed, and it is dealt with under [Conflicts to Settle Before Installing](#conflicts-to-settle-before-installing).

### Every Ability Costs Context

The reason not to install all 25 is mechanical, not aesthetic:

> Skills are really hard to write, especially because every single skill that you write **leaks a description into the context window**. Let's say we have a hundred different skills, you're going to be leaking a hundred descriptions into the context window.

A user-invoked skill does not pay this cost, because its description is withheld from the model. So the shape of a good set is: **a few procedures the human drives, plus only those abilities that genuinely earn a permanent slot in every context window.** The selection below is 5 procedures and 7 abilities.

Theo's review lands on the same conclusion from the opposite direction, and it is the sharpest warning in the whole evidence base:

> **You do not get anything out of blindly copying other people's setups.** You should treat these things not as a set of steps to take, rather as a set of information to consider as you build your own systems for coding with AI.

### The Four Tests I Applied

Each candidate had to pass all four:

1. **Gap, not overlap.** Does it do something the existing four frameworks do not already do? `Test_Bed`'s whole thesis is that its four layers compose. A fifth layer that re-implements layer three is a liability.
2. **Impact on code quality or speed.** Traceable to a named failure mode in the transcripts, not to novelty.
3. **Affordable.** An ability must be worth its description in every context window. A procedure must be worth a slot in the human's memory.
4. **Fits a non-expert driver.** `SE_Discipline.md` promises that the human "just states what they want in plain English." A skill that assumes a fluent senior engineer at the keyboard fails here.

---

## What the Bundle Already Covers

This map is what drove most of the exclusions. `Test_Bed` currently runs OpenSpec, Compound Engineering, Superpowers, and karpathy-skills simultaneously.

| Concern | Already covered by | Pocock equivalent | Verdict |
|---|---|---|---|
| Spec artifacts, reviewable and committed | OpenSpec `/openspec-propose` | `to-spec` | **Overlap, exclude** |
| Breaking a spec into work items | OpenSpec `tasks.md`, CE `/ce-plan` | `to-tickets` | **Overlap, exclude** |
| Driving implementation | CE `/ce-work`, `/openspec-apply-change` | `implement` | **Overlap, exclude** |
| Multi-agent code review | CE `/ce-code-review` (40+ persona agents) | `code-review` | **Overlap, exclude** |
| Test-first discipline | Superpowers `test-driven-development` | `tdd` | **Partial, include as reference** |
| Root-cause debugging | Superpowers `systematic-debugging` | `diagnosing-bugs` | **Partial, include with precedence rule** |
| Requirements exploration | Superpowers `brainstorming`, CE `/ce-brainstorm` | `grilling` | **Partial, include and promote** |
| Captured learnings | CE `/ce-compound`, `CONCEPTS.md` | `domain-modeling` | **Partial, include** |
| Scope and over-engineering guardrails | karpathy-guidelines | (none) | Covered |
| **Deep-module design vocabulary** | **nothing** | `codebase-design` | **Pure gap, include** |
| **Periodic architecture survey** | **nothing** | `improve-codebase-architecture` | **Pure gap, include** |
| **Writing agent-facing documents** | **nothing** | `writing-for-agents` | **Pure gap, include** |
| **Human-only setup procedures** | **nothing** | `wizard` | **Pure gap, include** |
| **Repair of a confusing agent reply** | **nothing** | `wait-what` | **Pure gap, include** |
| **Cross-session context handoff** | **nothing** | `handoff` | **Pure gap, include** |

The five pure gaps are the strongest part of the case for adding Pocock at all. Everything in the "overlap" rows is the reason the case is not for adding all 25.

---

## The Selected Set at a Glance

Twelve skills. Six are typed by the human; six fire on their own or are pulled in by another skill.

> **Decided 2026-09-16** (`Mandates/Pocock_MANDATE_02.md`): `wizard` ships **user-invoked** rather than model-invoked, so it costs nothing in context but stays available when a promotion needs it. `writing-for-agents` stays model-invoked. See [Decisions Taken](#decisions-taken).

| Skill | Invocation | Reaches for | Where it lands in the pipeline |
|---|---|---|---|
| **grill-me** | user | `grilling` | Before Step 1, replaces plan mode |
| **grill-with-docs** | user | `grilling`, `domain-modeling` | Before Step 1, on domain-heavy work |
| **grilling** | model | (leaf) | Pulled by the two above |
| **domain-modeling** | model | (leaf) | Pulled by grill-with-docs, runs inline |
| **codebase-design** | model | (leaf) | Consulted during Steps 1 to 3 |
| **improve-codebase-architecture** | user | `codebase-design`, `grilling`, `domain-modeling` | Standalone, every few days |
| **tdd** | model | `codebase-design` | Step 3, alongside Superpowers |
| **diagnosing-bugs** | model | (leaf) | Any bug report |
| **wizard** | user | (leaf) | Promotion and provisioning |
| **writing-for-agents** | model | (leaf) | Any edit to this repo's own docs |
| **wait-what** | user | (leaf) | Any moment a reply does not land |
| **handoff** | user | (leaf) | End of a long session |

---

## Tier A Alignment Before Any Code

### grill-me and grilling

**What it does.** `grilling` turns the agent into an adversarial interviewer. It maps your request as a **design tree**, computes the **frontier** (every decision whose prerequisites are already settled), and asks that entire frontier in one numbered round, each question carrying a recommended answer. You answer the round, the frontier recomputes, and it asks again until the tree is exhausted. `grill-me` is a four-line user-invoked wrapper whose entire body is an instruction to call `grilling`.

**Why it is included.** This is the highest-value skill in the repo and the one that most directly serves `Test_Bed`'s stated mission. `SE_Discipline.md` promises a non-expert can state a goal in plain English; the unaddressed risk in that promise is that the agent builds the wrong thing confidently. Pocock's diagnosis is Fred Brooks' **design concept**, the shared and invisible theory of what is being built:

> It's not an asset. It's not something you can put in a markdown file. It is the invisible sort of theory of what you're building.

Crucially, the round format is what makes this usable by a non-expert. Every question ships with a recommended answer, so a whole round can be answered `1A, 2B, 3C`. Theo, initially sceptical, was converted by exactly this:

> This is great. I'm actually disagreeing with the recommended answers pretty often, too. This is actually going to help me. I'm annoyed.

One design detail matters for `Test_Bed`: **finding facts is the agent's job, never the user's.** When a frontier question needs a fact from the filesystem, `grilling` dispatches a sub-agent rather than asking the human. Only genuine *decisions* reach the user. That is precisely the division of labour `SE_Discipline.md` already asks for.

**When it is invoked.** Before OpenSpec Step 1. It replaces, rather than supplements, Claude Code's plan mode and Superpowers' `brainstorming` for substantial work. Pocock is explicit about preferring it to plan mode, on the grounds that plan mode "is extremely eager to create an *asset*" instead of reaching shared understanding first.

**How to call it.** Type it. It is user-invoked by design and the model cannot reach it. Give it a target in the same breath.

```
/grill-me I want to add a CSV export to the audit report screen.
```

```
/grill-me Grill me about this repo itself: the goals in WHAT_THIS_DIR_IS.md,
everything in CLAUDE.md and SE_Discipline.md. I want to be sure we agree on what
we are building before I start the next project.
```

The second example is Theo's exact move, aimed at a project rather than a feature, and it surfaced three structural contradictions in his repo on the first pass. It is worth running once against `Test_Bed` before any project work begins.

**Best practice.** Do not stop at round one. The value is in rounds two and three, where the questions get uncomfortable. Expect 40 to 100 questions total on a substantial change. Do not let the agent act on the outcome until it confirms the frontier is empty.

### grill-with-docs and domain-modeling

**What it does.** `grill-with-docs` is a two-line user-invoked skill that calls `grilling` **and** `domain-modeling` together. `domain-modeling` is the active discipline of building a project's shared vocabulary: it challenges terms that conflict with the existing glossary, sharpens fuzzy language, stress-tests relationships with concrete edge-case scenarios, cross-references claims against the code, and writes resolved terms into `CONTEXT.md` the moment they crystallise. It also offers an ADR, but only when a decision is hard to reverse, surprising without context, and the result of a real trade-off.

**Why it is included.** This is Pocock's answer to failure mode #2, the agent being too verbose, and it borrows Eric Evans' **ubiquitous language** from domain-driven design.

> With a ubiquitous language, conversations among developers and expressions of the code are all derived from the same domain model.

The payoff he reports is not merely cosmetic:

> By reading the thinking traces of the AI, it not only improves the planning, but it allows the AI to think in a less verbose way, and actually means that the implementation is more aligned with what you actually planned.

For `Test_Bed` specifically, `CONTEXT.md` is the missing artifact that makes the other selected skills work: `tdd` reads it so test names match domain language, `diagnosing-bugs` reads it to build a mental model of the modules, and `improve-codebase-architecture` reads it so candidates are described as "the Order intake module" rather than "the FooBarHandler". Install the glossary and three other skills get sharper for free.

There is real but partial overlap with Compound Engineering's `CONCEPTS.md`. The difference is direction: `/ce-compound` writes vocabulary down *after* a problem is solved, as a learning; `domain-modeling` challenges and sharpens vocabulary *during* design. Keep both, and keep them in separate files.

**When it is invoked.** `grill-with-docs` replaces `grill-me` whenever the work introduces or disturbs domain concepts, which on a greenfield project is most of the time. `domain-modeling` also fires on its own whenever someone is editing `CONTEXT.md` or writing an ADR.

**How to call it.**

```
/grill-with-docs We need a promotion path from this repo to Dymon PROD.
I do not think we agree on what "promotion" or "rework" actually mean.
```

**Best practice.** Keep `CONTEXT.md` a glossary and nothing else. The skill is emphatic: "`CONTEXT.md` should be totally devoid of implementation details. Do not treat `CONTEXT.md` as a spec, a scratch pad, or a repository for implementation decisions." Resist the pull to grow it into a design doc, which is what `openspec/` is for.

---

## Tier B Design and Architecture

### codebase-design

**What it does.** A pure reference skill: the shared vocabulary and principles for designing **deep modules**, meaning a lot of behaviour behind a small interface, placed at a clean seam and testable through that interface. It fixes seven terms precisely (**module**, **interface**, **implementation**, **depth**, **seam**, **adapter**, **leverage**, **locality**) and forbids the loose substitutes, "component", "service", "API", "boundary".

**Why it is included.** This is the largest genuine gap in the current bundle, and it is the intellectual core of Pocock's entire argument. His thesis rests on Ousterhout:

> Complexity is anything related to the structure of a software system that makes it hard to understand and modify the system.

and on the consequence he draws from it:

> **Bad code is the most expensive it's ever been.** Because if you have a code base that's hard to change, you're not able to take all of the bounty that AI can offer.

karpathy-skills tells the agent not to over-engineer, which is a *negative* constraint. Nothing in the bundle gives it a *positive* vocabulary for what good structure looks like. That asymmetry is why AI codebases drift toward what Pocock calls a grid of shallow blobs, which the agent then cannot navigate.

Three principles here are immediately usable as review criteria:

- **The deletion test.** Imagine deleting the module. If complexity vanishes, it was a pass-through. If complexity reappears across N callers, it was earning its keep.
- **The interface is the test surface.** If you want to test past the interface, the module is the wrong shape.
- **One adapter means a hypothetical seam. Two adapters means a real one.** Do not introduce a seam unless something actually varies across it.

**When it is invoked.** Model-invoked, and it should stay that way. It fires whenever a module interface is being designed or a seam placed, and `tdd` and `improve-codebase-architecture` both explicitly call it for vocabulary.

**How to call it.** Usually you do not. It reaches itself. To force it, name the vocabulary:

```
Before we write this, use the codebase-design vocabulary. Where should the seam go,
and is this module deep or shallow?
```

**Best practice.** Treat it as a dictionary, not a procedure. The skill says so itself: it "is a reference to consult, not a session to run." Its `DESIGN-IT-TWICE.md` companion, which fans out parallel sub-agents to design one interface several radically different ways, is worth reaching for on genuinely load-bearing interfaces only.

### improve-codebase-architecture

**What it does.** Surveys a codebase for **deepening opportunities**, refactors that turn shallow modules into deep ones. It scopes by walking recent commit history to find hot spots, spawns a sub-agent to explore, then writes a self-contained HTML report to the OS temp directory with a card per candidate: files involved, the friction, the proposed change in plain English, benefits framed as locality and leverage, a before and after diagram, and a strength badge of `Strong`, `Worth exploring`, or `Speculative`. It opens the report, asks which candidate you want, then hands off to `grilling` to walk that decision.

**Why it is included.** It is the maintenance counterpart to `codebase-design`, and it is the only skill in either the Pocock repo or the existing bundle that periodically asks "is this codebase still easy to change?" without being prompted by a bug. Pocock recommends running it every few days. Its own README is candid about the limits, which is a point in its favour: "It is a survey, not a rescue: on a genuinely old codebase it will find real candidates, but it won't untangle the mud for you."

The HTML report is a real asset for `Test_Bed`'s purpose. A visual before-and-after of an architectural argument is exactly the artifact that travels well to a reviewer in central IT who was not in the session.

**When it is invoked.** Standalone and periodic, not part of a feature pipeline. It sits naturally next to `/ce-compound` at the close of a cycle. It writes nothing into the repo, so it is safe to run speculatively.

**How to call it.**

```
/improve-codebase-architecture
```

```
/improve-codebase-architecture Focus on the validation layer, I keep breaking it.
```

**Best practice.** Give it a direction when you have one; it skips the hot-spot inference and goes straight there. Do not accept a candidate on the strength of the report alone, the grilling loop after your pick is where the decision actually gets made.

---

## Tier C Build and Debug

### tdd

**What it does.** The reference that makes a red-green loop produce tests worth keeping. Its distinctive contribution is the **seam**: the public boundary you test at. The rule is blunt, "**Test only at pre-agreed seams.** Before writing any test, write down the seams under test and confirm them with the user. No test is written at an unconfirmed seam." It also names three anti-patterns precisely: **implementation-coupled** tests, **tautological** tests whose assertion recomputes the expected value the way the code does, and **horizontal slicing**, writing all tests first and then all implementation.

**Why it is included, carefully.** Superpowers already enforces red-green-refactor, and `SE_Discipline.md` already makes a failing test non-negotiable. So this is not included for the loop. It is included for the three things Superpowers does not name: the seam-agreement gate, the tautological-test trap, and the anti-cheat argument for why order matters.

> It tends to try to cheat at the tests, because it's doing it in layers: it will do the entire implementation and then do the entire test layer just below it. Using this technique it is generally a lot harder to cheat, because it's instrumenting the code *before* it's writing the code.

That is a sharper justification than "tests are good", and it is the one worth putting in front of a reviewer at Dymon. The seam-agreement gate also gives the non-expert human a concrete decision to make that they are actually qualified to make, which fits this repo's operating model.

**When it is invoked.** Step 3 of the `SE_Discipline.md` pipeline, concurrently with Superpowers. See [Two Debugging Disciplines Firing at Once](#two-debugging-disciplines-firing-at-once) for the precedence rule that keeps them from arguing.

**How to call it.** Model-invoked. To force the seam conversation explicitly:

```
Before you write any test for this, list the seams you intend to test at and confirm
them with me.
```

**Best practice.** Note the skill's own scope limit, which contradicts common practice: "**Refactoring is not part of the loop.** It belongs to the review stage." If adopted, this changes what `/ce-code-review` is responsible for, and that should be a conscious decision rather than a surprise.

### diagnosing-bugs

**What it does.** A six-phase gated diagnosis loop. Phase 1 is the whole skill: build a **tight, red-capable feedback loop** before forming any hypothesis. It offers ten ranked ways to construct one, from a failing test through a replayed trace to a fuzz loop to a human-in-the-loop bash script as last resort. Phase 1 completes only when you can name one command you have already run, that drives the real bug path, asserts the user's exact symptom, is deterministic, is fast, and is agent-runnable. Then: reproduce and minimise, generate three to five *falsifiable* ranked hypotheses before testing any, instrument one variable at a time with tagged logs, write the regression test before the fix, and clean up.

**Why it is included.** Theo's audit, run against his own agent logs across six machines, ranked this first of all Pocock skills, and his verdict after days of use was concrete: "my agents find the root cause and can communicate what's wrong much more effectively."

Superpowers' `systematic-debugging` covers the same ground in outline. Two things here are sharper. First, the gate is mechanical rather than aspirational: "If you catch yourself reading code to build a theory before this command exists, **stop: jumping straight to a hypothesis is the exact failure this skill prevents.** No red-capable command, no Phase 2." Second, Phase 5 contains a finding that matters for this repo's promotion mission: if no correct seam exists for the regression test, **that itself is the finding**, and the architecture is preventing the bug from being locked down. That converts a debugging session into architectural evidence.

It also ships a `Redact` section requiring secrets to be replaced with `<REDACTED>` before any output is shown, which is directly relevant to anything heading toward Dymon PROD.

**When it is invoked.** Automatically, on any report of something broken, throwing, failing, or slow.

**How to call it.** Model-invoked; it fires on "debug this" or a pasted stack trace. To force the discipline when it has not:

```
Use diagnosing-bugs. Do not theorise until you have a command that goes red on this.
```

**Best practice.** Let it show you the ranked hypotheses before it tests them. The skill asks for this checkpoint explicitly because the human often re-ranks instantly, and it is a cheap intervention with a large payoff.

### wizard

**What it does.** Generates an interactive bash script that walks a human through a procedure only a human can perform. It opens each URL, says exactly what to click and copy, captures values, writes them where they belong (`.env`, GitHub secrets), confirms at each stage, and shows how many stages remain. The UX library is fixed and must never be hand-edited; the agent's job is only to scope the procedure and author its stages.

**Why it is included.** This is the one selected skill chosen for `Test_Bed`'s *mission* rather than its code. The repo exists to prove that AI Fellows' output can be promoted to Dymon PROD with minimal rework by central IT. A promotion necessarily contains steps the agent cannot take: a credential issued by IT, a dashboard only an administrator can reach, a cutover someone must authorise. Today those steps live in prose in `DEPLOYMENT_CHECKLIST.md` on the parked ZZ branch, which is exactly the form that rots. A wizard turns them into a runnable, resumable, confirmable script.

Theo, who had no such need, still rated it highly on sight: "I can think of, like, four things I should have used it for yesterday."

**When it is invoked.** At a promotion boundary, or when provisioning anything. Not during normal development.

**How to call it.** Model-invoked, but in practice you will describe the situation:

```
Build me a wizard for handing this project to central IT: the secrets they need to
create, the env vars we need back, and the sign-off gate.
```

**Best practice.** The skill warns against inventing UI steps it cannot verify: "Where you don't actually know the current UI or the exact command, say so and ask the user or check the docs: never invent steps that may not exist." Hold it to that. Wizards are ephemeral by default; commit one only when the path should be repeatable, which for a promotion path it should be.

---

## Tier D Working With the Agent

### writing-for-agents

**What it does.** The reference for writing any document an agent consumes: a skill, a `CLAUDE.md`, an `AGENTS.md`, or anything reached by a pointer. It supplies a vocabulary that is unusually precise. A **context pointer** names out-of-context material and encodes the condition for reaching it, and its *wording*, not its target, decides whether the agent gets there. The **two loads** are context load, paid on every turn by always-loaded material, and cognitive load, paid by the human. The **information hierarchy** ranks material as in-file step, in-file reference, or disclosed reference behind a pointer. **Completion criteria** end every step, and vague ones invite **premature completion**.

**Why it is included.** `Test_Bed`'s actual product is agent-facing markdown. `CLAUDE.md`, `SE_Discipline.md`, `RISK_TIERS.md`, and whatever the next project adds *are* the deliverable that has to survive contact with central IT. Nothing in the existing four frameworks says how to write them well. This is the only skill in the repo aimed squarely at that, and Theo, who ranked it second overall, explains the failure it prevents:

> Agents are really bad at writing instructions to other agents. If you let your agents write skills for you, write markdown for you, write prompts to subagents for you, all those types of things, it can do a very bad job.

The concept most immediately applicable here is the two loads, since it gives a principled answer to a question this repo keeps facing: what belongs in the always-loaded `CLAUDE.md` versus behind a pointer to `SE_Discipline.md`.

**When it is invoked.** Automatically when creating or editing a skill, `AGENTS.md`, or `CLAUDE.md`. Which means, in this repo, often.

**How to call it.**

```
Rewrite the Step 0 triage section of SE_Discipline.md. Apply writing-for-agents:
sharpen the completion criterion and tell me what should move behind a pointer.
```

**Best practice.** Use it as the standing review lens for the changes this very document proposes at [Proposed Changes to CLAUDE.md](#proposed-changes-to-claude.md). It also contains the most useful single warning for a repo like this one, **sprawl**: a document simply too long, even when every line is live and unique.

### wait-what

**What it does.** Seven lines. User-invoked. It tells the agent that its last message did not land and to re-pitch it with context, in ASD-STE100 Simplified Technical English, using the vocabulary from `CONTEXT.md`.

**Why it is included.** It costs nothing, it is impossible to misuse, and it is aimed exactly at this repo's stated user. `SE_Discipline.md` promises that the human "does not need to read the rest" and can just answer prompts. The unhandled case in that promise is the moment the agent says something the human does not understand, where the options today are to bluff or to derail the session. One command fixes that. The skill's own documentation is honest about its limits: it repairs one message and does not prevent the next one, and the real cure is the shared language built by `grill-with-docs`.

**When it is invoked.** Any time, mid-session, the moment a reply does not land.

**How to call it.**

```
/wait-what
```

**Best practice.** If you find yourself reaching for it repeatedly in one project, that is a signal to run `/grill-with-docs` and build the glossary, not to keep patching individual messages.

### handoff

**What it does.** Compacts the current conversation into a handoff document so a fresh agent can continue, saved to the OS temp directory rather than the workspace. It includes a "suggested skills" section naming what the next agent should reach for, refuses to duplicate content already captured in specs, plans, ADRs, issues, commits, or diffs, referencing them by path instead, and redacts secrets and personal data.

**Why it is included.** Pocock's workshop argues that an LLM measurably degrades past roughly 100K tokens regardless of the advertised window, and that the correct response is to clear rather than compact:

> Compacting leaves a lossy written history; clearing returns the model to an identical known state every time.

`handoff` is what makes clearing survivable. The bundle has no equivalent. The redaction requirement and the refusal to duplicate committed artifacts both matter for a repo whose output is destined for review.

**When it is invoked.** At the end of a long working session, or before a deliberate context clear.

**How to call it.** It takes an argument describing what the next session is for, and tailors the document to it.

```
/handoff Next session picks up the CSV export work and needs to finish the seam tests.
```

**Best practice.** Note that it writes to the OS temp directory on purpose. If a handoff is worth keeping in the repo, that is a sign the content belongs in an OpenSpec change or an ADR instead.

---

## What I Left Out and Why

| Skill | Reason for exclusion |
|---|---|
| `to-spec`, `to-tickets`, `implement`, `triage`, `wayfinder` | This is Pocock's "Main Flow", and it is a direct competitor to OpenSpec plus Compound Engineering rather than a complement. Installing it would give `Test_Bed` two full pipelines racing for the same job. Theo, with no competing pipeline at all, still found it over-prescriptive: "I don't necessarily want this much prescription on how I go step by step." |
| `code-review` | `/ce-code-review` already runs a far larger persona set. **But harvest one thing from it:** the Fowler smell baseline (Mysterious Name, Duplicated Code, Feature Envy, Data Clumps, Primitive Obsession, Repeated Switches, Shotgun Surgery, Divergent Change, Speculative Generality, Message Chains, Middle Man, Refused Bequest) is a compact, citable standard worth copying into this repo's coding standards as prose. Its two-axis idea, separating Standards from Spec so neither masks the other, is also worth borrowing as a review habit without installing the skill. |
| `setup-matt-pocock-skills` | Its only job is configuring an issue tracker and triage labels for the five skills above, all excluded. Nothing in the selected set requires it. See [Step 3](#step-3-skip-the-setup-skill-deliberately). |
| `research` | Overlaps `/ce-best-practices-researcher` and `/ce-web-researcher`. Theo: "I don't know if I would ever need that; I feel like the agents are pretty good at verifying their claims if you just ask." |
| `prototype` | Genuinely good, and the LOGIC branch produces a single shareable HTML file a non-developer can drive, which suits this repo's audience. Excluded only because `src/` does not exist yet. **Revisit once there is a UI.** |
| `resolving-merge-conflicts` | Sound and short, but low frequency on a solo repo with no parallel agents yet. Cheap to add later. |
| `teach`, `to-questionnaire`, `ask-matt` | Not aimed at code quality or delivery speed. `ask-matt` is a router over skills that are mostly excluded, so it would route to things that are not installed. |
| Everything in `misc/` and `in-progress/` | Explicitly not shipped in the plugin and not promoted by the author. |

---

## Conflicts to Settle Before Installing

These are real and should be decided deliberately rather than discovered.

### Two Debugging Disciplines Firing at Once

Superpowers' `systematic-debugging` and Pocock's `diagnosing-bugs` are both model-invoked, both fire on a bug report, and both claim the same phase of work. The same is true of Superpowers' `test-driven-development` against Pocock's `tdd`. Left alone, the agent will pull in whichever description matches first and may load both.

**Recommendation:** make Superpowers primary for the *loop* and Pocock primary for the *entry gate*, and write the rule down where the agent reads it. Concretely, for debugging: `diagnosing-bugs` Phase 1 owns the requirement that a red-capable command exists before any hypothesis; once it does, Superpowers' loop proceeds. For testing: Superpowers owns red-green-refactor; Pocock's `tdd` is consulted as reference for seam agreement and the anti-pattern list. The wording for this goes in `SE_Discipline.md` below.

### Two Philosophies of Control

Pocock names Superpowers directly as the opposite philosophy: he wants the human holding the wheel, Superpowers wants the model to act. `Test_Bed` currently runs Superpowers, whose whole premise is auto-triggering. Adding five user-invoked procedures does not break that, but it does mean the human now has commands they must remember to type, which `SE_Discipline.md` currently promises they will not need. That promise should be amended honestly rather than quietly broken: the human does not need to type anything *except* `/grill-me` or `/grill-with-docs` at the start, and `/wait-what` when confused.

### Context Load

Six new model-invoked descriptions join Superpowers' set and Compound Engineering's 40-plus commands. This is the cost Pocock warns about, and it is paid on every turn. `wizard` has already been taken out of that budget: it installs with `disable-model-invocation: true`, so its description never loads (see [Decisions Taken](#decisions-taken)). If the session still feels unfocused, the next candidate is `writing-for-agents`, the lowest-frequency remaining ability, which can be converted the same way. Editable copies are what make that possible; the managed plugin cannot be edited.

### House Style

A small irony worth knowing before you read the skills: `mattpocock/skills` forbids em dashes in its own prose, and Theo found nine on the `grilling` page alone. More practically, the skills are written in British-inflected prose with their own vocabulary. If this repo adopts a house style for agent-facing documents, the installed copies should be edited to match rather than left as a second dialect. That is an argument for the editable install route below.

---

## Installation

### Choosing the Install Route

There are two routes, and they differ in ways that matter here.

| | Claude Code plugin | `skills` installer |
|---|---|---|
| Command | `claude plugins install mattpocock-skills` | `npx skills@latest add mattpocock/skills` |
| What you get | All 25 promoted skills, managed and read-only | Only the skills you tick, as ordinary files you own |
| Updates | Automatic when the author ships | Manual, via `npx skills update` |
| Editable | No | Yes |
| Context cost | All 25 descriptions | Only what you installed |
| Travels with the repo | No, it is plugin state | Yes, the files are committed |

The README is explicit that you should pick one: "installing both leaves you with every skill twice."

**Recommendation: use the `skills` installer.** Three reasons specific to `Test_Bed`. First, the whole point of this exercise is a *small* set, and the plugin cannot give you one. Second, editability is what lets you resolve the conflicts above, flipping `wizard` to user-invoked or aligning house style. Third, and most important for the mission, committed files travel to Dymon with the repo, whereas plugin state does not; a reviewer in central IT can read exactly which disciplines were in force.

This does depart from the pattern recorded for the other three frameworks, which are project-scoped plugins. That is a deliberate trade, and worth a decision rather than a default.

### Step 1 Install the Selected Skills

Requires Node.js. Run from the repo root.

```bash
cd A:/Admin/Jobs/2026/Jay_Project/SE_for_AI/Test_Bed
npx skills@latest add mattpocock/skills -a claude-code -y  -s codebase-design -s diagnosing-bugs -s domain-modeling -s grill-me  -s grill-with-docs -s grilling -s handoff -s improve-codebase-architecture  -s tdd -s wait-what -s wizard -s writing-for-agents
```

**Use the flags, not the interactive pickers.** Run bare, the installer asks which agents to target; anything other than `claude-code` writes to `.agents/skills/`, which Claude Code does not read, and the install silently does nothing useful. `-s` must also be repeated per skill: a comma-separated list is ignored and installs nothing. Both failure modes were hit in practice on 2026-09-16 and are documented in `README.md` step 5a.

The twelve, for reference:

```
codebase-design
diagnosing-bugs
domain-modeling
grill-me
grill-with-docs
grilling
handoff
improve-codebase-architecture
tdd
wait-what
wizard
writing-for-agents
```

Do **not** select `setup-matt-pocock-skills`, despite the README's instruction to include it, for the reason given in Step 3.

After installing, add `disable-model-invocation: true` to the frontmatter of `.claude/skills/wizard/SKILL.md`, per [Decisions Taken](#decisions-taken).

They land under `.claude/skills/<name>/`, alongside the existing `openspec-*` skills. Several skills ship companion files that must come with them: `tdd` needs `tests.md` and `mocking.md`; `codebase-design` needs `DEEPENING.md` and `DESIGN-IT-TWICE.md`; `domain-modeling` needs `CONTEXT-FORMAT.md` and `ADR-FORMAT.md`; `diagnosing-bugs` needs its `scripts/` directory; `wizard` needs `template.sh`; `improve-codebase-architecture` needs `HTML-REPORT.md`; `writing-for-agents` needs `SKILL-MECHANICS.md`. Verify these arrived, because a skill whose pointer targets are missing degrades silently.

> **Answering the mandate's question directly:** beyond placing markdown files, the only mandatory extra steps are ensuring those companion files and the `diagnosing-bugs/scripts/` and `wizard/template.sh` executables came across, and making the agent aware of the set via the `CLAUDE.md` and `SE_Discipline.md` edits below. There is no build step, no service to configure, and no issue tracker required for the selected set.

### Step 2 Seed CONTEXT.md

Four of the selected skills read `CONTEXT.md` and degrade politely without it. Create it through the skill rather than by hand, so the vocabulary is challenged as it is written:

```
/grill-with-docs Build the initial CONTEXT.md for this repo. Start from
WHAT_THIS_DIR_IS.md and CLAUDE.md. I want the terms "promotion", "rework",
"AI Fellow", "Track S", and "bundle" pinned down precisely.
```

### Step 3 Skip the Setup Skill Deliberately

`/setup-matt-pocock-skills` configures an issue tracker, triage labels, and a domain doc layout. Every skill that consumes that configuration (`to-spec`, `to-tickets`, `triage`, `code-review`) is excluded from this selection. I verified the selected twelve against it: none require `docs/agents/issue-tracker.md`, and `domain-modeling` creates `CONTEXT.md` and `docs/adr/` lazily on its own. Running setup would add an `## Agent skills` block to `CLAUDE.md` describing a tracker nothing uses.

If `to-spec` or `triage` are ever added, run setup first.

### Step 4 Verify

Do not assume the install worked. Check each claim.

```bash
# 1. All twelve present, and nothing extra
ls .claude/skills/ | sort

# 2. Companion files arrived
ls .claude/skills/tdd/ .claude/skills/codebase-design/ \
   .claude/skills/domain-modeling/ .claude/skills/wizard/

# 3. The six procedures are actually user-invoked
grep -l "disable-model-invocation: true" .claude/skills/*/SKILL.md
#    expect: grill-me, grill-with-docs, improve-codebase-architecture,
#            wait-what, handoff, wizard
```

Then restart the session or run `/reload-plugins`, since skills load at session start. Functional check:

```
/wait-what
```

It should ask what did not land rather than reporting an unknown command. Then confirm an ability fires on its own by describing a bug and watching for `diagnosing-bugs` to engage without being named.

---

## Proposed Changes to CLAUDE.md

Two edits. The first extends the bundle table from four layers to five; the second adds a short section the agent reads every session.

**Edit 1.** In *The installed bundle*, change the heading from "four layers" to "five layers" and append a row:

```markdown
| **mattpocock-skills** | Alignment and design, the *are we sure* (adversarial grilling, deep-module vocabulary, shared glossary) | **Per-repo, committed** (`.claude/skills/`, 12 of 25 skills) | `/grill-me`, `/grill-with-docs`, `/improve-codebase-architecture`, `/wait-what`, `/handoff`, `/wizard`; the other six auto-trigger |
```

**Edit 2.** Add after the bundle table:

```markdown
## The Pocock layer

Twelve skills from `mattpocock/skills` are installed as committed, editable files
under `.claude/skills/`. Six are **user-invoked** and the model cannot reach them:
`/grill-me`, `/grill-with-docs`, `/improve-codebase-architecture`, `/wait-what`,
`/handoff`, `/wizard`. Six fire on their own or are pulled in by another skill:
`grilling`, `domain-modeling`, `codebase-design`, `tdd`, `diagnosing-bugs`,
`writing-for-agents`.

`CONTEXT.md` at the repo root is this project's glossary, the shared vocabulary you
and the human use for domain terms. Read it before exploring the codebase. Keep it
free of implementation detail: it is a glossary, not a spec. Architectural decisions
go in `docs/adr/`. Both are maintained by `domain-modeling`, which fires whenever
either is being edited.

Where these overlap the other layers, the precedence rules are in `SE_Discipline.md`.
Do not run Pocock's `to-spec`, `to-tickets`, `implement`, or `code-review`: they are
deliberately not installed, because OpenSpec and Compound Engineering own those steps.
```

---

## Proposed Changes to SE_Discipline.md

Four edits, in document order. These are the ones that actually change behaviour.

**Edit 1.** In the human-facing preamble, correct the promise about typing commands:

```markdown
**Human: you do not need to read the rest.** State what you want in plain English and
answer the approval prompts. Two exceptions worth learning, because they pay for
themselves: start substantial work with `/grill-me` (or `/grill-with-docs` when the
project has its own jargon), and type `/wait-what` any time an answer does not make
sense to you.
```

**Edit 2.** Insert a new step before Step 1, and renumber:

```markdown
### Step 0.5 - Align (Pocock) - *human checkpoint*

For anything **Substantial**, run `/grill-me` before touching OpenSpec. On work that
introduces or disturbs domain concepts, run `/grill-with-docs` instead, so `CONTEXT.md`
and any ADRs are written as decisions crystallise.

Grilling maps the request as a design tree and asks the whole answerable frontier in
one numbered round, each question with a recommended answer, so the human can reply
`1A, 2B, 3C`. Facts are yours to find: dispatch a sub-agent rather than asking the
human anything you could look up. Decisions are theirs.

Do not proceed to Step 1 until the frontier is empty and the human confirms you have
reached a shared understanding. Expect this to take several rounds; the questions get
harder, and that is the point. The resulting conversation is the input to
`/openspec-propose`, which makes the spec dramatically better.

This **replaces** plan mode and Superpowers' `brainstorming` for substantial work.
```

**Edit 3.** In Step 3, add the seam gate and the precedence rule:

```markdown
- **Agree the seams before writing tests.** A **seam** is the public boundary you test
  at. Write down the seams under test and confirm them with the human. No test is
  written at an unconfirmed seam. Prefer existing seams, and use the highest one that
  reaches the behaviour.
- **Precedence where Superpowers and Pocock overlap:** Superpowers owns the
  red-green-refactor loop. Pocock's `tdd` is the reference consulted for seam choice
  and for the anti-patterns: implementation-coupled tests, tautological tests whose
  assertion recomputes the expected value the way the code does, and horizontal
  slicing. Consult it, do not run it as a second loop.
- **Design to the interface.** Use the `codebase-design` vocabulary exactly: module,
  interface, depth, seam, adapter, leverage, locality. Aim for deep modules, a lot of
  behaviour behind a small interface. Apply the deletion test before adding any module.
```

**Edit 4.** In *Non-negotiables*, replace the debugging bullet:

```markdown
6. **Debugging is gated on a feedback loop.** Before any hypothesis, you must have one
   command you have already run that goes **red** on this specific bug: it drives the
   real code path, asserts the human's exact symptom, is deterministic, and is fast.
   No red-capable command, no hypothesis. If you cannot build one, say so explicitly,
   list what you tried, and ask for access or a redacted artifact. Once the loop is
   red, Superpowers' `systematic-debugging` loop proceeds as normal. If no correct
   seam exists for the regression test, that is itself a finding: report it as
   architectural debt rather than writing a test that gives false confidence.
```

---

## Decisions Taken

All decision points in this plan were resolved by the author on **2026-09-16** in `Mandates/Pocock_MANDATE_02.md`, and the changes have been applied to `CLAUDE.md`, `SE_Discipline.md`, and `README.md`. This section is the record; the three files are the authority.

| # | Decision point | Resolution |
|---|---|---|
| 1 | Precedence between Superpowers and Pocock on testing and debugging | **Accepted as proposed.** Superpowers owns the red-green-refactor loop and the debugging loop; Pocock owns the entry gates (seam agreement, red-capable command). Written into `SE_Discipline.md` Step 3 and Non-negotiable 6. |
| 2 | The `SE_Discipline.md` promise that the human never types a command | **Amend it honestly.** The preamble, the session-flow section, and the tool map now say the human types `/grill-me` or `/grill-with-docs` to open substantial work and `/wait-what` when an answer does not land, and that Claude cannot type those itself. |
| 3 | Cutting `wizard` and `writing-for-agents` to save context | **Split.** `wizard` installs with `disable-model-invocation: true`, so it costs nothing in context but remains available as `/wizard` for the Dymon promotion path. `writing-for-agents` stays model-invoked: the author judged it important. The set stays at twelve, now 6 procedures and 6 abilities. |
| 4 | British-inflected prose in the installed skills | **Translate where obvious**, as an optional post-install step (`README.md` step 5d), structure left untouched. Em dashes are explicitly fine in this repo and are not to be stripped. |
| 5 | Install route | **Accepted: the `skills` installer**, not the managed plugin. `README.md` Part A step 1 now explains Node, `npm`, and `npx` from zero, including the PowerShell execution-policy fix. |
| 6 | Making `CONTEXT.md`'s purpose clear to a new user | **Done in two places.** `README.md` step 5c explains what it is and names the four skills that read it; `CLAUDE.md` carries a *CONTEXT.md belongs to this layer* subsection for Claude. |
| 7 | Everything else proposed | **Applied**, plus a detailed install-and-verify procedure in `README.md` Part B steps 5 and 6, written for someone starting on a bare machine. |

### What changed in the repo

| File | Change |
|---|---|
| `CLAUDE.md` | Bundle table extended to five layers with a `mattpocock-skills` row; new **The Pocock layer** section (skill roster, `CONTEXT.md` rules, precedence, exclusions); workflow list gains step 0, Align. |
| `SE_Discipline.md` | Preamble and session-flow promise amended; new **Step 0.5 — Align (Pocock)**; Step 3 gains the seam gate, the Superpowers/Pocock precedence rule, and the deep-module rule; Non-negotiable 6 replaced with the red-capable-loop gate; tool map gains two Pocock rows; setup section now expects five tools. |
| `README.md` | Opening and tool table now five layers, with the two human-typed commands explained; Part A step 1 covers `node`/`npm`/`npx` from scratch; new **Part B step 5** (installer, the `wizard` frontmatter edit, the `CONTEXT.md` glossary, optional rewording); **step 6** expanded to five verification checks; Part C rewritten to open with `/grill-me`; update and commit guidance extended. |

### Still open

- **`prototype`** was excluded only because `src/` does not exist. Revisit once this repo has a UI.
- **The Fowler smell baseline** from Pocock's `code-review` has not been copied into this repo's coding standards. It was recommended as a harvest rather than an install, and no coding-standards file exists yet to receive it.
- **`resolving-merge-conflicts`** remains a cheap later addition if parallel agents ever land here.

---

## Key Takeaways

| Concept | Summary |
|---|---|
| **Twelve, not twenty-five** | Six user-invoked procedures the human types, six model-invoked abilities. The set is bounded by context load, which every ability pays on every turn, and by what the existing four layers already do. |
| **The gaps are the case** | Deep-module vocabulary, periodic architecture survey, writing agent-facing docs, human-only setup procedures, and message repair are things no current layer does at all. That, not novelty, is why Pocock is worth adding. |
| **The overlaps are the exclusions** | `to-spec`, `to-tickets`, `implement`, and `code-review` are a second full pipeline competing with OpenSpec and Compound Engineering. Excluding them is what keeps the bundle coherent. |
| **Grilling is the highest-value single addition** | It converts the repo's promise that a non-expert can just state a goal into something safe, because every question ships a recommended answer and the agent finds its own facts. Run it against the repo itself before the next project. |
| **`CONTEXT.md` is the keystone artifact** | Four of the twelve read it. Installing the glossary makes `tdd`, `diagnosing-bugs`, and `improve-codebase-architecture` sharper for free. Keep it a glossary, never a spec. |
| **Debugging is gated, not guided** | The contribution of `diagnosing-bugs` is a mechanical gate: no red-capable command, no hypothesis. And a missing test seam is architectural evidence, not an excuse. |
| **Two philosophies now share the repo** | Pocock wants the human driving, Superpowers wants the model acting. Both can run, but the precedence rules must be written into `SE_Discipline.md` rather than discovered mid-session. |
| **Install editable, not managed** | The plugin ships all 25 and cannot be trimmed or edited. The `skills` installer gives exactly twelve, committed to the repo, so the discipline travels to Dymon with the code and can be adapted to house style. |
| **Setup is deliberately skipped** | `/setup-matt-pocock-skills` configures an issue tracker for skills that are not installed. Verified: none of the twelve require it. |
| **Do not blindly copy** | The strongest warning in the evidence base comes from the critical source, and it applies to this document too: treat the selection as a set of information to consider, not a set of steps to run. |
