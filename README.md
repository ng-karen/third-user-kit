# The Third User Kit

A component library has always had two users: the product designer who uses it and the engineer who ships it. It now has a third — the AI agent reading the same files to generate UI.

This kit is the workflow from the talk **"Built for Two: What Design Systems Are Missing When AI Agents Become the Third User"** — [AGNTCon + MCPCon Japan 2026](https://agntconmcpconjapan26.sched.com/event/2QlEP), September 11, Tokyo. Everything here is deliberately small: one test, one index, one set of tiers, one doc template.

## What's in the kit

| File | What it is | Time to adopt |
|---|---|---|
| [workflow.md](workflow.md) | The five moves — the workflow the other files support | A read |
| [two-minute-test.md](two-minute-test.md) | The test: what does an agent get wrong about your best-documented component? | 2 minutes |
| [component-index.template.md](component-index.template.md) | The index: one file, every component, one line each | An afternoon |
| [tiers.md](tiers.md) | Core / Extended / Experimental — status criteria and promotion rules | A team discussion |
| [component-doc.template.md](component-doc.template.md) | Component doc template with multi-author review built in | Per component |

Example rows and names in these files use a fictional support-ticketing product.

## Where to start

Run the two-minute test. Don't build anything first. What the agent gets wrong is your starting point — not for the agent, for your team.

## The idea in one paragraph

The agent didn't bring new problems into your design system. Every failure it surfaces — naming collisions, gaps the docs never covered, no map of what's load-bearing — was already there. Your team had learned to navigate around them with tribal knowledge; the agent can't. Fixing the docs for the reader with no tribal knowledge fixes them for every human who joins after the current team walks out.

The same shape carries beyond design systems: an MCP server whose tool descriptions sit in one author's head, a skill whose instructions assume context that never made it into the file, a README an agent has to trust. Same three failures. Same fix.

## Tell me what happened

This kit comes from one team's design system: five moves that worked for one library, one codebase, one set of naming collisions. Whether they hold up in yours is an open question, and you are the one who can answer it.

If you run the two-minute test or adopt any of the moves, message me on LinkedIn: [linkedin.com/in/fivepluszero](https://www.linkedin.com/in/fivepluszero). I collect two kinds of results:

**What broke.** The invented props, the naming collision, the component your agent confidently misused. The strangest failures shape the next version of this kit and the talk. Anonymized, always.

**What held up.** Which move you adopted, what changed in review, what the agent stopped getting wrong. Results from other teams are the evidence this workflow needs beyond one company.

A sentence or two is plenty. If you can, include what kind of product and roughly how many components: the same move plays out differently in a 40-component library than a 400-component one.

## License

[MIT](LICENSE) — use it, adapt it, bring it to your team.

---

*Karen Ng · Principal Product Designer · [github.com/ng-karen](https://github.com/ng-karen) · [LinkedIn](https://www.linkedin.com/in/fivepluszero)*
