const menuGroups = [
  {
    title: 'Essentials',
    items: [
      ['Welcome & Goodbye', '👋', '/welcome'],
      ['Welcome Channel', '📢', '/welcome'],
      ['Reaction Roles', '💬', '/reaction-roles'],
      ['Moderator', '🛡️', '/moderation'],
      ['Levels', '🏆', '/levels'],
      ['Achievements', '⭐', '/'],
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

const achievementCards = [
  ['King of Spam', 'Send messages', ['Bronze 20', 'Silver 100', 'Gold 500', 'Diamond 1,000']],
  ['Reaction Master', 'Add reactions to messages', ['Bronze 50', 'Silver 250', 'Gold 1,000', 'Diamond 2,000']],
  ['Stay Awhile and Listen', 'Spend minutes in voice channels', ['Bronze 10 min', 'Silver 60 min', 'Gold 300 min', 'Diamond 600 min']],
  ['Thread Creator', 'Create threads', ['Bronze 5', 'Silver 25', 'Gold 100', 'Diamond 200']]
];

export default function Home() {
  return (
    <div className="dashShell">
      <aside className="moduleSidebar">
        <div className="dashBrand">LARIX<span>BOT</span></div>
        {menuGroups.map(group => (
          <section className="menuGroup" key={group.title}>
            <h3>{group.title}</h3>
            <div className="menuItems">
              {group.items.map(([label, icon, href]) => (
                <a className={label === 'Achievements' ? 'menuItem active' : 'menuItem'} href={href} key={label}>
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
              <h1>Achievements</h1>
              <span className="betaPill">Larix</span>
            </div>
            <p>Let your members hunt achievements, earn rewards, and stay active in Larix Kit.</p>
          </div>
          <div className="activeToggle"><span>Active</span><b>ON</b></div>
        </header>

        <nav className="tabs">
          <a className="tab active" href="#achievements">Achievements</a>
          <a className="tab" href="#config">Configuration</a>
          <a className="tab" href="#commands">Commands</a>
        </nav>

        <section className="achievementTypes">
          <div className="typeCard">
            <div className="cubeIcon mutedCube">⬡</div>
            <h2>Single achievement</h2>
            <p>A one-time achievement with no tiers.</p>
          </div>
          <div className="typeCard selected">
            <div className="tierCubes">⬡ ⬡ ⬡ ⬡</div>
            <h2>Tiered achievement</h2>
            <p>Includes tiers that members unlock when they make progress.</p>
          </div>
        </section>

        <section className="achievementToolbar">
          <h2>Achievements</h2>
          <div className="searchBox">🔎 Search for an achievement</div>
        </section>

        <section className="achievementGrid">
          {achievementCards.map(([title, subtitle, tiers]) => (
            <article className="achievementCard" key={title}>
              <div className="cardTop">
                <div className="tierBadge">⬡⬡⬡⬡</div>
                <span className="miniToggle" />
              </div>
              <div className="cardTitleRow">
                <div>
                  <h3>{title}</h3>
                  <p>{subtitle}</p>
                </div>
                <span className="arrow">›</span>
              </div>
              <div className="tierList">
                {tiers.map(tier => {
                  const [name, value] = tier.split(' ');
                  return <div key={tier}><span>{name}</span><span>{value}</span></div>;
                })}
              </div>
              <div className="progressLine"><span /></div>
              <div className="serverProgress"><span>Server progress</span><span>0%</span></div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
