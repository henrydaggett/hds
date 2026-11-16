import { forwardRef, type ReactElement, type ReactNode } from 'react';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import styles from './Menu.module.css';

export type MenuAlign = 'start' | 'end';

export type MenuProps = {
  /** The element that opens the menu, usually a `DsButton`. */
  trigger: ReactElement<Record<string, unknown>>;
  /** Which edge of the trigger the menu lines up with. */
  align?: MenuAlign;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  /** `DsMenuItem` and `DsMenuSeparator` elements. */
  children: ReactNode;
};

/** A list of actions that opens from a button. */
export function DsMenu({
  trigger,
  align = 'start',
  defaultOpen,
  open,
  onOpenChange,
  className,
  children,
}: MenuProps) {
  return (
    <BaseMenu.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}
    >
      <BaseMenu.Trigger render={trigger} />
      <BaseMenu.Portal>
        <BaseMenu.Positioner align={align} sideOffset={4} className={styles.positioner}>
          <BaseMenu.Popup className={className ? `${styles.popup} ${className}` : styles.popup}>
            {children}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}

export type MenuItemColor = 'default' | 'red';

export type MenuItemProps = Omit<BaseMenu.Item.Props, 'children' | 'className' | 'render' | 'color'> & {
  /** `red` marks a destructive action. */
  color?: MenuItemColor;
  /** Leading icon. */
  iconNode?: ReactNode;
  className?: string;
  children: ReactNode;
};

export const DsMenuItem = forwardRef<HTMLDivElement, MenuItemProps>(function DsMenuItem(
  { color = 'default', iconNode, className, children, ...rest },
  ref,
) {
  return (
    <BaseMenu.Item
      ref={ref}
      data-color={color}
      className={className ? `${styles.item} ${className}` : styles.item}
      {...rest}
    >
      {iconNode && <span className={styles.icon}>{iconNode}</span>}
      {children}
    </BaseMenu.Item>
  );
});

/** A line between groups of menu items. */
export function DsMenuSeparator() {
  return <BaseMenu.Separator className={styles.separator} />;
}
