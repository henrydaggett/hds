# DsRadioGroup

A labelled set of `DsRadio`s where one can be selected. Built on the Base UI [Radio Group](https://base-ui.com/react/components/radio), [Fieldset](https://base-ui.com/react/components/fieldset) and [Field](https://base-ui.com/react/components/field).

```tsx
import { DsRadioGroup, DsRadio } from '@ds-build/ui';
```

## Props

| Prop            | Type                             | Default      | Notes                                                    |
| --------------- | -------------------------------- | ------------ | -------------------------------------------------------- |
| `label`         | `ReactNode`                      | –            | Group label, rendered as a legend above the radios.      |
| `description`   | `ReactNode`                      | –            | Helper text under the radios.                            |
| `error`         | `ReactNode`                      | –            | Error text. Shown on failed validation, or always with `invalid`. |
| `invalid`       | `boolean`                        | –            | Forces the invalid state and shows `error`.              |
| `size`          | `'small' \| 'medium' \| 'large'` | `'medium'`   | Sets every radio's size. Circle: 14, 16, 18px.           |
| `orientation`   | `'vertical' \| 'horizontal'`     | `'vertical'` | Horizontal wraps onto new lines when needed.             |
| `defaultValue`  | `string`                         | –            | `value` of the radio that starts selected.               |
| `value`         | `string \| null`                 | –            | Controlled. Use with `onValueChange`.                    |
| `onValueChange` | `(value: string) => void`        | –            | Called when a radio is selected.                         |
| `name`          | `string`                         | –            | Form field name for the whole group.                     |
| `required`      | `boolean`                        | `false`      | One radio must be selected to submit a `DsForm`.         |
| `disabled`      | `boolean`                        | `false`      | Disables every radio.                                    |
| `readOnly`      | `boolean`                        | `false`      |                                                          |
| `aria-label`    | `string`                         | –            | Only when there's no `label`.                            |

## Rules

- Children are `DsRadio`s, each with a `label` and a unique `value`.
- Don't wrap a `DsRadioGroup` in a `DsField`; it already includes its own label, description and error.
- Use a `DsCheckboxGroup` when more than one option can be chosen.

## Examples

```tsx
<DsRadioGroup label="Plan" defaultValue="pro">
  <DsRadio value="free" label="Free" />
  <DsRadio value="pro" label="Pro" />
  <DsRadio value="team" label="Team" />
</DsRadioGroup>

<DsRadioGroup label="Delivery" orientation="horizontal" invalid error="Choose a delivery option">
  <DsRadio value="standard" label="Standard" />
  <DsRadio value="express" label="Express" />
</DsRadioGroup>
```
