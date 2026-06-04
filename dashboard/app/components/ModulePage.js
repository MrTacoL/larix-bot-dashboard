import DashboardFrame from './DashboardFrame';
import SaveBox from './SaveBox';

export default function ModulePage({ title, subtitle, section, fields, activePath, cards = [] }) {
  return (
    <DashboardFrame title={title} subtitle={subtitle} activePath={activePath}>
      <SaveBox title={`${title} Settings`} section={section} fields={fields} />
      <div className="card" id="backend">
        <h2>Module Backend</h2>
        <p className="muted">This panel saves directly to MongoDB through the Larix backend API.</p>
        <div className="miniCode">PATCH /api/guilds/:guildId/settings<br />section: {section}</div>
      </div>
      {cards.map(card => (
        <div className="card" id="preview" key={card.title}>
          <h2>{card.title}</h2>
          <p className="muted">{card.text}</p>
        </div>
      ))}
    </DashboardFrame>
  );
}
