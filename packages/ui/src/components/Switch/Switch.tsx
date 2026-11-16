import { forwardRef, type ReactNode } from 'react';
import { Switch as BaseSwitch } from '@base-ui/react/switch';
import styles from './Switch.module.css';

export type SwitchSize = 'small' | 'medium' | 'large';

type SwitchBaseProps = Omit<
  BaseSwitch.Root.Props,
  'children' | 'className' | 'render' | 'nativeButton'
> & {
  size?: SwitchSize;
  className?: string;
};

type LabelledSwitchProps = SwitchBaseProps & {
  label: ReactNode;
};

/** A switch without a visible label needs an `aria-label`. */
type UnlabelledSwitchProps = SwitchBaseProps & {
  label?: never;
  'aria-label': string;
};

export type SwitchProps = LabelledSwitchProps | UnlabelledSwitchProps;

export const HdsSwitch = forwardRef<HTMLElement, SwitchProps>(function HdsSwitch(
  { size = 'medium', label, disabled, className, ...rest },
  ref,
) {
  const track = (
    <BaseSwitch.Root ref={ref} disabled={disabled} className={styles.track} {...rest}>
      <BaseSwitch.Thumb className={styles.thumb} />
    </BaseSwitch.Root>
  );

  return (
    <span data-size={size} className={className ? `${styles.switch} ${className}` : styles.switch}>
      {label == null ? (
        track
      ) : (
        <label className={styles.label} data-disabled={disabled ? '' : undefined}>
          {track}
          {label}
        </label>
      )}
    </span>
  );
});
