import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { calculateCareerVisionResults } from '../../../utils/careerVision';

export function CareerVisionResults() {
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedAnswers = sessionStorage.getItem('visionAnswers');
      if (!storedAnswers) {
        navigate('/vision');
        return;
      }

      const answers = JSON.parse(storedAnswers);
      const calculatedResults = calculateCareerVisionResults(answers);
      setResults(calculatedResults);
    } catch (error) {
      console.error('Error processing results:', error);
      navigate('/vision');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

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
            onClick={() => {/* Implement PDF download */}}
            className="flex items-center px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <div className="flex items-center mb-2">
              <Brain className="w-5 h-5 mr-2" />
              <h3 className="text-lg font-semibold">Personality Match</h3>
            </div>
            <div className="text-3xl font-bold">{results.personalityProfile.score}%</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <div className="flex items-center mb-2">
              <Target className="w-5 h-5 mr-2" />
              <h3 className="text-lg font-semibold">Aptitude Score</h3>
            </div>
            <div className="text-3xl font-bold">{results.aptitudeAnalysis.score}%</div>
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

      {/* Big Five Analysis Section */}
      <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center mb-6">
          <Brain className="w-6 h-6 text-purple-600 mr-2" />
          <h2 className="text-2xl font-semibold">Big Five Personality Analysis</h2>
        </div>

        <p className="text-gray-700 mb-6">{results.bigFiveAnalysis.summary}</p>

        <div className="grid gap-6">
          {results.bigFiveAnalysis.traits.map((trait: any, index: number) => (
            <div key={index} className="bg-purple-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{trait.name}</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {trait.score}%
                </span>
              </div>
              <p className="text-gray-700 mb-4">{trait.description}</p>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Career Implications:</h4>
                <ul className="space-y-2">
                  {trait.careerImplications.map((implication: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <ArrowRight className="w-4 h-4 text-purple-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{implication}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RIASEC Analysis Section */}
      <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center mb-6">
          <Compass className="w-6 h-6 text-purple-600 mr-2" />
          <h2 className="text-2xl font-semibold">RIASEC Career Interest Profile</h2>
        </div>

        <p className="text-gray-700 mb-6">
          The RIASEC model helps identify career paths that match your interests and work preferences.
          Your strongest interests indicate the types of work environments and activities where you're most likely to thrive.
        </p>

        <div className="mb-6">
          <p className="text-lg text-gray-900 mb-4">{results.riasecAnalysis.summary}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Primary Interests</h3>
            <div className="space-y-4">
              {results.riasecAnalysis.primary.map((type: any, index: number) => (
                <div key={index} className="bg-purple-50 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xl font-semibold text-gray-900">{type.type}</h4>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      {type.score}%
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{type.description}</p>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Suggested Careers:</h5>
                    <div className="flex flex-wrap gap-2">
                      {type.careers.map((career: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Secondary Interests</h3>
            <div className="space-y-4">
              {results.riasecAnalysis.secondary.map((type: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xl font-semibold text-gray-900">{type.type}</h4>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800">
                      {type.score}%
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{type.description}</p>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Suggested Careers:</h5>
                    <div className="flex flex-wrap gap-2">
                      {type.careers.map((career: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Action Plan Section */}
      <section className="bg-white rounded-lg shadow-lg p-6">
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
  );
}