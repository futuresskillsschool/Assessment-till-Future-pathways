import React from 'react';
import { Question, Answer } from '../../../types/assessment';

interface PersonalityQuestionCardProps {
  question: Question;
  answer?: Answer;
  onAnswerChange: (answer: Answer) => void;
}

const likertOptions = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' }
];

export function PersonalityQuestionCard({ question, answer, onAnswerChange }: PersonalityQuestionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{question.text}</h3>
      
      <div className="grid grid-cols-5 gap-2">
        {likertOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswerChange({ questionId: question.id, value: option.value })}
            className={`p-3 rounded-lg text-sm transition-colors ${
              answer?.value === option.value
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}