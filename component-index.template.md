# Component Index — Half One of the Map

One file. Every component. One line each. This is half one of the map — for the agent deciding what to reach for, and for every human who joins after the people carrying the map in their heads have moved on. Half two — where things live, and how a workflow shows up on screen — is [structure-map.template.md](structure-map.template.md).

Keep it boring and keep it current: name, one line on what it is, every other name someone calls it, status tier, and path to the full contract. Generate what you can straight from the code so this can't drift from what's actually shipped.

<!-- Rules:
  - One row per component. No exceptions, including experimental ones.
  - The description says what it IS, not what it's made of. "Status pill for ticket priority" beats "small rounded label component".
  - "Also known as" is not optional decoration — check what a designer, an engineer, and a domain expert each call this before leaving it blank.
  - If a name in this file confuses a new team member, it will confuse the agent. That's a rename signal, not a documentation signal.
  - Status values: core | extended | experimental. Criteria in tiers.md.
  - Example rows below are from a fictional support-ticketing product. Replace with your own.
-->

| Component | What it is | Also known as | Status | Contract |
|---|---|---|---|---|
| Alert | Inline status, result, or consequence shown beside the content it concerns | Banner (older docs), Notice (Slack shorthand) | core | [alert.md](alert.md) |
| Button | Primary action trigger; the default for all clickable actions | — | core | `docs/button.md` |
| Tag | UI label chip for arbitrary user-entered labels (NOT priority classification — see PriorityTag) | Chip (design files) | core | `docs/tag.md` |
| PriorityTag | Domain concept: priority classification applied to a ticket | Priority pill (support team); sometimes just "tag" (support team — ambiguous, see Tag) | core | `docs/priority-tag.md` |
| Table | Data table with sorting and column config; default for all tabular data | Grid (older docs) | core | `docs/table.md` |
| FilterBar | UI control row for narrowing a list view (one of several things called "filter" — this is the UI one) | — | extended | `docs/filter-bar.md` |
| EmptyState | Placeholder for zero-data views | Zero state | extended | `docs/empty-state.md` |
| ComparisonSlider | Side-by-side slider for two versions of a record | Diff slider | experimental | `docs/comparison-slider.md` |

## For agents

Read this file before choosing a component. Prefer `core` for any standard need. Use `extended` when the description matches the requirement exactly. Do not use `experimental` unless the request names it. Before assembling a screen, also check [structure-map.template.md](structure-map.template.md) — half one tells you what exists, half two tells you where it lives and how it's arranged on screen.
