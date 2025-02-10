import React from 'react';

interface AssessmentStepsProps {
  onBegin: () => void;
}

const steps = [
  {
    title: 'Personality Assessment',
    description: 'Questions about your traits, behaviors, and preferences'
  },
  {
    title: 'Skills Evaluation',
    description: 'Assessment of your technical and soft skills'
  },
  {
    title: 'Career Preferences',
    description: 'Understanding your ideal work environment and goals'
  }
];

export function AssessmentSteps({ onBegin }: AssessmentStepsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">What to Expect</h2>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">{index + 1}</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onBegin}
          className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          Begin Assessment
          <span className="ml-2">→</span>
        </button>
        <p className="mt-4 text-sm text-gray-500">
          You can save your progress and continue later
        </p>
      </div>
    </div>
  );
}