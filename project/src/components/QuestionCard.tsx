import React from 'react';
import { Question, Answer } from '../types/assessment';

interface QuestionCardProps {
  question: Question;
  answer: Answer | undefined;
  onAnswerChange: (answer: Answer) => void;
}

export function QuestionCard({ question, answer, onAnswerChange }: QuestionCardProps) {
  const likertOptions = [
    { value: 1, label: 'Strongly Disagree' },
    { value: 2, label: 'Disagree' },
    { value: 3, label: 'Neutral' },
    { value: 4, label: 'Agree' },
    { value: 5, label: 'Strongly Agree' }
  ];

  const renderLikertScale = () => (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
      {likertOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onAnswerChange({ questionId: question.id, value: option.value })}
          className={`p-3 rounded-lg text-sm transition-colors flex items-center justify-center ${
            answer?.value === option.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <span className="text-center">{option.label}</span>
        </button>
      ))}
    </div>
  );

  const renderBooleanChoice = () => (
    <div className="grid grid-cols-2 gap-4">
      {['True', 'False'].map((option) => (
        <button
          key={option}
          onClick={() => onAnswerChange({ questionId: question.id, value: option })}
          className={`p-3 rounded-lg text-sm transition-colors ${
            answer?.value === option
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );

  const renderMultipleChoice = () => {
    const isMultiSelect = ['p65', 'p66', 'p67', 'pref11', 's13'].includes(question.id);
    const selectedValues = Array.isArray(answer?.value) ? answer.value : [];

    const handleOptionClick = (option: string) => {
      if (isMultiSelect) {
        const newValues = selectedValues.includes(option)
          ? selectedValues.filter(v => v !== option)
          : [...selectedValues, option];
        onAnswerChange({ questionId: question.id, value: newValues });
      } else {
        onAnswerChange({ questionId: question.id, value: option });
      }
    };

    return (
      <div className="space-y-2">
        {question.options?.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`w-full p-3 rounded-lg text-sm text-left transition-colors ${
              isMultiSelect
                ? selectedValues.includes(option)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                : answer?.value === option
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <div className="flex items-center">
              {isMultiSelect && (
                <div className={`w-4 h-4 border rounded mr-2 flex items-center justify-center ${
                  selectedValues.includes(option) ? 'bg-white' : 'border-gray-400'
                }`}>
                  {selectedValues.includes(option) && (
                    <div className="w-2 h-2 bg-blue-600 rounded-sm" />
                  )}
                </div>
              )}
              <span className="flex-1">{option}</span>
            </div>
          </button>
        ))}
        {isMultiSelect && (
          <p className="text-sm text-gray-600 mt-2">
            Select all that apply
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4">
      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">{question.text}</h3>
      
      {question.type === 'likert' && renderLikertScale()}
      {question.type === 'boolean' && renderBooleanChoice()}
      {(question.type === 'multiple' || question.type === 'choice') && renderMultipleChoice()}
    </div>
  );
}