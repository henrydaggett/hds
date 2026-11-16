# HdsForm

A native `<form>` that stacks its fields and collects their validation. Built on the [Base UI Form](https://base-ui.com/react/components/form). `HdsFormActions` lays out the buttons at the end.

```tsx
import { HdsForm, HdsFormActions } from '@hds/ui';
```

## HdsForm props

| Prop             | Type                                      | Default      | Notes                                                           |
| ---------------- | ----------------------------------------- | ------------ | --------------------------------------------------------------- |
| `children`       | `ReactNode`                               | –            | `HdsField`s, `HdsFieldset`s, `HdsCheckboxGroup`s, `HdsCheckbox`es, then `HdsFormActions`. |
| `onFormSubmit`   | `(values: Record<string, any>) => void`   | –            | Called with the field values keyed by `name` on valid submit.   |
| `errors`         | `Record<string, string \| string[]>`      | –            | Server errors keyed by field `name`.                            |
| `validationMode` | `'onSubmit' \| 'onBlur' \| 'onChange'`    | `'onSubmit'` | When fields validate.                                           |

Other native form props are passed through.

## HdsFormActions props

| Prop       | Type               | Default   | Notes                             |
| ---------- | ------------------ | --------- | --------------------------------- |
| `children` | `ReactNode`        | –         | Required. `HdsButton`s.              |
| `align`    | `'start' \| 'end'` | `'start'` | Horizontal alignment of the row.  |

## Rules

- The form fills its container's width; children stack with 20px spacing.
- Put the buttons in one `HdsFormActions` as the last child.
- Give the submit button `type="submit"` (Base UI buttons don't submit by default).

## Examples

```tsx
<HdsForm>
  <HdsField label="Name">
    <HdsTextInput required />
  </HdsField>
  <HdsField label="Email">
    <HdsTextInput type="email" required />
  </HdsField>
  <HdsCheckbox label="Subscribe to updates" />
  <HdsFormActions>
    <HdsButton type="submit">Create account</HdsButton>
    <HdsButton appearance="outline">Cancel</HdsButton>
  </HdsFormActions>
</HdsForm>
```
