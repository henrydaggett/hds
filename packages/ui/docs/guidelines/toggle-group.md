# HdsToggleGroup guidelines

## When to use

- Use a single-choice HdsToggleGroup to switch between a few views or modes, like List / Board.
- Use a multiple HdsToggleGroup for a toolbar of independent settings, like Bold / Italic / Underline.
- Use a HdsSelect instead when there are more than five options.
- Don't use a HdsToggleGroup for tabs that change page content; use HdsTabs.

## Content

- Keep two to five options.
- Keep option labels short and parallel: "Day", "Week", "Month".
- Don't mix icon-only and text toggles in one group.
- Name the group with an aria-label that describes the choice.

## Layout

- In a single-choice group, always show one option pressed.
- Use vertical orientation only for side panels or narrow spaces.
