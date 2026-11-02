import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { storage } from '@/utils/storage';
import { authService } from '@/services/authService';

const STAYNEST_SESSION_KEY = 'staynest.auth.session';
const SESSION_EVENT = 'staynest:session-changed';

function readCombinedAuth() {
  let savedToken = storage.get(STORAGE_KEYS.ACCESS_TOKEN, null);
  let savedUser = storage.get(STORAGE_KEYS.USER_INFO, null);

  if (typeof window !== 'undefined') {
    try {
      const rawSession = window.localStorage.getItem(STAYNEST_SESSION_KEY);
      if (rawSession) {
        const parsed = JSON.parse(rawSession);
        const unwrapped = parsed?.data && parsed?.timeStamp ? parsed.data : parsed;
        if (!savedToken && unwrapped?.accessToken) {
          savedToken = unwrapped.accessToken;
        }
        if (unwrapped) {
          savedUser = {
            ...(savedUser || {}),
            id: unwrapped.id || savedUser?.id || 'usr_1',
            name:
              unwrapped.name ||
              unwrapped.fullName ||
              savedUser?.name ||
              unwrapped.email?.split('@')[0] ||
              'Demo Admin',
            email: unwrapped.email || savedUser?.email || 'admin@example.com',
            role: savedUser?.role || 'admin',
            roles: Array.isArray(unwrapped.roles)
              ? unwrapped.roles
              : savedUser?.roles || ['ADMIN', 'HOTEL_MANAGER', 'GUEST'],
          };
        }
      }
    } catch {
      // ignore malformed JSON
    }
  }

  return { token: savedToken, user: savedUser };
}

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const initial = readCombinedAuth();
  const [token, setToken] = useState(initial.token);
  const [user, setUser] = useState(initial.user);
  const [loading, setLoading] = useState(true);

  const syncSession = useCallback(() => {
    const next = readCombinedAuth();
    setToken(next.token);
    setUser(
      next.token
        ? next.user || {
            id: 'usr_1',
            name: 'Demo Admin',
            email: 'admin@example.com',
            role: 'admin',
            roles: ['ADMIN', 'HOTEL_MANAGER', 'GUEST'],
          }
        : null
    );
  }, []);

  useEffect(() => {
    syncSession();
    setLoading(false);

    if (typeof window === 'undefined') return undefined;
    window.addEventListener(SESSION_EVENT, syncSession);
    window.addEventListener('storage', syncSession);
    return () => {
      window.removeEventListener(SESSION_EVENT, syncSession);
      window.removeEventListener('storage', syncSession);
    };
  }, [syncSession]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await authService.login(credentials);
      const authToken = res?.token || res?.accessToken || 'mock_jwt_token_sample';
      const authUser = res?.user || {
        id: 'usr_1',
        name: credentials.email?.split('@')[0] || 'Demo Admin',
        email: credentials.email || 'admin@example.com',
        role: 'admin',
        roles: ['ADMIN', 'HOTEL_MANAGER', 'GUEST'],
      };

      setToken(authToken);
      setUser(authUser);
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, authToken);
      storage.set(STORAGE_KEYS.USER_INFO, authUser);

      return { success: true, user: authUser, token: authToken };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || 'Đăng nhập không thành công!',
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setToken(null);
      setUser(null);
      storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
      storage.remove(STORAGE_KEYS.USER_INFO);
    }
  }, []);

  const session = useMemo(() => {
    if (!token) return null;
    const roles = Array.isArray(user?.roles)
      ? user.roles
      : user?.role === 'admin'
        ? ['ADMIN', 'HOTEL_MANAGER', 'GUEST']
        : ['HOTEL_MANAGER', 'GUEST'];
    return {
      id: user?.id || 'usr_1',
      name: user?.name || user?.fullName || 'Demo Admin',
      email: user?.email || 'admin@example.com',
      accessToken: token,
      roles,
    };
  }, [token, user]);

  const value = {
    user,
    token,
    session,
    isAuthenticated: Boolean(token),
    loading,
    login,
    register: authService.register,
    logout,
    signOut: logout,
    syncSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
