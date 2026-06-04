import ModulePage from '../components/ModulePage';

export default function LevelsPage() {
  return <ModulePage
    title="Levels"
    subtitle="Reward members for chatting and staying active in Larix Kit."
    section="levels"
    activePath="/levels"
    fields={[
      { key: 'enabled', label: 'Enabled true/false', value: 'false' },
      { key: 'levelUpChannelId', label: 'Level Up Channel ID' },
      { key: 'xpPerMessage', label: 'XP Per Message', value: '15' },
      { key: 'cooldownSeconds', label: 'XP Cooldown Seconds', value: '60' },
      { key: 'rewardRoleId', label: 'Reward Role ID' }
    ]}
    cards={[
      { title: 'XP Engine', text: 'Stores XP settings and reward role configuration in the backend.' },
      { title: 'Rewards', text: 'Ready for role rewards, level messages, and progression commands.' }
    ]}
  />;
}
