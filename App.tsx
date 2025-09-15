import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { MobileHeader } from './components/MobileHeader';
import { PatientForm } from './components/PatientForm';
import { PatientDataSummary } from './components/PatientDataSummary';
import { ImageUploader } from './components/ImageUploader';
import { SampleImages } from './components/SampleImages';
import { AnalysisReport } from './components/AnalysisReport';
import { Disclaimer } from './components/Disclaimer';
import { Loader } from './components/Loader';
import { Feedback } from './components/Feedback';
import { HistoryPage } from './components/HistoryPage';
import { AnalysisControls } from './components/AnalysisControls';
import { analyzeImage, translateAnalysisResult } from './services/geminiService';
import type { PatientData, AnalysisResult, ConfidenceCalibration, HistoryItem } from './types';
import { useI18n } from './i18n/I18nContext';
import { exportAnalysisToPdf } from './utils/pdfExporter';

const confidenceCalibration: ConfidenceCalibration = {
  'High': { score: 0.95, style: 'bg-green-100 text-green-800' },
  'Medium': { score: 0.75, style: 'bg-yellow-100 text-yellow-800' },
  'Low': { score: 0.50, style: 'bg-orange-100 text-orange-800' },
  'Very Low': { score: 0.25, style: 'bg-red-100 text-red-800' },
  'Normal': { score: 0.98, style: 'bg-blue-100 text-blue-800' },
};

const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const dataUrlToBase64 = (dataUrl: string) => dataUrl.split(',')[1];


