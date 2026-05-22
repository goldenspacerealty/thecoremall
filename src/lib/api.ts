// In development (import.meta.env.PROD is false at compile time) → relative /api/*
// is caught by the Vite proxy and forwarded to the local backend.
// In production (PROD is true at compile time) → absolute Render backend URL.
const API_BASE = import.meta.env.PROD
  ? 'https://thecoremallbackend.onrender.com'
  : ''

function url(path: string) {
  return API_BASE ? `${API_BASE}${path}` : path
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(url(path))
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`)
  return res.json()
}

export async function apiPost<T>(path: string, body?: Record<string, unknown>): Promise<T> {
  const res = await fetch(url(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`)
  return res.json()
}

export async function apiPut<T>(path: string, body?: Record<string, unknown>): Promise<T> {
  const res = await fetch(url(path), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`PUT ${path} failed: ${res.status}`)
  return res.json()
}

export async function apiDelete<T>(path: string): Promise<T> {
  const res = await fetch(url(path), { method: 'DELETE' })
  if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`)
  return res.json()
}
