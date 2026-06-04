import DashboardFrame from '../components/DashboardFrame';
import SaveBox from '../components/SaveBox';

export default function TicketsPage() {
  return (
    <DashboardFrame title="Ticketing" subtitle="Configure ticket panels, categories, staff roles, and transcripts." activePath="/tickets">
      <SaveBox title="Ticket Settings" section="tickets" fields={[
        { key: 'enabled', label: 'Enabled true/false', value: 'false' },
        { key: 'categoryId', label: 'Ticket Category ID' },
        { key: 'staffRoleId', label: 'Staff Role ID' },
        { key: 'transcriptChannelId', label: 'Transcript Channel ID' },
        { key: 'panelChannelId', label: 'Panel Channel ID' },
        { key: 'panelMessage', label: 'Panel Message', value: 'Open a support ticket.' }
      ]} />
    </DashboardFrame>
  );
}
