# DsMenu

A dropdown list of actions that opens from a trigger button. Items can have an icon, be red for destructive actions, or be disabled. `DsMenuSeparator` draws a line between groups.

## Quick reference

```tsx
import { DsMenu, DsMenuItem, DsButton } from '@ds-build/ui';

<DsMenu trigger={<DsButton appearance="outline">Actions</DsButton>}>
  <DsMenuItem>Edit</DsMenuItem>
  <DsMenuItem>Duplicate</DsMenuItem>
</DsMenu>
```

DsMenu props: `trigger` (required), `align`, `defaultOpen`. DsMenuItem props: `color`, `iconNode`, `disabled`. DsMenuSeparator takes none. Nothing else.

## Import

Import DsMenu, DsMenuItem, DsMenuSeparator (if used), the trigger component and only the icons used:

```tsx
import { DsMenu, DsMenuItem, DsMenuSeparator, DsButton, DsEditIcon, DsTrashIcon } from '@ds-build/ui';
```

## Structure

```tsx
<DsMenu trigger={<DsButton appearance="outline">Actions</DsButton>}>
  <DsMenuItem>…</DsMenuItem>
  <DsMenuSeparator />
  <DsMenuItem color="red">…</DsMenuItem>
</DsMenu>
```

- `trigger` is one [`DsButton`](button.md), or an icon-only [`DsToggle`](toggle.md) for a "⋯" button.
- Children are DsMenuItems and DsMenuSeparators only. Item text is plain text children.

## Props

**DsMenu**

| Prop          | Write as                                          | Default (omit) | Notes                                    |
| ------------- | ------------------------------------------------- | -------------- | ---------------------------------------- |
| `trigger`     | `trigger={<DsButton appearance="outline">Actions</DsButton>}` | – | Required.                              |
| `align`       | `align="end"`                                     | `start`        | Lines the menu up with the trigger's right edge. |
| `defaultOpen` | `defaultOpen`                                     | closed         | Shows the menu open on load.             |

**DsMenuItem**

| Prop       | Write as                     | Default (omit) | Notes                                 |
| ---------- | ---------------------------- | -------------- | ------------------------------------- |
| `color`    | `color="red"`                | `default`      | Destructive action.                   |
| `iconNode` | `iconNode={<DsTrashIcon />}` | no icon        | Leading 16px icon. Icons: `DsPlusIcon`, `DsArrowRightIcon`, `DsTrashIcon`, `DsCheckIcon`, `DsEditIcon`, `DsCloseIcon`, `DsMoreIcon`. |
| `disabled` | `disabled`                   | off            | Greyed out, can't be chosen.          |

No `open`, `onOpenChange`, `onClick`, `className`, `style` or event handlers.

### Composing rules

- Write the DsMenu attributes in the order `trigger`, `align`, `defaultOpen`.
- If the input shows the menu open, write `defaultOpen` so the prototype shows it.
- For a "⋯" / "more" button, use `trigger={<DsToggle iconNode={<DsMoreIcon />} aria-label="More actions" />}` and usually `align="end"`.
- If some items have icons and others don't, keep it as shown; don't invent icons.
- Use `DsMenuSeparator` only between groups, never first or last.

## Visual identification

| Looks like                                                       | Means                       |
| ---------------------------------------------------------------- | --------------------------- |
| White panel with shadow below a button, list of actions          | DsMenu with `defaultOpen`   |
| Red text item `#dc2626`                                          | `color="red"`               |
| Grey text item `#7d7d86`                                         | `disabled`                  |
| Light grey line between items                                    | `DsMenuSeparator`           |
| Panel right edge lines up with the button's right edge          | `align="end"`               |
| Same panel but options with a tick for the chosen value          | [`DsSelect`](select.md), not a menu |

## Input-to-prop mapping

| User says                                          | Write as                          |
| -------------------------------------------------- | --------------------------------- |
| menu, dropdown menu, actions menu, kebab, "⋯" menu, overflow menu | `<DsMenu>`        |
| delete, remove (destructive item)                  | `color="red"` on that item, only if shown red or the user asks |
| divider between items                              | `<DsMenuSeparator />`             |
| choose a value from a list                         | [`DsSelect`](select.md)           |

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
import { DsMenu, DsMenuItem, DsMenuSeparator, DsButton } from '@ds-build/ui';

<DsMenu trigger={<DsButton appearance="outline">Options</DsButton>} align="end">
  <DsMenuItem>Rename</DsMenuItem>
  <DsMenuItem>Move to…</DsMenuItem>
  <DsMenuSeparator />
  <DsMenuItem color="red">Delete</DsMenuItem>
</DsMenu>
```

- `dropdown-menu-end` → `align="end"`; `dropdown-divider` → `DsMenuSeparator`; `text-danger` → `color="red"`.
- **Not available:** the "Danger zone" group heading.
