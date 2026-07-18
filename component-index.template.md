# Component Index

One file. Every component. One line each. This is the map — for the agent deciding what to reach for, and for every human who joins after the people carrying the map in their heads have moved on.

Keep it boring and keep it current: name, one line on what it is, status tier, path to the full contract.

<!-- Rules:
  - One row per component. No exceptions, including experimental ones.
  - The description says what it IS, not what it's made of. "Status pill for ticket priority" beats "small rounded label component".
  - If a name in this file confuses a new team member, it will confuse the agent. That's a rename signal, not a documentation signal.
  - Status values: core | extended | experimental. Criteria in tiers.md.
  - Example rows below are from a fictional support-ticketing product. Replace with your own.
-->

| Component | What it is | Status | Contract |
|---|---|---|---|
| Button | Primary action trigger; the default for all clickable actions | core | [docs/button.md](docs/button.md) |
| Tag | UI label chip for arbitrary user-entered labels (NOT priority classification — see PriorityTag) | core | [docs/tag.md](docs/tag.md) |
| PriorityTag | Domain concept: priority classification applied to a ticket | core | [docs/priority-tag.md](docs/priority-tag.md) |
| Table | Data table with sorting and column config; default for all tabular data | core | [docs/table.md](docs/table.md) |
| FilterBar | UI control row for narrowing a list view (one of several things called "filter" — this is the UI one) | extended | [docs/filter-bar.md](docs/filter-bar.md) |
| EmptyState | Placeholder for zero-data views | extended | [docs/empty-state.md](docs/empty-state.md) |
| ComparisonSlider | Side-by-side diff slider; built for one report flow | experimental | [docs/comparison-slider.md](docs/comparison-slider.md) |

## For agents

Read this file before choosing a component. Prefer `core` for any standard need. Use `extended` when the description matches the requirement exactly. Do not use `experimental` unless the request names it.
