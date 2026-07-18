# The Workflow: Five Moves

The agent's failures trace to three gaps, and none of them are AI problems: a **Human** gap (knowledge that lived in one person's head), a **Communication** gap (designers and engineers filling silence with tribal knowledge), and a **Context** gap (no map of the library, no domain vocabulary written down). Artifacts alone don't close gaps like these. People do — in rituals, written down. That's what the five moves are.

## Move 1 — AI drafts. Humans decide.

Let the agent derive what a component **is**: props, variants, tokens. It reads source better than anyone writes prose. But humans decide what it's **for**: purpose, boundaries, status, name. An agent documenting a component will confidently invent what it can't verify — the fix isn't better writing, it's a rule: nothing goes in the file that can't be verified against source, and a human who knows the source reviews the draft.

*Kit file: [component-doc.template.md](component-doc.template.md) — the "What this is for" and "When NOT to use" sections are the human half.*

## Move 2 — Two readers, two jobs.

A component file written by one person reflects one perspective. Before a doc is trusted, two more people read it, each with a different job: the **feature designer** reads it against a live flow ("would this doc have led me to the right component?"), the **engineer** reads it against the code ("does this contract match what's implemented?"). Review isn't overhead — it's the conversation between the two original users, finally written down where the third can read it.

*Kit file: [component-doc.template.md](component-doc.template.md) — the authors block and review log make this visible.*

## Move 3 — Reconcile the names.

Every product has three vocabularies: domain words, design words, code words. When a domain word and a UI word share a name, humans disambiguate from context — an agent can't. The rule: **a domain concept and a UI primitive never share a name.** Audit for collisions, rename one of each pair, ride the rename onto the next PR that touches the file. One word a week is enough; the point is the habit.

*Kit file: [component-index.template.md](component-index.template.md) — collisions surface when you have to describe every component in one line.*

## Move 4 — The index.

An agent (or a new hire) shouldn't meet your library as a flat directory of equally plausible files. One index file, one line per component: what it is, how much to trust it, where the full contract lives. The agent reads the map first, then opens one doc — progressive disclosure instead of guessing from filenames. Generate what you can from code so the map can't go stale.

*Kit files: [component-index.template.md](component-index.template.md), with trust levels defined in [tiers.md](tiers.md).*

## Move 5 — The two-minute test.

The feedback loop that keeps the other four honest. Give an agent one component's docs — nothing else — and ask it to explain the component, say when not to use it, and write three examples. Don't help it. What it gets wrong is a to-do list, not a grade: wrong explanation → fix the names (Move 3), invented props → fix the review (Moves 1–2), wrong context → fix the intent sections (Move 1). Re-run it before promoting any component's status.

*Kit file: [two-minute-test.md](two-minute-test.md) — the full prompt and scoring guide.*

## The moves in one week

A component's path through the workflow, end to end: a feature team requests a component in a shared channel → the agent drafts the contract from source → feature designer and engineer review, each against their own surface → any name collision is renamed in the same PR → the component gets its one-line index row → the two-minute test runs against the finished doc → merge, and the channel hears about it. Feature work drives library work — the workflow rides existing rituals instead of adding new ones.

## Why this carries beyond design systems

An MCP server's tool descriptions, a skill's instructions, a README an agent has to trust — all are files written by one author, read by a reader with no tribal knowledge. Same three gaps. Same five moves: draft from source, review with two readers, reconcile the names, index the collection, test with the reader you're actually writing for.
