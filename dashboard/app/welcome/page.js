import ModulePage from '../components/ModulePage';
import { modules } from '../config/modules';

export default function WelcomePage() {
  return <ModulePage module={modules.welcome} />;
}
