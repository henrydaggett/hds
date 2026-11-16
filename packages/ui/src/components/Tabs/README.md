# DsTabs

Tabs that switch between panels of content. Each `DsTab` is one tab button and its panel. Built on the [Base UI Tabs](https://base-ui.com/react/components/tabs).

```tsx
import { DsTabs, DsTab } from '@ds-build/ui';
```

## DsTabs props

| Prop            | Type                             | Default    | Notes                                               |
| --------------- | -------------------------------- | ---------- | --------------------------------------------------- |
| `size`          | `'small' \| 'medium' \| 'large'` | `'medium'` | Tab heights: 28, 36, 44px. Text: 13, 14, 16px.      |
| `defaultValue`  | `string`                         | first tab  | `value` of the tab that starts selected.            |
| `value`         | `string`                         | –          | Controlled. Use with `onValueChange`.               |
| `onValueChange` | `(value: string) => void`        | –          | Called when a tab is selected.                      |
| `aria-label`    | `string`                         | –          | Names the tab list for assistive technology.        |

## DsTab props

| Prop       | Type        | Default | Notes                                           |
| ---------- | ----------- | ------- | ----------------------------------------------- |
| `value`    | `string`    | –       | Required. Unique within the `DsTabs`.           |
| `label`    | `ReactNode` | –       | Required. Text of the tab button.               |
| `disabled` | `boolean`   | `false` | The tab can't be selected.                      |
| `children` | `ReactNode` | –       | The panel shown while the tab is selected.      |

## Rules

- Children of `DsTabs` must be `DsTab` elements directly. Anything else isn't rendered.
- The tab list is always horizontal, above the panels, and as wide as the container.
- Only the selected tab's panel is mounted.

## Examples

```tsx
<DsTabs aria-label="Project">
  <DsTab value="overview" label="Overview">
    <p className="ds-text-medium">A summary of the project.</p>
  </DsTab>
  <DsTab value="activity" label="Activity">
    <p className="ds-text-medium">Recent changes by the team.</p>
  </DsTab>
  <DsTab value="billing" label="Billing" disabled />
</DsTabs>

<DsTabs size="small" defaultValue="members" aria-label="Team">
  <DsTab value="members" label="Members">…</DsTab>
  <DsTab value="invites" label="Invites">…</DsTab>
</DsTabs>
```
