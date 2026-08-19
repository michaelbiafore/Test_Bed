# Close_the_Gap_05 — Is this an "audience" problem or a *use-case-class* problem?

This document responds to a specific challenge: that `Close_the_Gap_04`'s "Lite vs PROD-track
profiles" framing (a *user-sophistication* axis) may be masking a deeper split along a
*use-case-class* axis — namely:

1. **The ZZ-like case** — an internal "customer" must first be *queried/elicited* to define the
   business need, scope, and (through elicitation) the golden cases the system will be tested against.
2. **The pure-software case** — a developer already believes the product is defined and can supply
   the golden cases himself for TDD.

The proposal on the table: modify `Test_Bed` with ZZ-influenced changes *only to the extent it stays
in the pure-software case*, and stand up a **separate project** for the ZZ-like case — possibly with
a **different set of four frameworks** for the software part.

I read `Methodology_Summaries/Recommended_Combinations.md` and the `BMAD` and `gstack` summaries to
recover the original selection reasoning. Below: my reaction, the evidence, a critique of the line of
reasoning (including where it over-reaches), and concrete recommendations.

---

## Bottom line up front

**The core diagnosis is correct and it is directly supported by the historical record.** The four
frameworks in `Test_Bed` were chosen *on the explicit assumption that product intent is supplied, not
elicited*. `Recommended_Combinations.md` says so in as many words. So `Close_the_Gap_03`'s
business-facing recommendations (R1 project-context, R2 requirement-ticket-with-a-business-owner, R6
business-trial loop, R10 who-does-what roles) are not merely "ceremony" as `_04` framed them — they
are an attempt to **hand-build, in markdown, the one layer the bundle deliberately omitted: the
Product-Intent / requirements-elicitation layer.** That is a category mismatch, and it is the real
thing `_04` was circling without naming.

**But two refinements matter:**

- The split is better modeled as **one pipeline with a switchable front-end** than as two unrelated
  projects with two unrelated framework sets. The *build* and *learn* layers (Superpowers, Compound)
  are use-case-invariant; only the *intent* and *spec* layers change. "A different set of 4" overstates
  the delta — it's really "same back two, different front one-or-two."
- **Whether you can keep it in one repo or are forced to fork is not a matter of taste — it's decided
  by the substitution rules** in `Recommended_Combinations.md` §4. If the ZZ-track adds BMAD (additive),
  one repo can serve both. If it adopts gstack (which *conflicts* with Superpowers), the fork is
  mandatory. That's a clean, mechanical decision rule, derived below.

---

## 1. The evidence: the bundle was scoped to the pure-software case on purpose

`Recommended_Combinations.md` is unambiguous that the Product-Intent layer was dropped by design:

- **Header (line 3):** the target user is "a team of ~10 strong-but-junior engineers building agentic
  systems that advise human money managers. **No direct customer/client contact.**"
- **Product-intent row (line 15):** "Our product intent is largely supplied *by the money managers* —
  this layer is lighter for us than for a consumer startup."
- **Combination A rationale (line 116):** "It is the transcript's 'winning pipeline' **minus BMAD** —
  which we drop because **product intent is externally supplied.**"
- **Deferral (line 137):** "BMAD — full product-org ceremony; unnecessary when intent comes from the
  money managers. Borrow its *story-file* pattern later if a genuinely ambiguous product appears."

So the four-framework bundle (OpenSpec + Superpowers + Compound + karpathy) is precisely a
**spec → build → learn** backbone with **no intake/elicitation head**, chosen because the "what" was
assumed known. `Test_Bed` inherits that shape.

Now read `Close_the_Gap_03` against that. ZZ, as `_03` summarizes it, is a six-stage pipeline whose
*first two stages* — "Process breakdown & scope lock" and business-owner sign-off — are exactly
requirements elicitation from an internal customer, plus a "business trial" loop (stage 4) that is a
customer acceptance activity, not an engineering review. **ZZ is fundamentally a Product-Intent-heavy
methodology.** `Close_the_Gap_03` is therefore trying to graft ZZ's intake head onto a repo whose
whole selection premise was that no intake head is needed. That graft, done in markdown, is R1/R2/R6/R10.

