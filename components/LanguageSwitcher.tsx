import React from 'react';
import { useI18n, type Locale } from '../i18n/I18nContext';

const languages: { code: Locale, label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'uz', label: 'UZ' },
];

export const LanguageSwitcher: React.FC = () => {
    const { locale, setLocale } = useI18n();

    return (
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors duration-200 ${
                        locale === lang.code
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-slate-600 hover:bg-slate-200'
                    }`}
                    aria-pressed={locale === lang.code}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
};
