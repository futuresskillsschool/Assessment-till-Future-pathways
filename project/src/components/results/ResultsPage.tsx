import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { AssessmentResult } from '../../types/results';
import { ResultsContent } from './ResultsContent';
import { ResultsLoading } from './ResultsLoading';

export function ResultsPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [userData, setUserData] = useState(null);
  const [multiSelectAnswers, setMultiSelectAnswers] = useState<Record<string, string[]>>({});
  const [isDownloading, setIsDownloading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem('assessmentResults');
      if (!storedData) {
        navigate('/');
        return;
      }

      const { result, userData, answers } = JSON.parse(storedData);
      
      const multiSelectQuestions = ['p65', 'p66', 'p67', 'pref11', 's13'];
      const multiSelectResults = answers.reduce((acc, answer) => {
        if (multiSelectQuestions.includes(answer.questionId) && Array.isArray(answer.value)) {
          acc[answer.questionId] = answer.value;
        }
        return acc;
      }, {});

      setResult(result);
      setUserData(userData);
      setMultiSelectAnswers(multiSelectResults);
    } catch (error) {
      console.error('Error loading results:', error);
      navigate('/');
    }
  }, [navigate]);

  const handleDownloadPDF = async () => {
    if (!resultsRef.current) return;
    
    try {
      setIsDownloading(true);

      // Set a fixed width for better PDF quality
      const pdfWidth = 1200;
      const originalWidth = resultsRef.current.offsetWidth;
      const originalStyle = resultsRef.current.style.width;
      resultsRef.current.style.width = `${pdfWidth}px`;

      const canvas = await html2canvas(resultsRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        width: pdfWidth,
        windowWidth: pdfWidth,
        onclone: (clonedDoc) => {
          // Ensure all sections are expanded in the clone
          const elements = clonedDoc.getElementsByClassName('results-section');
          Array.from(elements).forEach(el => {
            el.classList.remove('collapsed');
            el.classList.add('expanded');
          });
        }
      });

      // Restore original width
      resultsRef.current.style.width = originalStyle;

      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Add the image to the PDF
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        0,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );

      // If content spans multiple pages, add them
      if (imgHeight > 297) { // A4 height in mm
        let remainingHeight = imgHeight;
        let currentPosition = 0;
        const pageHeight = 297;

        while (remainingHeight > 0) {
          currentPosition += pageHeight;
          remainingHeight -= pageHeight;

          if (remainingHeight > 0) {
            pdf.addPage();
            pdf.addImage(
              canvas.toDataURL('image/jpeg', 1.0),
              'JPEG',
              0,
              -currentPosition,
              imgWidth,
              imgHeight,
              undefined,
              'FAST'
            );
          }
        }
      }

      pdf.save('Career-Assessment-Results.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!result) {
    return <ResultsLoading />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Assessment Results</h1>
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4 mr-2" />
          {isDownloading ? 'Downloading...' : 'Download PDF'}
        </button>
      </div>

      <div ref={resultsRef} className="results-container">
        <ResultsContent
          result={result}
          multiSelectAnswers={multiSelectAnswers}
        />
      </div>
    </div>
  );
}