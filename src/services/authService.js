import api from './api';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { storage } from '@/utils/storage';

const STAYNEST_SESSION_KEY = 'staynest.auth.session';
const SESSION_EVENT = 'staynest:session-changed';

function normalizeRoles(rawRoles, singleRole) {
  const list = Array.isArray(rawRoles) ? rawRoles : singleRole ? [singleRole] : [];
  const normalized = new Set();
  for (const r of list) {
    const clean = String(r).toUpperCase().replace(/^ROLE_/, '');
    normalized.add(clean);
    if (clean === 'ADMIN') {
      normalized.add('HOTEL_MANAGER');
      normalized.add('GUEST');
    }
    if (clean === 'USER') {
      normalized.add('GUEST');
    }
  }
  if (normalized.size === 0) {
    normalized.add('ADMIN');
    normalized.add('HOTEL_MANAGER');
    normalized.add('GUEST');
  }
  return [...normalized];
}

export const authService = {
  /**
   * Đăng nhập người dùng
   * @param {{ email: string, password: string }} credentials
   */
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const payload = response?.data ?? response;
      const token = payload?.accessToken || payload?.token || response?.token;
      const rawUser = payload?.user || payload;
      const roles = normalizeRoles(rawUser?.roles ?? payload?.roles, rawUser?.role);
      const user = {
        id: rawUser?.id || 'usr_1',
        name: rawUser?.name || rawUser?.fullName || credentials.email?.split('@')[0] || 'StayNest Guest',
        email: rawUser?.email || credentials.email,
        role: roles.includes('ADMIN') ? 'admin' : 'user',
        roles,
      };

      if (token) {
        storage.set(STORAGE_KEYS.ACCESS_TOKEN, token);
        storage.set(STORAGE_KEYS.USER_INFO, user);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(
            STAYNEST_SESSION_KEY,
            JSON.stringify({ ...user, accessToken: token })
          );
          window.dispatchEvent(new Event(SESSION_EVENT));
        }
      }
      return { token, accessToken: token, user, ...user };
    } catch (err) {
      // Nếu backend thực sự trả lỗi xác thực 401/403 thì ném lỗi rõ ràng;
      // nếu backend chưa chạy / lỗi kết nối hoặc 404 thì dùng Mock fallback của Base
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        throw err;
      }

      const mockToken = 'mock_jwt_token_sample';
      const displayName =
        credentials.email === 'admin@example.com'
          ? 'Demo Admin'
          : credentials.email?.split('@')[0] || 'StayNest Host';
      const roles = ['ADMIN', 'HOTEL_MANAGER', 'GUEST'];
      const mockUser = {
        id: 'usr_1',
        name: displayName,
        email: credentials.email || 'admin@example.com',
        role: 'admin',
        roles,
      };
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, mockToken);
      storage.set(STORAGE_KEYS.USER_INFO, mockUser);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          STAYNEST_SESSION_KEY,
          JSON.stringify({ ...mockUser, accessToken: mockToken })
        );
        window.dispatchEvent(new Event(SESSION_EVENT));
      }
      return { token: mockToken, accessToken: mockToken, user: mockUser, ...mockUser };
    }
  },

  /**
   * Đăng ký người dùng mới
   */
  async register(data) {
    try {
      const payload = {
        fullName: data.fullName || data.name,
        name: data.name || data.fullName,
        email: data.email,
        password: data.password,
      };
      return await api.post('/auth/register', payload);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 400 || status === 409 || status === 422) {
        throw err;
      }
      // Mock fallback khi backend chưa bật endpoint register
      return {
        id: `usr_${Date.now()}`,
        name: data.name || data.fullName || 'StayNest Member',
        email: data.email,
        roles: data.role === 'HOTEL_MANAGER' ? ['HOTEL_MANAGER', 'GUEST'] : ['GUEST', 'HOTEL_MANAGER'],
      };
    }
  },

  /**
   * Lấy thông tin tài khoản hiện tại
   */
  async getProfile() {
    try {
      const res = await api.get('/auth/me');
      return res?.data ?? res;
    } catch {
      return storage.get(STORAGE_KEYS.USER_INFO, {
        id: 'usr_1',
        name: 'Demo Admin',
        email: 'admin@example.com',
        role: 'admin',
        roles: ['ADMIN', 'HOTEL_MANAGER', 'GUEST'],
      });
    }
  },

  /**
   * Đăng xuất
   */
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore offline logout error
    } finally {
      storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
      storage.remove(STORAGE_KEYS.USER_INFO);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(STAYNEST_SESSION_KEY);
        window.dispatchEvent(new Event(SESSION_EVENT));
      }
    }
  },
};

export default authService;
