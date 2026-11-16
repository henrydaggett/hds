import { forwardRef, useMemo, type ReactNode } from 'react';
import { Field as BaseField } from '@base-ui/react/field';
import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { RadioGroupContext } from './RadioGroupContext';
import styles from './RadioGroup.module.css';

export type RadioGroupSize = 'small' | 'medium' | 'large';

export type RadioGroupProps = {
  /** Group label, rendered as the fieldset legend. */
  label?: ReactNode;
  description?: ReactNode;
  /** Shown when the group fails validation, or always when `invalid` is set. */
  error?: ReactNode;
  invalid?: boolean;
  /** Sets the size of every `HdsRadio` in the group. */
  size?: RadioGroupSize;
  orientation?: 'vertical' | 'horizontal';
  /** `value` of the radio that starts selected. */
  defaultValue?: string;
  value?: string | null;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
  'aria-label'?: string;
  children: ReactNode;
};

export const HdsRadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function HdsRadioGroup(
  {
    label,
    description,
    error,
    invalid,
    size = 'medium',
    orientation = 'vertical',
    defaultValue,
    value,
    onValueChange,
    name,
    disabled,
    required,
    readOnly,
    className,
    'aria-label': ariaLabel,
    children,
  },
  ref,
) {
  const context = useMemo(() => ({ size }), [size]);

  return (
    <RadioGroupContext.Provider value={context}>
      <BaseField.Root
        ref={ref}
        name={name}
        disabled={disabled}
        invalid={invalid}
        className={className ? `${styles.group} ${className}` : styles.group}
      >
        <BaseFieldset.Root
          className={styles.fieldset}
          render={
            <BaseRadioGroup
              defaultValue={defaultValue}
              value={value}
              onValueChange={onValueChange ? (next) => onValueChange(next as string) : undefined}
              disabled={disabled}
              required={required}
              readOnly={readOnly}
              aria-label={ariaLabel}
            />
          }
        >
          {label != null && <BaseFieldset.Legend className={styles.legend}>{label}</BaseFieldset.Legend>}
          <div className={styles.items} data-orientation={orientation}>
            {children}
          </div>
        </BaseFieldset.Root>
        {description != null && (
          <BaseField.Description className={styles.description}>{description}</BaseField.Description>
        )}
        {error != null && (
          <BaseField.Error className={styles.error} match={invalid ? true : undefined}>
            {error}
          </BaseField.Error>
        )}
      </BaseField.Root>
    </RadioGroupContext.Provider>
  );
});
