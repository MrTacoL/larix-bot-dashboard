import EmbedSender from '../components/EmbedSender.js';

export default function EmbedsPage() {
  return (
    <div className="shell">
      <aside className="sidebar"><div className="logo">Larix<span>Bot</span></div><nav className="nav"><a href="/">Overview</a><a href="/suggestions">Suggestions</a><a href="/embeds">Embed Sender</a><a href="/reaction-roles">Reaction Roles</a><a href="/welcome">Welcome</a><a href="/moderation">Moderation</a><a href="/tickets">Tickets</a></nav></aside>
      <main className="main"><div className="header"><div><h1>Embed Sender</h1><p className="muted">Send embeds through the backend using your bot.</p></div><div className="badge">Connected</div></div><EmbedSender /></main>
    </div>
  );
}
