import React, { useEffect } from 'react';
import { Question, Answer } from '../../types/assessment';
import { QuestionCard } from '../QuestionCard';
import { ProgressBar } from '../ProgressBar';

interface PaginatedQuestionsProps {
  questions: Question[];
  currentPage: number;
  questionsPerPage: number;
  answers: Answer[];
  onAnswerChange: (answer: Answer) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  totalQuestions: number;
}

export function PaginatedQuestions({
  questions,
  currentPage,
  questionsPerPage,
  answers,
  onAnswerChange,
  onNextPage,
  onPrevPage,
  totalQuestions
}: PaginatedQuestionsProps) {
  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = questions.slice(startIndex, endIndex);
  const progress = (answers.length / totalQuestions) * 100;

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <ProgressBar current={answers.length} total={totalQuestions} />
        <p className="text-sm text-gray-600 text-right">
          Question {startIndex + 1}-{Math.min(endIndex, questions.length)} of {questions.length}
        </p>
      </div>

      <div className="space-y-6">
        {currentQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            answer={answers.find((a) => a.questionId === question.id)}
            onAnswerChange={onAnswerChange}
          />
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrevPage}
          disabled={currentPage === 0}
          className={`px-6 py-2 rounded-lg transition-colors ${
            currentPage === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          Previous
        </button>
        <button
          onClick={onNextPage}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {endIndex >= questions.length ? 'Complete Section' : 'Next'}
        </button>
      </div>
    </div>
  );
}