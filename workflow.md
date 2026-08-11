# The Workflow: Three Moves, Five Steps

> **How this maps to the talk.** On stage this is **three moves plus one test**. Below it is broken into five steps, because that is how it runs in practice. Steps 1 and 2 are both the talk's *Move 1 — AI drafts. Two people decide.* Step 3 is the talk's *Move 2 — Agree what it's for. Write it down.* Step 4 is the talk's *Move 3 — Move the context to where the reader is.* Step 5 is the two-minute test, which the talk uses as a diagnostic rather than a move.

None of the agent's failures are AI problems. Each one traces to something that was never written down: what a component is **for**, which meaning of a word **this product** uses, and what the library actually **contains**. Those things were never missing — they lived in the people who built it, and between those people they never had to be written. The steps below are how they get written.

## Step 1 — AI drafts. Two people decide.

Let the agent derive what a component **is**: props, variants, tokens. It reads source better than anyone writes prose. But people make the decisions: purpose, boundaries, status, name. An agent documenting a component will confidently invent what it can't verify — the fix isn't better writing, it's a rule: nothing goes in the file that can't be verified against source, and a human who knows the source reviews the draft.

*Kit file: [component-doc.template.md](component-doc.template.md) — the "What this is for" and "When NOT to use" sections are the human half.*

## Step 2 — Two readers, two jobs.

A component file written by one person reflects one perspective. Before a doc is trusted, two more people read it, each with a different job: the **product designer** reads it against a live flow ("would this doc have led me to the right component?"), the **engineer** reads it against the code ("does this contract match what's implemented?"). Review isn't overhead — it's the conversation between the two original users, finally written down where the third can read it.

*Kit file: [component-doc.template.md](component-doc.template.md) — the authors block and review log make this visible.*

## Step 3 — Agree what it's for, and reconcile the names.

Every product has three vocabularies: domain words, design words, code words. When a domain word and a UI word share a name, humans disambiguate from context — an agent can't. Renaming one of each pair is one answer, and often the right one: audit for collisions, rename, and ride the rename onto the next PR that touches the file. But it is not always available. Two disciplines can each be correct about their own word, and neither will give it up — an engineer's *tag* and a designer's *chip* are both accurate in their own world. What always helps is writing down which meaning **this product** uses, next to the component, so the reader with no tribal knowledge is not left inferring it. One word a week is enough; the point is the habit.

*Kit file: [component-index.template.md](component-index.template.md) — collisions surface when you have to describe every component in one line.*

## Step 4 — The index.

An agent (or a new hire) shouldn't meet your library as a flat directory of equally plausible files. One index file, one line per component: what it is, how much to trust it, where the full contract lives. The agent reads the map first, then opens one doc — progressive disclosure instead of guessing from filenames. Generate what you can from code so the map can't go stale.

*Kit files: [component-index.template.md](component-index.template.md), with trust levels defined in [tiers.md](tiers.md).*

## Step 5 — The two-minute test.

The feedback loop that keeps the other four honest. Give an agent one component's docs — nothing else — and ask it to explain the component, say when not to use it, and write three examples. Don't help it. What it gets wrong is a to-do list, not a grade. Score it against the failure classes in [two-minute-test.md](two-minute-test.md) — that file is the single scoring reference — and route each one back to the step that fixes it. Re-run it before promoting any component's status.

*Kit file: [two-minute-test.md](two-minute-test.md) — the full prompt and scoring guide.*

## The steps in one week

A component's path through the workflow, end to end: a feature team requests a component in a shared channel → the agent drafts the contract from source → product designer and engineer review, each against their own surface → any name collision is renamed in the same PR → the component gets its one-line index row → the two-minute test runs against the finished doc → merge, and the channel hears about it. Feature work drives library work — the workflow rides existing rituals instead of adding new ones.

## Why this carries beyond design systems

An MCP server's tool descriptions, a skill's instructions, a README an agent has to trust — all are files written by one author, read by a reader with no tribal knowledge. Same unwritten things. Same steps: draft from source, review with two readers, reconcile the names, index the collection, test with the reader you're actually writing for.
