import ModulePage from '../components/ModulePage';

export default function CommandsPage() {
  return <ModulePage
    title="Custom Commands"
    subtitle="Create Larix command behavior for staff, utility, and community commands."
    section="customCommands"
    activePath="/commands"
    fields={[
      { key: 'enabled', label: 'Enabled true/false', value: 'false' },
      { key: 'prefix', label: 'Command Prefix', value: '!' },
      { key: 'logChannelId', label: 'Log Channel ID' },
      { key: 'managerRoleId', label: 'Manager Role ID' }
    ]}
    cards={[
      { title: 'Command System', text: 'Backend settings are ready for custom command creation.' },
      { title: 'Staff Control', text: 'Restrict command management to a manager role.' }
    ]}
  />;
}
