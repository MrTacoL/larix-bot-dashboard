export default function EmbedsPage() {
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
            <h1>Embed Sender</h1>
            <p className="muted">Create custom Discord embeds with images and thumbnails.</p>
          </div>
          <div className="badge">/embed</div>
        </div>
        <div className="row">
          <div className="card">
            <form className="form">
              <label>Channel ID<input placeholder="Channel ID" /></label>
              <label>Title<input defaultValue="Larix Network" /></label>
              <label>Description<textarea defaultValue="Write your announcement here." /></label>
              <label>Color<input defaultValue="#ff3131" /></label>
              <label>Image URL<input placeholder="https://..." /></label>
              <label>Thumbnail URL<input placeholder="https://..." /></label>
              <button type="button">Send Embed</button>
            </form>
          </div>
          <div className="card">
            <h2>Preview</h2>
            <div className="preview">
              <h3>Larix Network</h3>
              <p className="muted">Write your announcement here.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
