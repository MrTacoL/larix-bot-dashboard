import ModulePage from '../components/ModulePage';
import { modules } from '../config/modules';

export default function HelpPage() {
  return <ModulePage module={modules.help} />;
}
