import React, { useState } from 'react';
import type { HistoryItem } from '../types';
import { useI18n } from '../i18n/I18nContext';
import { TrashIcon, PdfIcon } from './IconComponents';
import { exportAnalysisToPdf } from '../utils/pdfExporter';

interface HistoryPageProps {
  history: HistoryItem[];
  onView: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ history, onView, onDelete }) => {
    const { t } = useI18n();
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    const handleDeleteClick = (id: string) => {
        setItemToDelete(id);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            onDelete(itemToDelete);
            setItemToDelete(null);
        }
    };
    
    const handleExport = (item: HistoryItem) => {
        exportAnalysisToPdf(item, t);
    };

    return (
        <div className="w-full">
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{t('history.title')}</h1>
                <p className="mt-1 text-slate-500">{t('history.subtitle')}</p>
            </div>

            {history.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-slate-200">
                    <p className="text-slate-500">{t('history.empty')}</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                    <ul role="list" className="divide-y divide-slate-200">
                        {history.map((item) => (
                            <li key={item.id} className="p-4 sm:p-6 hover:bg-slate-50 transition-colors">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <img className="h-16 w-16 rounded-lg object-cover flex-shrink-0" src={item.imageDataUrl} alt="Analysis thumbnail" />
                                        <div>
                                            <p className="text-sm font-semibold text-blue-600">{t('history.patient')}: {item.patientData.patientName} ({item.patientData.patientId})</p>
                                            <p className="text-sm text-slate-500">{t('history.date')}: {new Date(item.patientData.procedureDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
                                        <button onClick={() => onView(item)} className="flex-1 sm:flex-initial px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 w-full">{t('history.viewReport')}</button>
                                        <button onClick={() => handleExport(item)} title={t('controls.exportPdf')} className="p-2 text-slate-500 hover:bg-slate-200 rounded-md"><PdfIcon className="w-5 h-5"/></button>
                                        <button onClick={() => handleDeleteClick(item.id)} title={t('history.delete')} className="p-2 text-red-500 hover:bg-red-100 rounded-md"><TrashIcon className="w-5 h-5"/></button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {itemToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm m-4">
                        <h3 className="text-lg font-bold">{t('history.deleteConfirm')}</h3>
                        <div className="mt-4 flex justify-end gap-3">
                            <button onClick={() => setItemToDelete(null)} className="px-4 py-2 bg-slate-200 rounded-md">Cancel</button>
                            <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-md">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};