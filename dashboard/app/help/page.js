import ModulePage from '../components/ModulePage';

export default function HelpPage() {
  return <ModulePage
    title="Help"
    subtitle="Set support information and help responses for your Larix community."
    section="help"
    activePath="/help"
    fields={[
      { key: 'enabled', label: 'Enabled true/false', value: 'true' },
      { key: 'channelId', label: 'Help Channel ID' },
      { key: 'supportRoleId', label: 'Support Role ID' },
      { key: 'message', label: 'Help Message', value: 'Use the Larix dashboard or slash commands for help.' }
    ]}
    cards={[
      { title: 'Support Hub', text: 'Stores the help channel, support role, and default help message.' },
      { title: 'Slash Ready', text: 'Prepared for future /help command replies.' }
    ]}
  />;
}
