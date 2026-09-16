# Test_Bed — A Ready-to-Copy Software-Engineering Discipline for Claude Code

This repo is a **working reference setup**. It has five tools installed that, together, make an AI coding assistant (Claude Code) build software the disciplined way — agree on what we're building, spec first, test first, small careful changes — so the code is safe and maintainable enough to promote to production.

**You do not need to be an experienced coder to use this.** Once it's set up, your entire job is: *say what you want in plain English, and answer a few "approve?" prompts.* Claude drives all the tools for you, guided by [`SE_Discipline.md`](./SE_Discipline.md).

This README shows a brand-new user how to get the exact same setup, on their own machine, for their own projects.

---

## What you're installing (in plain language)

| Tool | What it does for you | You type commands? |
|---|---|---|
| **OpenSpec** | Writes down *what* we're building and gets your OK **before** any code | No — Claude runs it |
| **Compound Engineering** | Plans the work, runs a multi-expert code review, records lessons learned | No — Claude runs it |
| **Superpowers** | Forces test-first development (write a failing test, then make it pass) | No — automatic |
| **karpathy-skills** | Guardrails: no guessing, no over-engineering, no unrelated edits | No — always on |
| **mattpocock-skills** | Interviews *you* until Claude actually understands what you want, before it writes anything | Yes — two you'll learn: `/grill-me` and `/wait-what` |

You mostly never type any of their commands. [`SE_Discipline.md`](./SE_Discipline.md) tells Claude *when* to use each one, so it does it for you.

The one exception is the last row. Those skills are deliberately **human-only** — Claude is blocked from starting them, because their whole job is to make *you* the one in control at the moment it matters most. In practice that's two commands worth memorizing:

- **`/grill-me`** — before any substantial piece of work. Claude interviews you, hard, until you and it agree on what's being built. Expect a lot of questions; each comes with a recommended answer, so you can often just reply `1A, 2B, 3C`.
- **`/wait-what`** — any time Claude says something you don't understand. It re-explains in plain, simple English. Use it freely; that's what it's for.

---

## A note on how these are turned on: **per project, on purpose**

There are two ways to switch these tools on: **globally** (on for every project automatically) or **per project** (you turn them on in each project you want them in). This setup recommends **per project**.

Why? Because project types differ a lot — a quick script, a data notebook, and a production web service each want different discipline. Turning the tools on per project keeps you in control: you decide, per project, which tools apply and can customize them there without affecting everything else. It's a tiny bit more setup each time (about a minute) in exchange for keeping that flexibility.

So the setup below is split into:
- **Part A — once per computer:** install the tools so they're *available*.
- **Part B — once per project:** *turn them on* for that specific project and drop in the discipline files.

---

## Part A — One-time setup (do this once per computer)

### 1. Install the prerequisites

You need four things installed on your machine first:

1. **VS Code** — the editor. Download: https://code.visualstudio.com/
2. **Node.js version 20.19.0 or newer** — download the "LTS" version: https://nodejs.org/

   Installing Node also installs two helper commands you'll use later, so you don't install them separately:
   - **`npm`** — Node's package manager. It downloads and installs programs written in JavaScript.
   - **`npx`** — runs a program *once* without permanently installing it. We use it for the Pocock skills installer, so nothing extra gets left on your machine.

   Check all three by opening a terminal and running them one at a time:
   ```
   node --version
   npm --version
   npx --version
   ```
   You should see something like `v22.12.0`, `10.9.0`, `10.9.0`. If `node` is below `20.19.0`, update Node. If `node` works but `npm` or `npx` says "not recognized", close and reopen the terminal — the installer adds them to your PATH and open terminals don't see it until they restart. If it still fails, reinstall Node and leave every checkbox at its default.

   > **Windows note:** if `npm` fails with a message about *"running scripts is disabled on this system"*, PowerShell is blocking it. Open PowerShell **as Administrator** once and run:
   > ```
   > Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
   > ```
   > Answer `Y`. This is a standard developer setting and only needs doing once.
3. **Git** — version control. Download: https://git-scm.com/
4. **Claude Code** — the AI assistant. Follow: https://docs.claude.com/en/docs/claude-code
   After installing, also add the **Claude Code extension** inside VS Code (open the Extensions panel, search "Claude Code", install), then open VS Code's built-in terminal (`` Ctrl+` `` on Windows, `` Cmd+` `` on Mac) and run `claude` once to sign in.

> **Windows note:** These instructions use a terminal. Windows PowerShell works for everything here. Some tools historically preferred Git Bash — if a command misbehaves in PowerShell, try running it in **Git Bash** (installed with Git) instead.

### 2. Make the three plugins available (add their "marketplaces" — once)

