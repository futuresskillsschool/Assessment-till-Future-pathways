import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download, Briefcase, Users, Building, GraduationCap } from 'lucide-react';
import { calculateRIASECResults } from '../../../utils/riasecOutcomeMapping';

export function RIASECResults() {
  const [results, setResults] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();
  const resultsRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedAnswers = sessionStorage.getItem('riasecAnswers');
    if (!storedAnswers) {
      navigate('/riasec');
      return;
    }

    const answers = JSON.parse(storedAnswers);
    const calculatedResults = calculateRIASECResults(answers);
    setResults(calculatedResults);
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
        windowWidth: pdfWidth
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

      pdf.save('RIASEC-Assessment-Results.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!results) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your RIASEC Profile</h1>
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4 mr-2" />
          {isDownloading ? 'Downloading...' : 'Download PDF'}
        </button>
      </div>

      <div ref={resultsRef}>
        {/* Primary Types */}
        {results.primaryTypes.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Briefcase className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900">Primary Career Types</h2>
            </div>
            <div className="grid gap-6">
              {results.scores
                .filter(score => results.primaryTypes.includes(score.type))
                .map((score, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{score.type}</h3>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {score.score}%
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{score.description}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <Users className="w-4 h-4 text-blue-600 mr-2" />
                          Key Characteristics
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {score.characteristics.map((trait, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <Building className="w-4 h-4 text-blue-600 mr-2" />
                          Ideal Work Environments
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {score.workEnvironments.map((env, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {env}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <GraduationCap className="w-4 h-4 text-blue-600 mr-2" />
                          Suggested Careers
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {score.careers.map((career, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {career}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Secondary Types */}
        {results.secondaryTypes.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <div className="flex items-center mb-4">
              <Briefcase className="w-6 h-6 text-gray-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900">Secondary Career Types</h2>
            </div>
            <div className="grid gap-6">
              {results.scores
                .filter(score => results.secondaryTypes.includes(score.type))
                .map((score, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{score.type}</h3>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800">
                        {score.score}%
                      </span>
                    </div>
                    <p className="text-gray-700">{score.description}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Career Recommendations</h2>
          <ul className="space-y-4">
            {results.overallRecommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}