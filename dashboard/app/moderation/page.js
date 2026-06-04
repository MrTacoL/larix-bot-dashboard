import SaveBox from '../components/SaveBox.js';

export default function ModerationPage() {
  return (
    <div className="shell"><aside className="sidebar"><div className="logo">Larix<span>Bot</span></div><nav className="nav"><a href="/">Overview</a><a href="/suggestions">Suggestions</a><a href="/embeds">Embed Sender</a><a href="/reaction-roles">Reaction Roles</a><a href="/welcome">Welcome</a><a href="/moderation">Moderation</a><a href="/tickets">Tickets</a></nav></aside><main className="main"><div className="header"><div><h1>Moderation</h1><p className="muted">Save moderation settings to the backend.</p></div><div className="badge">Connected</div></div><SaveBox title="Moderation Settings" section="automod" fields={[{ key: 'antiLinks', label: 'Anti Links', value: 'false' }, { key: 'antiInvites', label: 'Anti Invites', value: 'true' }]} /></main></div>
  );
}
