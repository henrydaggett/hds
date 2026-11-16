import { useDialKit } from 'dialkit';
import { HdsButton, HdsTooltip, type TooltipSide } from '@hds/ui';
import { Stage } from '../components/Playground';
import { jsx, str } from '../lib/jsx';

const sides: TooltipSide[] = ['top', 'bottom', 'left', 'right'];

export function TooltipPlayground() {
  const dial = useDialKit('Tooltip', {
    content: { type: 'text', default: 'Creates an empty project', placeholder: 'Tooltip text' },
    side: { type: 'select', options: sides, default: 'top' },
  });

  const side = dial.side as TooltipSide;
  const content = dial.content.trim() || 'Tooltip';

  const snippet = jsx('HdsTooltip', [`content="${content}"`, str('side', side, 'top')], [
    jsx('HdsButton', ['icon'], 'New project'),
  ]);

  return (
    <Stage snippet={snippet}>
      <HdsTooltip content={content} side={side}>
        <HdsButton icon>New project</HdsButton>
      </HdsTooltip>
    </Stage>
  );
}
