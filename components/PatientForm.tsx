import React, { useState } from 'react';
import type { PatientData } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface PatientFormProps {
  onSubmit: (data: PatientData) => void;
  initialData: PatientData | null;
}

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const PatientForm: React.FC<PatientFormProps> = ({ onSubmit, initialData }) => {
  const { t } = useI18n();
  const [formData, setFormData] = useState<PatientData>(initialData || {
    patientId: '',
    patientName: '',
    age: '',
    gender: '',
    procedureDate: getTodayDateString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-2xl shadow-lg border border-slate-200 space-y-4">
      <h2 className="text-lg font-semibold text-slate-700 mb-4">{t('patientForm.title')}</h2>
      
      <div>
        <label htmlFor="patientId" className="block text-sm font-medium text-slate-700">{t('patientForm.patientId')}</label>
        <input type="text" name="patientId" id="patientId" value={formData.patientId} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
      </div>
      
      <div>
        <label htmlFor="patientName" className="block text-sm font-medium text-slate-700">{t('patientForm.patientName')}</label>
        <input type="text" name="patientName" id="patientName" value={formData.patientName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-slate-700">{t('patientForm.age')}</label>
          <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required min="0" />
        </div>
        <div>
            <label htmlFor="gender" className="block text-sm font-medium text-slate-700">{t('patientForm.gender')}</label>
            <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required>
                <option value="" disabled>{t('patientForm.selectGender')}</option>
                <option value="Male">{t('patientForm.male')}</option>
                <option value="Female">{t('patientForm.female')}</option>
            </select>
        </div>
      </div>
       
       <div>
        <label htmlFor="procedureDate" className="block text-sm font-medium text-slate-700">{t('patientForm.procedureDate')}</label>
        <input type="date" name="procedureDate" id="procedureDate" value={formData.procedureDate} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
      </div>
      
      <button type="submit" className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">{t('patientForm.saveButton')}</button>
    </form>
  );
};