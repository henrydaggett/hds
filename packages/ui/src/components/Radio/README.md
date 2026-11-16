# DsRadio

One option of a `DsRadioGroup`. Built on the [Base UI Radio](https://base-ui.com/react/components/radio).

```tsx
import { DsRadioGroup, DsRadio } from '@ds-build/ui';
```

## Props

| Prop       | Type        | Default | Notes                                              |
| ---------- | ----------- | ------- | -------------------------------------------------- |
| `value`    | `string`    | –       | Required. Identifies the radio in its group.       |
| `label`    | `ReactNode` | –       | Required. Text to the right of the circle.         |
| `disabled` | `boolean`   | `false` | Disables this option only.                         |

## Rules

- A `DsRadio` only works inside a `DsRadioGroup`; it throws on its own.
- Select a radio through the group's `defaultValue` or `value`. There's no `checked` prop.
- The size comes from the group's `size`.

## Examples

```tsx
<DsRadioGroup label="Plan" defaultValue="pro">
  <DsRadio value="free" label="Free" />
  <DsRadio value="pro" label="Pro" />
  <DsRadio value="team" label="Team" disabled />
</DsRadioGroup>
```
