import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { translations } from './translations';
import { get } from 'lodash-es';

export type Locale = 'en' | 'ru' | 'uz';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const getInitialLocale = (): Locale => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && ['en', 'ru', 'uz'].includes(savedLocale)) {
        return savedLocale as Locale;
    }
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'ru') return 'ru';
    if (browserLang === 'uz') return 'uz';
    return 'en';
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale());

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem('locale', newLocale);
    setLocaleState(newLocale);
  };

  const t = useCallback((key: string): string => {
    const translation = get(translations[locale], key);
    if (!translation) {
        console.warn(`Translation key "${key}" not found for locale "${locale}"`);
        // Fallback to English if key not found
        const fallback = get(translations.en, key);
        return fallback || key;
    }
    return translation;
  }, [locale]);
  
  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
