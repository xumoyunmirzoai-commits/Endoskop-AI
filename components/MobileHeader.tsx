import React from 'react';
import { MenuIcon, MicroscopeIcon } from './IconComponents';
import { useI18n } from '../i18n/I18nContext';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
  const { t } = useI18n();
  return (
    <header className="lg:hidden flex items-center justify-between w-full h-16 px-4 bg-white border-b border-slate-200 flex-shrink-0">
      <div className="flex items-center">
        <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
          <MicroscopeIcon className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-slate-800">Endo-AI</h1>
      </div>
      <button 
        onClick={onMenuClick}
        className="p-2 text-slate-600 hover:bg-slate-100 rounded-md"
        aria-label={t('navigation.openMenu')}
      >
        <MenuIcon className="w-6 h-6" />
      </button>
    </header>
  );
};