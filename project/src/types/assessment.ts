export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'boolean' | 'multiple' | 'choice';
  options?: string[];
}

export interface Answer {
  questionId: string;
  value: string | number;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export type AssessmentSection = 'psychometric' | 'skills' | 'preferences';