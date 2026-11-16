# DsDialog

A modal window that opens over the page from a trigger element. It has a title, a ✕ close button, and optional description, body and footer. Built on the [Base UI Dialog](https://base-ui.com/react/components/dialog).

```tsx
import { DsDialog, DsDialogClose } from '@ds-build/ui';
```

## DsDialog props

| Prop           | Type                             | Default    | Notes                                                    |
| -------------- | -------------------------------- | ---------- | -------------------------------------------------------- |
| `trigger`      | `ReactElement`                   | –          | The element that opens the dialog, usually a `DsButton`. Leave out when controlling `open` yourself. |
| `title`        | `ReactNode`                      | –          | Required. Heading of the dialog.                         |
| `description`  | `ReactNode`                      | –          | Supporting text under the title.                         |
| `children`     | `ReactNode`                      | –          | Body content between the heading and the footer.         |
| `footer`       | `ReactNode`                      | –          | Buttons, right-aligned at the bottom.                    |
| `size`         | `'small' \| 'medium' \| 'large'` | `'medium'` | Width: 400, 480, 640px.                                  |
| `defaultOpen`  | `boolean`                        | `false`    | Starts open (uncontrolled).                              |
| `open`         | `boolean`                        | –          | Controlled. Use with `onOpenChange`.                     |
| `onOpenChange` | `(open: boolean) => void`        | –          | Called when the dialog opens or closes.                  |

## DsDialogClose props

| Prop       | Type           | Default | Notes                                                  |
| ---------- | -------------- | ------- | ------------------------------------------------------ |
| `children` | `ReactElement` | –       | Required. One button. Clicking it closes the dialog.   |

## Rules

- `trigger` must be a single element that accepts a `ref` and props, such as a `DsButton`.
- Wrap footer buttons that should close the dialog in `DsDialogClose`. Other buttons stay open until you close it through `open`.
- The dialog closes with the ✕ button, Escape or a click outside.
- Put the main action last in the `footer`.

## Examples

```tsx
<DsDialog
  trigger={<DsButton color="red">Delete project</DsButton>}
  title="Delete project?"
  description="This removes the project and all of its files."
  size="small"
  footer={
    <>
      <DsDialogClose>
        <DsButton appearance="outline">Cancel</DsButton>
      </DsDialogClose>
      <DsButton color="red">Delete</DsButton>
    </>
  }
/>

<DsDialog trigger={<DsButton>Invite</DsButton>} title="Invite a teammate">
  <DsField label="Email" name="email">
    <DsTextInput type="email" />
  </DsField>
</DsDialog>

<DsDialog title="Session expired" open={expired} onOpenChange={setExpired} />
```
