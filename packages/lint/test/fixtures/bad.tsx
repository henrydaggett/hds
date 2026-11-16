import { HdsButton, HdsForm, HdsFormActions, HdsTextInput, HdsField, HdsCheckbox, HdsRadio, HdsRadioGroup, HdsTabs, HdsTab, HdsTooltip, HdsMenu, HdsMenuItem, HdsMenuSeparator, HdsSelect, HdsDialog, HdsCard } from '@hds/ui';
import { HdsSwitch } from '@hds/ui/components/Switch';

export default function Page() {
  return (
    <div style={{ padding: 16, marginLeft: 10, gap: '14px', color: '#18181b', fontSize: 14 }} className="hds-gap-10">
      <button>Save</button>
      <input type="checkbox" />
      <hr />
      <HdsButton className="wide" size="medium">Create New Project</HdsButton>
      <HdsButton>Save</HdsButton>
      <HdsField label="Terms">
        <HdsCheckbox label="I agree" indeterminate defaultChecked />
      </HdsField>
      <HdsField label="Plan">
        <HdsRadioGroup label="Plan">
          <HdsRadio value="a" label="A" />
        </HdsRadioGroup>
      </HdsField>
      <HdsField label="Two controls" invalid>
        <HdsSwitch label="One" />
        <HdsSwitch label="Two" />
      </HdsField>
      <section>
        <HdsRadio value="lost" label="Lost" />
      </section>
      <HdsTabs aria-label="x">
        <HdsTab value="a" label="A" />
        <p>Not a tab</p>
      </HdsTabs>
      <HdsTooltip content="Hint">
        <HdsButton disabled>Go</HdsButton>
      </HdsTooltip>
      <HdsMenu trigger={<HdsButton>Menu</HdsButton>}>
        <HdsMenuSeparator />
        <HdsMenuItem>Edit</HdsMenuItem>
      </HdsMenu>
      <HdsSelect aria-label="Size" items={[{ value: 's', label: 'S' }, { value: 'm', label: 'M' }]} />
      <HdsDialog title="Outer">
        <HdsDialog title="Inner" />
      </HdsDialog>
      <HdsButton type="submit">Send</HdsButton>
      <HdsForm>
        <HdsFormActions>
          <HdsButton type="submit">Join</HdsButton>
        </HdsFormActions>
        <HdsField label="Email">
          <HdsTextInput />
        </HdsField>
      </HdsForm>
      <p style={{ color: 'var(--hds-color-txt)' }}>Hi</p>
      {/* hds-lint-disable-next-line raw-element */}
      <select />
    </div>
  );
}
