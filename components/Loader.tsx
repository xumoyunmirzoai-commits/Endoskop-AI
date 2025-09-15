import React from 'react';
import { useI18n } from '../i18n/I18nContext';


export const Loader: React.FC = () => {
    const { t } = useI18n();

    const loadingMessages = [
        t('loader.message1'),
        t('loader.message2'),
        t('loader.message3'),
        t('loader.message4'),
        t('loader.message5'),
        t('loader.message6'),
    ];

    const [message, setMessage] = React.useState(loadingMessages[0]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setMessage(prev => {
                const currentIndex = loadingMessages.indexOf(prev);
                const nextIndex = (currentIndex + 1) % loadingMessages.length;
                return loadingMessages[nextIndex];
            });
        }, 2500);
        return () => clearInterval(interval);
    }, [loadingMessages]);

    return (
        <div className="flex flex-col items-center justify-center text-center">
            <svg
                className="w-16 h-16 text-blue-600 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-slate-700">{t('loader.title')}</h3>
            <p className="text-slate-500 mt-1 w-48 transition-opacity duration-500">{message}</p>
        </div>
    );
};