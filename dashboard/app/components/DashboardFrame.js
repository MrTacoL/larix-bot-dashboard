const navGroups = [
  {
    title: 'Essentials',
    items: [
      ['Welcome & Goodbye','👋','/welcome'],
      ['Welcome Channel','📢','/welcome-channel'],
      ['Reaction Roles','💬','/reaction-roles'],
      ['Moderator','🛡️','/moderation'],
      ['Logging','📜','/logging'],
      ['Levels','🏆','/levels'],
      ['Achievements','⭐','/achievements'],
      ['Starboards','🌟','/starboards']
    ]
  },
  {
    title: 'Server Management',
    items: [
      ['Automations','🔗','/automations'],
      ['Custom Commands','⌘','/commands'],
      ['Invite Tracker','👥','/invites'],
      ['Ticketing','🎫','/tickets']
    ]
  },
  {
    title: 'Utilities',
    items: [
      ['Polls','📊','/polls'],
      ['Embed Messages','📝','/embeds'],
      ['Search Anything','🔎','/search'],
      ['Help','⚙️','/help'],
      ['Reminders','⏱️','/reminders'],
      ['Statistics Channels','📈','/statistics'],
      ['Temporary Channels','🔊','/temporary-channels']
    ]
  }
];

export default function DashboardFrame({ title, subtitle, activePath, badge = 'Connected', children }) {
  return (
    <div className="dashShell">
      <aside className="moduleSidebar">
        <a className="dashBrand" href="/">LARIX<span>BOT</span></a>
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
            <div className="titleRow"><h1>{title}</h1><span className="betaPill">Larix</span></div>
            <p>{subtitle}</p>
          </div>
          <div className="activeToggle"><span>{badge}</span><b>ON</b></div>
        </header>
        <nav className="tabs">
          <a className="tab active" href="#settings">Settings</a>
          <a className="tab" href="#preview">Preview</a>
          <a className="tab" href="#backend">Backend</a>
        </nav>
        <section id="settings" className="moduleGrid singleModule">
          {children}
        </section>
      </main>
    </div>
  );
}
