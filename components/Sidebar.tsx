import React from 'react';
import { HomeIcon, HistoryIcon, MicroscopeIcon, ChevronLeftIcon, MenuIcon } from './IconComponents';
import { useI18n } from '../i18n/I18nContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
    currentPage: 'home' | 'history';
    onNavigate: (page: 'home' | 'history') => void;
}

const NavLink: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    isSidebarOpen: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, isSidebarOpen, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center w-full h-12 px-4 rounded-lg transition-colors duration-200 ${
                isActive 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-200'
            }`}
        >
            <div className="flex-shrink-0">{icon}</div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSidebarOpen ? 'max-w-xs ml-4' : 'max-w-0 ml-0'}`}>
                <span className="whitespace-nowrap text-base font-medium">
                    {label}
                </span>
            </div>
        </button>
    );
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, currentPage, onNavigate }) => {
    const { t } = useI18n();
    return (
        <aside className={`fixed lg:relative inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out w-64 lg:w-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 ${isOpen ? 'lg:w-64' : 'lg:w-20'}`}>
            {/* Header */}
            <div className="flex items-center h-16 px-4 border-b border-slate-200 flex-shrink-0">
                 <div className="flex items-center overflow-hidden">
                    <div className="bg-blue-600 text-white p-2 rounded-lg flex-shrink-0">
                        <MicroscopeIcon className="w-6 h-6" />
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-w-xs ml-3' : 'max-w-0 ml-0'}`}>
                       <h1 className="text-xl font-bold text-slate-800 whitespace-nowrap">
                           Endo-AI
                       </h1>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className={`flex-1 space-y-2 transition-all duration-300 ease-in-out ${isOpen ? 'p-4' : 'p-3'}`}>
                <NavLink 
                    icon={<HomeIcon className="w-6 h-6" />}
                    label={t('navigation.home')}
                    isActive={currentPage === 'home'}
                    isSidebarOpen={isOpen}
                    onClick={() => onNavigate('home')}
                />
                <NavLink 
                    icon={<HistoryIcon className="w-6 h-6" />}
                    label={t('navigation.history')}
                    isActive={currentPage === 'history'}
                    isSidebarOpen={isOpen}
                    onClick={() => onNavigate('history')}
                />
            </nav>

            {/* Footer */}
            <div className={`border-t border-slate-200 transition-all duration-300 ease-in-out ${isOpen ? 'p-4' : 'p-3'}`}>
                 <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-12 mb-4' : 'max-h-0 mb-0'}`}>
                    <LanguageSwitcher />
                 </div>
                 <button 
                    onClick={onToggle}
                    className="flex items-center w-full h-12 px-4 rounded-lg text-slate-600 hover:bg-slate-200"
                 >
                    <div className="flex-shrink-0">
                        {isOpen ? <ChevronLeftIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-w-xs ml-4' : 'max-w-0 ml-0'}`}>
                        <span className="whitespace-nowrap text-base font-medium">
                            {t('navigation.collapse')}
                        </span>
                    </div>
                 </button>
            </div>
        </aside>
    );
};