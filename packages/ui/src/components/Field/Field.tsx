import { forwardRef, isValidElement, type ReactNode } from 'react';
import { Field as BaseField } from '@base-ui/react/field';
import { HdsCheckbox } from '../Checkbox/Checkbox';
import { HdsSelect } from '../Select/Select';
import { HdsSwitch } from '../Switch/Switch';
import styles from './Field.module.css';

export type FieldProps = {
  /** Not rendered for a `HdsCheckbox` or `HdsSwitch`, which are named by their own `label`. */
  label?: ReactNode;
  /** Helper text shown under the control. */
  description?: ReactNode;
  /** Shown when the control fails validation, or always when `invalid` is set. */
  error?: ReactNode;
  invalid?: boolean;
  disabled?: boolean;
  /** Form field name. Takes precedence over the control's own `name`. */
  name?: string;
  className?: string;
  /** One control: `HdsTextInput`, `HdsSelect`, `HdsCheckbox` or `HdsSwitch`. */
  children: ReactNode;
};

export const HdsField = forwardRef<HTMLDivElement, FieldProps>(function HdsField(
  { label, description, error, invalid, disabled, name, className, children },
  ref,
) {
  // A native <label> would open the HdsSelect popup on click, so label buttons with a <div>.
  const labelsButton = isValidElement(children) && children.type === HdsSelect;
  // A Field.Label would replace the checkbox's or switch's own label as its accessible name.
  const labelsItself =
    isValidElement(children) && (children.type === HdsCheckbox || children.type === HdsSwitch);
  const showLabel = label != null && !labelsItself;

  return (
    <BaseField.Root
      ref={ref}
      name={name}
      disabled={disabled}
      invalid={invalid}
      className={className ? `${styles.field} ${className}` : styles.field}
    >
      {showLabel &&
        (labelsButton ? (
          <BaseField.Label className={styles.label} nativeLabel={false} render={<div />}>
            {label}
          </BaseField.Label>
        ) : (
          <BaseField.Label className={styles.label}>{label}</BaseField.Label>
        ))}
      {children}
      {description != null && (
        <BaseField.Description className={styles.description}>{description}</BaseField.Description>
      )}
      {error != null && (
        <BaseField.Error className={styles.error} match={invalid ? true : undefined}>
          {error}
        </BaseField.Error>
      )}
    </BaseField.Root>
  );
});
