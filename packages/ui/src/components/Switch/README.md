# DsSwitch

An on/off switch with its label. Built on the [Base UI Switch](https://base-ui.com/react/components/switch).

```tsx
import { DsSwitch } from '@ds-build/ui';
```

## Props

| Prop              | Type                             | Default    | Notes                                                        |
| ----------------- | -------------------------------- | ---------- | ------------------------------------------------------------ |
| `label`           | `ReactNode`                      | –          | Text to the right of the switch. Clicking it flips the switch. |
| `aria-label`      | `string`                         | –          | Required when there's no `label`.                            |
| `size`            | `'small' \| 'medium' \| 'large'` | `'medium'` | Track: 26×16, 32×20, 40×24px. Text: 13, 14, 16px.            |
| `defaultChecked`  | `boolean`                        | `false`    | Starts on (uncontrolled).                                    |
| `checked`         | `boolean`                        | –          | Controlled. Use with `onCheckedChange`.                      |
| `onCheckedChange` | `(checked: boolean) => void`     | –          | Called when the switch is flipped.                           |
| `disabled`        | `boolean`                        | `false`    |                                                              |
| `required`        | `boolean`                        | `false`    | Must be on to submit a `DsForm`.                             |
| `readOnly`        | `boolean`                        | `false`    |                                                              |
| `name`            | `string`                         | –          | Form field name when used on its own.                        |

## Rules

- Use `label` for the text. Don't wrap the switch in your own `<label>`.
- A switch doesn't need a `DsField` unless it shows helper text or an error. Inside a `DsField`, the text stays on the switch's `label`.
- Use a switch for a setting that applies immediately, and a `DsCheckbox` for a choice that's submitted with a form.

## Examples

```tsx
<DsSwitch label="Email notifications" />

<DsSwitch label="Dark mode" defaultChecked />

<DsSwitch size="small" label="Beta features" disabled />

<DsField description="We'll only email you about your account.">
  <DsSwitch label="Product updates" />
</DsField>

<DsSwitch aria-label="Enable sync" checked={sync} onCheckedChange={setSync} />
```
