import ModulePage from '../components/ModulePage';

export default function InvitesPage() {
  return <ModulePage
    title="Invite Tracker"
    subtitle="Track who invites members and reward growth for Larix Kit."
    section="inviteTracker"
    activePath="/invites"
    fields={[
      { key: 'enabled', label: 'Enabled true/false', value: 'false' },
      { key: 'channelId', label: 'Invite Log Channel ID' },
      { key: 'rewardRoleId', label: 'Reward Role ID' },
      { key: 'requiredInvites', label: 'Required Invites', value: '5' }
    ]}
    cards={[
      { title: 'Invite Logs', text: 'Stores invite tracking settings for the bot backend.' },
      { title: 'Invite Rewards', text: 'Prepared for invite milestones and reward roles.' }
    ]}
  />;
}
