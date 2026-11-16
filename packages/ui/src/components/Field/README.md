# HdsField

Wraps one form control with a label, helper text and an error message. Built on the [Base UI Field](https://base-ui.com/react/components/field), which wires up the label, `aria-describedby` and validation automatically.

```tsx
import { HdsField } from '@hds/ui';
```

## Props

| Prop          | Type        | Default | Notes                                                             |
| ------------- | ----------- | ------- | ----------------------------------------------------------------- |
| `children`    | `ReactNode` | –       | Required. One `HdsTextInput`, `HdsSelect` or `HdsCheckbox`.                |
| `label`       | `ReactNode` | –       | Shown above the control. Not rendered for a `HdsCheckbox`.           |
| `description` | `ReactNode` | –       | Helper text under the control.                                    |
| `error`       | `ReactNode` | –       | Error text under the description. Shown on failed validation, or always with `invalid`. |
| `invalid`     | `boolean`   | –       | Forces the invalid state (red control border) and shows `error`.  |
| `disabled`    | `boolean`   | `false` | Disables the control and greys out the label.                     |
| `name`        | `string`    | –       | Form field name. Takes precedence over the control's `name`.      |

## Rules

- One control per HdsField. For several checkboxes, use `HdsCheckboxGroup` instead.
- With a `HdsCheckbox`, put the text on the checkbox's own `label` and leave the HdsField's `label` out. Use the HdsField for its `description` and `error`.
- Put `required`, `type`, `placeholder` etc. on the control, not the HdsField.
- Without `invalid`, `error` only appears after the control fails native validation (e.g. `required` and empty on submit).
- Fields stack with even spacing inside a `HdsForm` or `HdsFieldset`.

## Examples

```tsx
<HdsField label="Email" description="We'll never share your email.">
  <HdsTextInput type="email" placeholder="you@example.com" required />
</HdsField>

<HdsField label="Username" invalid error="This username is taken.">
  <HdsTextInput defaultValue="henry" />
</HdsField>

<HdsField label="Role">
  <HdsSelect
    placeholder="Select a role"
    items={[
      { value: 'designer', label: 'Designer' },
      { value: 'engineer', label: 'Engineer' },
    ]}
  />
</HdsField>

<HdsField name="terms" error="You must accept the terms.">
  <HdsCheckbox label="I agree to the terms" required />
</HdsField>
```
