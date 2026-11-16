import { HdsButton, HdsField, HdsForm, HdsFormActions, HdsRadio, HdsRadioGroup, HdsSwitch, HdsTextInput, HdsTooltip } from '@hds/ui';

export default function Settings() {
  return (
    <div className="hds-gap-16" style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="hds-h4">Account</h2>
      <HdsForm>
        <HdsField label="Email" name="email" invalid error="Enter a valid email.">
          <HdsTextInput type="email" />
        </HdsField>
        <HdsRadioGroup label="Plan" name="plan" defaultValue="pro">
          <HdsRadio value="free" label="Free" />
          <HdsRadio value="pro" label="Pro" />
        </HdsRadioGroup>
        <HdsField description="We only email you about your account.">
          <HdsSwitch label="Product updates" />
        </HdsField>
        <HdsFormActions>
          <HdsButton type="submit">Save changes</HdsButton>
          <HdsButton appearance="outline">Cancel</HdsButton>
        </HdsFormActions>
      </HdsForm>
      <HdsTooltip content="Sign in with your company account">
        <HdsButton appearance="outline">Sign in with Google</HdsButton>
      </HdsTooltip>
    </div>
  );
}
