import ModulePage from '../components/ModulePage';

export default function AutomationsPage() {
  return <ModulePage
    title="Automations"
    subtitle="Create automatic actions for channels, roles, messages, and staff workflows."
    section="automations"
    activePath="/automations"
    fields={[
      { key: 'enabled', label: 'Enabled true/false', value: 'false' },
      { key: 'channelId', label: 'Log Channel ID' },
      { key: 'roleId', label: 'Manager Role ID' },
      { key: 'message', label: 'Automation Notes', value: 'Auto actions for Larix Kit.' }
    ]}
    cards={[
      { title: 'Auto Actions', text: 'Ready for join actions, role actions, channel notices, and alerts.' },
      { title: 'Staff Flow', text: 'Use this for future no-code style automation rules.' }
    ]}
  />;
}
