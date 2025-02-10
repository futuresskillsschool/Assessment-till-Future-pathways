import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Target, 
  Lightbulb, 
  Puzzle, 
  Shield, 
  Download, 
  BarChart3, 
  TrendingUp 
} from 'lucide-react';
import { calculateSCCTResults } from '../../../utils/scctOutcomeMapping';
import { SCCTScoreCard } from './SCCTScoreCard';
import { SCCTRecommendations } from './SCCTRecommendations';

const categoryIcons = {
  'Self-Efficacy': Brain,
  'Outcome Expectations': Target,
  'Career Interests': Lightbulb,
  'Career Goals': Puzzle,
  'Barriers and Supports': Shield
};

export function SCCTResults() {
  const [results, setResults] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAnswers = sessionStorage.getItem('scctAnswers');
    if (!storedAnswers) {
      navigate('/scct');
      return;
    }

    const answers = JSON.parse(storedAnswers);
    const calculatedResults = calculateSCCTResults(answers);
    setResults(calculatedResults);
  }, [navigate]);

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

  const averageScore = Math.round(
    results.scores.reduce((acc: number, score: any) => acc + score.score, 0) / results.scores.length
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg p-6 mb-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Your SCCT Assessment Results</h1>
          <button
            onClick={() => {/* Implement PDF download */}}
            className="flex items-center px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              <span className="text-sm">Overall Score</span>
            </div>
            <div className="text-2xl font-bold mt-2">{averageScore}%</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="text-sm">Strong Areas</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {results.scores.filter((s: any) => s.level === 'high').length}
            </div>
          </div>
          {/* Add more summary stats as needed */}
        </div>
      </div>

      <div className="grid gap-6 mb-8">
        {results.scores.map((score: any) => (
          <SCCTScoreCard
            key={score.category}
            score={score}
            icon={categoryIcons[score.category as keyof typeof categoryIcons]}
          />
        ))}
      </div>

      <SCCTRecommendations
        recommendations={results.overallRecommendations}
        careerDirections={results.careerDirections}
        developmentAreas={results.developmentAreas}
      />
    </div>
  );
}