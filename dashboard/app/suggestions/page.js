import DashboardFrame from '../components/DashboardFrame';
import SaveBox from '../components/SaveBox';

export default function SuggestionsPage() {
  return (
    <DashboardFrame title="Suggestions" subtitle="Choose suggestion channels, staff roles, review colors, and approval flow." activePath="/suggestions">
      <SaveBox title="Suggestion Settings" section="suggestions" fields={[
        { key: 'enabled', label: 'Enabled true/false', value: 'true' },
        { key: 'channelId', label: 'Suggestion Channel ID' },
        { key: 'staffRoleId', label: 'Staff Role ID' },
        { key: 'pendingColor', label: 'Pending Color', value: '#ffcc00' },
        { key: 'approvedColor', label: 'Approved Color', value: '#2ecc71' },
        { key: 'deniedColor', label: 'Denied Color', value: '#e74c3c' }
      ]} />
    </DashboardFrame>
  );
}
