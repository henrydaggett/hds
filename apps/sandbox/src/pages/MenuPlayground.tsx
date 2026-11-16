import { useDialKit } from 'dialkit';
import {
  HdsButton,
  HdsEditIcon,
  HdsMenu,
  HdsMenuItem,
  HdsMenuSeparator,
  HdsTrashIcon,
  type MenuAlign,
} from '@hds/ui';
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
    'HdsMenu',
    [expr('trigger', jsx('HdsButton', ['appearance="outline"'], 'Actions')), str('align', align, 'start')],
    [
      jsx('HdsMenuItem', [dial.icons && 'iconNode={<HdsEditIcon />}'], 'Edit'),
      jsx('HdsMenuItem', [bool('disabled', dial.disableDuplicate)], 'Duplicate'),
      '<HdsMenuSeparator />',
      jsx('HdsMenuItem', ['color="red"', dial.icons && 'iconNode={<HdsTrashIcon />}'], 'Delete'),
    ],
  );

  return (
    <Stage snippet={snippet}>
      <HdsMenu trigger={<HdsButton appearance="outline">Actions</HdsButton>} align={align}>
        <HdsMenuItem iconNode={dial.icons ? <HdsEditIcon /> : undefined}>Edit</HdsMenuItem>
        <HdsMenuItem disabled={dial.disableDuplicate}>Duplicate</HdsMenuItem>
        <HdsMenuSeparator />
        <HdsMenuItem color="red" iconNode={dial.icons ? <HdsTrashIcon /> : undefined}>
          Delete
        </HdsMenuItem>
      </HdsMenu>
    </Stage>
  );
}
