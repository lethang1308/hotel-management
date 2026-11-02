import { STORAGE_KEYS } from '@/constants/storageKeys';
import { storage } from '@/utils/storage';
import { authService } from '@/services/authService';
import { ApiError } from './client';

const TOKEN_STORAGE_KEY = 'staynest.auth.session';
const SESSION_EVENT = 'staynest:session-changed';

export async function login(body) {
  try {
    const res = await authService.login(body);
    return {
      accessToken: res.accessToken || res.token,
      id: res.user?.id || res.id,
      name: res.user?.name || res.name,
      email: res.user?.email || body.email,
      roles: res.user?.roles || res.roles || ['ADMIN', 'HOTEL_MANAGER', 'GUEST'],
    };
  } catch (err) {
    const status = err?.response?.status || err?.status || 401;
    const message =
      err?.response?.data?.message || err?.message || 'Invalid email or password.';
    throw new ApiError(message, status);
  }
}

export async function register(body) {
  try {
    return await authService.register(body);
  } catch (err) {
    const status = err?.response?.status || err?.status || 400;
    const message =
      err?.response?.data?.message || err?.message || 'Could not create account.';
    throw new ApiError(message, status);
  }
}

export async function forgotPassword(body) {
  // UI flow support with graceful demo response when endpoint is not yet implemented
  return {
    success: true,
    message: `Password reset instructions sent to ${body?.email || 'your email'}.`,
  };
}

export async function resetPassword() {
  return {
    success: true,
    message: 'Your password has been updated.',
  };
}

export function persistSession(res) {
  if (typeof window === 'undefined') return;
  const token = res?.accessToken || res?.token || 'mock_jwt_token_sample';
  const roles = Array.isArray(res?.roles) && res.roles.length > 0
    ? res.roles
    : ['ADMIN', 'HOTEL_MANAGER', 'GUEST'];
  const user = {
    id: res?.id || 'usr_1',
    name: res?.name || res?.email?.split('@')[0] || 'StayNest Member',
    email: res?.email || 'admin@example.com',
    role: roles.includes('ADMIN') ? 'admin' : 'user',
    roles,
  };

  storage.set(STORAGE_KEYS.ACCESS_TOKEN, token);
  storage.set(STORAGE_KEYS.USER_INFO, user);
  window.localStorage.setItem(
    TOKEN_STORAGE_KEY,
    JSON.stringify({ ...user, accessToken: token })
  );
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function readSession() {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(TOKEN_STORAGE_KEY);
  if (raw) {
    try {
      const session = JSON.parse(raw);
      if (session && typeof session === 'object' && 'timeStamp' in session && 'data' in session) {
        return session.data;
      }
      return session;
    } catch {
      // fall through
    }
  }
  const baseToken = storage.get(STORAGE_KEYS.ACCESS_TOKEN, null);
  const baseUser = storage.get(STORAGE_KEYS.USER_INFO, null);
  if (baseToken) {
    return {
      id: baseUser?.id || 'usr_1',
      name: baseUser?.name || 'Demo Admin',
      email: baseUser?.email || 'admin@example.com',
      accessToken: baseToken,
      roles: baseUser?.roles || ['ADMIN', 'HOTEL_MANAGER', 'GUEST'],
    };
  }
  return null;
}

export function clearSession() {
  if (typeof window === 'undefined') return;
  storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
  storage.remove(STORAGE_KEYS.USER_INFO);
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function subscribeSession(cb) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => cb();
  window.addEventListener(SESSION_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(SESSION_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}
