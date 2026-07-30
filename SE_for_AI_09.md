# Software-Engineering Discipline Systems for Coding Agents

**GOAL:** Curate a set of software engineering frameworks (skills and commands) to help guide the AI Fellows' (and their coding assistants') in producing agentic systems that can be promoted to PROD as robust, secure and maintainable code.

> **Note on popularity figures:** GitHub star counts in this space are noisy and frequently inflated. Roundup sites report the same repository anywhere from ~40k to ~256k stars depending on when and how they counted. [Taskade verified counts against the GitHub API on July 1, 2026](https://www.taskade.com/blog/claude-code-skills); other roundups repeat much higher unverified figures. Treat the ranking below as **ordinal, not cardinal.**

---

## Table of Contents

1. [Developers and Their Proposed Software Engineering for AI Frameworks](#1-developers-and-their-proposed-software-engineering-for-ai-frameworks-ordered-by-popularity)
2. [Practitioner Methodologies & Course-Shipped Systems](#practitioner-methodologies--course-shipped-systems)
3. [Institutional / Non-Single-Person Systems](#institutional--non-single-person-systems)
4. [Published Comparisons](#2-published-comparisons)
5. [A Structural Distinction Worth Keeping in Mind](#a-structural-distinction-worth-keeping-in-mind)
6. [Framework Repository Reference](#framework-repository-reference)
7. [Implementing the Preferred Package: Superpowers + Compound Engineering + OpenSpec + karpathy-skills](#implementing-the-preferred-package-superpowers--compound-engineering--openspec--karpathy-skills)
   - [How these tools actually load](#how-these-tools-actually-load-read-this-first)
   - [Prerequisites](#prerequisites)
   - [Step 1 — Create the VS Code project](#step-1--create-the-vs-code-project)
   - [Step 2 — Install Superpowers](#step-2--install-superpowers-claude-code-plugin-global)
   - [Step 3 — Install Compound Engineering](#step-3--install-compound-engineering-claude-code-plugin-global)
   - [Step 4 — Install karpathy-skills](#step-4--install-karpathy-skills-behavioral-guardrails-pick-one-option)
   - [Step 5 — Install and initialize OpenSpec](#step-5--install-and-initialize-openspec-spec-layer-per-project)
   - [Step 6 — Verify everything is live](#step-6--verify-everything-is-live)
   - [Step 7 — Recommended end-to-end workflow](#step-7--recommended-end-to-end-workflow)
   - [Suggested repo layout](#suggested-repo-layout-after-setup)
   - [Team / reproducibility notes](#team--reproducibility-notes)
8. [Verifying a Successful Install (with figures)](#verifying-a-successful-install-with-figures)
9. [How the User Typically Invokes Each Tool](#how-the-user-typically-invokes-each-tool)

---

## 1. Developers and Their Proposed Software Engineering for AI Frameworks (ordered by popularity)

### 1. Jesse Vincent (obra; Prime Radiant) — Superpowers
- **Primary URL:** https://github.com/obra/superpowers
- **Approx. stars:** ~40k → 256k (varies across sources)
- **Core idea:** Enforced TDD (red/green/refactor), spec-first brainstorming, subagent-driven development, and "anti-rationalization" gates that stop the agent from skipping steps. A composable skills library, now on Anthropic's official plugin marketplace. Works across Claude Code, Codex, Cursor, OpenCode, Copilot, and Gemini.
- **Sources:** [obra/superpowers](https://github.com/obra/superpowers) · [Firecrawl](https://www.firecrawl.dev/blog/best-claude-code-skills) · [Dailyaiworld](https://dailyaiworld.com/blogs/ai-agent-skills-frameworks-comparison-2026)

### 2. Matt Pocock (Total TypeScript) — mattpocock/skills ("Skills for Real Engineers")
- **Primary URLs:** https://github.com/mattpocock/skills · https://www.aihero.dev/skills
- **Approx. stars:** ~87k → 176k
- **Core idea:** 40+ composable skills for real engineering workflows — TDD, diagnosis, triage, architecture review. Installs via `npx skills add mattpocock/skills`; a `/setup-matt-pocock-skills` command wires it to your issue tracker (GitHub, Linear, or local files).
- **Sources:** [mattpocock/skills](https://github.com/mattpocock/skills) · [AI Hero](https://www.aihero.dev/skills)

### 3. Garry Tan (Y Combinator CEO) — gstack
- **Primary URL:** https://github.com/garrytan/gstack
- **Approx. stars:** ~66k → 118k
- **Core idea:** Turns Claude Code into a "virtual engineering team" — 23 specialist roles (CEO, Designer, Eng Manager, Release Manager, Doc Engineer, QA, Security) plus 8 power tools, all as slash commands. Organized as a Think → Plan → Build → Review → Test → Ship → Reflect loop, with role-play skills like `/office-hours` and OWASP/STRIDE security review. MIT licensed.
- **Sources:** [garrytan/gstack](https://github.com/garrytan/gstack) · [Augment Code](https://www.augmentcode.com/learn/garry-tan-gstack-claude-code)

### 4. Addy Osmani (Google Chrome engineering director) — agent-skills
- **Primary URL:** https://github.com/addyosmani/agent-skills
- **Approx. stars:** ~68k → 75k
- **Core idea:** 20+ skills plus 7–8 slash commands mapped to the software lifecycle (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/webperf`, `/code-simplify`, `/ship`). Encodes Google engineering culture — Hyrum's Law, the Beyoncé Rule, the test pyramid (80/15/5), Shift Left, change sizing — with each skill using an "anti-rationalization" table.
- **Sources:** [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) · [O'Reilly Radar](https://www.oreilly.com/radar/agent-skills/)

### 5. Forrest Chang (encoding Andrej Karpathy) — karpathy-skills  —  by raw stars, the #1 skills repo
- **Primary URL:** https://github.com/multica-ai/andrej-karpathy-skills
- **Approx. stars:** ~188k–194k on the multica-ai mirror as of July 2026 ([GitHub repo](https://github.com/multica-ai/andrej-karpathy-skills) · [Star History, 194.6k / global rank #27, Jul 8 2026](https://www.star-history.com/multica-ai/andrej-karpathy-skills/) · [Gitstar, 178.4k](https://www.gitstar.co.kr/multica-ai/andrej-karpathy-skills)). Note the two-account history: the original `forrestchang/andrej-karpathy-skills` (~91k) plus the `multica-ai` mirror (~132k in May) were often summed to "220,000+ combined" ([Tech Times](https://www.techtimes.com/articles/316798/20260518/karpathy-inspired-claudemd-passes-220000-combined-github-stars-four-rules-that-stop-ai-breaking.htm)). The "156,000" figure in the [Govelomatrix roundup](https://govelomatrix.com/best-github-skills-repositories/) was a June snapshot — already stale.
- **Core idea:** A single ~65–70-line `CLAUDE.md`/`SKILL.md`, zero runtime dependencies, compatible with any agent that reads a `CLAUDE.md` or `SKILL.md`. Four behavioral rules — **Think Before Coding** (state assumptions, ask when uncertain, surface tradeoffs instead of silently picking), **Simplicity First** (no abstractions/flexibility/error-handling beyond what was asked), **Surgical Changes** (touch only what you must; don't refactor working code or make orthogonal edits), and **Goal-Driven Execution** (loop until verified). These target the exact failure patterns Karpathy named in his Jan 2026 X post: silent wrong assumptions, over-engineering, and unrequested changes. It biases toward caution over speed — well-suited to non-trivial work, arguably over-calibrated for simple edits.
- **Install:** drop the file into your `.claude/skills/` directory, or `/plugin marketplace add forrestchang/andrej-karpathy-skills`.
- **Two honesty caveats:** (1) Karpathy did **not** write it — Forrest Chang distilled it from Karpathy's observations; Karpathy has not endorsed it ([The 65-Line File That Broke GitHub](https://www.youtube.com/watch?v=FzYcfMySDkU)). (2) The widely repeated "65% → 94% accuracy" claim is a **misattribution** — that number came from a separate set of Anthropic domain-skill experiments, not this file ([same source](https://www.youtube.com/watch?v=FzYcfMySDkU)).

> **On ranking:** By raw GitHub stars this is the single most-starred entry here — arguably the most viral developer-tool launch of the year. It's listed at position 5 because this section is ordered by durable, multi-signal adoption (marketplace presence, cross-tool integration, sustained usage) rather than a single headline metric, and because star counts for this repo in particular are noisy (two accounts, snapshot-dependent figures from 43k up to 220k). Read the number as "#1 by stars," not necessarily "#1 by depth of engineering discipline" — it is one file of guardrails, not a full methodology like Superpowers or Compound Engineering.
- **Sources:** [Firecrawl](https://www.firecrawl.dev/blog/best-claude-code-skills) · [Govelomatrix](https://govelomatrix.com/best-github-skills-repositories/)

### 6. Harper Reed — "My LLM Codegen Workflow" (blog method, not a repo)
- **Primary URL:** https://harper.blog/2025/02/16/my-llm-codegen-workflow-atm/
- **Core idea:** Spec → Plan → Execute as discrete loops. Idea-honing via a conversational model produces `spec.md`; a reasoning model turns it into `prompt_plan.md` + `todo.md`; a code-gen agent implements each step test-first, one at a time. The reusable prompts are the widely-copied artifact. Amplified by Simon Willison.
- **Sources:** [Harper Reed's blog](https://harper.blog/2025/02/16/my-llm-codegen-workflow-atm/) · [Simon Willison](https://simonwillison.net/2025/Feb/21/my-llm-codegen-workflow-atm/)

### 7. Geoffrey Huntley — "Ralph Wiggum" / the Ralph loop
- **Primary URLs:** https://ghuntley.com/ralph/ · https://ghuntley.com/loop/
- **Core idea:** Treat everything as a self-improving agent loop driven by an `AGENT.md` at its heart. The agent updates its own instructions as it learns the correct build/run commands; guardrails instruct it not to assume code is unimplemented before searching (with parallel subagents).
- **Sources:** [ghuntley.com/ralph](https://ghuntley.com/ralph/) · [ghuntley.com/loop](https://ghuntley.com/loop/)

### 8. Brian Madison — BMAD-METHOD
- **Primary URL:** https://github.com/bmad-code-org/bmad-method
- **Approx. stars:** ~49.5k
- **Core idea:** "Breakthrough Method for Agile AI-Driven Development." Structures agentic coding around specifications, role agents, and phased workflows — 19+ specialist agents (PM, Architect, Scrum Master, Developer, QA) and 50+ named workflows spanning the full SDLC. Integrates natively with Claude Code via skills, commands, and hooks; compatible with 42+ agent platforms. MIT licensed.
- **Sources:** [Cosmonet](https://www.cosmonet.info/bmad-method-claude-code/) · [SSOJet](https://ssojet.com/blog/best-spec-driven-development-tools)

---

## Practitioner Methodologies & Course-Shipped Systems

These are named, opinionated systems built by individual practitioners — often shipping as a plugin, a course with bundled skills/commands, or a memory tool — that encode a specific engineering discipline rather than just a generic skill catalog. (Added at the reader's suggestion; several were missing from the popularity-ordered list above.)

### Kieran Klaassen (GM of Cora at Every) — Compound Engineering plugin
- **Primary URL:** https://github.com/EveryInc/compound-engineering-plugin
- **Approx. stars:** ~6.8k → 10k+ (the [Compound Engineering Camp writeup](https://every.to/source-code/compound-engineering-camp-every-step-from-scratch) cites "more than 10,000 GitHub stars," used by engineers at Google and Amazon)
- **Core idea:** "Each unit of engineering work should make subsequent units easier — not harder." 80% planning/review, 20% execution. Ships as a Claude Code plugin with slash commands for each loop step: `/ce-plan`, `/ce-work`, `/ce-code-review` (multi-agent review), and `/ce-compound` (codify learnings so agents don't repeat mistakes). Review agents check security, architecture, and code quality. The loop has since expanded from four steps (Plan → Work → Review → Compound) to eight (Ideate → Brainstorm → Plan → Work → Review → Polish → Compound → repeat).
- **Sources:** [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) · ["My AI Had Already Fixed the Code Before I Saw It" (Every)](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) · ["Compound Engineering Gets an Upgrade" (Every)](https://every.to/p/compound-engineering-gets-an-upgrade)

### IndyDevDan — Tactical Agentic Coding (TAC) & Principled AI Coding
- **Primary URLs:** https://agenticengineer.com/tactical-agentic-coding/course · earlier prompts at https://github.com/disler (8k+ stars, 2k+ forks)
- **Format:** A paid course (not a repo) that ships with skills and commands, plus an extended "Agentic Horizon" lesson set.
- **Core idea:** "Build the system that builds the system" — move from "in the loop" prompting to "out of the loop" autonomous systems, encoding your engineering practices into agents so they "ship how you would ship." Frameworks include **PITER**, **Closed Loop Prompts** (self-correcting feedback loops), separate **Review and Documentation agents**, the **Core Four** (Context, Model, Prompt, Tools), and **ZTE** ("zero touch engineering"). Stacks standard-out, types, tests, and architecture as leverage points; tracks four agentic-coding KPIs.
- **Sources:** [Tactical Agentic Coding course](https://agenticengineer.com/tactical-agentic-coding/course)

### Steve Yegge — Beads (`bd`) coding-agent memory system
- **Primary URL:** https://github.com/steveyegge/beads · [announcement](https://steve-yegge.medium.com/introducing-beads-a-coding-agent-memory-system-637d7d92514a)
- **Core idea:** A dependency-graph issue tracker for agents. Point your `AGENTS.md`/`CLAUDE.md` at the `bd` tool with one line and agents switch from brittle markdown plans to an issue tracker with a task dependency graph — granting "unprecedented continuity from session to session" and long-horizon planning/work-discovery so no discovered work is lost. From the co-author of the "Vibe Coding" book.
- **Sources:** [Beads announcement (Steve Yegge)](https://steve-yegge.medium.com/introducing-beads-a-coding-agent-memory-system-637d7d92514a)

### Gota Kirin (gotalab) — cc-sdd
- **Primary URL:** https://github.com/gotalab/cc-sdd
- **Core idea:** One command installs an agentic SDLC workflow as Agent Skills — discovery, requirements, design, tasks, and autonomous implementation with **per-task independent review**. Turns approved specs into long-running autonomous implementation; ships the same 17-skill set across 8 AI coding agents.
- **Sources:** [gotalab/cc-sdd](https://github.com/gotalab/cc-sdd) · [cc-sdd on Yarn](https://classic.yarnpkg.com/en/package/cc-sdd)

### AWS — Kiro (spec-driven IDE + portable skills)
- **Primary URL:** https://kiro.dev/docs/cli/skills/
- **Core idea:** An AWS-built agentic IDE organized around a `.kiro/specs/` directory (requirements → design → tasks read as first-class input each session), plus portable "skill" instruction packages for workflows like PR review, infra deployment, and enforcing team coding standards.
- **Sources:** [Kiro skills docs](https://kiro.dev/docs/cli/skills/) · [Spec-Driven Development with AWS Kiro](https://javatask.dev/blog/agentic-ai-on-aws-spec-driven-development/)

> **Related philosophy (Every):** Kieran's colleague **Dan Shipper** (Every CEO) frames the surrounding management practice — "a four-step engineering process for software teams that don't write code" — building on the same compound-engineering loop. [Every: The Future of Programming](https://every.to/c/compounding-engineering)

---

## Institutional / Non-Single-Person Systems

- **GitHub Spec Kit** — spec-driven development (`/speckit.constitution → specify → clarify → plan → tasks → implement`), ~115k–122k stars, agent-agnostic across 30+ agents. [github.github.com/spec-kit](https://github.github.com/spec-kit/) · [Git-Stars](https://www.gitstar-pro.com/projects/github/spec-kit)
- **AGENTS.md** — the OpenAI-originated, now vendor-neutral open standard (60,000+ repos), read natively by Codex, Cursor, Copilot, Gemini CLI, Aider, Windsurf, Zed. [Codersera](https://codersera.com/blog/agents-md-vs-claude-md-vs-cursor-rules-comparison-2026/)
- **OpenSpec** (~55.9k), **GSD / get-shit-done** (~64k), **Task Master AI** (~27.7k). [SSOJet](https://ssojet.com/blog/best-spec-driven-development-tools) · [Taskade](https://www.taskade.com/blog/claude-code-skills)
- **Anthropic's official skills repo** (Skill Creator + document skills) — the baseline reference. [github.com/anthropics/skills](https://github.com/anthropics/skills)

---

## 2. Published Comparisons

- **"Beyond Vibe Coding: 7 Production Agent Skills Frameworks"** — the most explicit head-to-head, comparing mattpocock/skills, Superpowers, Spec Kit, addyosmani/agent-skills, skills.sh, Cloudflare Skills, and Vercel Labs Skills, with per-framework ratings and a stars / skills-count / install / learning-curve table. [Dailyaiworld](https://dailyaiworld.com/blogs/ai-agent-skills-frameworks-comparison-2026)
- **"Superpowers vs. BMAD vs. SpecKit vs. OpenSpec vs. GSD"** — treats the five "frameworks (not tools)" and argues their approaches differ enough that picking wrong wastes weeks. [rexai.top](https://rexai.top/en/posts/ai-coding-frameworks-comparison-2026/)
- **"7 Spec-Driven Development Tools: Spec Kit, Kiro, OpenSpec, BMAD, Task Master…"** — pricing / license / star / best-for table across the spec-driven camp. [SSOJet](https://ssojet.com/blog/best-spec-driven-development-tools)
- **"OpenSpec vs GitHub Spec Kit"** — a focused two-way spec-driven comparison. [Luis Mori](https://luismori.dev/article/openspec-vs-github-spec-kit-spec-driven-development-comparison/)
- **"AGENTS.md vs CLAUDE.md vs Cursor Rules: 2026 Guide"** — compares the instruction-file conventions (the markdown layer beneath the skill systems). [Codersera](https://codersera.com/blog/agents-md-vs-claude-md-vs-cursor-rules-comparison-2026/)
- **"Best Agentic Coding Method in 2026? Superpowers vs BMAD vs OpenSpec"** — video comparison. [YouTube](https://www.youtube.com/watch?v=lLUKcm3StRY)
- **Curated indexes that function as comparison surfaces:** [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) · [Govelomatrix's 20 most-starred skills repos](https://govelomatrix.com/best-github-skills-repositories/) · [Taskade's API-verified ranking](https://www.taskade.com/blog/claude-code-skills) · [Firecrawl's tested list](https://www.firecrawl.dev/blog/best-claude-code-skills)

---

## A Structural Distinction Worth Keeping in Mind

The comparisons converge on a taxonomy of four overlapping camps:

1. **Spec-driven** — Spec Kit, OpenSpec, Kiro, cc-sdd, Harper Reed's method. Front-load a rigorous spec, then execute against it.
2. **Methodology / skill-library** — Superpowers, gstack, agent-skills, mattpocock/skills, IndyDevDan's TAC. Encode senior-engineer discipline as auto-loading skills plus verification gates.
3. **Multi-agent-role** — BMAD, gstack's team-of-specialists. Assign distinct role agents (PM, architect, QA, security) across a workflow.
4. **Compounding / self-improving loop** — Kieran Klaassen's Compound Engineering, Geoffrey Huntley's Ralph loop, Steve Yegge's Beads. The system learns from each cycle (via codified learnings, a self-editing `AGENT.md`, or a persistent issue graph) so the next unit of work is easier and past mistakes aren't repeated.

These camps overlap: the strongest systems combine them (e.g., Compound Engineering is spec-driven *and* multi-agent-role *and* a compounding loop). Most sources agree **Superpowers** is currently the most-adopted single-person skill library, **Compound Engineering** is the most-cited compounding-loop methodology, and **AGENTS.md** is the lowest-common-denominator instruction standard that everything else layers on top of.

- [Codersera](https://codersera.com/blog/agents-md-vs-claude-md-vs-cursor-rules-comparison-2026/) · [Dailyaiworld](https://dailyaiworld.com/blogs/ai-agent-skills-frameworks-comparison-2026)

---

## Framework Repository Reference

| Framework | Author / Owner | Repository / Primary URL |
| --- | --- | --- |
| Superpowers | Jesse Vincent (obra) | https://github.com/obra/superpowers |
| BMAD-METHOD | Brian Madison | https://github.com/bmad-code-org/bmad-method |
| GitHub Spec Kit | GitHub | https://github.com/github/spec-kit |
| OpenSpec | Fission Labs / community | https://github.com/Fission-AI/OpenSpec |
| Kiro | AWS | https://github.com/kirodotdev/Kiro |
| Compound Engineering plugin | Kieran Klaassen (Every) | https://github.com/EveryInc/compound-engineering-plugin |
| gstack | Garry Tan | https://github.com/garrytan/gstack |
| Tactical Agentic Coding (TAC) | IndyDevDan | https://agenticengineer.com/tactical-agentic-coding/course (course; earlier prompts at https://github.com/disler) |
| Beads (`bd`) issue graph | Steve Yegge | https://github.com/steveyegge/beads |
| mattpocock/skills | Matt Pocock | https://github.com/mattpocock/skills |
| agent-skills | Addy Osmani | https://github.com/addyosmani/agent-skills |
| karpathy-skills (~188k–194k ⭐, #1 by raw stars) | Forrest Chang | https://github.com/multica-ai/andrej-karpathy-skills |
| cc-sdd | Gota Kirin (gotalab) | https://github.com/gotalab/cc-sdd |
| Anthropic official skills | Anthropic | https://github.com/anthropics/skills |

> **Note:** Kiro is primarily distributed as a downloadable IDE at [kiro.dev](https://kiro.dev/); the GitHub repository above hosts its public issue tracker and documentation. IndyDevDan's TAC is a paid course rather than an open repository, so no canonical framework repo exists — his related open-source prompt work lives at [github.com/disler](https://github.com/disler).

---

## Implementing the Preferred Package: Superpowers + Compound Engineering + OpenSpec + karpathy-skills

This is a complete, step-by-step guide to standing up a **new VS Code project** with all four systems available together. They are complementary layers, not competitors:

- **OpenSpec** — the spec layer. Front-loads a rigorous, reviewable spec (the *what/why*) before any code is written.
- **Compound Engineering** — the workflow-loop layer. Drives a Plan → Work → Review → Compound cycle where each cycle documents learnings so future work gets easier ([EveryInc](https://github.com/EveryInc/compound-engineering-plugin)).
- **Superpowers** — the engineering-discipline layer. Auto-triggering TDD and subagent-driven development skills (the *how*) ([obra](https://github.com/obra/superpowers)).
- **karpathy-skills** — the guardrail layer. Always-on behavioral rules (the *don't* — no silent assumptions, no over-engineering, no orthogonal edits) ([multica-ai](https://github.com/multica-ai/andrej-karpathy-skills)).

> **A note on overlap:** Compound Engineering and OpenSpec both include a planning step, and Compound Engineering's `/ce-code-review` overlaps somewhat with Superpowers' test gates. That is fine — you can run OpenSpec for heavyweight, committed specs and use Compound Engineering's lighter loop for day-to-day iteration, or lead with Compound Engineering and reach for OpenSpec only on larger changes. Step 6 shows one coherent way to combine them; adjust to taste.

### How these tools actually load (read this first)

None of these are VS Code Marketplace extensions. They all plug into **Claude Code**, which runs *inside* VS Code via the Claude Code extension (an integrated terminal + editor agent). So the real target is Claude Code, and VS Code is just the host.

- **Three of the four are Claude Code plugins** (Superpowers, Compound Engineering, and karpathy-skills via its recommended path). Plugins install once and are then available across all your projects.
- **OpenSpec is an npm CLI** that must be **initialized per project** (`openspec init`), writing spec files and its slash commands into that specific repo.
- **Skills/plugins load** from `~/.claude/skills/` (personal, all projects) or `<repo-root>/.claude/skills/` (project-scoped, committed to the repo) ([where Claude skills are stored](https://www.agensi.io/learn/where-are-claude-skills-stored)).
- **Skills trigger automatically**; **slash commands** (Compound Engineering's `/ce-*`, OpenSpec's `/openspec-*`) are typed into the Claude Code chat.

**Bottom line:** no repositories need to be git-cloned. Three install via the plugin marketplace; OpenSpec installs via npm and is initialized inside each project.

### Prerequisites

1. **VS Code** installed.
2. **Node.js ≥ 20.19.0** — required by OpenSpec ([OpenSpec README](https://github.com/Fission-AI/OpenSpec)). Check: `node --version`.
3. **Claude Code** installed and authenticated, with its **VS Code extension** enabled (install from the Extensions panel, then run `claude` once in the integrated terminal to sign in). Claude Code reads the plugins, skills, and `CLAUDE.md`.
4. **git** — for version-controlling the project and its committed skills.
5. *(Optional)* **Bun** — only if you want to convert the Compound Engineering plugin to OpenCode/Codex formats; not needed for Claude Code.

### Step 1 — Create the VS Code project

```bash
mkdir my-agentic-project
cd my-agentic-project
git init
code .        # opens the folder in VS Code
```

Open the **integrated terminal** in VS Code (`` Ctrl+` `` / `` Cmd+` ``) and start Claude Code with `claude` (or use the Claude Code side-panel). Commands beginning with `/` are typed **into the Claude Code chat**; `npm`/`curl`/`openspec` commands go in the **shell**.

### Step 2 — Install Superpowers (Claude Code plugin, global)

From **within Claude Code** ([Superpowers README](https://github.com/obra/superpowers)):

```text
/plugin install superpowers@claude-plugins-official
```

If it isn't on the official marketplace in your version, register the author's marketplace first:

```text
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

Installs globally; its composable skills then trigger automatically in every project. After installing, run `/reload-plugins` (or restart `claude`) so the skills load into the current session.

### Step 3 — Install Compound Engineering (Claude Code plugin, global)

From **within Claude Code** ([Compound Engineering README](https://github.com/EveryInc/compound-engineering-plugin)):

```text
/plugin marketplace add https://github.com/EveryInc/compound-engineering-plugin
/plugin install compound-engineering
```

This adds workflow slash commands under the `/ce-` prefix, including:

- `/ce-plan` — turn a feature idea into a detailed implementation plan
- `/ce-work` — execute the plan with git worktrees and task tracking
- `/ce-code-review` — multi-agent code review (security, architecture, quality) before merging (plus `/ce-doc-review` for docs)
- `/ce-compound` — document learnings so future work is easier

Additional `/ce-*` commands include `/ce-brainstorm`, `/ce-debug`, `/ce-worktree`, `/ce-setup`, `/ce-update`, `/ce-simplify-code`, `/ce-commit`, `/ce-commit-push-pr`, `/ce-proof`, `/ce-polish`, `/ce-ideate`, and `/ce-promote`, plus `/lfg` for the full autonomous engineering workflow. Run `/reload-plugins` after installing so the commands register.

> *(Optional, non-Claude agents)* To convert the plugin to OpenCode or Codex format, use the Bun CLI: `bunx @every-env/compound-plugin install compound-engineering --to opencode` (writes to `~/.opencode`) or `--to codex` (writes to `~/.codex/prompts` and `~/.codex/skills`). Both targets are experimental.

### Step 4 — Install karpathy-skills (behavioral guardrails). Pick ONE option.

**Option A — Plugin (recommended, global, applies to all projects)** — from **within Claude Code** ([karpathy-skills README](https://github.com/multica-ai/andrej-karpathy-skills)):

```text
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
```

**Option B — Per-project `CLAUDE.md` (committed to this repo)** — in the **shell** at the project root:

```bash
# new project (creates the file):
curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md

# OR append to an existing CLAUDE.md:
echo "" >> CLAUDE.md
curl https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md >> CLAUDE.md
```

Option B is more transparent for a shared repo (the four rules live in a version-controlled `CLAUDE.md` your team can see and edit); Option A auto-applies everywhere. After the plugin install (Option A), run `/reload-plugins`. (Cursor equivalent: a `.cursor/rules/karpathy-guidelines.mdc` rule — see the repo's `CURSOR.md`.)

### Step 5 — Install and initialize OpenSpec (spec layer, per-project)

Install the CLI **globally** once (shell) ([OpenSpec README](https://github.com/Fission-AI/OpenSpec)):

```bash
npm install -g @fission-ai/openspec@latest
```

Then **inside the project directory**, initialize it (shell):

```bash
cd my-agentic-project
openspec init
```

`openspec init` registers OpenSpec's slash commands and creates an `openspec/` folder. Changes live under `openspec/changes/<name>/` (containing `proposal.md`, `specs/`, `design.md`, `tasks.md`); completed work archives to `openspec/changes/archive/`. Refresh agent instructions anytime with `openspec update`. **Restart your IDE (or Claude Code session) after `openspec init`** so the new commands take effect.

OpenSpec slash commands as registered in Claude Code (typed into the Claude Code chat):

- `/openspec-propose <what-you-want-to-build>` — draft a spec/proposal
- `/openspec-apply-change` — implement the tasks in the spec
- `/openspec-archive-change` — archive the completed change
- `/openspec-explore` — think through a problem before proposing
- `/openspec-sync-specs` — sync delta specs into the main specs
- `/openspec-update-change` — revise a change's planning artifacts

> **Note on spelling:** OpenSpec's documentation shows `/opsx:propose` as the *canonical* name and states that spelling varies by tool. In Claude Code specifically, the commands register with the `/openspec-*` names above (matching the skill files `openspec init` writes into `.claude/`). Type the `/openspec` prefix and let autocomplete confirm the exact command in your environment.

### Step 6 — Verify everything is live

```bash
ls ~/.claude/skills/            # personal plugins/skills
ls .claude/skills/ 2>/dev/null  # project-scoped, if committed
openspec --version
cat CLAUDE.md | head            # if you chose karpathy Option B
```

In the Claude Code chat, run `/plugin` (or `/plugins`) to confirm **superpowers**, **compound-engineering**, and **andrej-karpathy-skills** all appear. Type `/ce` and `/openspec` and confirm both command families autocomplete. If they don't appear right after install, run `/reload-plugins` or restart `claude` — commands load at session start.

### Step 7 — Recommended end-to-end workflow

One coherent way to drive a feature so all four layers engage:

1. **Spec (OpenSpec):** `/openspec-propose add-user-auth`. Review and edit the generated `proposal.md`, `specs/`, `design.md`, and `tasks.md` until the plan is right. *(Use this for substantial, committed changes; for quick iterations you can skip straight to the Compound loop below.)*
2. **Plan (Compound Engineering):** `/ce-plan` to turn the spec/idea into a concrete implementation plan with worktrees and task tracking.
3. **Work (Compound + Superpowers + karpathy):** `/ce-work` (or `/openspec-apply-change`) to implement. Superpowers auto-triggers TDD (red → green → refactor) and subagent-driven development; karpathy's rules keep the agent from silent assumptions, over-engineering, or touching unrelated code. You don't invoke these two explicitly — they shape every response.
4. **Review (Compound Engineering):** `/ce-code-review` for multi-agent security/architecture/quality review (and `/ce-doc-review` for the spec); corroborate with Superpowers' test gates. Confirm the diff is surgical.
5. **Compound (Compound Engineering):** `/ce-compound` to document what was learned so the next cycle is faster and mistakes aren't repeated.
6. **Archive (OpenSpec):** `/openspec-archive-change` moves the finished change into a dated `openspec/changes/archive/` folder, keeping a durable spec history in the repo.

### Suggested repo layout after setup

```text
my-agentic-project/
├── .claude/
│   └── skills/                 # (optional) project-scoped skills committed for the team
├── .git/
├── CLAUDE.md                   # karpathy four rules (Option B) + project notes
├── openspec/
│   ├── changes/
│   │   ├── add-user-auth/
│   │   │   ├── proposal.md
│   │   │   ├── specs/
│   │   │   ├── design.md
│   │   │   └── tasks.md
│   │   └── archive/
│   │       └── 2026-07-24-add-user-auth/
│   └── ...                      # created by `openspec init`
└── src/                         # your actual code
```

*(Superpowers, Compound Engineering, and karpathy Option A live under `~/.claude/` per-machine, so they don't appear in the repo tree.)*

### Team / reproducibility notes

- **Commit** `CLAUDE.md`, the `openspec/` directory, and any `.claude/skills/` you want shared. Teammates get the spec history and guardrails automatically on clone; they only need to `openspec init`/`openspec update` locally and install the three plugins once each.
- **Global vs. project:** Superpowers, Compound Engineering, and (Option A) karpathy live in `~/.claude/` — per-machine, so each teammate installs them once. OpenSpec's artifacts are per-repo and travel with the code.
- **Updating:** re-run the plugin install commands to update the three plugins; run `npm install -g @fission-ai/openspec@latest` then `openspec update` to update OpenSpec.

> **Sources:** [Superpowers README](https://github.com/obra/superpowers) · [Compound Engineering README](https://github.com/EveryInc/compound-engineering-plugin) · [OpenSpec README](https://github.com/Fission-AI/OpenSpec) · [karpathy-skills README](https://github.com/multica-ai/andrej-karpathy-skills) · [Where Claude skills are stored](https://www.agensi.io/learn/where-are-claude-skills-stored)

---

## Verifying a Successful Install (with figures)

Once you have installed the four-tool package, use the screenshots below as a reference for what a correct, fully loaded install looks like. They are from a real Windows install (Git Bash / MINGW64, VS Code integrated terminal). If your environment matches these, the package is installed and loaded correctly.

### Figure 1 — Plugins panel: all three plugins enabled

Run `/plugins` in Claude Code. A correct install shows **andrej-karpathy-skills**, **superpowers**, and **compound-engineering** each marked “✓ enabled.” (MCP entries like mermaid/pencil are unrelated.)

![Figure 1 — /plugins panel showing andrej-karpathy-skills, superpowers, and compound-engineering all enabled](fig08/fig1_plugins_enabled.jpg)

### Figure 2 — Plugin install log

Each plugin install should confirm success. Note the two “Run /reload-plugins to apply” messages — that is the reload step from the implementation section. (“compound-engineering … is already installed” is harmless — the marketplace add already pulled it in.)

![Figure 2 — plugin install log for superpowers, compound-engineering marketplace add, and andrej-karpathy-skills](fig08/fig2_plugin_install_log.jpg)

### Figure 3 — `openspec init` output

In the shell (not the Claude chat), `npm install -g @fission-ai/openspec@latest` then `openspec init` should report **“6 skills and 6 commands in .claude/”** and **“Setup complete for Claude Code.”** Notice “Restart your IDE for the new commands to take effect.” The `ls ./.claude/skills/` confirms the six `openspec-*` skill files were created.

![Figure 3 — openspec init output showing 6 skills and 6 commands created and the restart-IDE notice](fig08/fig3_openspec_init.jpg)

### Figure 4 — Compound Engineering autocomplete (`/ce-`)

Type `/ce` in the Claude chat. Autocomplete lists the real commands — **`/ce-plan`**, **`/ce-work`**, **`/ce-proof`**, **`/ce-debug`**, etc., each tagged `(compound-engineering)`. Direct proof the prefix is `/ce-`.

![Figure 4 — Claude Code autocomplete showing /ce-plan, /ce-work, /ce-proof and other compound-engineering commands](fig08/fig4_ce_autocomplete.jpg)

### Figure 5 — OpenSpec autocomplete (`/openspec-`)

Type `/open` in the Claude chat. Autocomplete lists **`/openspec-explore`**, **`/openspec-propose`**, **`/openspec-sync-specs`**, **`/openspec-apply-change`**, **`/openspec-update-change`**, and **`/openspec-archive-change`** — the command family Claude Code registers.

![Figure 5 — Claude Code autocomplete showing /openspec-propose, /openspec-explore and related commands](fig08/fig5_openspec_autocomplete.jpg)

### Post-install checklist

- **Plugins enabled** — `/plugins` shows superpowers, compound-engineering, andrej-karpathy-skills all enabled (Fig 1).
- **Installs confirmed** — each plugin install reported success (Fig 2).
- **OpenSpec initialized** — `openspec init` reported “6 skills and 6 commands in .claude/” and `openspec --version` returns a version (Fig 3).
- **Reloaded / restarted** — you ran `/reload-plugins`, or restarted `claude`, *after* installing (fixes “Unknown command”).
- **Compound commands resolve** — typing `/ce` autocompletes `/ce-plan`, `/ce-work`, … (Fig 4).
- **OpenSpec commands resolve** — typing `/openspec` autocompletes `/openspec-propose`, … (Fig 5).
- **Superpowers / karpathy need no command** — start a task; Claude should ask clarifying questions before coding and keep diffs surgical.

If every item checks out, the package is correctly installed and loaded. Figures 1–5 are from a verified Windows install.

---

## How the User Typically Invokes Each Tool

A recurring source of confusion is that these four tools are triggered in **fundamentally different ways**. Two of them fire *automatically* based on what you're doing; two require you to *explicitly type a command*. Knowing which is which is the difference between the package working invisibly and you wondering why nothing happened.

First, the setting: in this project Claude Code most often runs **from the CLI in a VS Code integrated terminal** — you open the terminal (`` Ctrl+` `` / `` Cmd+` ``) and start it with `claude`. VS Code is the editor host; Claude is a terminal process. (Some people drive Claude through the Claude Code side-panel/extension instead, but the terminal is the common case.) Once Claude is running, there are exactly two kinds of input:

- **Slash commands typed into the Claude chat** — e.g. `/ce-plan`, `/openspec-propose`. These are read by Claude, not the shell.
- **Natural-language requests typed into the Claude chat** — e.g. "add rate limiting to the login endpoint." These are what cause *auto-triggered* skills to fire.

Shell commands (`npm`, `git`, `openspec init`, test runners) are separate — you type those at the terminal prompt, not into Claude.

### The ideal: the user should rarely type any command at all

Everything below documents *what each command does and how it fires* — but in day-to-day use the goal is that **the user names an outcome in plain language and Claude drives the commands itself.** This works when a discipline file (this project's `SE_Discipline.md`) is loaded early in the session — for example imported from `CLAUDE.md`, or installed as an always-on skill — so Claude reads it as its operating playbook and knows *which* `/ce-*` and `/openspec-*` command to run at *which* moment.

In that ideal mode, a session looks like this:

- **The user says:** "Add OAuth login."
- **Claude, guided by `SE_Discipline.md`, self-invokes the pipeline:** triages the task, runs `/openspec-propose` and pauses for the user to approve the spec, then runs `/ce-plan`, sets up a worktree, implements test-first (Superpowers + karpathy engage automatically), runs `/ce-code-review`, then `/ce-compound` and `/openspec-archive-change`.
- **The user's only jobs** are stating the goal and hitting the human checkpoints the discipline requires (approve the spec, approve the design, approve the merge).

So the slash commands are best understood as **Claude's vocabulary, not the user's homework.** The user *may* type them to force a specific step, but a well-elaborated `SE_Discipline.md` means they usually won't have to. The reference below exists (a) for those manual overrides and (b) so you understand what Claude is doing on your behalf.

> **Prerequisite for this to work:** `SE_Discipline.md` must actually be in Claude's context each session. Practical options: `@import` it from the repo's `CLAUDE.md`, paste a one-line "Read SE_Discipline.md before starting" at session open, or package it as a project skill that auto-loads. If it is *not* loaded, you fall back to the manual invocation patterns documented below.

### Invocation at a glance

| Tool | Trigger type | How it gets invoked (ideal → fallback) | Example |
|---|---|---|---|
| **Superpowers** | **Automatic** (context-detected) | Fires on its own from a plain-language goal — no command, ever. | "Let's build a CSV importer." → `brainstorming` then TDD skills activate on their own |
| **karpathy-skills** | **Always-on** (ambient) | Nothing — the rules apply to *every* Claude response the moment they're installed. | Any request at all; the four rules shape the reply |
| **Compound Engineering** | **Explicit** (slash command) | *Ideal:* Claude runs `/ce-*` for you per `SE_Discipline.md`. *Fallback:* you type them. | `/ce-plan`, `/ce-work`, `/ce-code-review`, `/ce-compound` |
| **OpenSpec** | **Explicit** (slash command + CLI) | Type `/openspec-*` in chat for the workflow; run `openspec` in the shell for setup/maintenance. | `/openspec-propose add-auth` in chat; `openspec init` in the terminal |

### 1. Superpowers — invoked by *describing the work* (automatic)

You do **not** type a command to start Superpowers. Its skills are "mandatory workflows, not suggestions," and per its README the agent **"checks for relevant skills before any task"** and they **"trigger automatically"** ([Superpowers](https://github.com/obra/superpowers)). What you actually do:

- **To start a build:** state what you're trying to make in plain language ("I want to add pagination to the results API"). Superpowers notices you're building something and, rather than jumping to code, it **"steps back and asks what you're really trying to do"** — the `brainstorming` skill. 
- **To move into implementation:** answer its brainstorming questions and approve the design; that approval causes `writing-plans`, then `subagent-driven-development`/`executing-plans`, then `test-driven-development` to engage in turn.
- **To trigger a code review:** simply finish a task — `requesting-code-review` fires *between* tasks automatically.
- **To trigger debugging discipline:** report a bug ("this throws on empty input"); `systematic-debugging` engages.

> **The user's real "invocation" of Superpowers is good problem statements.** Vague requests get vague activation; a clear "build X that does Y" reliably kicks off the brainstorm→plan→TDD chain. You can also ask for a skill by name ("use test-driven-development here") if you want to force it.

### 2. karpathy-skills — invoked by *existing* (always-on)

There is **no invocation step at all**. Once installed (as a plugin, or as a `CLAUDE.md` committed to the repo), the four rules — Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution — apply ambiently to every response ([karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)). What the user does:

- **To benefit from them:** nothing — just work normally. They surface as Claude asking clarifying questions *before* coding, refusing to over-engineer, and keeping diffs surgical.
- **To see them working:** watch for the tells — assumptions stated explicitly, alternatives presented instead of silently chosen, and diffs where every line traces to your request.
- **To adjust them:** because Option B stores them in a version-controlled `CLAUDE.md`, the user "invokes a change" simply by editing that file; the new rules apply on Claude's next response.

> If you're using the per-project `CLAUDE.md` route, the rules travel with the repo, so *any* teammate's Claude session is "invoked" into the same guardrails just by opening the project.

### 3. Compound Engineering — invoked by *typing a `/ce-` command* (explicit)

Nothing about Compound happens until you type one of its slash commands into the Claude chat ([Compound Engineering](https://github.com/EveryInc/compound-engineering-plugin)). The user drives the loop deliberately:

- **To plan:** `/ce-plan` — turn a feature idea into a detailed implementation plan.
- **To execute:** `/ce-work` — run the plan with git worktrees and task tracking.
- **To review before merge:** `/ce-code-review` — kick off the multi-agent security/architecture/quality pass.
- **To capture learnings:** `/ce-compound` — document what was learned so the next cycle is easier.

> **The user's invocation pattern is the loop itself:** `/ce-plan → /ce-work → /ce-code-review → /ce-compound`, repeated per feature. Typing `/ce` and letting autocomplete list the commands is the fastest way to remember them.

### 4. OpenSpec — invoked in *two places*: `/openspec-*` in chat and `openspec` in the shell (explicit)

OpenSpec is the one tool with both a chat surface and a terminal surface, so "invoking it" means different things at different moments ([OpenSpec](https://github.com/Fission-AI/OpenSpec)):

- **One-time / maintenance — in the terminal:**
  - `openspec init` (inside the project) to register its slash commands and create the `openspec/` folder.
  - `openspec update` to refresh agent instructions; `openspec --version` to check the install.
- **Everyday spec workflow — `/openspec-*` in the Claude chat:**
  - `/openspec-propose <slug>` — draft a proposal/spec for the change you're about to make.
  - `/openspec-apply-change` — implement the tasks in the approved spec.
  - `/openspec-explore` — think through a problem before proposing.
  - `/openspec-sync-specs` — sync delta specs into the main specs.
  - `/openspec-update-change` — revise a change's planning artifacts.
  - `/openspec-archive-change` — move the finished change into `openspec/changes/archive/`.

> **The user's invocation of OpenSpec is bimodal:** set it up once with the CLI, then live in the `/openspec-*` chat commands for the actual work. (These are the Claude Code spellings; OpenSpec's canonical documentation names them `/opsx:*`, but Claude Code registers the `/openspec-*` forms — let autocomplete confirm.)

### Putting it together — a single feature, start to finish

**Ideal mode (`SE_Discipline.md` loaded — Claude self-drives).** The user speaks once; Claude runs the commands and pauses only at human checkpoints:

1. **User:** "Add OAuth login." That single sentence is the only required input.
2. **Claude** triages the task as *substantial* and — following `SE_Discipline.md` — runs `/openspec-propose add-oauth-login` itself, then **pauses**: "Here's the proposed spec, in sections — approve or adjust?"
3. On approval, **Claude** runs `/ce-plan`, sets up a git worktree, and begins implementing test-first. **Superpowers** enforces RED→GREEN→REFACTOR and **karpathy** keeps the diff surgical — both engage automatically, no command needed.
4. **Claude** runs `/ce-code-review` and reports findings, then **pauses** for merge approval.
5. On approval, **Claude** runs `/ce-compound` to capture learnings and `/openspec-archive-change` to file the spec.

The user typed **zero slash commands** — they stated a goal and answered three approval prompts. That is the target experience.

**Manual mode (fallback — discipline file not loaded, or you want to force a step).** Here the user drives each command explicitly:

1. User states the goal in chat; **Superpowers** auto-starts `brainstorming` and **karpathy** shapes the reply.
2. User types `/openspec-propose add-oauth-login` → reviews/approves the spec.
3. User types `/ce-plan` → **Compound** builds the plan.
4. User types `/ce-work` (or `/openspec-apply-change`) → TDD + guardrails engage.
5. User types `/ce-code-review` → pre-merge review.
6. User types `/ce-compound` then `/openspec-archive-change`.

**The distinction to remember:** Superpowers and karpathy *always* fire on their own. Compound and OpenSpec must be *invoked by command* — the only question is whether **Claude** invokes them for you (ideal, when `SE_Discipline.md` is loaded) or **you** invoke them by hand (fallback).

> **Sources:** [Superpowers README](https://github.com/obra/superpowers) · [Compound Engineering README](https://github.com/EveryInc/compound-engineering-plugin) · [OpenSpec README](https://github.com/Fission-AI/OpenSpec) · [karpathy-skills CLAUDE.md](https://github.com/multica-ai/andrej-karpathy-skills)
