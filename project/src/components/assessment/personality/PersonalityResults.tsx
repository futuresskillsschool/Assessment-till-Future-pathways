import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Download, 
  BarChart3,
  TrendingUp,
  Brain,
  Shield,
  Users,
  Smile,
  AlertTriangle
} from 'lucide-react';
import { calculatePersonalityResults } from '../../../utils/personalityOutcomeMapping';
import { PersonalityTraitCard } from './PersonalityTraitCard';
import { PersonalityRecommendations } from './PersonalityRecommendations';

const traitIcons = {
  'Openness': Brain,
  'Conscientiousness': Shield,
  'Extraversion': Users,
  'Agreeableness': Heart,
  'Neuroticism': Smile
};

export function PersonalityResults() {
  const [results, setResults] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAnswers = sessionStorage.getItem('personalityAnswers');
    if (!storedAnswers) {
      navigate('/personality');
      return;
    }

    const answers = JSON.parse(storedAnswers);
    const calculatedResults = calculatePersonalityResults(answers);
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
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg shadow-lg p-6 mb-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Your Personality Profile</h1>
          <button
            onClick={() => {/* Implement PDF download */}}
            className="flex items-center px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              <span className="text-sm">Overall Profile</span>
            </div>
            <div className="text-2xl font-bold mt-2">{averageScore}%</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="text-sm">Strong Traits</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {results.scores.filter((s: any) => s.level === 'high').length}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 mb-8">
        {results.scores.map((score: any) => (
          <PersonalityTraitCard
            key={score.trait}
            score={score}
            icon={traitIcons[score.trait as keyof typeof traitIcons]}
          />
        ))}
      </div>

      <PersonalityRecommendations
        recommendations={results.overallRecommendations}
        dominantTraits={results.dominantTraits}
        developmentAreas={results.developmentAreas}
      />
    </div>
  );
}