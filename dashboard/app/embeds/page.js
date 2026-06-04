import DashboardFrame from '../components/DashboardFrame';
import EmbedSender from '../components/EmbedSender';

export default function EmbedsPage() {
  return (
    <DashboardFrame title="Embed Messages" subtitle="Send clean custom embeds through Larix Bot." activePath="/embeds">
      <EmbedSender />
    </DashboardFrame>
  );
}
