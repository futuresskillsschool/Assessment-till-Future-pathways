import React from 'react';

interface MultiSelectResultsProps {
  answers: Record<string, string[]>;
}

const questionMappings = {
  'p65': {
    title: 'Personality Traits',
    description: 'These traits reflect how you see yourself and interact with the world around you.',
  },
  'p66': {
    title: 'Challenge Handling Approach',
    description: 'Your preferred methods for tackling challenges and solving problems.',
  },
  'p67': {
    title: 'Leisure Activities',
    description: 'Activities you enjoy during your free time, indicating your interests and potential areas for skill development.',
  },
  'pref11': {
    title: 'Career Interests',
    description: 'Professional fields that align with your interests and aspirations.',
  },
  's13': {
    title: 'Confident Skills',
    description: 'Areas where you feel most competent and capable.',
  },
};

export function MultiSelectResults({ answers }: MultiSelectResultsProps) {
  return (
    <div className="space-y-6">
      {Object.entries(answers).map(([questionId, selectedOptions]) => {
        const mapping = questionMappings[questionId];
        if (!mapping || !selectedOptions.length) return null;

        return (
          <div key={questionId} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {mapping.title}
            </h3>
            <p className="text-gray-600 mb-4">{mapping.description}</p>
            <div className="flex flex-wrap gap-2">
              {selectedOptions.map((option, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}