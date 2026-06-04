const features = [
  ['Custom JSON UI', 'Build clean panels, controls, and server menus with a Larix-style dashboard flow.'],
  ['Discord Tools', 'Embeds, suggestions, tickets, welcome messages, and moderation from one place.'],
  ['MCBE Connected', 'Made for Larix Kit and the Minecraft Bedrock community.'],
  ['Staff Control', 'Simple tools for staff teams, logs, permissions, and community systems.']
];

const pages = [
  ['Suggestions', '/suggestions', 'Setup suggestion channels, staff review, approvals, and colors.'],
  ['Embed Sender', '/embeds', 'Send clean custom embeds straight to Discord channels.'],
  ['Welcome', '/welcome', 'Control welcome messages, images, channels, and auto roles.'],
  ['Moderation', '/moderation', 'Configure automod, blocked words, anti-link, and anti-invite tools.'],
  ['Tickets', '/tickets', 'Create ticket panels with staff roles and transcript channels.'],
  ['Reaction Roles', '/reaction-roles', 'Build role panels for your Discord community.']
];

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="heroGlow" />
        <nav className="topbar">
          <div className="brand">Larix<span>Kit</span></div>
          <div className="toplinks">
            <a href="/suggestions">Dashboard</a>
            <a href="/embeds">Embeds</a>
            <a href="/tickets">Tickets</a>
          </div>
        </nav>

        <div className="heroGrid">
          <div className="heroText">
            <p className="eyebrow">Discord Bot + MCBE Dashboard</p>
            <h1>The control center for Larix Kit.</h1>
            <p className="heroSub">
              A custom programmed dashboard for Larix Network, built for embeds,
              suggestions, tickets, moderation, welcome systems, staff tools, and
              Minecraft Bedrock community management.
            </p>
            <div className="heroActions">
              <a className="primaryBtn" href="/suggestions">Open Dashboard</a>
              <a className="secondaryBtn" href="/embeds">Create Embed</a>
            </div>
          </div>

          <div className="heroPanel">
            <div className="panelHeader">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="panelTitle">larix.config.json</span>
            </div>
            <pre>{`{
  "programmed_by": "MrTacoL",
  "network": "Larix Kit",
  "systems": [
    "Custom JSON UI",
    "Discord Dashboard",
    "Embeds",
    "Suggestions",
    "Tickets",
    "Moderation"
  ],
  "status": "online"
}`}</pre>
          </div>
        </div>
      </section>

      <section className="featureStrip">
        {features.map(([title, text]) => (
          <div className="feature" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </section>

      <section className="dashboardPreview">
        <div className="sectionTitle">
          <p className="eyebrow">Dashboard Modules</p>
          <h2>Manage everything from one clean panel.</h2>
        </div>
        <div className="grid">
          {pages.map(([title, href, text]) => (
            <a className="card" href={href} key={title}>
              <h2>{title}</h2>
              <p className="muted">{text}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
