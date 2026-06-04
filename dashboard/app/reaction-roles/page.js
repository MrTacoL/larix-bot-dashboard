import DashboardFrame from '../components/DashboardFrame';
import SaveBox from '../components/SaveBox';

export default function ReactionRolesPage() {
  return (
    <DashboardFrame title="Reaction Roles" subtitle="Create reaction role panels for your Discord server." activePath="/reaction-roles">
      <SaveBox title="Reaction Role Settings" section="reactionRoles" fields={[
        { key: 'enabled', label: 'Enabled true/false', value: 'false' },
        { key: 'channelId', label: 'Panel Channel ID' },
        { key: 'roleId', label: 'Default Role ID' },
        { key: 'message', label: 'Panel Message', value: 'React below to get your roles.' }
      ]} />
    </DashboardFrame>
  );
}
