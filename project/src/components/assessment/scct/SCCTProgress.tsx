import React from 'react';
import { Brain, Target, Lightbulb, Puzzle, Shield } from 'lucide-react';

interface SCCTProgressProps {
  currentSection: string;
  progress: number;
  currentPage: number;
  totalPages: number;
}

const sectionIcons = {
  'Self-Efficacy': Brain,
  'Outcome Expectations': Target,
  'Career Interests': Lightbulb,
  'Career Goals': Puzzle,
  'Barriers and Supports': Shield
};

export function SCCTProgress({ currentSection, progress, currentPage, totalPages }: SCCTProgressProps) {
  const Icon = sectionIcons[currentSection as keyof typeof sectionIcons];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Icon className="w-5 h-5 text-purple-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">{currentSection}</h2>
            <p className="text-sm text-gray-600">Page {currentPage} of {totalPages}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-gray-900">{Math.round(progress)}%</span>
          <span className="text-sm text-gray-500"> completed</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}