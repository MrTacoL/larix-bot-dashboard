import ModulePage from '../components/ModulePage';

export default function PollsPage() {
  return <ModulePage
    title="Polls"
    subtitle="Create voting panels and community polls for Larix members."
    section="polls"
    activePath="/polls"
    fields={[
      { key: 'enabled', label: 'Enabled true/false', value: 'false' },
      { key: 'channelId', label: 'Default Poll Channel ID' },
      { key: 'roleId', label: 'Poll Manager Role ID' },
      { key: 'message', label: 'Default Poll Text', value: 'Vote below.' }
    ]}
    cards={[
      { title: 'Poll Builder', text: 'Ready for future yes/no and multi-choice poll commands.' },
      { title: 'Community Votes', text: 'Use this module for events, updates, and feedback.' }
    ]}
  />;
}
