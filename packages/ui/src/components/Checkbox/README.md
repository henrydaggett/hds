# HdsCheckbox

A checkbox with its label. Built on the [Base UI Checkbox](https://base-ui.com/react/components/checkbox).

```tsx
import { HdsCheckbox } from '@hds/ui';
```

## Props

| Prop             | Type                             | Default    | Notes                                                      |
| ---------------- | -------------------------------- | ---------- | ---------------------------------------------------------- |
| `label`          | `ReactNode`                      | –          | Text to the right of the box. Clicking it toggles the box. |
| `aria-label`     | `string`                         | –          | Required when there's no `label`.                          |
| `size`           | `'small' \| 'medium' \| 'large'` | `'medium'` | Box: 14, 16, 18px. Text: 13, 14, 16px. Ignored inside a `HdsCheckboxGroup`. |
| `defaultChecked` | `boolean`                        | `false`    | Starts ticked (uncontrolled).                              |
| `checked`        | `boolean`                        | –          | Controlled. Use with `onCheckedChange`.                    |
| `indeterminate`  | `boolean`                        | `false`    | Shows a dash: neither ticked nor unticked.                 |
| `value`          | `string`                         | –          | Identifies the checkbox inside a `HdsCheckboxGroup`.          |
| `disabled`       | `boolean`                        | `false`    |                                                            |
| `required`       | `boolean`                        | `false`    |                                                            |
| `name`           | `string`                         | –          | Form field name when used on its own.                      |

## Rules

- Use `label` for the text. Don't wrap the checkbox in your own `<label>`.
- Inside a `HdsCheckboxGroup`, give each checkbox a `value` and set `size` on the group.
- A single checkbox (e.g. "Accept terms") doesn't need a `HdsField`.

## Examples

```tsx
<HdsCheckbox label="Remember me" />

<HdsCheckbox label="Accept terms and conditions" defaultChecked required name="terms" />

<HdsCheckbox label="Select all" indeterminate />

<HdsCheckbox size="small" label="Disabled option" disabled />

<HdsCheckbox aria-label="HdsSelect row" />
```
