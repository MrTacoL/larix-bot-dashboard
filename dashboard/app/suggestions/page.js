import SaveBox from '../components/SaveBox.js';

export default function SuggestionsPage() {
  return (
    <div className="shell">
      <aside className="sidebar"><div className="logo">Larix<span>Bot</span></div><nav className="nav"><a href="/">Overview</a><a href="/suggestions">Suggestions</a><a href="/embeds">Embed Sender</a><a href="/reaction-roles">Reaction Roles</a><a href="/welcome">Welcome</a><a href="/moderation">Moderation</a><a href="/tickets">Tickets</a></nav></aside>
      <main className="main"><div className="header"><div><h1>Suggestions</h1><p className="muted">Save suggestion settings to the backend.</p></div><div className="badge">Connected</div></div><SaveBox title="Suggestion Settings" section="suggestions" fields={[{ key: 'channelId', label: 'Suggestion Channel ID' }, { key: 'staffRoleId', label: 'Staff Role ID' }, { key: 'pendingColor', label: 'Pending Color', value: '#ffcc00' }, { key: 'approvedColor', label: 'Approved Color', value: '#2ecc71' }, { key: 'deniedColor', label: 'Denied Color', value: '#e74c3c' }]} /></main>
    </div>
  );
}
