# HdsDialog guidelines

## When to use

- Use a HdsDialog to confirm a destructive action, or for a short focused task (rename, invite) that shouldn't leave the page.
- Don't use a dialog for long forms or content people need to compare with the page behind it.
- Don't open a dialog from another dialog.

## Content

- Write the title as the question or task: "Delete project?", "Invite a teammate".
- Use the description to say what will happen.
- Label buttons with the action, not "OK" or "Yes": "Delete", "Send invite".

## Layout

- Use small for confirmations, medium for short forms, large for richer content.
- Footer: Cancel (outline, in HdsDialogClose) first, then the main action. Red only for destructive actions.
