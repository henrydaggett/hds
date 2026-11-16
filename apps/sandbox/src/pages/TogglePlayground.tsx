import type { ReactNode } from 'react';
import { useDialKit } from 'dialkit';
import { HdsBoldIcon, HdsItalicIcon, HdsToggle, HdsUnderlineIcon, type ToggleSize } from '@hds/ui';
import { Stage } from '../components/Playground';
import { bool, expr, jsx, str } from '../lib/jsx';

const sizes: ToggleSize[] = ['small', 'medium', 'large'];

const icons: Record<string, { node: ReactNode; name: string } | null> = {
  none: null,
  bold: { node: <HdsBoldIcon />, name: 'HdsBoldIcon' },
  italic: { node: <HdsItalicIcon />, name: 'HdsItalicIcon' },
  underline: { node: <HdsUnderlineIcon />, name: 'HdsUnderlineIcon' },
};

export function TogglePlayground() {
  const dial = useDialKit('Toggle', {
    label: { type: 'text', default: 'Bold', placeholder: 'Label' },
    icon: { type: 'select', options: Object.keys(icons), default: 'bold' },
    iconOnly: false,
    size: { type: 'select', options: sizes, default: 'medium' },
    pressed: false,
    disabled: false,
  });

  const size = dial.size as ToggleSize;
  const label = dial.label.trim() || 'Toggle';
  const icon = icons[dial.icon];
  const iconOnly = dial.iconOnly && icon != null;
  const common = { size, disabled: dial.disabled, defaultPressed: dial.pressed };

  const snippet = jsx(
    'HdsToggle',
    [
      str('size', size, 'medium'),
      bool('defaultPressed', dial.pressed),
      expr('iconNode', icon ? `<${icon.name} />` : undefined),
      iconOnly && `aria-label="${label}"`,
      bool('disabled', dial.disabled),
    ],
    iconOnly ? undefined : label,
  );

  return (
    <Stage snippet={snippet} note={dial.iconOnly && !icon ? 'Pick an icon to make it icon-only.' : undefined}>
      {iconOnly ? (
        <HdsToggle key={String(dial.pressed)} {...common} iconNode={icon.node} aria-label={label} />
      ) : (
        <HdsToggle key={String(dial.pressed)} {...common} iconNode={icon?.node}>
          {label}
        </HdsToggle>
      )}
    </Stage>
  );
}
