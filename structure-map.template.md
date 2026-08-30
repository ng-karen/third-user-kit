# Structure Map (Half Two of the Map)

Half one of the map — [component-index.template.md](component-index.template.md) — says what exists: every component, one line each. This half says where things actually live in the codebase, and how a workflow's steps actually land on screen. An agent (or a new hire) with only half one still doesn't know whether two steps of a workflow belong on one screen or two — it will guess, and the guess is not free. On this team, that exact gap turned two steps of one workflow into two separate tabs, because nothing on file said they were the same screen.

Keep both halves current together. If half one changes (a component is renamed, retired, or moves file), check whether half two's screen maps still point to the right thing.

<!-- Rules:
  - Generate the "Where things live" tree from the actual repo structure, not from memory — a hand-maintained tree goes stale exactly like a hand-maintained index does.
  - A screen map row is a claim about what renders together, not a list of steps. If two steps never render at the same time, they get separate rows; if they render together, they are ONE row.
  - Example paths and the workflow below are from a fictional support-ticketing product. Replace with your own.
-->

## Where things live

```text
src/
  tokens/                 — color, spacing, type: source of truth every component reads from
  components/
    core/                 — Button, Tag, PriorityTag, Table, Alert
    extended/              — FilterBar, EmptyState
    experimental/          — ComparisonSlider
  docs/                    — one file per component; paths match the Contract column in component-index.template.md
workflows/
  ticket-queue/            — screens and routes for the workflow mapped below
```

## For agents

Check this tree before assuming a component's file location, and before creating a new folder for something that already has a home. `core`, `extended`, and `experimental` under `components/` are the same tiers defined in [tiers.md](tiers.md) — the folder a component lives in should match the tier its index row claims. A mismatch is a signal one of the two files is out of date, not a decision to make silently.

## How a workflow shows up on screen

Workflow: **Reassign a ticket** (from the ticket queue).

| Step | Screen / surface | Components on screen | Why it's here, not somewhere else |
|---|---|---|---|
| 1. Scan the queue | Ticket queue table | `Table`, `PriorityTag`, `FilterBar` | The list view. `FilterBar` narrows it; `PriorityTag` is read-only here. |
| 2. Open the assignee picker | Same screen, inline popover — not a new route | `Button` (row action) | Opening a picker is not a navigation event; it doesn't get its own screen or tab. |
| 3. Pick a new assignee **and** see the capacity warning | Same popover as step 2 | `Alert` (`intent="warning"`, inline) | The warning is a consequence of the pick, not a separate decision. This is the step that became two tabs when it wasn't written down: picking and being warned are one screen, one moment, because the person needs the warning before they can finish picking, not after. |
| 4. Confirm the reassignment | Same popover, same screen | `Button` (confirm action) | Confirming closes the loop the pick opened. A new screen here would ask the person to re-orient for no reason. |
| 5. See the result | Ticket queue table, updated in place | `Table` (row updates), `Alert` (`intent="danger"` if a bulk reassignment partially failed, `intent="success"` if not shown at all — silence is the default success state) | The queue is the surface the person was already looking at. Don't send them somewhere else to confirm what they just did. |

## Do and don't

| | Guidance |
|---|---|
| **Do** | Write down which steps share a screen, not just which steps exist. |
| **Don't** | Let a new screen, route, tab, or modal be the default for every step. Most steps in one flow share a surface with the step before or after it. |
| **Do** | Say *why* steps share a screen (step 3 above: the warning has to land before the pick is final). The reason is what stops an agent from re-splitting them later. |
| **Don't** | Describe a workflow only as a numbered list of actions. A list of actions with no screen boundaries is exactly the shape an agent turns into a list of tabs. |
