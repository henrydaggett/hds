import { Children, forwardRef, isValidElement, type ReactElement, type ReactNode } from 'react';
import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import styles from './Tabs.module.css';

export type TabsSize = 'small' | 'medium' | 'large';

export type TabProps = {
  /** Identifies the tab. Unique within its `HdsTabs`. */
  value: string;
  /** Text of the tab button. */
  label: ReactNode;
  disabled?: boolean;
  className?: string;
  /** The panel shown while this tab is selected. */
  children?: ReactNode;
};

/** One tab and its panel. `HdsTabs` reads `label` and `disabled` to build the tab list. */
export const HdsTab = forwardRef<HTMLDivElement, TabProps>(function HdsTab(
  { value, className, children },
  ref,
) {
  return (
    <BaseTabs.Panel
      ref={ref}
      value={value}
      className={className ? `${styles.panel} ${className}` : styles.panel}
    >
      {children}
    </BaseTabs.Panel>
  );
});

export type TabsProps = {
  size?: TabsSize;
  /** `value` of the tab that starts selected. Defaults to the first tab. */
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  /** Names the tab list for assistive technology. */
  'aria-label'?: string;
  /** `HdsTab` elements. */
  children: ReactNode;
};

export const HdsTabs = forwardRef<HTMLDivElement, TabsProps>(function HdsTabs(
  { size = 'medium', defaultValue, value, onValueChange, className, 'aria-label': ariaLabel, children },
  ref,
) {
  const tabs = Children.toArray(children).filter(
    (child): child is ReactElement<TabProps> => isValidElement(child) && child.type === HdsTab,
  );

  return (
    <BaseTabs.Root
      ref={ref}
      defaultValue={value === undefined ? (defaultValue ?? tabs[0]?.props.value) : undefined}
      value={value}
      onValueChange={onValueChange ? (next) => onValueChange(next as string) : undefined}
      data-size={size}
      className={className ? `${styles.tabs} ${className}` : styles.tabs}
    >
      <BaseTabs.List aria-label={ariaLabel} className={styles.list}>
        {tabs.map((tab) => (
          <BaseTabs.Tab
            key={tab.props.value}
            value={tab.props.value}
            disabled={tab.props.disabled}
            className={styles.tab}
          >
            {tab.props.label}
          </BaseTabs.Tab>
        ))}
        <BaseTabs.Indicator className={styles.indicator} />
      </BaseTabs.List>
      {tabs}
    </BaseTabs.Root>
  );
});
