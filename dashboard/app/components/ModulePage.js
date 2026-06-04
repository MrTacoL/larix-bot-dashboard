import SaveBox from './SaveBox';

const navGroups = [
  {
    title: 'Essentials',
    items: [
      ['Welcome & Goodbye', '👋', '/welcome'],
      ['Welcome Channel', '📢', '/welcome'],
      ['Reaction Roles', '💬', '/reaction-roles'],
      ['Moderator', '🛡️', '/moderation'],
      ['Levels', '🏆', '/levels'],
      ['Achievements', '⭐', '/achievements'],
      ['Starboards', '🌟', '/starboards']
    ]
  },
  {
    title: 'Server Management',
    items: [
      ['Automations', '🔗', '/automations'],
      ['Custom Commands', '⌘', '/commands'],
      ['Invite Tracker', '👥', '/invites'],
      ['Ticketing', '🎫', '/tickets']
    ]
  },
  {
    title: 'Utilities',
    items: [
      ['Polls', '📊', '/polls'],
      ['Embed Messages', '📝', '/embeds'],
      ['Search Anything', '🔎', '/search'],
      ['Help', '⚙️', '/help'],
      ['Reminders', '⏱️', '/reminders'],
      ['Statistics Channels', '📈', '/statistics'],
      ['Temporary Channels', '🔊', '/temporary-channels']
    ]
  }
];

export default function ModulePage({ title, subtitle, section, fields, activePath, cards = [] }) {
  return (
    <div className="dashShell">
      <aside className="moduleSidebar">
        <div className="dashBrand">LARIX<span>BOT</span></div>
        {navGroups.map(group => (
          <section className="menuGroup" key={group.title}>
            <h3>{group.title}</h3>
            <div className="menuItems">
              {group.items.map(([label, icon, href]) => (
                <a className={href === activePath ? 'menuItem active' : 'menuItem'} href={href} key={label}>
                  <span className="sideDot" />
                  <span className="menuIcon">{icon}</span>
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </aside>
      <main className="moduleMain">
        <header className="moduleHeader">
          <div>
            <div className="titleRow">
              <h1>{title}</h1>
              <span className="betaPill">Larix</span>
            </div>
            <p>{subtitle}</p>
          </div>
          <div className="activeToggle"><span>Active</span><b>ON</b></div>
        </header>

        <nav className="tabs">
          <a className="tab active" href="#settings">Settings</a>
          <a className="tab" href="#preview">Preview</a>
          <a className="tab" href="#commands">Commands</a>
        </nav>

        <section className="moduleGrid" id="settings">
          <SaveBox title={`${title} Settings`} section={section} fields={fields} />
          <div className="card">
            <h2>Module Backend</h2>
            <p className="muted">This panel saves directly to MongoDB through the Larix backend API.</p>
            <div className="miniCode">PATCH /api/guilds/:guildId/settings<br />section: {section}</div>
          </div>
        </section>

        {cards.length ? (
          <section className="grid moduleCards" id="preview">
            {cards.map(card => (
              <div className="card" key={card.title}>
                <h2>{card.title}</h2>
                <p className="muted">{card.text}</p>
              </div>
            ))}
          </section>
        ) : null}
      </main>
    </div>
  );
}
