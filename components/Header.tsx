import React from 'react';
import { MicroscopeIcon } from './IconComponents';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useI18n } from '../i18n/I18nContext';

interface HeaderProps {
    onNavigate: (view: 'main' | 'history') => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { t } = useI18n();
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-4">
            <MicroscopeIcon className="w-6 h-6" />
            </div>
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-800">
                    {t('header.title')}
                </h1>
                <p className="text-sm text-slate-500">{t('header.subtitle')}</p>
            </div>
        </div>
        <div className="flex items-center">
            <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};