export default function SuggestionsPage() {
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
            <h1>Suggestions</h1>
            <p className="muted">Set the suggestion channel, staff ping role, and embed colors.</p>
          </div>
          <div className="badge">/suggestion</div>
        </div>
        <div className="card">
          <form className="form">
            <label>Suggestion Channel ID<input placeholder="Channel ID" /></label>
            <label>Staff Role ID<input placeholder="Role ID" /></label>
            <div className="row">
              <label>Pending Color<input defaultValue="#ffcc00" /></label>
              <label>Approved Color<input defaultValue="#2ecc71" /></label>
            </div>
            <label>Denied Color<input defaultValue="#e74c3c" /></label>
            <button type="button">Save Settings</button>
          </form>
        </div>
      </main>
    </div>
  );
}
