# HdsSwitch guidelines

## When to use

- Use a HdsSwitch for a setting that takes effect immediately, like "Dark mode" or "Email notifications".
- Use a HdsCheckbox for a choice that's submitted with a form, like accepting terms.
- Use a HdsToggle for a pressed/unpressed button in a toolbar.

## Content

- Name the setting, not the action: "Email notifications", not "Turn on email notifications".
- Keep labels short and in sentence case.

## Layout

- Stack related switches vertically with `hds-gap-12`, under a heading if there's more than one group.
- A switch doesn't need a HdsField unless it shows helper text or an error.
