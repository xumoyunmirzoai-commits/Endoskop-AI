import React from 'react';
import { WarningIcon } from './IconComponents';
import { useI18n } from '../i18n/I18nContext';

export const Disclaimer: React.FC = () => {
  const { t } = useI18n();
  return (
    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
      <div className="flex">
        <div className="flex-shrink-0">
          <WarningIcon className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <span className="font-bold">{t('disclaimer.title')}:</span> {t('disclaimer.text')}
          </p>
        </div>
      </div>
    </div>
  );
};