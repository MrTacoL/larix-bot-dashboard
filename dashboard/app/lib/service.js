export function backendBase() {
  return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
}

export async function apiGet(path) {
  const response = await fetch(`${backendBase()}${path}`);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export async function apiSend(path, method, body) {
  const response = await fetch(`${backendBase()}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
}
