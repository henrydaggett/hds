# Skills

All skills read the same knowledge base: the hds docs in [`packages/ui/docs`](../../packages/ui/docs/README.md), which ship inside `@hds/ui`. No skill keeps its own copy of the docs.

| Skill | Command | What it does |
| ----- | ------- | ------------ |
| [hds-prototype](hds-prototype/SKILL.md) | `/hds-prototype` | One static single-page React snippet from text, an image or code. |
| [hds-build](hds-build/SKILL.md) | `/hds-build` | Working code of any kind with the system: state, handlers, several files. Checks its output with `tsc` and `hds-lint`. |
| [hds-lint](hds-lint/SKILL.md) | `/hds-lint` | Runs the `hds-lint` script (technical and usage rules), then reviews the code against the guidelines. Fixes only when asked. |
| [hds-ask](hds-ask/SKILL.md) | `/hds-ask` | Answers questions about the system from the docs only. Read-only. |
| [create-asset](create-asset/SKILL.md) | `/create-asset` | Maintenance: writes a component's asset from its source. |

The lint script is the [`@hds/lint`](../../packages/lint/README.md) package.
