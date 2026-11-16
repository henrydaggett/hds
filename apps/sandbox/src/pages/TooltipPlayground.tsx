import { useDialKit } from 'dialkit';
import { DsButton, DsTooltip, type TooltipSide } from '@ds-build/ui';
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

  const snippet = jsx('DsTooltip', [`content="${content}"`, str('side', side, 'top')], [
    jsx('DsButton', ['icon'], 'New project'),
  ]);

  return (
    <Stage snippet={snippet}>
      <DsTooltip content={content} side={side}>
        <DsButton icon>New project</DsButton>
      </DsTooltip>
    </Stage>
  );
}
