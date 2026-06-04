import SaveBox from '../components/SaveBox.js';

export default function WelcomePage() {
  return (
    <div className="shell"><aside className="sidebar"><div className="logo">Larix<span>Bot</span></div><nav className="nav"><a href="/">Overview</a><a href="/suggestions">Suggestions</a><a href="/embeds">Embed Sender</a><a href="/reaction-roles">Reaction Roles</a><a href="/welcome">Welcome</a><a href="/moderation">Moderation</a><a href="/tickets">Tickets</a></nav></aside><main className="main"><div className="header"><div><h1>Welcome</h1><p className="muted">Save welcome settings to the backend.</p></div><div className="badge">Connected</div></div><SaveBox title="Welcome Settings" section="welcome" fields={[{ key: 'channelId', label: 'Welcome Channel ID' }, { key: 'message', label: 'Welcome Message', value: 'Welcome {user} to {server}!' }, { key: 'imageUrl', label: 'Welcome Image URL' }, { key: 'autoRoleId', label: 'Auto Role ID' }]} /></main></div>
  );
}
