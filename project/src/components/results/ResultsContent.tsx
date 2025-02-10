import React from 'react';
import { Brain, GraduationCap, Users, Briefcase } from 'lucide-react';
import { AssessmentResult } from '../../types/results';
import { MultiSelectResults } from './MultiSelectResults';
import { ResultsSection } from './ResultsSection';

interface ResultsContentProps {
  result: AssessmentResult;
  multiSelectAnswers: Record<string, string[]>;
}

export function ResultsContent({ result, multiSelectAnswers }: ResultsContentProps) {
  return (
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
  );
}