import React from 'react';
import { QuestionCard } from './QuestionCard';
import { SectionHeader } from './SectionHeader';
import { Section, Answer } from '../types/assessment';

interface AssessmentSectionProps {
  section: Section;
  answers: Answer[];
  onAnswerChange: (answer: Answer) => void;
}

export function AssessmentSection({ section, answers, onAnswerChange }: AssessmentSectionProps) {
  return (
    <div>
      <SectionHeader 
        section={section}
        answeredCount={answers.length}
      />
      
      {section.questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          answer={answers.find((a) => a.questionId === question.id)}
          onAnswerChange={onAnswerChange}
        />
      ))}
    </div>
  );
}