# DsTabs

A row of tabs with a line under it. Selecting a tab shows its panel below. Each `DsTab` is one tab button and the content of its panel.

## Quick reference

```tsx
import { DsTabs, DsTab } from '@ds-build/ui';

<DsTabs aria-label="Label">
  <DsTab value="one" label="One">
    <p className="ds-text-medium">First panel.</p>
  </DsTab>
  <DsTab value="two" label="Two">
    <p className="ds-text-medium">Second panel.</p>
  </DsTab>
</DsTabs>
```

DsTabs props: `aria-label`, `size`, `defaultValue`. DsTab props: `value` (required), `label` (required), `disabled`. Nothing else.

## Import

```tsx
import { DsTabs, DsTab } from '@ds-build/ui';
```

## Structure

`DsTabs` children are `DsTab`s only. The tab list is built from each DsTab's `label`; each DsTab's children are its panel. Only the selected tab's panel shows, so the snippet only needs real content in the panel the input shows. Give the other tabs a short placeholder panel, or none.

```tsx
<DsTabs aria-label="Project" defaultValue="activity">
  <DsTab value="overview" label="Overview" />
  <DsTab value="activity" label="Activity">
    <p className="ds-text-medium">Recent changes by the team.</p>
  </DsTab>
</DsTabs>
```

## Props

**DsTabs**

| Prop           | Write as                       | Default (omit) | Notes                                         |
| -------------- | ------------------------------ | -------------- | --------------------------------------------- |
| `aria-label`   | `aria-label="Project"`         | –              | Always write it: names the tab list.          |
| `size`         | `size="small"`, `size="large"` | `medium`       | Tab heights 28/36/44px.                       |
| `defaultValue` | `defaultValue="activity"`      | first tab      | The selected tab, if it isn't the first.      |

**DsTab**

| Prop       | Write as            | Default (omit) | Notes                                         |
| ---------- | ------------------- | -------------- | --------------------------------------------- |
| `value`    | `value="activity"`  | –              | Required. Short lowercase id from the label, unique. |
| `label`    | `label="Activity"`  | –              | Required. Plain text.                         |
| `disabled` | `disabled`          | off            | The tab can't be selected.                    |

No `value`/`onValueChange` on DsTabs, and no `className`, `style` or event handlers. A DsTab's children are any design system content.

### Composing rules

- Leave out defaults: no `size="medium"`, and no `defaultValue` when the first tab is selected.
- Every direct child of DsTabs is a DsTab. Anything else isn't rendered.
- Panel content follows the normal rules: components from the assets, text with [typography](typography.md) classes. The panel already has 16px space above it.
- A DsTab with no panel content is self-closing.

## Visual identification

| Looks like                                                       | Means                            |
| ---------------------------------------------------------------- | -------------------------------- |
| Row of text labels with a light grey line `#dcdce0` under the whole row | DsTabs                    |
| Near-black label `#18181b` with a 2px black underline            | The selected tab (`defaultValue`) |
| Grey labels `#7d7d86`                                            | Unselected tabs                  |
| Lighter grey label that never highlights                         | `disabled`                       |
| Pill-shaped buttons in a bordered box                            | [`DsToggleGroup`](toggle-group.md), not tabs |

**Size** (pick the nearest):

| Size   | Tab height | Text | Space between tabs |
| ------ | ---------- | ---- | ------------------ |
| small  | 28px       | 13px | 16px               |
| medium | 36px       | 14px | 20px               |
| large  | 44px       | 16px | 24px               |

## Input-to-prop mapping

| User says                                        | Write as                          |
| ------------------------------------------------ | --------------------------------- |
| tabs, tab bar, tabbed sections                   | `<DsTabs>` with `DsTab`s          |
| selected tab, active tab, "on the X tab"         | `defaultValue="x"`                |
| disabled, unavailable tab                        | `disabled` on that DsTab          |
| segmented control, view switcher without panels  | [`DsToggleGroup`](toggle-group.md) |

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
import { DsTabs, DsTab } from '@ds-build/ui';

<DsTabs aria-label="Team">
  <DsTab value="members" label="Members">
    <p className="ds-text-medium">Four people have access.</p>
  </DsTab>
  <DsTab value="invites" label="Invites" />
  <DsTab value="billing" label="Billing" disabled />
</DsTabs>
```

- `nav-tabs` → `DsTabs`; `active` is the first tab, so no `defaultValue`; `disabled` → `disabled`.
- The active pane's content becomes the first DsTab's panel; `p-3` is dropped (the panel has its own spacing).
- **Not available:** the "4" count badge.