The historical doc even predicted this: line 137's "borrow BMAD's story-file pattern *if a genuinely
ambiguous product appears*." A genuinely ambiguous product has now appeared — that is what the ZZ-like
case *is* — and the honest response is the one the original authors flagged: reach for the
product-intent framework, not a pile of hand-rolled templates.

**This is the sharpest correction to `Close_the_Gap_04`:** in `_04` I called R1/R2/R5/R6/R7/R10
"unenforceable behavioral ceremony." That is true *for the pure-software case*, where the developer
already holds the intent. It is **wrong as a general claim** — in the ZZ-like case those same concerns
are load-bearing; they're just implemented in the wrong medium (markdown reinventing BMAD/gstack). The
value of R1/R2/R6/R10 is **use-case-conditional**, and `_04` missed that by treating enforceability as
the only axis.

## 2. The real discriminator: *who can produce the golden cases?*

The proposal offers the cleanest possible test, and I'd promote it to the headline decision criterion.
Forget "hobbyist vs Fellow." Ask, per piece of work:

> **Can the person driving Claude write the golden/acceptance cases themselves right now — or must
> those cases be elicited from a business owner who has not yet articulated them?**

- **Developer can write them** → pure-software → **Track S**. `Test_Bed`/Combination A is the correct,
  sufficient tool. ZZ's elicitation apparatus is dead weight here and actively fights the "~1 minute,
  state a goal" promise.
- **Cases must be elicited** → **Track E**. You need an elicitation front-end *before* the spec, and
  ZZ's R2 (requirement ticket + named owner + freeze) and R6 (business trial → decision log → test)
  stop being ceremony and become the actual mechanism — but they should be provided by a framework
  built for it (BMAD's Analyst/PM, or gstack's `/office-hours`), not simulated in five root markdown files.

This test is superior to `_04`'s profile axis because it is **operational** (you can answer it in one
sentence about a given task) and because it maps directly onto the layer model: it's literally asking
"is the Product-Intent layer needed for this work?"

## 3. Critique of the line of reasoning — where it's right, where it over-reaches

### Right (and well-grounded)
- **The framework selection genuinely was use-case-specific.** Confirmed above. The proposal correctly
  reverse-engineered a premise the authors stated explicitly.
- **The two cases are real and distinct**, and the firm plausibly has both: a Fellow automating their
  own desk workflow (Track S) vs. a Fellow building a tool *for* a money-manager/desk that hasn't
  specified it (Track E). The Dymon-PROD mission spans both.
- **"Possibly a different framework set for the software part" is directionally correct** — the intent
  and spec layers should change for Track E (see §4).

### Over-reaches / nuances to correct

- **W1 — It risks over-dichotomizing a spectrum.** Real requests are often *partially* specified: the
  business owner knows some rules, not all. A hard binary forces a whole-project Track choice when the
  better move is a *graduated* intake — elicit only the unknown parts, then drop into the pure-software
  pipeline. **Fix:** apply the golden-case test *per requirement*, not per project. Track E's intake
  runs only over the requirements that fail the test; the rest go straight to Track S mechanics.

- **W2 — "A different set of 4 frameworks" overstates the change.** The *build* layer (Superpowers) and
  the *learning* layer (Compound) are use-case-invariant — TDD discipline and lesson-compounding don't
  care whether intent was elicited or supplied. Only the **intent** layer (add one) and possibly the
  **spec** layer (swap OpenSpec → Spec Kit for auditability) change. So Track E is "**same back two,
  different front one-to-two**," not four new tools. Framing it as a clean-sheet 4-pick throws away the
  shared backbone and the muscle memory.

