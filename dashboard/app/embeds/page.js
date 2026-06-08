import DashboardFrame from '../components/DashboardFrame';
import EmbedSender from '../components/EmbedSender';

export default function EmbedsPage() {
  return (
    <DashboardFrame title="Embed Messages" description="Send clean custom Larix embeds through the Discord bot." activePath="/embeds">
      <EmbedSender />
    </DashboardFrame>
  );
}
