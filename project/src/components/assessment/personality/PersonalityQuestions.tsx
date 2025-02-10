import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { personalitySection } from '../../../data/personalityQuestions';
import { PersonalityProgress } from './PersonalityProgress';
import { PersonalityQuestionCard } from './PersonalityQuestionCard';
import { Answer } from '../../../types/assessment';

export function PersonalityQuestions() {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const navigate = useNavigate();
  const questionsPerPage = 5;

  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = personalitySection.questions.slice(startIndex, startIndex + questionsPerPage);
  const totalPages = Math.ceil(personalitySection.questions.length / questionsPerPage);

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
      sessionStorage.setItem('personalityAnswers', JSON.stringify(answers));
      navigate('/personality/results');
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
      <PersonalityProgress 
        progress={(answers.length / personalitySection.questions.length) * 100}
        currentPage={currentPage + 1}
        totalPages={totalPages}
      />

      <div className="space-y-6 mt-8">
        {currentQuestions.map(question => (
          <PersonalityQuestionCard
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
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {currentPage === totalPages - 1 ? 'Complete Assessment' : 'Next'}
        </button>
      </div>
    </div>
  );
}