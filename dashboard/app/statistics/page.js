import ModulePage from '../components/ModulePage';

export default function StatisticsPage() {
  return <ModulePage
    title="Statistics Channels"
    subtitle="Show live server stats using Discord voice/channel counters."
    section="statisticsChannels"
    activePath="/statistics"
    fields={[
      { key: 'enabled', label: 'Enabled true/false', value: 'false' },
      { key: 'categoryId', label: 'Stats Category ID' },
      { key: 'memberCountChannelId', label: 'Member Count Channel ID' },
      { key: 'botCountChannelId', label: 'Bot Count Channel ID' }
    ]}
    cards={[
      { title: 'Live Counters', text: 'Prepared for member count, bot count, and online count channels.' },
      { title: 'Server Display', text: 'Keep server numbers visible at the top of your Discord.' }
    ]}
  />;
}
