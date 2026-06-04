export const DEFAULT_GUILD_ID = '1357145785506074825';

export function backendBase() {
  return 'http://localhost:4000';
}

export async function saveSection(section, data) {
  const res = await fetch(`${backendBase()}/api/guilds/${DEFAULT_GUILD_ID}/settings`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ [section]: data })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Save failed');
  return json;
}

export async function postEmbed(data) {
  const res = await fetch(`${backendBase()}/api/guilds/${DEFAULT_GUILD_ID}/embed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Embed failed');
  return json;
}
