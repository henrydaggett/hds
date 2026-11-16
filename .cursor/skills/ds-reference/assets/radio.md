# DsRadio

One round option of a [`DsRadioGroup`](radio-group.md). It only exists inside a DsRadioGroup; read [radio-group.md](radio-group.md) first.

## Quick reference

```tsx
import { DsRadioGroup, DsRadio } from '@ds-build/ui';

<DsRadioGroup label="Label">
  <DsRadio value="one" label="One" />
</DsRadioGroup>
```

Allowed props: `value` (required), `label` (required), `disabled`. Nothing else.

## Props

| Prop       | Write as          | Default (omit) | Notes                                              |
| ---------- | ----------------- | -------------- | -------------------------------------------------- |
| `value`    | `value="pro"`     | –              | Required. Short lowercase id from the label, unique in the group. |
| `label`    | `label="Pro"`     | –              | Required. Plain text.                              |
| `disabled` | `disabled`        | off            | Disables this option only.                         |

No `size`, `checked`, `defaultChecked`, `name`, `className`, `style` or event handlers: size, selection and name live on the group. No children: the tag is always self-closing.

## Composing rules

- Write the props in the order `value`, `label`, `disabled`.
- Never use a DsRadio outside a DsRadioGroup. It throws an error.
- To show it selected, put its `value` in the group's `defaultValue`.

## Not supported

- Links or bold text in the label. Use plain text and report it.
- A description line under the option.
