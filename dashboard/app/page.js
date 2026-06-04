const pages = [
  ['Suggestions', 'Choose channel, staff role, colors, and review style.'],
  ['Embed Sender', 'Build embeds with images, thumbnails, colors, and previews.'],
  ['Reaction Roles', 'Create role panels like MEE6.'],
  ['Welcome', 'Set welcome channel, message, image, and auto role.'],
  ['Moderation', 'Logs, automod, blocked words, and punishments.'],
  ['Tickets', 'Ticket panels, staff role, category, and transcript channel.']
];

export default function Home() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="logo">Larix<span>Bot</span></div>
        <nav className="nav">
          <a href="/">Overview</a>
          <a href="/suggestions">Suggestions</a>
          <a href="/embeds">Embed Sender</a>
          <a href="/reaction-roles">Reaction Roles</a>
          <a href="/welcome">Welcome</a>
          <a href="/moderation">Moderation</a>
          <a href="/tickets">Tickets</a>
        </nav>
      </aside>
      <main className="main">
        <div className="header">
          <div>
            <h1>Larix Bot Dashboard</h1>
            <p className="muted">MEE6-style dashboard starter for your Discord bot.</p>
          </div>
          <div className="badge">Backend ready</div>
        </div>
        <section className="grid">
          {pages.map(([title, text]) => (
            <div className="card" key={title}>
              <h2>{title}</h2>
              <p className="muted">{text}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
