# Tiers: Core · Extended · Experimental

Not every component in a large library carries the same quality bar — and pretending they do is why libraries stop being trusted as they grow. The tier tells both readers (human and agent) how much weight a component can bear.

**Components don't auto-promote. They promote on usage evidence.**

> **Status of this file:** the tier structure is in use; the specific entry criteria below are a proposed model, not a battle-tested standard. Treat the numbers as starting points to tune for your library's size and pace.

## Core — trust unconditionally

Entry criteria (all required):

- Used by **3+ feature areas** in production
- Stable through the **last two minor versions**
- **Passes the two-minute test** cleanly ([two-minute-test.md](two-minute-test.md))
- Docs reviewed by a feature designer who used it in a real flow AND the engineer who implemented it

What Core gets: version guarantees, first-class documentation, a migration path if it ever changes.

## Extended — trust with awareness

Entry criteria:

- **1 feature** using it in production
- Contract committed and documented
- Multi-author review completed

Teams using Extended components know they may need to move if the contract changes. Extended is the waiting room for Core, not a second-class dumping ground.

## Experimental — a proposal, not a promise

- A rough prototype and a written proposal in a shared channel
- A **two-quarter window** to be adopted by another team in real product work
- Adopted in the window → advances to Extended. Not adopted → retires.

Retirement is a feature. A library where nothing ever leaves is a library nobody can navigate.

## Why tiers matter for the agent

An agent sees a flat list of files, all equally valid, and reaches for whichever name sounds closest. The tier — surfaced in the [index](component-index.template.md) — tells it which thirty components are load-bearing defaults and which two hundred solve one flow's niche problem. Same map a new engineer needs. Same file.