- **W3 — Two separate repos fragments the very thing the firm is trying to build: compounding.**
  `Close_the_Gap_03`'s own R7 (cross-project capability registry) and `_04`'s promotion scorecard both
  depend on lessons and reusable assets accumulating in *one* place. Two repos = two `docs/solutions/`,
  two registries, two SE_Discipline playbooks that drift. The fork has a real, ongoing cost that the
  proposal doesn't price in.

- **W4 — It doesn't yet say where the PROD-promotion / compliance spine lives.** The mission
  (`WHAT_THIS_DIR_IS.md`) — code promotable to Dymon PROD with minimal rework — is *identical* for both
  tracks. R3 (golden CI gate), R4 (risk-tiered permissions), R8 (deployment checklist), and the
  promotion scorecard must be **shared across both tracks**, or the mission fragments. This is
  orthogonal to the intake question and must not be duplicated per track.

## 4. Recommendations

### 4.1 Adopt the use-case fork as the primary axis; name the tracks
Replace `_04`'s "Lite/PROD-track" with **Track S (Spec-ready / pure-software)** and **Track E
(Elicitation-first / customer-driven)**, discriminated by the golden-case-provenance test (§2). Keep
`_04`'s sophistication note as a secondary dimension, not the primary one.

### 4.2 Keep `Test_Bed` as Track S; import from `_03` only what serves pure software
Into `Test_Bed` core, take only the use-case-invariant and PROD-spine items:
- **Keep / do:** R3 (golden CI gate), R4 (risk-tiered permissions + hooks), R8 (deployment checklist),
  and `_04`'s promotion scorecard. Trim R5's PR template to *engineering* questions (drop the
  business-rule question, which presumes an elicited owner).
- **Make optional / move to Track E:** R1 (PROJECT_CONTEXT business sections), R2 (requirement ticket +
  business owner + freeze), R6 (business-trial loop), R10 (business-role table). These are intent-layer
  concerns; in Track S the developer *is* the owner, so they collapse to noise.
- **Still cut:** R9 (stage rename), per `_04`.

This keeps `Test_Bed`'s "~1 minute, state a goal" promise intact for the case it was designed for.

### 4.3 Stand up Track E by changing the *front* of the pipeline, not the whole set
Two concrete candidate bundles, both reusing the Superpowers + Compound backbone:

