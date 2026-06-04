import DashboardFrame from './DashboardFrame';
import SettingsPanel from './SettingsPanel';

export default function ModulePage({ module }) {
  return (
    <DashboardFrame title={module.title} description={module.description} activePath={module.path}>
      <section className="moduleStats" aria-label={`${module.title} capabilities`}>
        {module.stats.map(item => (
          <article className="statCard" key={item}>
            <span>{item}</span>
            <strong>Ready</strong>
          </article>
        ))}
      </section>
      <SettingsPanel module={module} />
    </DashboardFrame>
  );
}
