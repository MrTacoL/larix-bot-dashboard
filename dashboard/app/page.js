import DashboardFrame from './components/DashboardFrame';
import { moduleList } from './config/modules';

export default function Home() {
  return (
    <DashboardFrame
      title="Larix Bot Dashboard"
      description="Control Larix Network automod, levels, tickets, logging, embeds, and utility modules from one panel."
      activePath="/"
      badge="Connected"
    >
      <section className="overviewGrid">
        <article className="overviewTile"><span>Modules</span><strong>{moduleList.length}</strong></article>
        <article className="overviewTile"><span>Theme</span><strong>Larix Red / Blue</strong></article>
        <article className="overviewTile"><span>Backend</span><strong>Railway</strong></article>
        <article className="overviewTile"><span>Dashboard</span><strong>Vercel</strong></article>
      </section>

      <section className="commandSurface">
        <div>
          <h2>Bot Command Center</h2>
          <p>Slash commands, levels, automod, logging, tickets, and community tools are wired through the bot and saved to MongoDB.</p>
        </div>
        <div className="runtimeList">
          <span>Railway backend API</span>
          <span>Discord.js bot service</span>
          <span>MongoDB settings storage</span>
        </div>
      </section>

      <section className="moduleIndex">
        {moduleList.map(module => (
          <a className="moduleLink" href={module.path} key={module.path}>
            <span>{module.title}</span>
            <small>{module.description}</small>
          </a>
        ))}
      </section>
    </DashboardFrame>
  );
}
