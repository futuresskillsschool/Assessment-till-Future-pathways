import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { 
  Brain, 
  Download, 
  Heart, 
  Shield, 
  Book,
  Target,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { calculateEQResults } from '../../../utils/eqOutcomeMapping';

export function EQResults() {
  const [results, setResults] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();
  const resultsRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedAnswers = sessionStorage.getItem('eqAnswers');
    if (!storedAnswers) {
      navigate('/eq');
      return;
    }

    const answers = JSON.parse(storedAnswers);
    const calculatedResults = calculateEQResults(answers);
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

      pdf.save('EQ-Assessment-Results.pdf');
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
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your EQ Navigator Results</h1>
            <p className="text-lg text-purple-100">{results.title}</p>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? 'Downloading...' : 'Download PDF'}
          </button>
        </div>
        <p className="text-lg">{results.summary}</p>
      </div>

      <div ref={resultsRef} className="space-y-8">
        {results.scores.map((score: any, index: number) => {
          const Icon = getCategoryIcon(score.category);
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold">{score.category}</h2>
                    <div className="text-sm text-gray-500">
                      Score: <span className="font-medium">{score.score}%</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  score.level === 'high' 
                    ? 'bg-green-100 text-green-800'
                    : score.level === 'moderate'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {score.level.charAt(0).toUpperCase() + score.level.slice(1)}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{score.description}</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Target className="w-4 h-4 text-green-600 mr-2" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {score.strengths.map((strength: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <ArrowRight className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Book className="w-4 h-4 text-purple-600 mr-2" />
                    Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {score.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <ArrowRight className="w-4 h-4 text-purple-600 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Helpful Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {results.resources.map((resource: any, index: number) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ExternalLink className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-gray-900">{resource.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryIcon(category: string) {
  switch (category) {
    case 'Self-Awareness':
      return Brain;
    case 'Empathy':
      return Heart;
    case 'Emotional Management':
      return Shield;
    default:
      return Target;
  }
}