import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface AssessmentProgressProps {
  sections: {
    id: string;
    title: string;
    completed: boolean;
    active: boolean;
  }[];
}

export function AssessmentProgress({ sections }: AssessmentProgressProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 mb-8">
      <div className="flex items-center justify-between">
        {sections.map((section, index) => (
          <React.Fragment key={section.id}>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  section.completed && !section.active
                    ? 'bg-green-100'
                    : section.active
                    ? 'bg-blue-100'
                    : 'bg-gray-100'
                }`}
              >
                {section.completed && !section.active ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle
                    className={`w-5 h-5 ${
                      section.active ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  />
                )}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  section.active ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {section.title}
              </span>
            </div>
            {index < sections.length - 1 && (
              <div className="flex-1 h-px bg-gray-200 mx-4" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}