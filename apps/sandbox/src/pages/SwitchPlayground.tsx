import { useDialKit } from 'dialkit';
import { DsSwitch, type SwitchSize } from '@ds-build/ui';
import { Stage } from '../components/Playground';
import { bool, jsx, str } from '../lib/jsx';

const sizes: SwitchSize[] = ['small', 'medium', 'large'];

export function SwitchPlayground() {
  const dial = useDialKit('Switch', {
    label: { type: 'text', default: 'Email notifications', placeholder: 'Label' },
    size: { type: 'select', options: sizes, default: 'medium' },
    checked: false,
    disabled: false,
  });

  const size = dial.size as SwitchSize;
  const label = dial.label.trim() || 'Switch';
  const snippet = jsx('DsSwitch', [
    str('size', size, 'medium'),
    `label="${label}"`,
    bool('defaultChecked', dial.checked),
    bool('disabled', dial.disabled),
  ]);

  return (
    <Stage snippet={snippet}>
      <DsSwitch
        key={String(dial.checked)}
        size={size}
        label={label}
        defaultChecked={dial.checked}
        disabled={dial.disabled}
      />
    </Stage>
  );
}
