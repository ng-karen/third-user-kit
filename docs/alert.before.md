# Alert

**Status:** Core · **Since:** 2.1 · **Owner:** Design Systems

An Alert communicates a status, result, or consequence that is relevant to the content it appears beside. It stays on screen until the situation changes or the user dismisses it.

---

## Anatomy

1. **Icon** — derived from `intent`, communicates severity at a glance
2. **Title** — required, one line, carries the message on its own
3. **Body** — optional, supporting detail
4. **Actions** — optional, up to two
5. **Dismiss** — optional close control

The component fills the width of its container. It does not set its own margins; spacing is the responsibility of the layout that places it.

---

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `intent` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Sets colour, icon, and default ARIA role |
| `title` | `string` | — | **Required.** Must stand alone without the body |
| `children` | `ReactNode` | — | Body content. Keep to two lines or fewer |
| `icon` | `ReactNode \| false` | derived from `intent` | Pass `false` to suppress. Custom icons must match the intent's severity |
| `dismissible` | `boolean` | `false` | Renders the close control |
| `onDismiss` | `() => void` | — | Required when `dismissible` is true |
| `action` | `{ label: string; onClick: () => void }` | — | Primary action. Label must begin with a verb |
| `secondaryAction` | `{ label: string; onClick: () => void }` | — | Only valid when `action` is set |
| `role` | `'status' \| 'alert'` | derived from `intent` | Override only when the default announcement behaviour is wrong |
| `compact` | `boolean` | `false` | Removes the body slot and tightens padding to a single line |
| `className` | `string` | — | Layout and spacing only. Do not override colour or typography |

---

## Variants

### intent

| Value | Use for | Icon | Default role |
|---|---|---|---|
| `info` | Neutral context the reader needs in order to act correctly | Info circle | `status` |
| `success` | A completed operation with a durable result | Check circle | `status` |
| `warning` | A condition that will cause a problem if left alone | Triangle | `alert` |
| `danger` | A failure, or an action that cannot be undone | Octagon | `alert` |

### compact

Single-line form for dense contexts such as table toolbars and side panels. Drops the body slot; `title` and one `action` only.

---

## Accessibility

- `info` and `success` announce politely via `role="status"`. `warning` and `danger` interrupt via `role="alert"`. Override with `role` only when the default is demonstrably wrong for the context.
- Colour never carries meaning alone. The icon and the title together must convey severity to a reader who cannot distinguish the palette.
- The dismiss control has an accessible name of `Dismiss {title}`.
- When an Alert is dismissed, focus moves to the next focusable element in the container. It does not return to the trigger, because an Alert has no trigger.
- Alerts that appear as a result of a user action must be rendered inside the region the action affected, so screen reader focus order stays coherent.
- Contrast: all four intents meet 4.5:1 for body text and 3:1 for the icon against the alert's own background.

---

## Content guidelines

- **Title** is a sentence fragment in sentence case, no terminal period. Lead with the consequence, not the cause. "Three tickets could not be reassigned" beats "An error occurred during reassignment."
- **Body** adds only what the title cannot carry. If the title says it all, omit the body.
- **Action labels** start with a verb and name the object: "Retry reassignment", not "Retry" or "OK".
- Never put the intent in the words. The icon and colour already say "warning"; the sentence should say what happened.

---

## Usage examples

### 1. Ticket detail — approaching SLA breach

```tsx
<Alert
  intent="warning"
  title="Response due in 40 minutes"
  action={{ label: 'Open reply editor', onClick: openReply }}
>
  This ticket is covered by the Priority Support agreement.
</Alert>
```

### 2. Bulk reassignment — partial failure

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

### 3. Queue settings — configuration consequence

```tsx
<Alert intent="info" title="Changes apply to new tickets only">
  Tickets already in this queue keep their current routing.
</Alert>
```

---

## Do and don't

| | Guidance |
|---|---|
| **Do** | Write a title that works with the icon hidden. |
| **Don't** | Repeat the intent in the copy: "Warning: your ticket is late." |
| **Do** | Keep to one Alert per region. |
| **Don't** | Stack Alerts to report several unrelated conditions. Summarise into one. |
| **Do** | Use `compact` inside toolbars and side panels. |
| **Don't** | Use `compact` for anything with a `danger` intent. A failure deserves the room. |
| **Do** | Give `action` a verb label naming the object. |
| **Don't** | Give an Alert three or more actions. If it needs three, it needs a different surface. |

---

## Related

- `EmptyState` — for zero-data views
- `FilterBar` — for narrowing a list
