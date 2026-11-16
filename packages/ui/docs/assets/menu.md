# HdsMenu

A dropdown list of actions that opens from a trigger button. Items can have an icon, be red for destructive actions, or be disabled. `HdsMenuSeparator` draws a line between groups.

## Quick reference

```tsx
import { HdsMenu, HdsMenuItem, HdsButton } from '@hds/ui';

<HdsMenu trigger={<HdsButton appearance="outline">Actions</HdsButton>}>
  <HdsMenuItem>Edit</HdsMenuItem>
  <HdsMenuItem>Duplicate</HdsMenuItem>
</HdsMenu>
```

HdsMenu props: `trigger` (required), `align`, `defaultOpen`. HdsMenuItem props: `color`, `iconNode`, `disabled`. HdsMenuSeparator takes none. Nothing else.

## Import

Import HdsMenu, HdsMenuItem, HdsMenuSeparator (if used), the trigger component and only the icons used:

```tsx
import { HdsMenu, HdsMenuItem, HdsMenuSeparator, HdsButton, HdsEditIcon, HdsTrashIcon } from '@hds/ui';
```

## Structure

```tsx
<HdsMenu trigger={<HdsButton appearance="outline">Actions</HdsButton>}>
  <HdsMenuItem>…</HdsMenuItem>
  <HdsMenuSeparator />
  <HdsMenuItem color="red">…</HdsMenuItem>
</HdsMenu>
```

- `trigger` is one [`HdsButton`](button.md), or an icon-only [`HdsToggle`](toggle.md) for a "⋯" button.
- Children are HdsMenuItems and HdsMenuSeparators only. Item text is plain text children.

## Props

**HdsMenu**

| Prop          | Write as                                          | Default (omit) | Notes                                    |
| ------------- | ------------------------------------------------- | -------------- | ---------------------------------------- |
| `trigger`     | `trigger={<HdsButton appearance="outline">Actions</HdsButton>}` | – | Required.                              |
| `align`       | `align="end"`                                     | `start`        | Lines the menu up with the trigger's right edge. |
| `defaultOpen` | `defaultOpen`                                     | closed         | Shows the menu open on load.             |

**HdsMenuItem**

| Prop       | Write as                     | Default (omit) | Notes                                 |
| ---------- | ---------------------------- | -------------- | ------------------------------------- |
| `color`    | `color="red"`                | `default`      | Destructive action.                   |
| `iconNode` | `iconNode={<HdsTrashIcon />}` | no icon        | Leading 16px icon. Icons: `HdsPlusIcon`, `HdsArrowRightIcon`, `HdsTrashIcon`, `HdsCheckIcon`, `HdsEditIcon`, `HdsCloseIcon`, `HdsMoreIcon`. |
| `disabled` | `disabled`                   | off            | Greyed out, can't be chosen.          |

No `open`, `onOpenChange`, `onClick`, `className`, `style` or event handlers.

### Composing rules

- Write the HdsMenu attributes in the order `trigger`, `align`, `defaultOpen`.
- If the input shows the menu open, write `defaultOpen` so the prototype shows it.
- For a "⋯" / "more" button, use `trigger={<HdsToggle iconNode={<HdsMoreIcon />} aria-label="More actions" />}` and usually `align="end"`. Never add `defaultPressed` to it: it shows pressed while the menu is open.
- If some items have icons and others don't, keep it as shown; don't invent icons.
- Use `HdsMenuSeparator` only between groups, never first or last.

## Visual identification

| Looks like                                                       | Means                       |
| ---------------------------------------------------------------- | --------------------------- |
| White panel with shadow below a button, list of actions          | HdsMenu with `defaultOpen`   |
| Red text item `#dc2626`                                          | `color="red"`               |
| Grey text item `#7d7d86`                                         | `disabled`                  |
| Light grey line between items                                    | `HdsMenuSeparator`           |
| Panel right edge lines up with the button's right edge          | `align="end"`               |
| Same panel but options with a tick for the chosen value          | [`HdsSelect`](select.md), not a menu |

## Input-to-prop mapping

| User says                                          | Write as                          |
| -------------------------------------------------- | --------------------------------- |
| menu, dropdown menu, actions menu, kebab, "⋯" menu, overflow menu | `<HdsMenu>`        |
| delete, remove (destructive item)                  | `color="red"` on that item, only if shown red or the user asks |
| divider between items                              | `<HdsMenuSeparator />`             |
| choose a value from a list                         | [`HdsSelect`](select.md)           |

## Not supported

- Submenus, checkbox or radio items, group headings.
- Keyboard shortcut hints or descriptions in items.
- Links to other pages.
- Context (right-click) menus or menu bars.
- Any custom `className` or `style`.

## Code snippet translation

Input:

```html
<div class="dropdown">
  <button class="btn btn-outline-secondary dropdown-toggle">Options</button>
  <ul class="dropdown-menu dropdown-menu-end">
    <li><a class="dropdown-item" href="#">Rename</a></li>
    <li><a class="dropdown-item" href="#">Move to…</a></li>
    <li><h6 class="dropdown-header">Danger zone</h6></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item text-danger" href="#">Delete</a></li>
  </ul>
</div>
```

Output:

```tsx
import { HdsMenu, HdsMenuItem, HdsMenuSeparator, HdsButton } from '@hds/ui';

<HdsMenu trigger={<HdsButton appearance="outline">Options</HdsButton>} align="end">
  <HdsMenuItem>Rename</HdsMenuItem>
  <HdsMenuItem>Move to…</HdsMenuItem>
  <HdsMenuSeparator />
  <HdsMenuItem color="red">Delete</HdsMenuItem>
</HdsMenu>
```

- `dropdown-menu-end` → `align="end"`; `dropdown-divider` → `HdsMenuSeparator`; `text-danger` → `color="red"`.
- **Not available:** the "Danger zone" group heading.
