# HdsTabs

A row of tabs with a line under it. Selecting a tab shows its panel below. Each `HdsTab` is one tab button and the content of its panel.

## Quick reference

```tsx
import { HdsTabs, HdsTab } from '@hds/ui';

<HdsTabs aria-label="Label">
  <HdsTab value="one" label="One">
    <p className="hds-text-medium">First panel.</p>
  </HdsTab>
  <HdsTab value="two" label="Two">
    <p className="hds-text-medium">Second panel.</p>
  </HdsTab>
</HdsTabs>
```

HdsTabs props: `aria-label`, `size`, `defaultValue`. HdsTab props: `value` (required), `label` (required), `disabled`. Nothing else.

## Import

```tsx
import { HdsTabs, HdsTab } from '@hds/ui';
```

## Structure

`HdsTabs` children are `HdsTab`s only. The tab list is built from each HdsTab's `label`; each HdsTab's children are its panel. Only the selected tab's panel shows, so the snippet only needs real content in the panel the input shows. Give the other tabs a short placeholder panel, or none.

```tsx
<HdsTabs aria-label="Project" defaultValue="activity">
  <HdsTab value="overview" label="Overview" />
  <HdsTab value="activity" label="Activity">
    <p className="hds-text-medium">Recent changes by the team.</p>
  </HdsTab>
</HdsTabs>
```

## Props

**HdsTabs**

| Prop           | Write as                       | Default (omit) | Notes                                         |
| -------------- | ------------------------------ | -------------- | --------------------------------------------- |
| `aria-label`   | `aria-label="Project"`         | –              | Always write it: names the tab list.          |
| `size`         | `size="small"`, `size="large"` | `medium`       | Tab heights 28/36/44px.                       |
| `defaultValue` | `defaultValue="activity"`      | first tab      | The selected tab, if it isn't the first.      |

**HdsTab**

| Prop       | Write as            | Default (omit) | Notes                                         |
| ---------- | ------------------- | -------------- | --------------------------------------------- |
| `value`    | `value="activity"`  | –              | Required. Short lowercase id from the label, unique. |
| `label`    | `label="Activity"`  | –              | Required. Plain text.                         |
| `disabled` | `disabled`          | off            | The tab can't be selected.                    |

No `value`/`onValueChange` on HdsTabs, and no `className`, `style` or event handlers. A HdsTab's children are any design system content.

### Composing rules

- Leave out defaults: no `size="medium"`, and no `defaultValue` when the first tab is selected.
- Every direct child of HdsTabs is a HdsTab. Anything else isn't rendered.
- Panel content follows the normal rules: components from the assets, text with [typography](typography.md) classes. The panel already has 16px space above it.
- A HdsTab with no panel content is self-closing.

## Visual identification

| Looks like                                                       | Means                            |
| ---------------------------------------------------------------- | -------------------------------- |
| Row of text labels with a light grey line `#dcdce0` under the whole row | HdsTabs                    |
| Near-black label `#18181b` with a 2px black underline            | The selected tab (`defaultValue`) |
| Grey labels `#7d7d86`                                            | Unselected tabs                  |
| Lighter grey label that never highlights                         | `disabled`                       |
| Pill-shaped buttons in a bordered box                            | [`HdsToggleGroup`](toggle-group.md), not tabs |

**Size** (pick the nearest):

| Size   | Tab height | Text | Space between tabs |
| ------ | ---------- | ---- | ------------------ |
| small  | 28px       | 13px | 16px               |
| medium | 36px       | 14px | 20px               |
| large  | 44px       | 16px | 24px               |

## Input-to-prop mapping

| User says                                        | Write as                          |
| ------------------------------------------------ | --------------------------------- |
| tabs, tab bar, tabbed sections                   | `<HdsTabs>` with `HdsTab`s          |
| selected tab, active tab, "on the X tab"         | `defaultValue="x"`                |
| disabled, unavailable tab                        | `disabled` on that HdsTab          |
| segmented control, view switcher without panels  | [`HdsToggleGroup`](toggle-group.md) |

## Not supported

- Vertical tabs (list on the left). Build horizontal tabs and report it.
- Icons, counts or badges in tabs. Use the text and report the rest.
- Pill, boxed or "enclosed" tab styles.
- Tabs that link to other pages.
- Closable or draggable tabs.
- Any custom `className` or `style`.

## Code snippet translation

Input:

```html
<ul class="nav nav-tabs">
  <li class="nav-item"><a class="nav-link active" href="#">Members <span class="badge">4</span></a></li>
  <li class="nav-item"><a class="nav-link" href="#">Invites</a></li>
  <li class="nav-item"><a class="nav-link disabled">Billing</a></li>
</ul>
<div class="tab-content p-3"><p>Four people have access.</p></div>
```

Output:

```tsx
import { HdsTabs, HdsTab } from '@hds/ui';

<HdsTabs aria-label="Team">
  <HdsTab value="members" label="Members">
    <p className="hds-text-medium">Four people have access.</p>
  </HdsTab>
  <HdsTab value="invites" label="Invites" />
  <HdsTab value="billing" label="Billing" disabled />
</HdsTabs>
```

- `nav-tabs` → `HdsTabs`; `active` is the first tab, so no `defaultValue`; `disabled` → `disabled`.
- The active pane's content becomes the first HdsTab's panel; `p-3` is dropped (the panel has its own spacing).
- **Not available:** the "4" count badge.
