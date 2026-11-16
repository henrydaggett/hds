# HdsCheckboxGroup

A labelled set of `HdsCheckbox`es that share one value (an array of the ticked checkboxes' `value`s). Built on the Base UI [HdsCheckbox Group](https://base-ui.com/react/components/checkbox-group), [HdsFieldset](https://base-ui.com/react/components/fieldset) and [HdsField](https://base-ui.com/react/components/field).

```tsx
import { HdsCheckboxGroup, HdsCheckbox } from '@hds/ui';
```

## Props

| Prop           | Type                             | Default      | Notes                                                    |
| -------------- | -------------------------------- | ------------ | -------------------------------------------------------- |
| `label`        | `ReactNode`                      | –            | Group label, rendered as a legend above the checkboxes.  |
| `description`  | `ReactNode`                      | –            | Helper text under the checkboxes.                        |
| `error`        | `ReactNode`                      | –            | Error text. Shown on failed validation, or always with `invalid`. |
| `invalid`      | `boolean`                        | –            | Forces the invalid state and shows `error`.              |
| `size`         | `'small' \| 'medium' \| 'large'` | `'medium'`   | Sets every checkbox's size.                              |
| `orientation`  | `'vertical' \| 'horizontal'`     | `'vertical'` | Horizontal wraps onto new lines when needed.             |
| `defaultValue` | `string[]`                       | –            | `value`s of the checkboxes that start ticked.            |
| `value`        | `string[]`                       | –            | Controlled. Use with `onValueChange`.                    |
| `name`         | `string`                         | –            | Form field name for the whole group.                     |
| `disabled`     | `boolean`                        | `false`      | Disables every checkbox.                                 |
| `aria-label`   | `string`                         | –            | Only when there's no `label`.                            |

## Rules

- Children are `HdsCheckbox`es, each with a `label` and a unique `value`.
- Tick checkboxes through the group's `defaultValue`, not `defaultChecked` on each checkbox.
- Don't wrap a `HdsCheckboxGroup` in a `HdsField`; it already includes its own label, description and error.

## Examples

```tsx
<HdsCheckboxGroup label="Notifications" defaultValue={['email']}>
  <HdsCheckbox value="email" label="Email" />
  <HdsCheckbox value="sms" label="SMS" />
  <HdsCheckbox value="push" label="Push notifications" />
</HdsCheckboxGroup>

<HdsCheckboxGroup
  label="Interests"
  orientation="horizontal"
  invalid
  error="Choose at least one interest"
>
  <HdsCheckbox value="design" label="Design" />
  <HdsCheckbox value="code" label="Code" />
</HdsCheckboxGroup>
```
