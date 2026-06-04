'use client';

import { useState } from 'react';

const guild = '1357145785506074825';
const base = 'http://localhost:4000';

export default function EmbedSender() {
  const [values, setValues] = useState({ channelId: '', title: 'Larix Network', description: 'Write your announcement here.', color: '#ff3131', imageUrl: '', thumbnailUrl: '', footer: '' });
  const [note, setNote] = useState('');

  function setValue(key, value) {
    setValues(current => ({ ...current, [key]: value }));
  }

  async function send() {
    setNote('Sending...');
    const response = await fetch(`${base}/api/guilds/${guild}/embed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });
    setNote(response.ok ? 'Embed sent.' : 'Send failed. Check channel ID and backend console.');
  }

  return (
    <div className="row">
      <div className="card">
        <form className="form" onSubmit={event => event.preventDefault()}>
          <label>Channel ID<input value={values.channelId} onChange={event => setValue('channelId', event.target.value)} /></label>
          <label>Title<input value={values.title} onChange={event => setValue('title', event.target.value)} /></label>
          <label>Description<textarea value={values.description} onChange={event => setValue('description', event.target.value)} /></label>
          <label>Color<input value={values.color} onChange={event => setValue('color', event.target.value)} /></label>
          <label>Image URL<input value={values.imageUrl} onChange={event => setValue('imageUrl', event.target.value)} /></label>
          <label>Thumbnail URL<input value={values.thumbnailUrl} onChange={event => setValue('thumbnailUrl', event.target.value)} /></label>
          <label>Footer<input value={values.footer} onChange={event => setValue('footer', event.target.value)} /></label>
          <button type="button" onClick={send}>Send Embed</button>
          {note ? <p className="muted">{note}</p> : null}
        </form>
      </div>
      <div className="card">
        <h2>Preview</h2>
        <div className="preview"><h3>{values.title}</h3><p className="muted">{values.description}</p>{values.imageUrl ? <p className="muted">Image: {values.imageUrl}</p> : null}</div>
      </div>
    </div>
  );
}
