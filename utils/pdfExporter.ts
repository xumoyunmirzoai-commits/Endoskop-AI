import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { HistoryItem } from '../types';

// Extend jsPDF with autoTable typings
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
}

const getImageDimensions = (dataUrl: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = dataUrl;
  });
};

export const exportAnalysisToPdf = async (item: HistoryItem, t: (key: string) => string) => {
    const doc = new jsPDF() as jsPDFWithAutoTable;
    const { patientData, analysisResult, imageDataUrl } = item;

    // --- Document Settings ---
    const pageMargin = 14;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - (pageMargin * 2);
    let cursorY = 22;

    // --- Header ---
    doc.setFontSize(20);
    doc.text(t('report.title'), pageMargin, cursorY);
    cursorY += 10;

    // --- Patient Details ---
    doc.setFontSize(12);
    doc.text(t('report.patientDetails'), pageMargin, cursorY);
    cursorY += 5;
    const patientDetails = [
        [`${t('patientForm.patientId')}:`, patientData.patientId, `${t('patientForm.age')}:`, patientData.age],
        [`${t('patientForm.patientName')}:`, patientData.patientName, `${t('patientForm.gender')}:`, patientData.gender],
        [`${t('patientForm.procedureDate')}:`, patientData.procedureDate, '', ''],
    ];
    autoTable(doc, {
        startY: cursorY,
        body: patientDetails,
        theme: 'plain',
        styles: { fontSize: 10, cellPadding: 1 },
        columnStyles: { 0: { fontStyle: 'bold' }, 2: { fontStyle: 'bold' } },
    });
    cursorY = (doc as any).lastAutoTable.finalY + 8;
    
    // --- Analyzed Image ---
    doc.setFontSize(12);
    doc.text(t('report.analyzedImage'), pageMargin, cursorY);
    cursorY += 6;
    try {
        const { width, height } = await getImageDimensions(imageDataUrl);
        const aspectRatio = height / width;
        const imgWidth = contentWidth / 2;
        const imgHeight = imgWidth * aspectRatio;
        
        if (cursorY + imgHeight > 280) { // Check if it fits on the page
             doc.addPage();
             cursorY = pageMargin;
        }

        doc.addImage(imageDataUrl, 'JPEG', pageMargin, cursorY, imgWidth, imgHeight);
        cursorY += imgHeight + 8;
    } catch (e) {
        console.error("Error adding image to PDF", e);
        doc.text("Image could not be loaded.", pageMargin, cursorY);
        cursorY += 8;
    }


    // --- Clinical Summary ---
    doc.setFontSize(12);
    doc.text(t('report.summary'), pageMargin, cursorY);
    cursorY += 6;
    doc.setFontSize(10);
    const summaryLines = doc.splitTextToSize(analysisResult.summary, contentWidth);
    doc.text(summaryLines, pageMargin, cursorY);
    cursorY += (summaryLines.length * 4) + 8; // Estimate new Y position

    // --- Detailed Findings ---
    if (cursorY > 260) {
        doc.addPage();
        cursorY = pageMargin;
    }
    doc.setFontSize(12);
    doc.text(t('report.findings'), pageMargin, cursorY);
    cursorY += 6;

    const tableColumn = [
        t('report.table.name'),
        t('report.table.confidence'),
        t('report.table.location'),
        t('report.table.description')
    ];
    const tableRows = analysisResult.findings.map(finding => [
        finding.name,
        finding.confidence,
        finding.location,
        finding.description
    ]);

    autoTable(doc, {
        startY: cursorY,
        head: [tableColumn],
        body: tableRows,
        theme: 'striped',
        headStyles: {
            fillColor: [45, 55, 72] // slate-700
        },
        didParseCell: function (data) {
            if (data.column.dataKey === 3) { // Description column
                 data.cell.styles.fontStyle = 'italic';
            }
        },
    });

    // --- Footer ---
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width / 2, 287, { align: 'center' });
    }

    doc.save(`Endo-AI-Report-${patientData.patientId}-${patientData.procedureDate}.pdf`);
};