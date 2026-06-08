import ModulePage from '../components/ModulePage';
import { modules } from '../config/modules';

export default function SuggestionsPage() {
  return <ModulePage module={modules.suggestions} />;
}
