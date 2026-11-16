# HdsTabs

Tabs that switch between panels of content. Each `HdsTab` is one tab button and its panel. Built on the [Base UI Tabs](https://base-ui.com/react/components/tabs).

```tsx
import { HdsTabs, HdsTab } from '@hds/ui';
```

## HdsTabs props

| Prop            | Type                             | Default    | Notes                                               |
| --------------- | -------------------------------- | ---------- | --------------------------------------------------- |
| `size`          | `'small' \| 'medium' \| 'large'` | `'medium'` | Tab heights: 28, 36, 44px. Text: 13, 14, 16px.      |
| `defaultValue`  | `string`                         | first tab  | `value` of the tab that starts selected.            |
| `value`         | `string`                         | –          | Controlled. Use with `onValueChange`.               |
| `onValueChange` | `(value: string) => void`        | –          | Called when a tab is selected.                      |
| `aria-label`    | `string`                         | –          | Names the tab list for assistive technology.        |

## HdsTab props

| Prop       | Type        | Default | Notes                                           |
| ---------- | ----------- | ------- | ----------------------------------------------- |
| `value`    | `string`    | –       | Required. Unique within the `HdsTabs`.           |
| `label`    | `ReactNode` | –       | Required. Text of the tab button.               |
| `disabled` | `boolean`   | `false` | The tab can't be selected.                      |
| `children` | `ReactNode` | –       | The panel shown while the tab is selected.      |

## Rules

- Children of `HdsTabs` must be `HdsTab` elements directly. Anything else isn't rendered.
- The tab list is always horizontal, above the panels, and as wide as the container.
- Only the selected tab's panel is mounted.

## Examples

```tsx
<HdsTabs aria-label="Project">
  <HdsTab value="overview" label="Overview">
    <p className="hds-text-medium">A summary of the project.</p>
  </HdsTab>
  <HdsTab value="activity" label="Activity">
    <p className="hds-text-medium">Recent changes by the team.</p>
  </HdsTab>
  <HdsTab value="billing" label="Billing" disabled />
</HdsTabs>

<HdsTabs size="small" defaultValue="members" aria-label="Team">
  <HdsTab value="members" label="Members">…</HdsTab>
  <HdsTab value="invites" label="Invites">…</HdsTab>
</HdsTabs>
```
