import React from 'react';
import { AssessmentResult } from '../../types/results';
import { Brain, GraduationCap, Users, Briefcase } from 'lucide-react';
import { ResultsSection } from './ResultsSection';

interface ResultsOverviewProps {
  result: AssessmentResult;
}

export function ResultsOverview({ result }: ResultsOverviewProps) {
  return (
    <div className="space-y-8">
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
    </div>
  );
}