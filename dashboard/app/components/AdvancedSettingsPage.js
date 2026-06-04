'use client';

import { useState } from 'react';

const guild = '1357145785506074825';
const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

const navGroups = [
  { title: 'Essentials', items: [['Welcome & Goodbye','👋','/welcome'],['Welcome Channel','📢','/welcome'],['Reaction Roles','💬','/reaction-roles'],['Moderator','🛡️','/moderation'],['Logging','📜','/logging'],['Levels','🏆','/levels'],['Achievements','⭐','/achievements'],['Starboards','🌟','/starboards']] },
  { title: 'Server Management', items: [['Automations','🔗','/automations'],['Custom Commands','⌘','/commands'],['Invite Tracker','👥','/invites'],['Ticketing','🎫','/tickets']] },
  { title: 'Utilities', items: [['Polls','📊','/polls'],['Embed Messages','📝','/embeds'],['Search Anything','🔎','/search'],['Help','⚙️','/help'],['Reminders','⏱️','/reminders'],['Statistics Channels','📈','/statistics'],['Temporary Channels','🔊','/temporary-channels']] }
];

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
    <div className="dashShell">
      <aside className="moduleSidebar">
        <div className="dashBrand">LARIX<span>BOT</span></div>
        {navGroups.map(group => <section className="menuGroup" key={group.title}><h3>{group.title}</h3><div className="menuItems">{group.items.map(([label, icon, href]) => <a className={href === activePath ? 'menuItem active' : 'menuItem'} href={href} key={label}><span className="sideDot" /><span className="menuIcon">{icon}</span><span>{label}</span></a>)}</div></section>)}
      </aside>
      <main className="moduleMain">
        <header className="moduleHeader">
          <div><div className="titleRow"><h1>{title}</h1><span className="betaPill">Larix</span></div><p>{subtitle}</p></div>
          <div className="activeToggle"><span>Active</span><b>ON</b></div>
        </header>
        <nav className="tabs"><a className="tab active" href="#settings">General Settings</a><a className="tab" href="#rules">Rules</a><a className="tab" href="#backend">Backend</a></nav>
        <section className="advancedGrid" id="settings">
          {groups.map(group => <div className="card settingCard" key={group.title}><h2>{group.title}</h2>{group.text ? <p className="muted">{group.text}</p> : null}<div className="advancedFields">{group.fields.map(renderField)}</div></div>)}
        </section>
        <div className="saveDock"><button type="button" onClick={save}>Save {title}</button>{note ? <span className="muted">{note}</span> : null}<span className="miniCode" id="backend">PATCH /settings → {section}</span></div>
      </main>
    </div>
  );
}
