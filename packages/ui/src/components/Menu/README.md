# HdsMenu

A list of actions that opens from a trigger element. Built on the [Base UI Menu](https://base-ui.com/react/components/menu).

```tsx
import { HdsMenu, HdsMenuItem, HdsMenuSeparator } from '@hds/ui';
```

## HdsMenu props

| Prop           | Type                      | Default   | Notes                                                    |
| -------------- | ------------------------- | --------- | -------------------------------------------------------- |
| `trigger`      | `ReactElement`            | –         | Required. The element that opens the menu, usually a `HdsButton`. |
| `align`        | `'start' \| 'end'`        | `'start'` | Which edge of the trigger the menu lines up with.        |
| `defaultOpen`  | `boolean`                 | `false`   | Starts open (uncontrolled).                              |
| `open`         | `boolean`                 | –         | Controlled. Use with `onOpenChange`.                     |
| `onOpenChange` | `(open: boolean) => void` | –         | Called when the menu opens or closes.                    |

## HdsMenuItem props

| Prop       | Type                 | Default     | Notes                                          |
| ---------- | -------------------- | ----------- | ---------------------------------------------- |
| `children` | `ReactNode`          | –           | Required. The item's text.                     |
| `color`    | `'default' \| 'red'` | `'default'` | `red` marks a destructive action.              |
| `iconNode` | `ReactNode`          | –           | Leading icon from `@hds/ui`.              |
| `disabled` | `boolean`            | `false`     |                                                |
| `onClick`  | `(event) => void`    | –           | Runs the action. The menu closes afterwards.   |

`HdsMenuSeparator` takes no props.

## Rules

- `trigger` must be a single element that accepts a `ref` and props, such as a `HdsButton`.
- Children are `HdsMenuItem`s and `HdsMenuSeparator`s.
- The menu opens below the trigger and is at least as wide as it (minimum 160px).
- Use a `HdsSelect` to pick a value. A menu runs actions.

## Examples

```tsx
<HdsMenu trigger={<HdsButton appearance="outline">Actions</HdsButton>}>
  <HdsMenuItem iconNode={<HdsEditIcon />} onClick={edit}>Edit</HdsMenuItem>
  <HdsMenuItem>Duplicate</HdsMenuItem>
  <HdsMenuSeparator />
  <HdsMenuItem color="red" iconNode={<HdsTrashIcon />}>Delete</HdsMenuItem>
</HdsMenu>

<HdsMenu
  align="end"
  trigger={<HdsToggle iconNode={<HdsMoreIcon />} aria-label="More actions" />}
>
  <HdsMenuItem>Rename</HdsMenuItem>
  <HdsMenuItem disabled>Archive</HdsMenuItem>
</HdsMenu>
```

An `HdsToggle` trigger shows as pressed while the menu is open, and isn't pressed otherwise; don't set its `pressed` or `defaultPressed`.
