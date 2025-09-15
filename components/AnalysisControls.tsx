import React from 'react';
import { useI18n } from '../i18n/I18nContext';
import { SaveIcon, PdfIcon, UserPlusIcon } from './IconComponents';

interface AnalysisControlsProps {
    isSaved: boolean;
    onSave: () => void;
    onExport: () => void;
    onNewPatient: () => void;
}

export const AnalysisControls: React.FC<AnalysisControlsProps> = ({ isSaved, onSave, onExport, onNewPatient }) => {
    const { t } = useI18n();

    return (
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-200 flex flex-col sm:flex-row gap-3">
            <button
                onClick={onSave}
                disabled={isSaved}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
                <SaveIcon className="w-5 h-5 mr-2" />
                {isSaved ? t('controls.saved') : t('controls.save')}
            </button>
            <button
                onClick={onExport}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
                <PdfIcon className="w-5 h-5 mr-2" />
                {t('controls.exportPdf')}
            </button>
            <button
                onClick={onNewPatient}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
            >
                <UserPlusIcon className="w-5 h-5 mr-2" />
                {t('controls.newPatient')}
            </button>
        </div>
    );
};