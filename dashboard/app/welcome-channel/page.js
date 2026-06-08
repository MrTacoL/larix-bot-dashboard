import ModulePage from '../components/ModulePage';
import { modules } from '../config/modules';

export default function WelcomeChannelPage() {
  return <ModulePage module={modules.welcome} />;
}
