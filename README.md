# Test_Bed — A Ready-to-Copy Software-Engineering Discipline for Claude Code

This repo is a **working reference setup**. It has four tools installed that, together, make an AI coding assistant (Claude Code) build software the disciplined way — spec first, test first, small careful changes — so the code is safe and maintainable enough to promote to production.

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

You mostly never type any of their commands. [`SE_Discipline.md`](./SE_Discipline.md) tells Claude *when* to use each one, so it does it for you.

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
   Check it worked by opening a terminal and running:
   ```
   node --version
   ```
   You should see something like `v22.12.0`. If the number is below `20.19.0`, update Node.
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

---

## Part B — Setup for each new project (takes ~1 minute)

Do these four small steps in each project where you want the discipline. This is where you *turn the tools on for this project* — and where you could later customize which tools apply.

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
```

That single `@SE_Discipline.md` import is what loads the playbook into Claude every session.

> (This repo's own `CLAUDE.md` has extra notes specific to the Test_Bed research project — you don't need those. The minimal version above is all a normal project needs.)

### 5. Confirm it's live

In the Claude chat, run `/plugins` and confirm **superpowers**, **compound-engineering**, and **andrej-karpathy-skills** show as enabled for this project. Type `/ce` and `/openspec` to confirm both command families autocomplete. (If not, run `/reload-plugins` or restart Claude — plugins load when a session starts.)

> **Tip:** Commit `SE_Discipline.md`, `CLAUDE.md`, and the `openspec/` folder into your project's git. Anyone who clones the project gets the playbook and spec history. They'll still do **Part A** once on their own machine and **Part B step 2** to enable the plugins for their copy — that per-user, per-project switch-on is expected with project scope.

---

## Part C — How you actually use it (the fun part)

Once set up, you don't manage any of this. You just talk to Claude:

- **You say:** *"Add a login page that uses Google sign-in."*
- **Claude, following `SE_Discipline.md`, will:**
  1. Ask a clarifying question or two if anything's unclear.
  2. Write a short plan/spec and **pause to ask you: "Approve this?"**
  3. Build it **test-first** (write a failing test, then the code to pass it).
  4. Run an automatic multi-expert code review and **pause: "Approve to merge?"**
  5. Record what it learned and file the finished spec.

**Your only jobs:** state the goal, and answer the "approve?" prompts. You never have to memorize a command. (You *can* type a command to force a step — see [`SE_Discipline.md`](./SE_Discipline.md) for the full list — but you won't usually need to.)

---

## Keeping it updated

- **Plugins:** re-run the `/plugin install …` commands from Part B step 2 to update them.
- **OpenSpec:** run `npm install -g @fission-ai/openspec@latest`, then `openspec update` inside a project to refresh its instructions.

---

## Where this came from

The full research behind *why* these four tools (and not others) is in [`SE_for_AI_09.md`](./SE_for_AI_09.md) — a survey of the leading software-engineering-for-AI frameworks. [`WHAT_THIS_DIR_IS.md`](./WHAT_THIS_DIR_IS.md) explains the goal: help builders produce code conformant enough to promote to production with minimal rework. [`CLAUDE.md`](./CLAUDE.md) is orientation for Claude itself; [`SE_Discipline.md`](./SE_Discipline.md) is the operating playbook Claude follows on every task.
