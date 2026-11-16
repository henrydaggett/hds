import { forwardRef, useMemo } from 'react';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import { ToggleGroupContext } from './ToggleGroupContext';
import styles from './ToggleGroup.module.css';

export type ToggleGroupSize = 'small' | 'medium' | 'large';

export type ToggleGroupProps = Omit<BaseToggleGroup.Props, 'className'> & {
  /** Sets the size of every `HdsToggle` in the group. */
  size?: ToggleGroupSize;
  className?: string;
};

export const HdsToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(function HdsToggleGroup(
  { size = 'medium', className, ...rest },
  ref,
) {
  const context = useMemo(() => ({ size }), [size]);

  return (
    <ToggleGroupContext.Provider value={context}>
      <BaseToggleGroup
        ref={ref}
        data-size={size}
        className={className ? `${styles.group} ${className}` : styles.group}
        {...rest}
      />
    </ToggleGroupContext.Provider>
  );
});