function App() {
  const { t, locale } = useI18n();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'history'>('home');
  
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const savedHistory = localStorage.getItem('analysisHistory');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error("Failed to load history from localStorage", error);
      return [];
    }
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [originalAnalysisResult, setOriginalAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isCurrentAnalysisSaved, setIsCurrentAnalysisSaved] = useState(false);


  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPatientForm, setShowPatientForm] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem('analysisHistory', JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save history to localStorage", error);
    }
  }, [history]);

  const handleLocaleChange = useCallback(async (currentAnalysis: AnalysisResult, newLocale: typeof locale) => {
      if (newLocale === 'en' && originalAnalysisResult) {
          setAnalysisResult(originalAnalysisResult);
          return;
      }
      if (newLocale !== 'en') {
        setIsTranslating(true);
        try {
            const translatedResult = await translateAnalysisResult(originalAnalysisResult || currentAnalysis, newLocale);
            setAnalysisResult(translatedResult);
        } catch (e) {
            console.error("Translation failed:", e);
            setAnalysisResult(originalAnalysisResult || currentAnalysis);
        } finally {
            setIsTranslating(false);
        }
      }
  }, [originalAnalysisResult]);

  useEffect(() => {
    if (analysisResult) {
        handleLocaleChange(analysisResult, locale);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);


  const handleClear = () => {
    setImageFile(null);
    setImageDataUrl(null);
    setAnalysisResult(null);
    setOriginalAnalysisResult(null);
    setError(null);
    setIsCurrentAnalysisSaved(false);
    if (!patientData) {
      setShowPatientForm(true);
    }
  };
  
  const handleImageSelect = async (file: File) => {
    handleClear();
    setImageFile(file);
    try {
      const dataUrl = await fileToDataUrl(file);
      setImageDataUrl(dataUrl);
    } catch (error) {
      console.error("Error converting file to data URL", error);
      setError("Could not read the selected image file.");
    }
  };

  const handlePatientDataSubmit = (data: PatientData) => {
    setPatientData(data);
    setShowPatientForm(false);
  };
  
  const handleAnalyze = async () => {
    if (!imageFile || !patientData || !imageDataUrl) {
      setError("Patient data and an image are required for analysis.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);
    setOriginalAnalysisResult(null);
    setIsCurrentAnalysisSaved(false);
    
    try {
      const base64ImageData = dataUrlToBase64(imageDataUrl);
      const result = await analyzeImage(base64ImageData, imageFile.type, patientData);
      
      setAnalysisResult(result);
      setOriginalAnalysisResult(result);

      if (locale !== 'en') {
        handleLocaleChange(result, locale);
      }

    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveToHistory = () => {
    if (!patientData || !originalAnalysisResult || !imageDataUrl || isCurrentAnalysisSaved) {
        return;
    }

    const newHistoryItem: HistoryItem = {
        id: new Date().toISOString(),
        patientData,
        analysisResult: originalAnalysisResult,
        imageDataUrl,
    };

    setHistory(prev => [newHistoryItem, ...prev]);
    setIsCurrentAnalysisSaved(true);
  };

  const handleExportPdf = () => {
      if (!patientData || !analysisResult || !imageDataUrl) {
          return;
      }
      const itemToExport: HistoryItem = {
          id: new Date().toISOString(),
          patientData,
          analysisResult: analysisResult,
          imageDataUrl,
      };
      exportAnalysisToPdf(itemToExport, t);
  };

  const handleNewPatient = () => {
      setPatientData(null);
      setShowPatientForm(true);
      setImageFile(null);
      setImageDataUrl(null);
      setAnalysisResult(null);
      setOriginalAnalysisResult(null);
      setError(null);
      setIsCurrentAnalysisSaved(false);
  };

  const handleViewHistoryItem = (item: HistoryItem) => {
    setPatientData(item.patientData);
    setShowPatientForm(false);
    setImageDataUrl(item.imageDataUrl);
    setImageFile(null);
    setAnalysisResult(item.analysisResult);
    setOriginalAnalysisResult(item.analysisResult);
    setError(null);
    setIsCurrentAnalysisSaved(true); // This item is already saved
    setCurrentPage('home');

    if (locale !== 'en') {
        handleLocaleChange(item.analysisResult, locale);
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };
  
  const handleFeedbackSubmit = (rating: 'good' | 'bad', comment: string) => {
    console.log("Feedback submitted:", { rating, comment, analysisResult: originalAnalysisResult });
  };

  const renderHomePage = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
      <div className="space-y-6">
        {showPatientForm ? (
          <PatientForm onSubmit={handlePatientDataSubmit} initialData={patientData} />
        ) : (
          patientData && <PatientDataSummary data={patientData} onEdit={() => setShowPatientForm(true)} />
        )}
        <ImageUploader 
          onImageSelect={handleImageSelect}
          imageUrl={imageDataUrl}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing || !patientData || !imageDataUrl}
          onClear={handleClear}
        />
        <SampleImages onImageSelect={handleImageSelect} isAnalyzing={isAnalyzing} />
        <Disclaimer />
      </div>
      <div className="h-full">
        {isAnalyzing ? (
          <div className="flex items-center justify-center w-full h-full min-h-[500px] bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
            <Loader />
          </div>
        ) : analysisResult ? (
          <div className="space-y-6">
            <AnalysisReport 
              analysis={analysisResult} 
              patientData={patientData} 
              confidenceCalibration={confidenceCalibration}
              isTranslating={isTranslating}
            />
             <AnalysisControls
              isSaved={isCurrentAnalysisSaved}
              onSave={handleSaveToHistory}
              onExport={handleExportPdf}
              onNewPatient={handleNewPatient}
            />
            <Feedback onSubmit={handleFeedbackSubmit} />
          </div>
        ) : (
          <div className="flex items-center justify-center text-center w-full h-full min-h-[500px] bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
            <div className="text-slate-500">
              <h3 className="text-lg font-semibold">{t('app.awaitingAnalysis.title')}</h3>
              <p className="text-sm">{t('app.awaitingAnalysis.subtitle')}</p>
              {error && <p className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-slate-50 flex flex-col lg:flex-row">
      <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setSidebarOpen(false)} 
        aria-hidden="true"
      />
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(o => !o)}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          if (window.innerWidth < 1024) {
            setSidebarOpen(false);
          }
        }}
      />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        {currentPage === 'home' ? renderHomePage() : (
          <HistoryPage 
            history={history}
            onView={handleViewHistoryItem}
            onDelete={handleDeleteHistoryItem}
          />
        )}
      </main>
    </div>
  );
}

export default App;