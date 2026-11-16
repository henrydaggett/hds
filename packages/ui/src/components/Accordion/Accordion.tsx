import { forwardRef, type ReactNode } from 'react';
import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { HdsChevronDownIcon } from '../../icons';
import styles from './Accordion.module.css';

export type AccordionProps = {
  /** `value`s of the items that start open. */
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  /** Lets several items stay open at once. */
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  /** `HdsAccordionItem` elements. */
  children: ReactNode;
};

export const HdsAccordion = forwardRef<HTMLDivElement, AccordionProps>(function HdsAccordion(
  { defaultValue, value, onValueChange, multiple = false, disabled, className, children },
  ref,
) {
  return (
    <BaseAccordion.Root
      ref={ref}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange ? (next) => onValueChange(next as string[]) : undefined}
      multiple={multiple}
      disabled={disabled}
      className={className ? `${styles.accordion} ${className}` : styles.accordion}
    >
      {children}
    </BaseAccordion.Root>
  );
});

export type AccordionItemProps = {
  /** Identifies the item. Unique within its `HdsAccordion`. */
  value: string;
  /** Text of the header button. */
  title: ReactNode;
  disabled?: boolean;
  className?: string;
  /** The content revealed when the item is open. */
  children: ReactNode;
};

export const HdsAccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function HdsAccordionItem(
  { value, title, disabled, className, children },
  ref,
) {
  return (
    <BaseAccordion.Item
      ref={ref}
      value={value}
      disabled={disabled}
      className={className ? `${styles.item} ${className}` : styles.item}
    >
      <BaseAccordion.Header className={styles.header}>
        <BaseAccordion.Trigger className={styles.trigger}>
          <span className={styles.title}>{title}</span>
          <HdsChevronDownIcon className={styles.chevron} />
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
      <BaseAccordion.Panel className={styles.panel}>
        <div className={styles.content}>{children}</div>
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  );
});
