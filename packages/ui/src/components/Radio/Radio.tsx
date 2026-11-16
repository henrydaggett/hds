import { forwardRef, useContext, type ReactNode } from 'react';
import { Field as BaseField } from '@base-ui/react/field';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroupContext } from '../RadioGroup/RadioGroupContext';
import styles from './Radio.module.css';

export type RadioProps = Omit<
  BaseRadio.Root.Props,
  'children' | 'className' | 'render' | 'nativeButton' | 'value'
> & {
  /** Identifies the radio in its `DsRadioGroup`. */
  value: string;
  label: ReactNode;
  className?: string;
};

/** One option of a `DsRadioGroup`. It must be rendered inside one. */
export const DsRadio = forwardRef<HTMLElement, RadioProps>(function DsRadio(
  { label, disabled, className, ...rest },
  ref,
) {
  const group = useContext(RadioGroupContext);
  if (!group) {
    throw new Error('DsRadio must be used inside a DsRadioGroup.');
  }

  return (
    <BaseField.Item
      disabled={disabled}
      data-size={group.size}
      className={className ? `${styles.radio} ${className}` : styles.radio}
    >
      <BaseField.Label className={styles.label}>
        <BaseRadio.Root ref={ref} disabled={disabled} className={styles.circle} {...rest}>
          <BaseRadio.Indicator className={styles.indicator} />
        </BaseRadio.Root>
        {label}
      </BaseField.Label>
    </BaseField.Item>
  );
});
