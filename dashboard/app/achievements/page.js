import ModulePage from '../components/ModulePage';

export default function AchievementsPage() {
  return <ModulePage
    title="Achievements"
    subtitle="Let members unlock goals for messages, reactions, voice time, and events."
    section="achievements"
    activePath="/achievements"
    fields={[
      { key: 'enabled', label: 'Enabled true/false', value: 'false' },
      { key: 'channelId', label: 'Announcement Channel ID' },
      { key: 'roleId', label: 'Reward Role ID' },
      { key: 'message', label: 'Unlock Message', value: '{user} unlocked an achievement!' }
    ]}
    cards={[
      { title: 'Tiered Goals', text: 'Use this module for bronze, silver, gold, and diamond style goals.' },
      { title: 'Rewards', text: 'Prepared for role rewards, announcements, and profile progress.' }
    ]}
  />;
}
