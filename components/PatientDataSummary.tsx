import React from 'react';
import type { PatientData } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface PatientDataSummaryProps {
  data: PatientData;
  onEdit: () => void;
}

export const PatientDataSummary: React.FC<PatientDataSummaryProps> = ({ data, onEdit }) => {
  const { t } = useI18n();
  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-700">{t('patientForm.summaryTitle')}</h2>
        <button onClick={onEdit} className="text-sm font-semibold text-blue-600 hover:text-blue-800">
          {t('patientForm.editButton')}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-medium text-slate-500">{t('patientForm.patientId')}</p>
          <p className="text-slate-800 font-semibold">{data.patientId}</p>
        </div>
        <div>
          <p className="font-medium text-slate-500">{t('patientForm.patientName')}</p>
          <p className="text-slate-800 font-semibold">{data.patientName}</p>
        </div>
        <div>
          <p className="font-medium text-slate-500">{t('patientForm.age')}</p>
          <p className="text-slate-800 font-semibold">{data.age}</p>
        </div>
        <div>
          <p className="font-medium text-slate-500">{t('patientForm.gender')}</p>
          <p className="text-slate-800 font-semibold">{data.gender}</p>
        </div>
        <div className="col-span-2">
          <p className="font-medium text-slate-500">{t('patientForm.procedureDate')}</p>
          <p className="text-slate-800 font-semibold">{data.procedureDate}</p>
        </div>
      </div>
    </div>
  );
};