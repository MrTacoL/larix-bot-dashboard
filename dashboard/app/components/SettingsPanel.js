'use client';

import { useEffect, useMemo, useState } from 'react';
import { RotateCcw, Save } from 'lucide-react';
import { backendBase } from '../lib/service';
import { guildId } from '../config/modules';

function getPath(source, path) {
  return path.split('.').reduce((value, key) => value?.[key], source);
}

function setPath(target, path, value) {
  const keys = path.split('.');
  let cursor = target;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) cursor[key] = value;
    else {
      cursor[key] = cursor[key] || {};
      cursor = cursor[key];
    }
  });
}

function inputValue(field, value) {
  if (field.type === 'list') return Array.isArray(value) ? value.join('\n') : value || '';
  if (field.type === 'switch') return Boolean(value);
  if (value !== undefined) return value;
  if (field.defaultValue !== undefined) return field.type === 'list' && Array.isArray(field.defaultValue) ? field.defaultValue.join('\n') : field.defaultValue;
  if (field.type === 'number') return 0;
  return '';
}

function outputValue(field, value) {
  if (field.type === 'list') return String(value || '').split(/\r?\n|,/).map(item => item.trim()).filter(Boolean);
  if (field.type === 'number') return Number(value) || 0;
  if (field.type === 'switch') return Boolean(value);
  return value ?? '';
}

export default function SettingsPanel({ module }) {
  const defaults = useMemo(() => Object.fromEntries(module.fields.map(field => [field.name, inputValue(field, field.defaultValue)])), [module]);
  const [values, setValues] = useState(defaults);
  const [state, setState] = useState('idle');
  const [message, setMessage] = useState('');

  async function loadSettings() {
    setState('loading');
    setMessage('');
    try {
      const response = await fetch(`${backendBase()}/api/guilds/${guildId}/settings`);
      const settings = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(settings.error || 'Could not load settings');
      const section = settings[module.section] || {};
      setValues(Object.fromEntries(module.fields.map(field => {
        const value = getPath(section, field.name);
        return [field.name, inputValue(field, value === undefined ? field.defaultValue : value)];
      })));
      setState('idle');
    } catch (error) {
      setState('error');
      setMessage(error.message);
    }
  }

  useEffect(() => {
    loadSettings();
  }, [module.section]);

  function update(name, value) {
    setValues(current => ({ ...current, [name]: value }));
  }

  async function saveSettings(event) {
    event.preventDefault();
    setState('saving');
    setMessage('');
    const sectionPayload = {};
    for (const field of module.fields) setPath(sectionPayload, field.name, outputValue(field, values[field.name]));

    try {
      const response = await fetch(`${backendBase()}/api/guilds/${guildId}/settings`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [module.section]: sectionPayload })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Save failed');
      setState('saved');
      setMessage('Saved');
    } catch (error) {
      setState('error');
      setMessage(error.message);
    }
  }

  function renderField(field) {
    if (field.type === 'switch') {
      return (
        <label className="switchField" key={field.name}>
          <span>{field.label}</span>
          <input checked={Boolean(values[field.name])} onChange={event => update(field.name, event.target.checked)} type="checkbox" />
        </label>
      );
    }

    if (field.type === 'select') {
      return (
        <label className="field" key={field.name}>
          <span>{field.label}</span>
          <select value={values[field.name] ?? ''} onChange={event => update(field.name, event.target.value)}>
            {(field.options || []).map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      );
    }

    if (field.type === 'textarea' || field.type === 'list') {
      return (
        <label className="field wide" key={field.name}>
          <span>{field.label}</span>
          <textarea value={values[field.name] ?? ''} onChange={event => update(field.name, event.target.value)} />
        </label>
      );
    }

    return (
      <label className="field" key={field.name}>
        <span>{field.label}</span>
        <input type={field.type === 'number' ? 'number' : 'text'} value={values[field.name] ?? ''} onChange={event => update(field.name, event.target.value)} />
      </label>
    );
  }

  return (
    <form className="settingsSurface" onSubmit={saveSettings}>
      <div className="surfaceHeader">
        <div>
          <h2>{module.title} Settings</h2>
          <p>{module.description}</p>
        </div>
        <div className="buttonRow">
          <button className="secondaryButton" type="button" onClick={loadSettings}><RotateCcw size={16} /><span>Reload</span></button>
          <button type="submit" disabled={state === 'saving'}><Save size={16} /><span>{state === 'saving' ? 'Saving' : 'Save'}</span></button>
        </div>
      </div>
      <div className="fieldGrid">{module.fields.map(renderField)}</div>
      <div className={state === 'error' ? 'formNote error' : 'formNote'}>{message || (state === 'loading' ? 'Loading settings' : `Guild ${guildId}`)}</div>
    </form>
  );
}
