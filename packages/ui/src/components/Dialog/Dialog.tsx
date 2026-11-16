import type { ReactElement, ReactNode } from 'react';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { HdsCloseIcon } from '../../icons';
import styles from './Dialog.module.css';

export type DialogSize = 'small' | 'medium' | 'large';

type TriggerElement = ReactElement<Record<string, unknown>>;

export type DialogProps = {
  /** The element that opens the dialog, usually a `HdsButton`. */
  trigger?: TriggerElement;
  title: ReactNode;
  /** Supporting text under the title. */
  description?: ReactNode;
  /** Buttons at the bottom right. Wrap a button in `HdsDialogClose` to make it close the dialog. */
  footer?: ReactNode;
  /** Popup width: 400, 480 or 640px. */
  size?: DialogSize;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  /** Body content between the heading and the footer. */
  children?: ReactNode;
};

/** A modal window over the page. Closes with its ✕ button, Escape or a click outside. */
export function HdsDialog({
  trigger,
  title,
  description,
  footer,
  size = 'medium',
  defaultOpen,
  open,
  onOpenChange,
  className,
  children,
}: DialogProps) {
  return (
    <BaseDialog.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}
    >
      {trigger && <BaseDialog.Trigger render={trigger} />}
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Popup
          data-size={size}
          className={className ? `${styles.popup} ${className}` : styles.popup}
        >
          <div className={styles.header}>
            <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
            <BaseDialog.Close className={styles.close} aria-label="Close">
              <HdsCloseIcon />
            </BaseDialog.Close>
          </div>
          {description != null && (
            <BaseDialog.Description className={styles.description}>{description}</BaseDialog.Description>
          )}
          {children != null && <div className={styles.body}>{children}</div>}
          {footer != null && <div className={styles.footer}>{footer}</div>}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

export type DialogCloseProps = {
  /** One button, e.g. a `HdsButton`. Clicking it closes the dialog. */
  children: TriggerElement;
};

export function HdsDialogClose({ children }: DialogCloseProps) {
  return <BaseDialog.Close render={children} />;
}
