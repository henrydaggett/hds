import { cloneElement, forwardRef, isValidElement, useState, type ReactElement, type ReactNode } from 'react';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { HdsToggle } from '../Toggle/Toggle';
import styles from './Menu.module.css';

export type MenuAlign = 'start' | 'end';

export type MenuProps = {
  /** The element that opens the menu, usually a `HdsButton`. */
  trigger: ReactElement<Record<string, unknown>>;
  /** Which edge of the trigger the menu lines up with. */
  align?: MenuAlign;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  /** `HdsMenuItem` and `HdsMenuSeparator` elements. */
  children: ReactNode;
};

/** A list of actions that opens from a button. */
export function HdsMenu({
  trigger,
  align = 'start',
  defaultOpen,
  open,
  onOpenChange,
  className,
  children,
}: MenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen ?? false);
  const isOpen = open ?? uncontrolledOpen;

  // A toggle trigger would flip its own pressed state on every click and stay
  // pressed after the menu closes, so it shows the menu's open state instead.
  const triggerElement =
    isValidElement(trigger) && trigger.type === HdsToggle
      ? cloneElement(trigger, { pressed: isOpen })
      : trigger;

  return (
    <BaseMenu.Root
      open={isOpen}
      onOpenChange={(next) => {
        if (open === undefined) setUncontrolledOpen(next);
        onOpenChange?.(next);
      }}
    >
      <BaseMenu.Trigger render={triggerElement} />
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

export const HdsMenuItem = forwardRef<HTMLDivElement, MenuItemProps>(function HdsMenuItem(
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
export function HdsMenuSeparator() {
  return <BaseMenu.Separator className={styles.separator} />;
}
