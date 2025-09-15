import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult, PatientData } from '../types';
import type { Locale } from "../i18n/I18nContext";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.STRING,
            description: "A one or two sentence observational summary of the image, considering the patient's age and gender. Describe only what is visually present."
        },
        findings: {
            type: Type.ARRAY,
            description: "An array of potential pathological findings or observations.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: {
                        type: Type.STRING,
                        description: "The name of the finding (e.g., 'Polyp', 'Inflammation', 'Normal Mucosa')."
                    },
                    description: {
                        type: Type.STRING,
                        description: "A detailed clinical description of the finding's visual characteristics."
                    },
                    location: {
                        type: Type.STRING,
                        description: "The location of the finding within the image (e.g., 'Upper right quadrant', 'Cecum')."
                    },
                    confidence: {
                        type: Type.STRING,
                        enum: ['High', 'Medium', 'Low', 'Very Low', 'Normal'],
                        description: "The confidence level that this finding is visually present."
                    }
                },
                required: ["name", "description", "location", "confidence"]
            }
        }
    },
    required: ["summary", "findings"]
};


export const analyzeImage = async (base64ImageData: string, mimeType: string, patientData: PatientData): Promise<AnalysisResult> => {
    
    const fullPrompt = `
You are an expert clinical documentation AI assistant specializing in gastroenterology and the analysis of endoscopic and colonoscopic imagery. Your role is to serve as a decision support tool for qualified medical professionals by providing descriptive analysis of images.

**Primary Instructions:**
1.  **Analyze the Image:** Carefully examine the provided medical image.
2.  **Identify Features:** Identify any potential pathologies, abnormalities, or notable features. This includes, but is not limited to, polyps, inflammation, ulcers, lesions, bleeding, or normal features.
3.  **Consider Patient Context:** Use the patient context provided below in your analysis, as the prevalence of certain conditions can be correlated with age and gender.
4.  **Report Findings:** For each distinct finding, provide a detailed analysis. If the image appears normal, report that with 'Normal' confidence.
5.  **Strict JSON Output:** Structure your response strictly according to the provided JSON schema.

**Patient Context:**
*   **Patient ID:** ${patientData.patientId}
*   **Age:** ${patientData.age} years old
*   **Gender:** ${patientData.gender}
*   **Procedure Date:** ${patientData.procedureDate}

**Crucial Constraints:**
*   **DO NOT** invent findings if the image is clear or ambiguous.
*   **DO NOT** provide a diagnosis. Your role is descriptive analysis of visual data only.
*   **DO NOT** suggest treatments or further actions.
*   Your output must be only the JSON object, with no other text or explanations.
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { text: fullPrompt },
                    {
                        inlineData: {
                            data: base64ImageData,
                            mimeType: mimeType
                        }
                    }
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
                temperature: 0.2, // Lower temperature for more deterministic, clinical output
            }
        });

        const jsonText = response.text.trim();
        const parsedResult = JSON.parse(jsonText) as AnalysisResult;
        
        if (!Array.isArray(parsedResult.findings)) {
            parsedResult.findings = [];
        }

        return parsedResult;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("The AI model failed to process the image analysis request.");
    }
};


export const translateAnalysisResult = async (analysis: AnalysisResult, targetLocale: Locale): Promise<AnalysisResult> => {
    const languageMap: Record<Locale, string> = {
        en: 'English',
        ru: 'Russian',
        uz: 'Uzbek'
    };
    const targetLanguage = languageMap[targetLocale];

    const systemInstruction = `You are a highly skilled medical translator. Your task is to translate the text fields within a given JSON object to a specified target language.
- Translate the 'summary' field.
- In each object within the 'findings' array, translate the 'name', 'description', and 'location' fields.
- **Crucially, DO NOT translate the 'confidence' field.** Its value must be preserved exactly as it is in the original object.
- Your output MUST be a valid JSON object that strictly adheres to the provided schema.`;

    const userPrompt = `Translate the following JSON object to ${targetLanguage}. The JSON object is:

${JSON.stringify(analysis, null, 2)}`;

    try {
         const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
                temperature: 0.1,
            }
        });

        const jsonText = response.text.trim();
        const parsedResult = JSON.parse(jsonText) as AnalysisResult;

        if (!Array.isArray(parsedResult.findings)) {
            parsedResult.findings = [];
        }
        
        // As a safeguard, ensure confidence levels from the original are maintained
        parsedResult.findings.forEach((finding, index) => {
            if (analysis.findings[index]) {
                finding.confidence = analysis.findings[index].confidence;
            }
        });

        return parsedResult;
    } catch (error) {
        console.error("Error calling Gemini API for translation:", error);
        throw new Error(`Failed to translate analysis to ${targetLanguage}.`);
    }
};