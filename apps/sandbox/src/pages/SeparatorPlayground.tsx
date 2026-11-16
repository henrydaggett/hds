import { useDialKit } from 'dialkit';
import { HdsButton, HdsSeparator } from '@hds/ui';
import { Stage } from '../components/Playground';
import { jsx } from '../lib/jsx';

export function SeparatorPlayground() {
  const dial = useDialKit('Separator', {
    orientation: { type: 'select', options: ['horizontal', 'vertical'], default: 'horizontal' },
  });

  const vertical = dial.orientation === 'vertical';
  const separator = jsx('HdsSeparator', [vertical && 'orientation="vertical"']);

  const snippet = vertical
    ? jsx('div', ['className="hds-gap-12"', "style={{ display: 'flex' }}"], [
        jsx('HdsButton', ['appearance="outline"'], 'Undo'),
        separator,
        jsx('HdsButton', ['appearance="outline"'], 'Share'),
      ])
    : jsx('div', ['className="hds-gap-16"', "style={{ display: 'flex', flexDirection: 'column' }}"], [
        '<p className="hds-text-medium">Account</p>',
        separator,
        '<p className="hds-text-medium">Billing</p>',
      ]);

  return (
    <Stage snippet={snippet} width={vertical ? undefined : 320}>
      {vertical ? (
        <div className="hds-gap-12" style={{ display: 'flex' }}>
          <HdsButton appearance="outline">Undo</HdsButton>
          <HdsSeparator orientation="vertical" />
          <HdsButton appearance="outline">Share</HdsButton>
        </div>
      ) : (
        <div className="hds-gap-16" style={{ display: 'flex', flexDirection: 'column' }}>
          <p className="hds-text-medium">Account</p>
          <HdsSeparator />
          <p className="hds-text-medium">Billing</p>
        </div>
      )}
    </Stage>
  );
}
