import React from 'react';
import { useI18n } from '../i18n/I18nContext';

interface SampleImagesProps {
  onImageSelect: (file: File) => void;
  isAnalyzing: boolean;
}

const samples = [
  { name: 'Polyp', url: 'https://i.imgur.com/2s44tD6.jpeg' },
  { name: 'Ulcerative Colitis', url: 'https://i.imgur.com/k6rDEnJ.jpeg' },
  { name: 'Normal Pylorus', url: 'https://i.imgur.com/vH9j237.jpeg' },
];

export const SampleImages: React.FC<SampleImagesProps> = ({ onImageSelect, isAnalyzing }) => {
  const { t } = useI18n();
  const handleSampleClick = async (url: string, name: string) => {
    if(isAnalyzing) return;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], `${name.replace(' ', '_').toLowerCase()}.jpg`, { type: 'image/jpeg' });
      onImageSelect(file);
    } catch (error) {
      console.error('Error fetching sample image:', error);
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-700 mb-4">{t('samples.title')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {samples.map((sample) => (
          <button
            key={sample.name}
            onClick={() => handleSampleClick(sample.url, sample.name)}
            disabled={isAnalyzing}
            className="group block rounded-lg overflow-hidden relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src={sample.url} alt={`Sample of ${sample.name}`} className="w-full h-24 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">{sample.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};