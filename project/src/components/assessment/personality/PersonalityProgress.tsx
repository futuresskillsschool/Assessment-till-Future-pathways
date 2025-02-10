import React from 'react';
import { Heart } from 'lucide-react';

interface PersonalityProgressProps {
  progress: number;
  currentPage: number;
  totalPages: number;
}

export function PersonalityProgress({ progress, currentPage, totalPages }: PersonalityProgressProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-green-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">Personality Assessment</h2>
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
          className="bg-green-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}