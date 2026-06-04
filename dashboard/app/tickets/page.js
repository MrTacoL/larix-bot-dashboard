import SaveBox from '../components/SaveBox.js';

export default function TicketsPage() {
  return (
    <div className="shell"><aside className="sidebar"><div className="logo">Larix<span>Bot</span></div><nav className="nav"><a href="/">Overview</a><a href="/suggestions">Suggestions</a><a href="/embeds">Embed Sender</a><a href="/reaction-roles">Reaction Roles</a><a href="/welcome">Welcome</a><a href="/moderation">Moderation</a><a href="/tickets">Tickets</a></nav></aside><main className="main"><div className="header"><div><h1>Tickets</h1><p className="muted">Save ticket settings to the backend.</p></div><div className="badge">Connected</div></div><SaveBox title="Ticket Settings" section="tickets" fields={[{ key: 'categoryId', label: 'Ticket Category ID' }, { key: 'staffRoleId', label: 'Staff Role ID' }, { key: 'transcriptChannelId', label: 'Transcript Channel ID' }]} /></main></div>
  );
}
