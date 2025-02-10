import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface SCCTScoreCardProps {
  score: {
    category: string;
    score: number;
    level: string;
    description: string;
    recommendations: string[];
  };
  icon: LucideIcon;
}

export function SCCTScoreCard({ score, icon: Icon }: SCCTScoreCardProps) {
  const getScoreColor = (level: string) => {
    switch (level) {
      case 'high':
        return {
          badge: 'bg-green-100 text-green-800',
          progress: 'bg-green-500',
          light: 'bg-green-50'
        };
      case 'moderate':
        return {
          badge: 'bg-yellow-100 text-yellow-800',
          progress: 'bg-yellow-500',
          light: 'bg-yellow-50'
        };
      case 'low':
        return {
          badge: 'bg-red-100 text-red-800',
          progress: 'bg-red-500',
          light: 'bg-red-50'
        };
      default:
        return {
          badge: 'bg-gray-100 text-gray-800',
          progress: 'bg-gray-500',
          light: 'bg-gray-50'
        };
    }
  };

  const colors = getScoreColor(score.level);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Icon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">{score.category}</h3>
              <div className="flex items-center mt-1">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.badge}`}>
                  {score.level.charAt(0).toUpperCase() + score.level.slice(1)}
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">{Math.round(score.score)}% Score</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-900">{Math.round(score.score)}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${colors.progress} transition-all duration-500 ease-out rounded-full`}
              style={{ width: `${score.score}%` }}
            />
          </div>
        </div>

        <div className={`${colors.light} rounded-lg p-4 mb-4`}>
          <p className="text-gray-800">{score.description}</p>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 flex items-center">
            <ChevronRight className="w-5 h-5 text-purple-600 mr-1" />
            Key Recommendations
          </h4>
          <ul className="space-y-2">
            {score.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className={`w-2 h-2 ${colors.progress} rounded-full mt-2 mr-3 flex-shrink-0`} />
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}