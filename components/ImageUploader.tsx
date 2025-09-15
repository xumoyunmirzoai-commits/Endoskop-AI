import React, { useRef } from 'react';
import { UploadIcon, AnalyzeIcon, ClearIcon } from './IconComponents';
import { useI18n } from '../i18n/I18nContext';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  imageUrl: string | null;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageSelect, 
  imageUrl,
  onAnalyze,
  isAnalyzing,
  onClear
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useI18n();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageSelect(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-700 mb-4">{t('uploader.title')}</h2>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/jpeg, image/png, image/webp"
      />
      
      {imageUrl ? (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-2">
            <img src={imageUrl} alt="Uploaded preview" className="w-full h-auto max-h-80 object-contain rounded-md" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={onAnalyze}
              disabled={isAnalyzing}
              className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('uploader.button.analyzing')}
                </>
              ) : (
                <>
                  <AnalyzeIcon className="w-5 h-5 mr-2" />
                  {t('uploader.button.analyze')}
                </>
              )}
            </button>
            <button 
              onClick={onClear}
              disabled={isAnalyzing}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-3 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 disabled:opacity-50 transition-colors"
            >
              <ClearIcon className="w-5 h-5 mr-2" />
              {t('uploader.button.clear')}
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={handleUploadClick}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadIcon className="w-10 h-10 mb-3 text-slate-400" />
            <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">{t('uploader.placeholder.click')}</span> {t('uploader.placeholder.drag')}</p>
            <p className="text-xs text-slate-500">{t('uploader.placeholder.formats')}</p>
          </div>
        </div>
      )}
    </div>
  );
};