# Skills

| Folder | Kind | What it does |
| ------ | ---- | ------------ |
| [hds-reference](hds-reference/README.md) | Shared docs, not a skill | Component catalog, assets and guidelines that every skill reads. |
| [hds-prototype](hds-prototype/SKILL.md) | Skill, `/hds-prototype` | One static single-page React snippet from text, an image or code. |
| [create-asset](create-asset/SKILL.md) | Maintenance skill, `/create-asset` | Writes a component's asset from its source. |

## Planned

| Skill | What it will do | Reads |
| ----- | --------------- | ----- |
| `hds-build` | Writes any kind of code with the design system: multi-file features, state, handlers, routing. | `hds-reference`, plus each component's runtime README in `packages/ui`. |
| `hds-lint` | Checks a codebase against the system: raw HTML a component replaces, undocumented props, invalid combinations, hardcoded colours and spacing, guideline breaks. | `hds-reference` (the "Replaces" column, assets and guidelines) and `packages/ui/src/tokens.css`. |
| `hds-ask` | Answers questions about the system from its docs only. | `hds-reference` first, then the runtime READMEs. |

Each new skill gets its own folder with a `SKILL.md` and reads `../hds-reference/` rather than keeping its own copy of the docs. See [hds-reference/README.md](hds-reference/README.md) for which files each one uses.
