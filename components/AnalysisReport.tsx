import React, { useState } from 'react';
import type { AnalysisResult, ConfidenceCalibration, PatientData } from '../types';
import { useI18n } from '../i18n/I18nContext';
import { MaximizeIcon, MinimizeIcon } from './IconComponents';

interface AnalysisReportProps {
  analysis: AnalysisResult;
  patientData: PatientData | null;
  confidenceCalibration: ConfidenceCalibration;
  isTranslating: boolean;
}

const TranslatingPlaceholder: React.FC<{className?: string}> = ({ className }) => (
    <div className={`w-full h-4 bg-slate-200 rounded animate-pulse ${className}`}></div>
)


export const AnalysisReport: React.FC<AnalysisReportProps> = ({ analysis, patientData, confidenceCalibration, isTranslating }) => {
    const { t } = useI18n();
    const [isFullscreen, setIsFullscreen] = useState(false);
    
    const reportContent = (
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">{t('report.title')}</h2>
                <button 
                    onClick={() => setIsFullscreen(!isFullscreen)} 
                    className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
                    title={isFullscreen ? t('report.exitFullscreen') : t('report.fullscreen')}
                    aria-label={isFullscreen ? t('report.exitFullscreen') : t('report.fullscreen')}
                >
                    {isFullscreen ? <MinimizeIcon className="w-5 h-5" /> : <MaximizeIcon className="w-5 h-5" />}
                </button>
            </div>
           
            {patientData && (
                 <div className="space-y-3 pb-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-700">{t('report.patientDetails')}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-sm">
                        <div>
                            <p className="font-medium text-slate-500">{t('patientForm.patientId')}</p>
                            <p className="text-slate-800 font-semibold">{patientData.patientId}</p>
                        </div>
                        <div className="sm:col-span-2">
                            <p className="font-medium text-slate-500">{t('patientForm.patientName')}</p>
                            <p className="text-slate-800 font-semibold">{patientData.patientName}</p>
                        </div>
                        <div>
                            <p className="font-medium text-slate-500">{t('patientForm.age')}</p>
                            <p className="text-slate-800 font-semibold">{patientData.age}</p>
                        </div>
                        <div>
                            <p className="font-medium text-slate-500">{t('patientForm.gender')}</p>
                            <p className="text-slate-800 font-semibold">{patientData.gender}</p>
                        </div>
                        <div>
                            <p className="font-medium text-slate-500">{t('patientForm.procedureDate')}</p>
                            <p className="text-slate-800 font-semibold">{patientData.procedureDate}</p>
                        </div>
                    </div>
                 </div>
            )}

            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-700">{t('report.summary')}</h3>
                {isTranslating ? (
                    <div className="space-y-2">
                        <TranslatingPlaceholder />
                        <TranslatingPlaceholder className="w-3/4"/>
                    </div>
                ) : (
                    <p className="text-slate-600">{analysis.summary}</p>
                )}
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-700">{t('report.findings')}</h3>
                {analysis.findings && analysis.findings.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-500">
                            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">{t('report.table.name')}</th>
                                    <th scope="col" className="px-6 py-3">{t('report.table.confidence')}</th>
                                    <th scope="col" className="px-6 py-3">{t('report.table.location')}</th>
                                    <th scope="col" className="px-6 py-3">{t('report.table.description')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analysis.findings.map((finding, index) => {
                                    const calibratedData = confidenceCalibration[finding.confidence];
                                    return (
                                        <tr key={index} className="bg-white border-b hover:bg-slate-50">
                                            <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                                                {isTranslating ? <TranslatingPlaceholder className="w-24"/> : finding.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${calibratedData.style}`}>
                                                    {finding.confidence} ({calibratedData.score.toFixed(2)})
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {isTranslating ? <TranslatingPlaceholder className="w-32"/> : finding.location}
                                            </td>
                                            <td className="px-6 py-4">
                                                {isTranslating ? (
                                                    <div className="space-y-2">
                                                        <TranslatingPlaceholder />
                                                        <TranslatingPlaceholder className="w-5/6"/>
                                                    </div>
                                                ) : finding.description}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-slate-500 italic">{t('report.noFindings')}</p>
                )}
            </div>
        </>
    );

    return (
        <div className={`w-full bg-white space-y-6 transition-all duration-300 ease-in-out ${isFullscreen ? 'fixed inset-0 z-50 p-8 overflow-y-auto' : 'p-6 rounded-2xl shadow-lg border border-slate-200'}`}>
            {reportContent}
        </div>
    );
};