A *marketplace* is just the catalog Claude installs plugins from. Adding one is machine-wide and only needs to be done once. It does **not** turn the plugin on yet — you'll do that per project in Part B.

Start Claude Code (run `claude` in the VS Code terminal), then type these **into the Claude chat** (lines starting with `/` are Claude commands, not terminal commands):

```
/plugin marketplace add obra/superpowers-marketplace
/plugin marketplace add https://github.com/EveryInc/compound-engineering-plugin
/plugin marketplace add forrestchang/andrej-karpathy-skills
```

(Superpowers may already be on the official marketplace in your version; adding the author's marketplace above works either way.)

### 3. Install the OpenSpec tool (once)

This one is a normal command-line program. In the **terminal** (not the Claude chat), run:
```
npm install -g @fission-ai/openspec@latest
```
Check it worked:
```
openspec --version
```

> **Nothing to do here for the Pocock skills.** They have no machine-wide step at all — they're just files copied into each project, which happens in Part B step 5. That's the whole reason we install them this way rather than as a plugin.

---

## Part B — Setup for each new project (takes ~5 minutes)

Do these six small steps in each project where you want the discipline. This is where you *turn the tools on for this project* — and where you could later customize which tools apply.

Steps 1–4 are quick (about a minute total). Step 5 installs the Pocock skills and builds your project glossary, which takes a few minutes the first time because it involves an actual conversation. Step 6 checks the whole thing works.

### 1. Create the project and open it

```
mkdir my-new-project
cd my-new-project
git init
code .
```

### 2. Turn on the three plugins **for this project**

Run these **in the Claude chat, from inside this project**. Because you run them here, they're enabled for *this* project rather than globally:

```
/plugin install superpowers@superpowers-marketplace
/plugin install compound-engineering
/plugin install andrej-karpathy-skills@karpathy-skills
/reload-plugins
```

If Claude asks where to enable a plugin, choose **this project / local** (not global). If a plugin was already downloaded for another project, this just switches it on here — it's quick.

> Want a tool *off* for this project (e.g. skip the heavy spec step on a throwaway script)? Simply don't install it here, or disable it with `/plugins`. That per-project control is the whole point of doing it this way.

### 3. Turn on the spec tool for this project

In the terminal, inside your project folder:
```
openspec init
```
This creates an `openspec/` folder and registers the `/openspec-*` commands for this project. Restart Claude Code (or the session) afterward so the commands load.

### 4. Copy in the discipline files

Two files make Claude follow the playbook:

1. **Copy `SE_Discipline.md` from this repo, as-is,** into your new project's top folder. This is the playbook — don't edit it unless you know what you're changing.
2. **Create a small `CLAUDE.md`** in the same folder. Claude reads `CLAUDE.md` automatically, and its one important job is to point at the playbook. Paste exactly this:

```markdown
# CLAUDE.md

Before doing any development work, read and follow `@SE_Discipline.md`.
Spec first, test first, code last. Surgical changes. Verify before claiming done.

`CONTEXT.md` is this project's glossary — the words we use for things.
Read it before exploring the code. Keep it a glossary, never a spec.
```

(The `CONTEXT.md` line matters once you've done step 5 below. It's harmless before then — if the file doesn't exist yet, Claude just notes that and moves on.)

That single `@SE_Discipline.md` import is what loads the playbook into Claude every session.

> (This repo's own `CLAUDE.md` has extra notes specific to the Test_Bed research project — you don't need those. The minimal version above is all a normal project needs.)

### 5. Install the Matt Pocock skills (12 of 25)

This is the fifth layer. Unlike the three plugins above, these are **ordinary files copied into your project**, which means you own them, you can edit them, and they travel with the repo when someone clones it.

We install **12 of the 25** available skills on purpose. Every skill Claude can trigger by itself costs a little of its attention on *every single message*, forever — so a smaller, deliberate set works better than the full catalog. The reasoning behind exactly these twelve is in [`Plans/PLAN_Pocock_01.md`](./Plans/PLAN_Pocock_01.md).

#### 5a. Run the installer

**Use this one command.** In the **terminal** (not the Claude chat), from inside your project folder, paste it whole and press Enter:

```
npx skills@latest add mattpocock/skills -a claude-code -y \
 -s codebase-design -s diagnosing-bugs -s domain-modeling -s grill-me \
 -s grill-with-docs -s grilling -s handoff -s improve-codebase-architecture \
 -s tdd -s wait-what -s wizard -s writing-for-agents
```

(On Windows PowerShell the `\` line-continuations won't work — either paste it as one long line, or run it in **Git Bash**.)

The first time, `npx` asks permission to download the installer — answer `y`. After that it runs start to finish with no questions.

**Why the flags instead of the menus.** Run bare, `npx skills@latest add mattpocock/skills` opens two interactive pickers, and the first one is a trap:

- **"Which coding agents to install for"** offers a long list — Cursor, Codex, Zed, Warp, Copilot and many more. **You must tick `claude-code`.** If you don't, the skills install to `.agents/skills/` instead of `.claude/skills/`, and **Claude Code cannot see them.** Everything looks like it worked; nothing actually works. The flag `-a claude-code` removes the risk.
- **"Which skills to take"** shows all 25 (and more from other buckets). The repeated `-s` flags pick exactly our twelve.

> **`-s` must be repeated, once per skill.** A comma-separated list (`-s a,b,c`) is silently ignored — the installer reports a normal-looking result and installs **nothing**. Verified the hard way.

If you'd rather use the menus anyway, the twelve to tick are listed alphabetically below, in the same order the installer shows them:

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

**The installer also writes two things outside this list**, which is normal:
- `skills-lock.json` at your project root — records exactly which skill versions you installed. Commit it.
- A `find-skills` helper skill in a **global** directory (`~/.agents/`), from a different publisher, which suggests more skills to install. Claude Code doesn't read that directory, so it's inert — but if you'd rather not have it, delete `~/.agents/` entirely.

> **Do not tick `setup-matt-pocock-skills`**, even though the project's own README tells you to. Its only job is configuring an issue tracker for five skills we deliberately did *not* install, and running it would add a section to your `CLAUDE.md` describing a tracker nothing uses.

The files land in `.claude/skills/<skill-name>/`.

#### 5b. Make `/wizard` human-only

One small edit. By default `wizard` can trigger itself, but you'll want it only when you ask for it. Open `.claude/skills/wizard/SKILL.md` and add one line to the block at the very top, so it looks like this:

```yaml
---
name: wizard
description: Generate an interactive bash wizard that walks a human through steps only they can perform. ...
disable-model-invocation: true
---
```

That single line takes it out of Claude's automatic reach and off its attention budget, while leaving `/wizard` available whenever you type it.

#### 5c. Create your project glossary (`CONTEXT.md`)

**`CONTEXT.md` exists specifically to serve these Pocock skills.** It is a plain-English glossary of the words your project uses — nothing more. It matters because four of the twelve read it:

| Skill | What it does with `CONTEXT.md` |
|---|---|
| `domain-modeling` | **Writes** it, and sharpens the definitions as you talk |
| `tdd` | Reads it so test names use your words, not invented ones |
| `diagnosing-bugs` | Reads it to understand how your project fits together |
| `improve-codebase-architecture` | Reads it so suggestions say "the Order intake module", not "the FooBarHandler" |

Don't write it by hand. Let the skill build it with you, in the Claude chat:

```
/grill-with-docs Build the initial CONTEXT.md for this project.
Interview me about the terms we use and write them down as we settle them.
```

Two rules once it exists: **keep it a glossary, never a spec** (plans go in `openspec/`, decisions go in `docs/adr/`), and let the skill update it rather than editing it yourself mid-project.

If you skip this step nothing breaks — those four skills just work less well.

#### 5d. Optional: adjust the wording to taste

Because these are your files now, you can edit them. The skills are written in British English (`behaviour`, `minimise`, `crystallise`). If that bothers you, change the spellings — they're just prose and Claude reads either fine. Leave the **structure** alone: headings, the `---` block at the top, and any `Call the Skill tool with "..."` lines are load-bearing.

### 6. Confirm it's live

In the Claude chat, run `/plugins` and confirm **superpowers**, **compound-engineering**, and **andrej-karpathy-skills** show as enabled for this project. Type `/ce` and `/openspec` to confirm both command families autocomplete. (If not, run `/reload-plugins` or restart Claude — plugins load when a session starts.)

Then verify the Pocock skills. **Restart Claude Code first** — skills are only read when a session starts, so a fresh install won't appear until you do.

**Check 1 — all twelve arrived.** In the terminal:
```
ls .claude/skills/
```
You should see twelve Pocock folders (plus the `openspec-*` ones that were already there). `ls` sorts alphabetically, so they come back in the same order you ticked them: `codebase-design`, `diagnosing-bugs`, `domain-modeling`, `grill-me`, `grill-with-docs`, `grilling`, `handoff`, `improve-codebase-architecture`, `tdd`, `wait-what`, `wizard`, `writing-for-agents`.

> **If you see only the `openspec-*` folders, the install went to the wrong place.** Check whether a `.agents/` directory appeared at your project root — if it did, the agent picker didn't get `claude-code`. Fix it by deleting `.agents/` and re-running the command in step 5a exactly as written, flags included. This is the single most likely thing to go wrong, and it fails silently: the installer reports success either way.

**Check 2 — the supporting files came too.** Some skills need extra files beside them, and a skill missing them fails *quietly*, which is the worst way to fail. Check a few:
```
ls .claude/skills/tdd/ .claude/skills/codebase-design/ .claude/skills/domain-modeling/
```
Expect `tests.md` and `mocking.md` in `tdd/`; `DEEPENING.md` and `DESIGN-IT-TWICE.md` in `codebase-design/`; `CONTEXT-FORMAT.md` and `ADR-FORMAT.md` in `domain-modeling/`. Also confirm `.claude/skills/diagnosing-bugs/scripts/` and `.claude/skills/wizard/template.sh` exist. If any are missing, re-run the installer.

**Check 3 — the six human-only skills really are human-only.** In **Git Bash** (this one uses a Unix command):
```
grep -l "disable-model-invocation: true" .claude/skills/*/SKILL.md
```
It should list exactly six: `grill-me`, `grill-with-docs`, `improve-codebase-architecture`, `wait-what`, `handoff`, and `wizard`. If `wizard` is missing from that list, step 5b didn't take — go back and add the line.

**Check 4 — it actually works.** In the Claude chat, type:
```
/wait-what
```
Claude should ask what didn't land and offer to re-explain. If it says the command is unknown, restart the session.

**Check 5 — the automatic ones fire.** Describe a bug to Claude in plain English ("the export button throws an error when the list is empty"). It should start by insisting on a way to *reproduce* the bug before guessing at causes. That's `diagnosing-bugs` engaging on its own, which is exactly what you want.

> **Tip:** Commit `SE_Discipline.md`, `CLAUDE.md`, `CONTEXT.md`, the `openspec/` folder, and `.claude/skills/` into your project's git. Anyone who clones the project gets the playbook, the spec history, the glossary, and the Pocock skills — those last two are files, so they arrive working, with no install step. Your collaborators still do **Part A** once on their own machine and **Part B step 2** to enable the three plugins for their copy; that per-user, per-project switch-on is expected with project scope.

---

## Part C — How you actually use it (the fun part)

Once set up, you don't manage any of this. You just talk to Claude:

- **You type:** `/grill-me I want to add a login page that uses Google sign-in.`
- **Claude, following `SE_Discipline.md`, will:**
  1. **Interview you** until you both actually agree on what's being built. Several rounds of numbered questions, each with a recommended answer. This is the part that stops it building the wrong thing confidently.
  2. Write a short plan/spec from that conversation and **pause to ask you: "Approve this?"**
  3. Build it **test-first** (write a failing test, then the code to pass it), after agreeing with you *where* the tests should sit.
  4. Run an automatic multi-expert code review and **pause: "Approve to merge?"**
  5. Record what it learned and file the finished spec.

**Your jobs:** open substantial work with `/grill-me`, state the goal, answer the questions and the "approve?" prompts — and type `/wait-what` whenever an answer doesn't make sense. That's it. Everything else Claude drives. (You *can* type other commands to force a step — see [`SE_Discipline.md`](./SE_Discipline.md) — but you won't usually need to.)

> **Why you type that first command and Claude can't.** `/grill-me` is deliberately blocked from Claude's reach. If Claude could start its own interview it would also decide when the interview was over, which defeats the point. Starting it is your call; finishing it is a shared one.

> **Skip the grilling for small stuff.** A typo, a rename, a one-line fix — just say it. `/grill-me` is for work big enough that building the wrong thing would actually cost you.

---

## Keeping it updated

- **Plugins:** re-run the `/plugin install …` commands from Part B step 2 to update them.
- **OpenSpec:** run `npm install -g @fission-ai/openspec@latest`, then `openspec update` inside a project to refresh its instructions.
- **Pocock skills:** run `npx skills update` inside the project. Nothing updates behind your back — that's the trade for owning the files. Two things to know: an update can **overwrite your edits**, so if you changed wording (step 5d) check the diff with `git diff` before committing, and re-confirm the `disable-model-invocation: true` line in `wizard/SKILL.md` survived (step 5b).

---

## Where this came from

The full research behind *why* the first four tools (and not others) is in [`SE_for_AI_09.md`](./SE_for_AI_09.md) — a survey of the leading software-engineering-for-AI frameworks. The fifth, **mattpocock-skills**, was added later: [`Plans/PLAN_Pocock_01.md`](./Plans/PLAN_Pocock_01.md) explains which 12 of its 25 skills were chosen, which were deliberately left out, and why. [`WHAT_THIS_DIR_IS.md`](./WHAT_THIS_DIR_IS.md) explains the goal: help builders produce code conformant enough to promote to production with minimal rework. [`CLAUDE.md`](./CLAUDE.md) is orientation for Claude itself; [`SE_Discipline.md`](./SE_Discipline.md) is the operating playbook Claude follows on every task.
