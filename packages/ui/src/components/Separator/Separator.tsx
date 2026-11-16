import { forwardRef } from 'react';
import { Separator as BaseSeparator } from '@base-ui/react/separator';
import styles from './Separator.module.css';

export type SeparatorProps = Omit<BaseSeparator.Props, 'className' | 'render'> & {
  className?: string;
};

/** A thin line between groups of content. Vertical separators stretch to their flex row's height. */
export const DsSeparator = forwardRef<HTMLDivElement, SeparatorProps>(function DsSeparator(
  { orientation = 'horizontal', className, ...rest },
  ref,
) {
  return (
    <BaseSeparator
      ref={ref}
      orientation={orientation}
      className={className ? `${styles.separator} ${className}` : styles.separator}
      {...rest}
    />
  );
});
