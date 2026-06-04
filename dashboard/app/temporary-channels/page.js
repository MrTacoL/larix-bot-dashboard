import ModulePage from '../components/ModulePage';

export default function TemporaryChannelsPage() {
  return <ModulePage
    title="Temporary Channels"
    subtitle="Create temporary voice channels when members join a lobby voice channel."
    section="temporaryChannels"
    activePath="/temporary-channels"
    fields={[
      { key: 'enabled', label: 'Enabled true/false', value: 'false' },
      { key: 'lobbyChannelId', label: 'Join-to-Create Voice Channel ID' },
      { key: 'categoryId', label: 'Temporary Voice Category ID' },
      { key: 'defaultName', label: 'Default Voice Name', value: '{user} voice' },
      { key: 'userLimit', label: 'Default User Limit', value: '5' }
    ]}
    cards={[
      { title: 'Voice Lobby', text: 'Members join one lobby and Larix Bot can create their own voice channel.' },
      { title: 'Auto Cleanup', text: 'Prepared for deleting empty temporary voice channels.' }
    ]}
  />;
}
