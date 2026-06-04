import ModulePage from '../components/ModulePage';

export default function StarboardsPage() {
  return <ModulePage
    title="Starboards"
    subtitle="Highlight the best messages from your Discord community."
    section="starboards"
    activePath="/starboards"
    fields={[
      { key: 'enabled', label: 'Enabled true/false', value: 'false' },
      { key: 'channelId', label: 'Starboard Channel ID' },
      { key: 'emoji', label: 'Star Emoji', value: '⭐' },
      { key: 'requiredStars', label: 'Required Stars', value: '3' }
    ]}
    cards={[
      { title: 'Message Highlights', text: 'Stores the channel, emoji, and threshold for starboard posts.' },
      { title: 'Larix Style', text: 'Prepared for clean embeds and message reposts.' }
    ]}
  />;
}
