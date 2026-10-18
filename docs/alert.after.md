# Alert

```yaml
status: core                                   # criteria in tiers.md
authors:
  - design-system-designer: <name>             # wrote the initial contract
  - product-designer: <name>                   # used it in a real flow before ship
  - engineer: <name>                           # implemented it / reviewed the contract
last-two-minute-test: <date> · pass            # see two-minute-test.md
source: components/Alert/Alert.tsx
types: components/Alert/Alert.types.ts
```

> **For agents:** the TypeScript types are the contract. If this doc and `Alert.types.ts` disagree, the types win and this doc has a bug. Please flag it.

## What this is for

An Alert tells the reader something about the content right next to it: a status, a result, or a consequence they need in order to act correctly. It stays until the situation changes or the reader dismisses it. It belongs to a region of the page, not to the page as a whole.

## When NOT to use this

Agents pick Alert for anything that "tells the user something." Most of those are wrong. Check this list first.

| If the message is... | Use | Not Alert, because |
|---|---|---|
| A short result of a user action that should fade on its own ("Saved") | `Toast` | Alerts stay. A Toast is temporary and not tied to a region. |
| About the whole app or account (outage, trial ending, maintenance) | `Banner` | An Alert is scoped to the content beside it. |
| A problem with one form field | `FormField` with `error` | The error belongs to the field, so screen readers read it with the input. |
| A decision the reader must make before going on | `Dialog` | An Alert never blocks. It can be ignored. |
| "There is nothing here yet" | `EmptyState` | Zero data is not a status. |
| Several unrelated conditions at once | One Alert that summarises | Stacked Alerts compete. See Do and don't. |

## Domain mapping

The word "alert" is used for more than one thing in this product. Keep them apart.

| Word in code | What it is | Is it this component? |
|---|---|---|
| `Alert` (this file) | UI message tied to a region of the page | Yes |
| `AlertRule`, `alerts/` service | <fill in: e.g. SLA escalation rules that notify agents> | **No.** Never render an `AlertRule` with `<Alert>` just because the names match. |
| `role="alert"` | ARIA live region role | Only as an output of this component. Do not hand-write it. |

The severity prop is **`intent`**. It is not `variant`, `type`, `status`, `severity`, or `kind`. The top value is **`danger`**, not `error` or `critical`.

Verified: <date>

## Decision guide: which intent?

Ask in this order. Stop at the first yes.

1. Did something fail, or is the next action permanent? → `danger`
2. Will something go wrong if nobody acts? → `warning`
3. Did an operation finish with a result that lasts? → `success`
4. Otherwise → `info`

If you can't decide between two, pick the less severe one. Over-alarming trains people to ignore Alerts.

## Props

| Prop | Type | Default | Rules |
|---|---|---|---|
| `intent` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Sets colour, icon, and default role. Use the decision guide. |
| `title` | `string` | none | **Required.** One line. Must make sense with the icon hidden. |
| `children` | `ReactNode` | none | Body. Two lines or fewer. Omit if the title says it all. Not allowed with `compact`. |
| `icon` | `ReactNode \| false` | from `intent` | `false` hides it. A custom icon must match the intent's severity. |
| `action` | `{ label: string; onClick: () => void }` | none | Label starts with a verb and names the object. |
| `secondaryAction` | same as `action` | none | Only allowed when `action` is set. Not allowed with `compact`. |
| `dismissible` | `boolean` | `false` | If `true`, `onDismiss` is required. |
| `onDismiss` | `() => void` | none | Remove the Alert from state here. The component moves focus for you. |
| `role` | `'status' \| 'alert'` | from `intent` | Leave it unset. Override only when the default is clearly wrong for this context. |
| `compact` | `boolean` | `false` | One line, title plus one action. Not allowed with `danger`. |
| `className` | `string` | none | Layout and spacing only. Never colour or type. |

**Enforced by TypeScript** (an agent that gets these wrong will see a compile error):
- `dismissible` without `onDismiss`
- `secondaryAction` without `action`
- `compact` with `danger`, `children`, or `secondaryAction`
- Any prop name other than `intent` for severity

