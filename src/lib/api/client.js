import { STORAGE_KEYS } from '@/constants/storageKeys';
import { storage } from '@/utils/storage';

const RAW_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1';

export const API_BASE_URL = RAW_BASE.replace(/\/$/, '');

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

export function emitAuthRequired() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('staynest:auth-required'));
  }
}

function buildUrl(path, query) {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null || v === '') continue;
      if ((k === 'minPrice' || k === 'maxPrice') && v === 0) continue;
      url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

function unwrapResponse(json) {
  if (json && typeof json === 'object') {
    if ('timeStamp' in json && 'data' in json) return json.data;
    if ('success' in json && 'data' in json) return json.data;
  }
  return json;
}

export function getAuthHeaders() {
  if (typeof window === 'undefined') return {};
  const baseToken = storage.get(STORAGE_KEYS.ACCESS_TOKEN, null);
  if (baseToken) {
    return { Authorization: `Bearer ${baseToken}` };
  }
  try {
    const raw = window.localStorage.getItem('staynest.auth.session');
    if (raw) {
      const session = JSON.parse(raw);
      const token = session?.accessToken ?? session?.data?.accessToken;
      if (token) {
        return { Authorization: `Bearer ${token}` };
      }
    }
  } catch {
    // ignore
  }
  return {};
}

async function requestJson(method, path, { query, body, init } = {}) {
  const res = await fetch(buildUrl(path, query), {
    method,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...getAuthHeaders(),
      ...(init?.headers ?? {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    credentials: 'include',
    ...init,
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      message = data?.message || data?.error?.message || data?.error || message;
    } catch {
      // ignore non-json
    }
    throw new ApiError(message, res.status);
  }

  if (res.status === 204) return null;
  const text = await res.text();
  return text ? unwrapResponse(JSON.parse(text)) : null;
}

export function apiGet(path, query, init) {
  return requestJson('GET', path, { query, init });
}

export function apiPost(path, body, init) {
  return requestJson('POST', path, { body, init });
}

export function apiPatch(path, body, init) {
  return requestJson('PATCH', path, { body, init });
}

export function apiPut(path, body, init) {
  return requestJson('PUT', path, { body, init });
}

export function apiDelete(path, init) {
  return requestJson('DELETE', path, { init });
}
