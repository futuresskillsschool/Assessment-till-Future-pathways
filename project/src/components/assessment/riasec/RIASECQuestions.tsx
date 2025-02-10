import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { riasecSection } from '../../../data/riasecQuestions';
import { Answer } from '../../../types/assessment';
import { QuestionCard } from '../../QuestionCard';
import { ProgressBar } from '../../ProgressBar';

export function RIASECQuestions() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const navigate = useNavigate();
  const questions = riasecSection.questions;

  const handleAnswerChange = (answer: Answer) => {
    setAnswers(prev => {
      const newAnswers = prev.filter(a => a.questionId !== answer.questionId);
      return [...newAnswers, answer];
    });
  };

  const handleComplete = () => {
    sessionStorage.setItem('riasecAnswers', JSON.stringify(answers));
    navigate('/riasec/results');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">RIASEC Career Assessment</h1>
        <ProgressBar 
          current={answers.length}
          total={questions.length}
        />
      </div>

      <div className="space-y-6">
        {questions.map(question => (
          <QuestionCard
            key={question.id}
            question={question}
            answer={answers.find(a => a.questionId === question.id)}
            onAnswerChange={handleAnswerChange}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleComplete}
          disabled={answers.length < questions.length}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Complete Assessment
        </button>
      </div>
    </div>
  );
}