**Not enforced by types** (review for these):
- Title wording, verb-first action labels, one Alert per region

## Variants

| `intent` | Use for | Icon | Role |
|---|---|---|---|
| `info` | Neutral context the reader needs to act correctly | Info circle | `status` (polite) |
| `success` | A finished operation with a lasting result | Check circle | `status` (polite) |
| `warning` | A condition that will cause a problem if left alone | Triangle | `alert` (interrupts) |
| `danger` | A failure, or an action that cannot be undone | Octagon | `alert` (interrupts) |

`compact`: single line for table toolbars and side panels.

## Accessibility

Handled by the component. Do not re-implement:
- Role from `intent`, and `aria-labelledby` pointing at the title.
- Dismiss button named `Dismiss {title}`.
- On dismiss, focus moves to the next focusable element after the Alert, or the closest one before it if nothing follows. It never drops to `<body>`.
- Icons are `aria-hidden`. Meaning lives in the title, never in colour alone.
- Contrast: 4.5:1 text, 3:1 icon, light and dark.

Your job when you place it:
- Render an Alert caused by a user action **inside the region that action changed**, so focus order still makes sense.
- Render the Alert container on page load if it may appear later. Live regions that are inserted already filled are not always announced.

## Content

- **Title:** sentence case, no final period. Lead with the consequence, not the cause. "Three tickets could not be reassigned" beats "An error occurred."
- **Body:** only what the title can't carry.
- **Action label:** verb plus object. "Retry reassignment", not "Retry" or "OK".
- Never write the intent into the words. No "Warning:" or "Error:" prefixes.

## Usage examples

Every example names its real product flow. Do not copy an example into a different flow without checking the decision guide.

### 1. Ticket detail: approaching SLA breach

```tsx
<Alert
  intent="warning"
  title="Response due in 40 minutes"
  action={{ label: 'Open reply editor', onClick: openReply }}
>
  This ticket is covered by the Priority Support agreement.
</Alert>
```

### 2. Bulk reassignment: partial failure

```tsx
<Alert
  intent="danger"
  title="Three of twelve tickets could not be reassigned"
  action={{ label: 'Retry the three', onClick: retryFailed }}
  secondaryAction={{ label: 'Download the list', onClick: exportFailed }}
  dismissible
  onDismiss={clearBulkResult}
>
  The assignee is at capacity for this queue.
</Alert>
```

### 3. Queue settings: configuration consequence

```tsx
<Alert intent="info" title="Changes apply to new tickets only">
  Tickets already in this queue keep their current routing.
</Alert>
```

### 4. Ticket list toolbar: compact

```tsx
<Alert
  compact
  title="Filters hide 4 tickets"
  action={{ label: 'Clear filters', onClick: clearFilters }}
/>
```

## Do and don't

| | Guidance |
|---|---|
| **Do** | Write a title that works with the icon hidden. |
| **Don't** | Repeat the intent in the copy: "Warning: your ticket is late." |
| **Do** | Keep to one Alert per region. Summarise several conditions into one. |
| **Don't** | Use an Alert for a save confirmation. That's a `Toast`. |
| **Do** | Use `compact` in toolbars and side panels. |
| **Don't** | Add a third action. If it needs three, it needs a different surface. |

## What changed from the previous doc

The previous version ([alert.before.md](./alert.before.md)) looked finished. Running the two-minute test showed what it couldn't answer:

| Agent question | Before | After |
|---|---|---|
| Should this be an Alert, a Toast, or a Banner? | Not covered | When NOT to use this |
| Is `AlertRule` related? | Not covered | Domain mapping |
| Is the prop `variant` or `intent`? | Implied by the table | Stated, plus a compile error |
| Which intent fits this case? | Descriptions only | Decision guide with an order |
| Which rules are guaranteed? | All mixed together | Split into "types enforce" and "review for" |
| What do I handle vs. what does the component? | Mixed | Split in Accessibility |

## Review log

| Date | Reviewer | Role | What changed |
|---|---|---|---|
| <date> | <name> | design system designer | Rewrote from alert.before.md using component-doc.template.md |
| <date> | <name> | product designer | |
| <date> | <name> | engineer | |
