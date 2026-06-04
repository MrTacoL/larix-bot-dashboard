import ModulePage from '../components/ModulePage';

export default function RemindersPage() {
  return <ModulePage
    title="Reminders"
    subtitle="Set reminder behavior for staff, events, and Larix community tasks."
    section="reminders"
    activePath="/reminders"
    fields={[
      { key: 'enabled', label: 'Enabled true/false', value: 'false' },
      { key: 'channelId', label: 'Reminder Channel ID' },
      { key: 'roleId', label: 'Reminder Manager Role ID' },
      { key: 'message', label: 'Default Reminder Message', value: 'Reminder from Larix Bot.' }
    ]}
    cards={[
      { title: 'Timed Alerts', text: 'Prepared for timed reminders and staff notifications.' },
      { title: 'Event Ready', text: 'Use it for KOTH, drops, announcements, and server tasks.' }
    ]}
  />;
}
