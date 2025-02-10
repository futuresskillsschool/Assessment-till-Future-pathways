import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { 
  Brain, 
  Download,
  GraduationCap,
  Target,
  Compass,
  Book,
  Briefcase,
  ArrowRight,
  CheckCircle,
  Users,
  Clock
} from 'lucide-react';
import { calculateCareerClustersResults } from '../../../utils/careerClustersOutcomeMapping';

export function CareerClustersResults() {
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();
  const resultsRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedAnswers = sessionStorage.getItem('clusterAnswers');
      if (!storedAnswers) {
        navigate('/clusters');
        return;
      }

      const answers = JSON.parse(storedAnswers);
      const calculatedResults = calculateCareerClustersResults(answers);
      setResults(calculatedResults);
    } catch (error) {
      console.error('Error processing results:', error);
      navigate('/clusters');
    } finally {
      setIsLoading(false);
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

      pdf.save('Career-Clusters-Results.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading || !results) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 mb-8 text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Career Vision Results</h1>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? 'Downloading...' : 'Download PDF'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <div className="flex items-center mb-2">
              <Brain className="w-5 h-5 mr-2" />
              <h3 className="text-lg font-semibold">Personality Match</h3>
            </div>
            <div className="text-3xl font-bold">{results.personalityProfile?.score}%</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <div className="flex items-center mb-2">
              <Target className="w-5 h-5 mr-2" />
              <h3 className="text-lg font-semibold">Aptitude Score</h3>
            </div>
            <div className="text-3xl font-bold">{results.aptitudeAnalysis?.score}%</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <div className="flex items-center mb-2">
              <Compass className="w-5 h-5 mr-2" />
              <h3 className="text-lg font-semibold">Career Matches</h3>
            </div>
            <div className="text-3xl font-bold">{results.recommendedStreams.primary.length}</div>
          </div>
        </div>
      </div>

      <div ref={resultsRef}>
        {/* Primary Clusters */}
        {results.primaryClusters.length > 0 && (
          <div className="space-y-8">
            {results.primaryClusters.map((result: any, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{result.cluster.name}</h2>
                      <p className="text-gray-600 mt-1">{result.cluster.title}</p>
                    </div>
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {result.level}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-6">{result.cluster.description}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                        <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                        Key Careers
                      </h3>
                      <div className="space-y-3">
                        {result.cluster.careers.map((career: any, idx: number) => (
                          <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                            <div className="font-medium text-gray-900">{career.title}</div>
                            <div className="text-sm text-gray-600">{career.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Target className="w-5 h-5 text-blue-600 mr-2" />
                          Required Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {result.cluster.skills.map((skill: string, idx: number) => (
                            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                          <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
                          Recommended Courses
                        </h3>
                        <div className="space-y-2">
                          {result.cluster.courses.map((course: string, idx: number) => (
                            <div key={idx} className="flex items-center">
                              <ArrowRight className="w-4 h-4 text-blue-600 mr-2" />
                              <span className="text-gray-700">{course}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Secondary Clusters */}
        {results.secondaryClusters.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Other Potential Pathways</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {results.secondaryClusters.map((result: any, index: number) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900">{result.cluster.name}</h3>
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                      {result.level}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{result.cluster.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Plan Section */}
        <section className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <div className="flex items-center mb-6">
            <Target className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-2xl font-semibold">Recommended Action Plan</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 text-purple-600 mr-2" />
                Immediate Steps
              </h3>
              <div className="space-y-2">
                {results.recommendations.immediate.map((step: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-purple-600 mt-1 mr-2 flex-shrink-0" />
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Book className="w-5 h-5 text-purple-600 mr-2" />
                Skill Development
              </h3>
              <div className="space-y-2">
                {results.recommendations.skillDevelopment.map((skill: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-purple-600 mt-1 mr-2 flex-shrink-0" />
                    <p className="text-gray-700">{skill}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 text-purple-600 mr-2" />
                Long-term Goals
              </h3>
              <div className="space-y-2">
                {results.recommendations.longTerm.map((goal: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-purple-600 mt-1 mr-2 flex-shrink-0" />
                    <p className="text-gray-700">{goal}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}