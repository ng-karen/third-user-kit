# The Two-Minute Test

Find out what an AI agent actually understands about your component library. No setup, no tooling — just an agent and your existing docs.

## How to run it

1. Open your repo in Claude Code, Cursor, or any coding agent — or simply paste the doc file into an AI chat.
2. Pick your **most-used, best-documented** component. Not a weak one — the test only means something if the docs are ones you're proud of.
3. Paste this prompt:

```text
Using only the documentation files for the <ComponentName> component
(do not read the implementation source, do not infer from other code):

1. Explain what this component is for and when it should be used.
2. Explain when it should NOT be used, and what to use instead.
3. Write three usage examples, each in a realistic product flow.

If anything is ambiguous, make your best guess rather than asking me.
```

4. **Don't help it.** No follow-up hints, no corrections mid-answer. The agent gets exactly what a new team member gets on day one: the file.

## How to score it

Check the output for these failure classes:

- **Invented props.** Props or variants that don't exist. → The contract in the docs is incomplete or ambiguous.
- **Wrong-flow examples.** Usage examples that drop the component into a flow it was never meant for. → The docs describe *what* but not *when* / *when not*.
- **Naming collisions.** The agent maps a UI word onto a domain concept (or vice versa) — e.g., uses your `Tag` component for priority classification. → Your product words and UI words have collided. Renaming one (`Tag` vs `PriorityTag`) is one answer, and often the right one — but two disciplines can each be correct about their own word. What always helps is writing down which meaning *this product* uses, next to the component.
- **Confident silence.** The agent can't say when *not* to use the component. → That knowledge lives in Slack and code review, not in the file.

### What counts as a pass

There is no score. But two of the four are load-bearing, so "passes" has a definition:

- **no invented props**, and
- **a correct answer to "when should I not use this"**

Wrong-flow examples and naming collisions are fixes to queue, not reasons to fail. A component that invents its own API, or cannot say when to avoid itself, is not ready to be a default — which is why those two, and only those two, gate promotion to Core.

## What to do with the result

Each failure is a doc fix a human reviewer would never catch — humans fill gaps from tribal knowledge; the agent shows you the gaps.

What it gets wrong is your starting point. Not for the agent. For your team.

## Making it a habit

- Re-run the test on any component before promoting it a tier (see [tiers.md](tiers.md)).
- A passing two-minute test — no invented props, and a correct "when not to use" — is an entry criterion for Core.
- The prompt works unchanged on MCP tool descriptions, skills, and READMEs: "using only this file, explain what this tool does and write three example calls."
