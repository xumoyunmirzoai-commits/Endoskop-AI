export interface PatientData {
  patientId: string;
  patientName: string;
  age: string;
  gender: string;
  procedureDate: string;
}

export interface Finding {
  name: string;
  description: string;
  location: string;
  confidence: 'High' | 'Medium' | 'Low' | 'Very Low' | 'Normal';
}

export interface AnalysisResult {
  summary: string;
  findings: Finding[];
}

export interface ConfidenceCalibration {
  [key: string]: {
    score: number;
    style: string;
  };
}

export interface HistoryItem {
  id: string;
  patientData: PatientData;
  analysisResult: AnalysisResult;
  imageDataUrl: string;
}