import DashboardFrame from '../components/DashboardFrame';
import SaveBox from '../components/SaveBox';

export default function WelcomePage() {
  return (
    <DashboardFrame title="Welcome & Goodbye" subtitle="Set welcome messages, goodbye messages, images, channels, and auto roles." activePath="/welcome">
      <SaveBox title="Welcome Settings" section="welcome" fields={[
        { key: 'enabled', label: 'Enabled true/false', value: 'false' },
        { key: 'channelId', label: 'Welcome Channel ID' },
        { key: 'goodbyeChannelId', label: 'Goodbye Channel ID' },
        { key: 'message', label: 'Welcome Message', value: 'Welcome {user} to {server}!' },
        { key: 'goodbyeMessage', label: 'Goodbye Message', value: 'Goodbye {user}.' },
        { key: 'imageUrl', label: 'Welcome Image URL' },
        { key: 'autoRoleId', label: 'Auto Role ID' }
      ]} />
    </DashboardFrame>
  );
}
