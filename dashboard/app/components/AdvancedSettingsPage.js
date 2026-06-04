'use client';

import { useState } from 'react';
import DashboardFrame from './DashboardFrame';

const guild = '1357145785506074825';
const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export default function AdvancedSettingsPage({ title, subtitle, section, activePath, groups }) {
  const initial = {};
  groups.forEach(group => group.fields.forEach(field => { initial[field.key] = field.value ?? (field.type === 'checkbox' ? false : ''); }));
  const [values, setValues] = useState(initial);
  const [note, setNote] = useState('');

  function change(key, value) {
    setValues(current => ({ ...current, [key]: value }));
  }

  function renderField(field) {
    if (field.type === 'checkbox') {
      return <label className="checkField" key={field.key}><input type="checkbox" checked={Boolean(values[field.key])} onChange={event => change(field.key, event.target.checked)} /><span>{field.label}</span></label>;
    }
    if (field.type === 'select') {
      return <label key={field.key}>{field.label}<select value={values[field.key]} onChange={event => change(field.key, event.target.value)}>{(field.options || []).map(option => <option key={option} value={option}>{option}</option>)}</select></label>;
    }
    if (field.type === 'textarea') {
      return <label key={field.key}>{field.label}<textarea value={values[field.key]} onChange={event => change(field.key, event.target.value)} placeholder={field.placeholder || field.label} /></label>;
    }
    return <label key={field.key}>{field.label}<input value={values[field.key]} onChange={event => change(field.key, event.target.value)} placeholder={field.placeholder || field.label} /></label>;
  }

  async function save() {
    setNote('Saving...');
    const payload = { ...values };
    Object.keys(payload).forEach(key => {
      if (typeof payload[key] === 'string' && payload[key].includes('\n')) payload[key] = payload[key].split('\n').map(item => item.trim()).filter(Boolean);
    });
    try {
      const response = await fetch(`${base}/api/guilds/${guild}/settings`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [section]: payload })
      });
      const data = await response.json().catch(() => ({}));
      setNote(response.ok ? 'Saved.' : data.error || 'Save failed.');
    } catch (error) {
      setNote(error.message);
    }
  }

  return (
    <DashboardFrame title={title} subtitle={subtitle} activePath={activePath}>
      <div className="advancedGrid" id="settings">
        {groups.map(group => <div className="card settingCard" key={group.title}><h2>{group.title}</h2>{group.text ? <p className="muted">{group.text}</p> : null}<div className="advancedFields">{group.fields.map(renderField)}</div></div>)}
      </div>
      <div className="saveDock"><button type="button" onClick={save}>Save {title}</button>{note ? <span className="muted">{note}</span> : null}<span className="miniCode" id="backend">PATCH /settings → {section}</span></div>
    </DashboardFrame>
  );
}
