import { useDialKit } from 'dialkit';
import { DsButton, DsSeparator } from '@ds-build/ui';
import { Stage } from '../components/Playground';
import { jsx } from '../lib/jsx';

export function SeparatorPlayground() {
  const dial = useDialKit('Separator', {
    orientation: { type: 'select', options: ['horizontal', 'vertical'], default: 'horizontal' },
  });

  const vertical = dial.orientation === 'vertical';
  const separator = jsx('DsSeparator', [vertical && 'orientation="vertical"']);

  const snippet = vertical
    ? jsx('div', ['className="ds-gap-12"', "style={{ display: 'flex' }}"], [
        jsx('DsButton', ['appearance="outline"'], 'Undo'),
        separator,
        jsx('DsButton', ['appearance="outline"'], 'Share'),
      ])
    : jsx('div', ['className="ds-gap-16"', "style={{ display: 'flex', flexDirection: 'column' }}"], [
        '<p className="ds-text-medium">Account</p>',
        separator,
        '<p className="ds-text-medium">Billing</p>',
      ]);

  return (
    <Stage snippet={snippet} width={vertical ? undefined : 320}>
      {vertical ? (
        <div className="ds-gap-12" style={{ display: 'flex' }}>
          <DsButton appearance="outline">Undo</DsButton>
          <DsSeparator orientation="vertical" />
          <DsButton appearance="outline">Share</DsButton>
        </div>
      ) : (
        <div className="ds-gap-16" style={{ display: 'flex', flexDirection: 'column' }}>
          <p className="ds-text-medium">Account</p>
          <DsSeparator />
          <p className="ds-text-medium">Billing</p>
        </div>
      )}
    </Stage>
  );
}
