import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Download, GraduationCap, Users, Briefcase } from 'lucide-react';
import { AssessmentResult } from '../types/results';
import { generateResultsPDF } from '../utils/pdfGenerator';
import { MultiSelectResults } from './results/MultiSelectResults';
import { ResultsSection } from './results/ResultsSection';

export function ResultsPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [userData, setUserData] = useState(null);
  const [multiSelectAnswers, setMultiSelectAnswers] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem('assessmentResults');
      if (!storedData) {
        navigate('/');
        return;
      }

      const { result, userData, answers } = JSON.parse(storedData);
      
      // Extract multi-select answers
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
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleDownloadPDF = async () => {
    if (result) {
      await generateResultsPDF(result, userData, multiSelectAnswers);
    }
  };

  if (isLoading || !result) {
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
        <h1 className="text-3xl font-bold text-gray-900">Your Assessment Results</h1>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </button>
      </div>

      <div className="space-y-8">
        <MultiSelectResults answers={multiSelectAnswers} />

        <ResultsSection
          title="Personality Results"
          icon={<Brain className="w-6 h-6" />}
          traits={result.psychometric.personalityTraits}
        />

        <ResultsSection
          title="Learning Style"
          icon={<GraduationCap className="w-6 h-6" />}
          traits={result.psychometric.learningStyle}
        />

        <ResultsSection
          title="Skills Assessment"
          icon={<Users className="w-6 h-6" />}
          traits={[
            result.skills.technical,
            result.skills.analytical,
            ...result.skills.soft
          ]}
        />

        <ResultsSection
          title="Work Style Preferences"
          icon={<Briefcase className="w-6 h-6" />}
          traits={result.preferences.workStyle}
        />

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Overall Recommendations</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3">
            {result.overallRecommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}