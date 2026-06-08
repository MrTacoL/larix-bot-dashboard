'use client';

import { useState } from 'react';
import { backendBase } from '../lib/service';
import { guildId } from '../config/modules';

export default function EmbedSender() {
  const [values, setValues] = useState({ channelId: '', title: 'Larix Network', description: 'Write your announcement here.', color: '#ff3131', imageUrl: '', thumbnailUrl: '', footer: 'Larix Bot' });
  const [note, setNote] = useState('');

  function setValue(key, value) {
    setValues(current => ({ ...current, [key]: value }));
  }

  async function send() {
    setNote('Sending...');
    try {
      const response = await fetch(`${backendBase()}/api/guilds/${guildId}/embed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const data = await response.json().catch(() => ({}));
      setNote(response.ok ? 'Embed sent.' : data.error || 'Send failed. Check channel ID and backend console.');
    } catch (error) {
      setNote(error.message);
    }
  }

  return (
    <section className="embedSurface">
      <div className="surfaceHeader">
        <div>
          <h2>Embed Sender</h2>
          <p>Send red/blue Larix-style embed announcements directly through the bot.</p>
        </div>
        <button type="button" onClick={send}>Send Embed</button>
      </div>
      <div className="embedGrid">
        <form className="fieldGrid" onSubmit={event => event.preventDefault()}>
          <label className="field"><span>Channel ID</span><input value={values.channelId} onChange={event => setValue('channelId', event.target.value)} /></label>
          <label className="field"><span>Color</span><input value={values.color} onChange={event => setValue('color', event.target.value)} /></label>
          <label className="field wide"><span>Title</span><input value={values.title} onChange={event => setValue('title', event.target.value)} /></label>
          <label className="field wide"><span>Description</span><textarea value={values.description} onChange={event => setValue('description', event.target.value)} /></label>
          <label className="field"><span>Image URL</span><input value={values.imageUrl} onChange={event => setValue('imageUrl', event.target.value)} /></label>
          <label className="field"><span>Thumbnail URL</span><input value={values.thumbnailUrl} onChange={event => setValue('thumbnailUrl', event.target.value)} /></label>
          <label className="field wide"><span>Footer</span><input value={values.footer} onChange={event => setValue('footer', event.target.value)} /></label>
        </form>
        <div className="previewBox" style={{ borderLeftColor: values.color || '#ff3131' }}>
          <h3>{values.title}</h3>
          <p>{values.description}</p>
          {values.imageUrl ? <small className="muted">Image: {values.imageUrl}</small> : null}
          {values.footer ? <small className="muted"><br />{values.footer}</small> : null}
        </div>
      </div>
      {note ? <div className="formNote">{note}</div> : null}
    </section>
  );
}
