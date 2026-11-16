# HdsSelect

A single-choice dropdown. Built on the [Base UI Select](https://base-ui.com/react/components/select), wrapped into one component that takes an `items` array.

```tsx
import { HdsSelect } from '@hds/ui';
```

## Props

| Prop           | Type                                                 | Default    | Notes                                                 |
| -------------- | ---------------------------------------------------- | ---------- | ----------------------------------------------------- |
| `items`        | `{ value: string; label: string; disabled?: boolean }[]` | –      | Required. The options, in order.                      |
| `placeholder`  | `string`                                             | –          | Shown when nothing is selected.                       |
| `size`         | `'small' \| 'medium' \| 'large'`                     | `'medium'` | Trigger heights: 28px, 36px, 44px.                    |
| `defaultValue` | `string`                                             | –          | `value` of the item selected initially.               |
| `value`        | `string \| null`                                     | –          | Controlled. Use with `onValueChange`.                 |
| `disabled`     | `boolean`                                            | `false`    |                                                       |
| `required`     | `boolean`                                            | `false`    |                                                       |
| `readOnly`     | `boolean`                                            | `false`    |                                                       |
| `name`         | `string`                                             | –          | Prefer `name` on the wrapping `HdsField`.                |
| `aria-label`   | `string`                                             | –          | Required when not inside a `HdsField` with a `label`.    |

## Rules

- Fills the width of its container, like `HdsTextInput`.
- Wrap it in `<HdsField label="…">` for a visible label. `HdsField` renders the label as a `<div>` for HdsSelect so clicking it doesn't open the popup.
- `defaultValue` must match one of the items' `value`s.
- Single choice only. No groups, search or multi-select.

## Examples

```tsx
<HdsField label="Country">
  <HdsSelect
    placeholder="Select a country"
    items={[
      { value: 'uk', label: 'United Kingdom' },
      { value: 'us', label: 'United States' },
      { value: 'fr', label: 'France' },
    ]}
  />
</HdsField>

<HdsSelect
  size="small"
  aria-label="Sort by"
  defaultValue="newest"
  items={[
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ]}
/>
```