- **E-bundle 1 — Assembled (recommended for continuity).**
  **BMAD** (Product-Intent: Analyst *Mary* does "requirements elicitation, translating vague needs
  into evidence-grounded specs — first stop when the problem space is still fuzzy"; PM *John* runs
  "user interviews, requirements discovery, stakeholder alignment") → **Spec Kit** (auditable spec +
  ratified `constitution.md` + `/speckit.analyze` gate — this is `Recommended_Combinations.md`'s
  Combination B, chosen exactly "when the money-manager relationship or internal risk committee starts
  asking 'show me how this was built'") → **Superpowers** (TDD) → **Compound** (learning). This gives
  you ZZ's R2/R6/R10 (business owner, sign-off, readiness gates) as *first-class framework features*
  (BMAD's Implementation-Readiness gate, story files, PRD) instead of hand-rolled markdown.

- **E-bundle 2 — Integrated (choose only if the firm wants max business-facing coverage in one install).**
  **gstack standalone (+ Compound).** gstack's `/office-hours` is a start-here product interrogation
  ("six forcing questions, challenges premises, writes a design doc downstream skills consume"),
  `/plan-ceo-review` reworks scope, and the Review Army + CSO (OWASP/STRIDE) supply the
  business/security gating ZZ choreographs — all in one system. **Hard constraint:** gstack *conflicts
  with Superpowers* (`Recommended_Combinations.md` §4: "two 'senior engineers' giving conflicting
  orders") — so gstack is a **replacement backbone**, not an addition. Adopting it means *not* running
  Superpowers, and it forces a separate repo (see 4.4).

**Recommendation:** start with **E-bundle 1**. It shares Superpowers + Compound with `Test_Bed`, so
lessons, conventions, and the promotion spine transfer, and juniors don't learn a second 40-command
system. Reserve E-bundle 2 for the case where leadership explicitly wants one opinionated all-in-one
and is willing to run it as an island.

### 4.4 The one-repo-vs-two decision is *mechanical*, not aesthetic
Derive it from the substitution rules (`Recommended_Combinations.md` §3–4), not from preference:

- **If Track E = E-bundle 1 (BMAD is *additive*; Spec Kit *replaces* OpenSpec):** you can serve both
  tracks from **one template** with a switchable intake module. Structure: a shared core (Superpowers +
  Compound + risk-tiers + golden CI + promotion scorecard) plus a pluggable `intake/` front-end that
  Track E enables (BMAD + Spec Kit) and Track S omits (OpenSpec). **Caveat — the one hard rule:** you
  may not have *both* OpenSpec and Spec Kit live at once ("two spec formats, two sources of truth = ✗").
  So the switch isn't purely additive; flipping to Track E swaps the spec tool. Manageable with a
  documented toggle, but it must be a real either/or, enforced in `settings.json`/CLAUDE.md routing.
- **If Track E = E-bundle 2 (gstack):** the fork is **mandatory** — gstack and Superpowers cannot
  coexist, so Track E must be its own repo. No single-repo design can reconcile them.

This gives a crisp rule: **BMAD-track → one repo (with a spec-tool toggle) is viable; gstack-track →
two repos, non-negotiable.** Decide the Track E bundle first; the repo topology falls out of it.

### 4.5 Put the PROD-promotion spine in shared, track-agnostic files
Regardless of 4.4, the Dymon-PROD mechanics — golden CI gate (R3), risk-tiered permissions (R4),
deployment checklist (R8), and the promotion scorecard — must live where **both** tracks read them, or
the compounding (R7) and the "minimal-rework promotion" measurement fragment. If you do fork (gstack),
factor these into a small shared repo/submodule both tracks consume, rather than copying.

### 4.6 Validate before committing — spike, don't build the whole track
Consistent with the test-bed philosophy (measure, don't assume): before standing up a full Track E
project, run **one real elicitation-heavy scenario** through E-bundle 1 as a spike and confirm the
Product-Intent layer actually earns its complexity for this team. `Recommended_Combinations.md` twice
warns BMAD is "overkill" unless the product is "genuinely ambiguous" — prove the ambiguity is real for
your Track E workload before importing a product org. If a lightweight intake (BMAD's *story-file
pattern* alone, per line 137) suffices, prefer that to full BMAD.

## 5. How this revises the prior documents

- **`Close_the_Gap_03`:** Its R1/R2/R6/R10 are correctly *identified*, wrongly *located*. They belong
  in Track E and should be delivered by BMAD/gstack, not by root markdown. Keep R3/R4/R5(trimmed)/R8
  in `Test_Bed`; move the business-intent items out.
- **`Close_the_Gap_04`:** Its "unenforceable ceremony" critique of R1/R2/R6/R10 holds *only for Track
  S*. The deeper cause isn't weak enforcement — it's a **missing layer**. And `_04`'s "Lite vs
  PROD-track" axis should be demoted under the "supplied vs elicited intent" axis, which is the real
  fork. `_04`'s structural recommendations (single source of truth for risk tiers, promotion scorecard,
  dogfood the reference app, Windows-native hooks, branch protection) are unaffected and still stand —
  they're PROD-spine items shared by both tracks.

## 6. Next actions
1. **Answer the golden-case test for your actual Track E workload.** Is intent genuinely elicited, or
   is "the money managers supply it" (the original premise) still true? If the latter, there is no
   Track E and `Test_Bed`-as-is is right; stop here.
2. **If Track E is real, pick its bundle (E-bundle 1 vs 2).** That single choice determines the repo
   topology (4.4) — resolve it before writing any code or templates.
3. **Refactor `Test_Bed` to Track S** per 4.2 (keep the PROD spine, move business-intent items out).
4. **Spike one elicitation scenario** through E-bundle 1 (4.6) before committing to a full second track.
5. **Factor the shared PROD-promotion spine** (4.5) so compounding survives whichever topology you land on.
