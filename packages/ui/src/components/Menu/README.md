# DsMenu

A list of actions that opens from a trigger element. Built on the [Base UI Menu](https://base-ui.com/react/components/menu).

```tsx
import { DsMenu, DsMenuItem, DsMenuSeparator } from '@ds-build/ui';
```

## DsMenu props

| Prop           | Type                      | Default   | Notes                                                    |
| -------------- | ------------------------- | --------- | -------------------------------------------------------- |
| `trigger`      | `ReactElement`            | –         | Required. The element that opens the menu, usually a `DsButton`. |
| `align`        | `'start' \| 'end'`        | `'start'` | Which edge of the trigger the menu lines up with.        |
| `defaultOpen`  | `boolean`                 | `false`   | Starts open (uncontrolled).                              |
| `open`         | `boolean`                 | –         | Controlled. Use with `onOpenChange`.                     |
| `onOpenChange` | `(open: boolean) => void` | –         | Called when the menu opens or closes.                    |

## DsMenuItem props

| Prop       | Type                 | Default     | Notes                                          |
| ---------- | -------------------- | ----------- | ---------------------------------------------- |
| `children` | `ReactNode`          | –           | Required. The item's text.                     |
| `color`    | `'default' \| 'red'` | `'default'` | `red` marks a destructive action.              |
| `iconNode` | `ReactNode`          | –           | Leading icon from `@ds-build/ui`.              |
| `disabled` | `boolean`            | `false`     |                                                |
| `onClick`  | `(event) => void`    | –           | Runs the action. The menu closes afterwards.   |

`DsMenuSeparator` takes no props.

## Rules

- `trigger` must be a single element that accepts a `ref` and props, such as a `DsButton`.
- Children are `DsMenuItem`s and `DsMenuSeparator`s.
- The menu opens below the trigger and is at least as wide as it (minimum 160px).
- Use a `DsSelect` to pick a value. A menu runs actions.

## Examples

```tsx
<DsMenu trigger={<DsButton appearance="outline">Actions</DsButton>}>
  <DsMenuItem iconNode={<DsEditIcon />} onClick={edit}>Edit</DsMenuItem>
  <DsMenuItem>Duplicate</DsMenuItem>
  <DsMenuSeparator />
  <DsMenuItem color="red" iconNode={<DsTrashIcon />}>Delete</DsMenuItem>
</DsMenu>

<DsMenu
  align="end"
  trigger={<DsToggle iconNode={<DsMoreIcon />} aria-label="More actions" />}
>
  <DsMenuItem>Rename</DsMenuItem>
  <DsMenuItem disabled>Archive</DsMenuItem>
</DsMenu>
```
