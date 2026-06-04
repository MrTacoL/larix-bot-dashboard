import ModulePage from '../components/ModulePage';
import { modules } from '../config/modules';

export default function CommandsPage() {
  return <ModulePage module={modules.customCommands} />;
}
