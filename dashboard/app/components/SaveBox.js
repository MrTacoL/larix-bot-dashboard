'use client';

import { useState } from 'react';

const guild = '1357145785506074825';
const base = 'http://localhost:4000';

export default function SaveBox({ title, section, fields }) {
  const initial = Object.fromEntries(fields.map(field => [field.key, field.value || '']));
  const [values, setValues] = useState(initial);
  const [note, setNote] = useState('');

  function setValue(key, value) {
    setValues(current => ({ ...current, [key]: value }));
  }

  async function save() {
    setNote('Saving...');
    const response = await fetch(`${base}/api/guilds/${guild}/settings`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [section]: values })
    });
    setNote(response.ok ? 'Saved.' : 'Save failed. Check backend console.');
  }

  return (
    <div className="card">
      <h2>{title}</h2>
      <form className="form" onSubmit={event => event.preventDefault()}>
        {fields.map(field => (
          <label key={field.key}>{field.label}<input value={values[field.key]} onChange={event => setValue(field.key, event.target.value)} placeholder={field.label} /></label>
        ))}
        <button type="button" onClick={save}>Save Settings</button>
        {note ? <p className="muted">{note}</p> : null}
      </form>
    </div>
  );
}
