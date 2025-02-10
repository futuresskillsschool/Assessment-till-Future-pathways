import React from 'react';
import { ProgressBar } from './ProgressBar';
import { Section } from '../types/assessment';

interface SectionHeaderProps {
  section: Section;
  answeredCount: number;
}

export function SectionHeader({ section, answeredCount }: SectionHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        {section.title}
      </h2>
      <p className="text-gray-600 mb-4">{section.description}</p>
      <ProgressBar
        current={answeredCount}
        total={section.questions.length}
      />
    </div>
  );
}