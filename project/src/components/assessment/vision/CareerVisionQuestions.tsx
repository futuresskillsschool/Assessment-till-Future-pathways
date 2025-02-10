import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { careerVisionSection } from '../../../data/careerVisionQuestions';
import { Answer } from '../../../types/assessment';
import { QuestionCard } from '../../QuestionCard';
import { ProgressBar } from '../../ProgressBar';

const QUESTIONS_PER_PAGE = 5;

export function CareerVisionQuestions() {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const navigate = useNavigate();

  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const currentQuestions = careerVisionSection.questions.slice(
    startIndex,
    startIndex + QUESTIONS_PER_PAGE
  );
  const totalPages = Math.ceil(careerVisionSection.questions.length / QUESTIONS_PER_PAGE);

  const handleAnswerChange = (answer: Answer) => {
    setAnswers(prev => {
      const newAnswers = prev.filter(a => a.questionId !== answer.questionId);
      return [...newAnswers, answer];
    });
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      sessionStorage.setItem('visionAnswers', JSON.stringify(answers));
      navigate('/vision/results');
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Career Vision Assessment</h1>
        <ProgressBar 
          current={answers.length}
          total={careerVisionSection.questions.length}
        />
      </div>

      <div className="space-y-6">
        {currentQuestions.map(question => (
          <QuestionCard
            key={question.id}
            question={question}
            answer={answers.find(a => a.questionId === question.id)}
            onAnswerChange={handleAnswerChange}
          />
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`px-6 py-2 rounded-lg transition-colors ${
            currentPage === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {currentPage === totalPages - 1 ? 'Complete Assessment' : 'Next'}
        </button>
      </div>
    </div>
  );
}