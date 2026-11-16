import { useDialKit } from 'dialkit';
import {
  DsButton,
  DsEditIcon,
  DsMenu,
  DsMenuItem,
  DsMenuSeparator,
  DsTrashIcon,
  type MenuAlign,
} from '@ds-build/ui';
import { Stage } from '../components/Playground';
import { bool, expr, jsx, jsxStacked, str } from '../lib/jsx';

export function MenuPlayground() {
  const dial = useDialKit('Menu', {
    align: { type: 'select', options: ['start', 'end'], default: 'start' },
    icons: false,
    disableDuplicate: false,
  });

  const align = dial.align as MenuAlign;

  const snippet = jsxStacked(
    'DsMenu',
    [expr('trigger', jsx('DsButton', ['appearance="outline"'], 'Actions')), str('align', align, 'start')],
    [
      jsx('DsMenuItem', [dial.icons && 'iconNode={<DsEditIcon />}'], 'Edit'),
      jsx('DsMenuItem', [bool('disabled', dial.disableDuplicate)], 'Duplicate'),
      '<DsMenuSeparator />',
      jsx('DsMenuItem', ['color="red"', dial.icons && 'iconNode={<DsTrashIcon />}'], 'Delete'),
    ],
  );

  return (
    <Stage snippet={snippet}>
      <DsMenu trigger={<DsButton appearance="outline">Actions</DsButton>} align={align}>
        <DsMenuItem iconNode={dial.icons ? <DsEditIcon /> : undefined}>Edit</DsMenuItem>
        <DsMenuItem disabled={dial.disableDuplicate}>Duplicate</DsMenuItem>
        <DsMenuSeparator />
        <DsMenuItem color="red" iconNode={dial.icons ? <DsTrashIcon /> : undefined}>
          Delete
        </DsMenuItem>
      </DsMenu>
    </Stage>
  );
}
