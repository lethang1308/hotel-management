import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { en } from '@/locales/en';
import { vi } from '@/locales/vi';

const STORAGE_LANG_KEY = 'staynest.language';
const DICTIONARIES = { en, vi };

export const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === 'undefined') return 'vi';
    return window.localStorage.getItem(STORAGE_LANG_KEY) || 'vi';
  });

  const setLanguage = useCallback((nextLang) => {
    const valid = nextLang === 'en' ? 'en' : 'vi';
    setLanguageState(valid);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_LANG_KEY, valid);
      document.documentElement.lang = valid;
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  }, [language, setLanguage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  /**
   * Helper function t(key, params)
   * Example: t('nav.stays'), t('hotelDetail.basedOn', { count: 12 })
   */
  const t = useCallback(
    (keyPath, params = {}) => {
      if (!keyPath) return '';
      const keys = String(keyPath).split('.');

      // 1. Try current language
      let val = DICTIONARIES[language];
      for (const k of keys) {
        if (val && typeof val === 'object') {
          val = val[k];
        } else {
          val = undefined;
          break;
        }
      }

      // 2. Fallback to English if missing
      if (val === undefined) {
        let fallback = DICTIONARIES.en;
        for (const k of keys) {
          if (fallback && typeof fallback === 'object') {
            fallback = fallback[k];
          } else {
            fallback = undefined;
            break;
          }
        }
        val = fallback !== undefined ? fallback : keyPath;
      }

      // 3. String interpolation for {param}
      if (typeof val === 'string' && params && typeof params === 'object') {
        let text = val;
        for (const [pKey, pVal] of Object.entries(params)) {
          text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), String(pVal ?? ''));
        }
        return text;
      }

      return typeof val === 'string' ? val : keyPath;
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      isVi: language === 'vi',
      isEn: language === 'en',
    }),
    [language, setLanguage, toggleLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
