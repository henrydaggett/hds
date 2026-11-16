import type { ReactElement, ReactNode } from 'react';
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import styles from './Tooltip.module.css';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export type TooltipProps = {
  /** The tooltip text. */
  content: ReactNode;
  side?: TooltipSide;
  /** Milliseconds to wait before opening on hover. */
  delay?: number;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  /** One focusable design system element, e.g. a `DsButton` or `DsToggle`. */
  children: ReactElement<Record<string, unknown>>;
};

/** A short text hint shown when its child is hovered or focused. */
export function DsTooltip({
  content,
  side = 'top',
  delay,
  defaultOpen,
  open,
  onOpenChange,
  disabled,
  children,
}: TooltipProps) {
  return (
    <BaseTooltip.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}
      disabled={disabled}
    >
      <BaseTooltip.Trigger delay={delay} render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={side} sideOffset={6} className={styles.positioner}>
          <BaseTooltip.Popup className={styles.popup}>{content}</BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
