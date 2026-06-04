import ModulePage from '../components/ModulePage';

export default function SearchPage() {
  return <ModulePage
    title="Search Anything"
    subtitle="Search users, IDs, channels, messages, and bot data from one utility module."
    section="searchAnything"
    activePath="/search"
    fields={[
      { key: 'enabled', label: 'Enabled true/false', value: 'false' },
      { key: 'channelId', label: 'Search Log Channel ID' },
      { key: 'roleId', label: 'Allowed Role ID' },
      { key: 'message', label: 'Search Notes', value: 'Staff search utility.' }
    ]}
    cards={[
      { title: 'Staff Search', text: 'Prepared for searching users, IDs, channels, and logs.' },
      { title: 'Controlled Access', text: 'Lock search features behind a staff role.' }
    ]}
  />;
}
