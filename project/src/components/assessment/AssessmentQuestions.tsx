import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentProgress } from './AssessmentProgress';
import { PaginatedQuestions } from './PaginatedQuestions';
import { LeadForm, LeadFormData } from '../LeadForm';
import { Answer, AssessmentSection as SectionType } from '../../types/assessment';
import { psychometricSection } from '../../data/psychometricQuestions';
import { skillsSection } from '../../data/skillsQuestions';
import { preferencesSection } from '../../data/preferencesQuestions';
import { calculateResults } from '../../utils/outcomeMapping';

const QUESTIONS_PER_PAGE = 5;

export function AssessmentQuestions() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<SectionType>('psychometric');
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sections = [
    { id: 'psychometric', title: 'Psychometric' },
    { id: 'skills', title: 'Skills & Aptitude' },
    { id: 'preferences', title: 'Preferences' }
  ].map((section) => ({
    ...section,
    completed: completedSections.includes(section.id),
    active: section.id === currentSection
  }));

  const getCurrentSection = () => {
    switch (currentSection) {
      case 'psychometric':
        return psychometricSection;
      case 'skills':
        return skillsSection;
      case 'preferences':
        return preferencesSection;
      default:
        return psychometricSection;
    }
  };

  const handleAnswerChange = (answer: Answer) => {
    setAnswers((prev) => {
      const newAnswers = prev.filter((a) => a.questionId !== answer.questionId);
      return [...newAnswers, answer];
    });
  };

  const handleNextPage = () => {
    const currentSectionQuestions = getCurrentSection().questions;
    const totalPages = Math.ceil(currentSectionQuestions.length / QUESTIONS_PER_PAGE);

    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setCompletedSections(prev => [...prev, currentSection]);
      
      if (currentSection === 'psychometric') {
        setCurrentSection('skills');
        setCurrentPage(0);
      } else if (currentSection === 'skills') {
        setCurrentSection('preferences');
        setCurrentPage(0);
      } else {
        setShowLeadForm(true);
      }
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      if (currentSection === 'skills') {
        setCurrentSection('psychometric');
        setCurrentPage(Math.ceil(psychometricSection.questions.length / QUESTIONS_PER_PAGE) - 1);
      } else if (currentSection === 'preferences') {
        setCurrentSection('skills');
        setCurrentPage(Math.ceil(skillsSection.questions.length / QUESTIONS_PER_PAGE) - 1);
      }
    }
  };

  const handleLeadFormSubmit = async (data: LeadFormData) => {
    try {
      setIsSubmitting(true);
      const results = calculateResults(answers);
      
      sessionStorage.setItem('assessmentResults', JSON.stringify({
        answers,
        result: results,
        userData: data,
        completedAt: Date.now()
      }));
      
      navigate('/results', { replace: true });
    } catch (error) {
      console.error('Error processing assessment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showLeadForm) {
    return <LeadForm onSubmit={handleLeadFormSubmit} />;
  }

  const currentSectionData = getCurrentSection();

  return (
    <div className="py-8">
      <AssessmentProgress sections={sections} />
      <PaginatedQuestions
        questions={currentSectionData.questions}
        currentPage={currentPage}
        questionsPerPage={QUESTIONS_PER_PAGE}
        answers={answers.filter((a) =>
          currentSectionData.questions.some((q) => q.id === a.questionId)
        )}
        onAnswerChange={handleAnswerChange}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        totalQuestions={
          psychometricSection.questions.length +
          skillsSection.questions.length +
          preferencesSection.questions.length
        }
      />
    </div>
  );
}