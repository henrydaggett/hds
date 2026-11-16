# HdsFieldset

Groups related fields under a shared legend. Built on the [Base UI Fieldset](https://base-ui.com/react/components/fieldset) and renders a native `<fieldset>`.

```tsx
import { HdsFieldset } from '@hds/ui';
```

## Props

| Prop          | Type        | Default | Notes                                        |
| ------------- | ----------- | ------- | -------------------------------------------- |
| `children`    | `ReactNode` | –       | Required. `HdsField`s, `HdsCheckboxGroup`s or `HdsCheckbox`es. |
| `legend`      | `ReactNode` | –       | Section title (16px, medium weight).         |
| `description` | `ReactNode` | –       | Short text under the legend.                 |
| `disabled`    | `boolean`   | `false` | Disables every field inside.                 |

## Rules

- Use it to split a longer `HdsForm` into titled sections (e.g. "Billing details", "Shipping address").
- Children stack vertically with 16px spacing.

## Examples

```tsx
<HdsFieldset legend="Billing details" description="Used on your invoices.">
  <HdsField label="Company">
    <HdsTextInput placeholder="Acme Inc." />
  </HdsField>
  <HdsField label="VAT number">
    <HdsTextInput placeholder="GB123456789" />
  </HdsField>
</HdsFieldset>
```
