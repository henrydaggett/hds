# HdsRadio

One option of a `HdsRadioGroup`. Built on the [Base UI Radio](https://base-ui.com/react/components/radio).

```tsx
import { HdsRadioGroup, HdsRadio } from '@hds/ui';
```

## Props

| Prop       | Type        | Default | Notes                                              |
| ---------- | ----------- | ------- | -------------------------------------------------- |
| `value`    | `string`    | –       | Required. Identifies the radio in its group.       |
| `label`    | `ReactNode` | –       | Required. Text to the right of the circle.         |
| `disabled` | `boolean`   | `false` | Disables this option only.                         |

## Rules

- A `HdsRadio` only works inside a `HdsRadioGroup`; it throws on its own.
- Select a radio through the group's `defaultValue` or `value`. There's no `checked` prop.
- The size comes from the group's `size`.

## Examples

```tsx
<HdsRadioGroup label="Plan" defaultValue="pro">
  <HdsRadio value="free" label="Free" />
  <HdsRadio value="pro" label="Pro" />
  <HdsRadio value="team" label="Team" disabled />
</HdsRadioGroup>
```
