# <ComponentName>

<!-- Multi-author review is the point of this template. A component file written
     by one person reflects one perspective. The product designer has context to
     add. The engineer has questions to ask. The agent has no way to get either
     unless it's in this file. -->

```yaml
status: experimental | extended | core        # criteria in tiers.md
authors:
  - design-system-designer: <name>            # wrote the initial contract
  - product-designer: <name>                  # used it in a real flow before ship
  - engineer: <name>                          # implemented it / reviewed the contract
last-two-minute-test: <date> — pass | fail    # see two-minute-test.md
```

## What this is for

One paragraph. The job this component does in the product — in product words, not visual description.

## When NOT to use this

<!-- The section agents fail hardest without, and the one single authors always
     skip (they don't need to explain it to themselves). Name the confusable
     alternatives explicitly. -->

- Don't use for <adjacent need> — use `<OtherComponent>` instead.
- Not for <domain concept that shares a word with this component>. That is `<DomainComponent>`.

## Domain mapping

<!-- Where UI words and product words could collide, say so here. -->

This component's name also appears in the codebase as: <list, or "no collisions — verified <date>">

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| ... | ... | ... | ... |

## Variants

...

## Usage examples

<!-- Three examples, each from a REAL product flow, each stating which flow.
     Wrong-flow examples are a top agent failure — anchor every example. -->

### 1. <Flow name>
```tsx
...
```

## Review log

| Date | Reviewer | Role | What changed |
|---|---|---|---|
| ... | ... | product designer / engineer | ... |
