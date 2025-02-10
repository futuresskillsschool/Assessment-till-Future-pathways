import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { scctSection } from '../../../data/scctQuestions';
import { SCCTProgress } from './SCCTProgress';
import { SCCTQuestionCard } from './SCCTQuestionCard';
import { Answer } from '../../../types/assessment';

export function SCCTQuestions() {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const navigate = useNavigate();
  const questionsPerPage = 5;

  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = scctSection.questions.slice(startIndex, startIndex + questionsPerPage);
  const totalPages = Math.ceil(scctSection.questions.length / questionsPerPage);

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
      // Store answers in session storage for results page
      sessionStorage.setItem('scctAnswers', JSON.stringify(answers));
      navigate('/scct/results');
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getCurrentSection = () => {
    if (startIndex < 5) return 'Self-Efficacy';
    if (startIndex < 10) return 'Outcome Expectations';
    if (startIndex < 15) return 'Career Interests';
    if (startIndex < 20) return 'Career Goals';
    return 'Barriers and Supports';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SCCTProgress 
        currentSection={getCurrentSection()}
        progress={(answers.length / scctSection.questions.length) * 100}
        currentPage={currentPage + 1}
        totalPages={totalPages}
      />

      <div className="space-y-6 mt-8">
        {currentQuestions.map(question => (
          <SCCTQuestionCard
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