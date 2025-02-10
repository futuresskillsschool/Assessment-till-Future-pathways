import React from 'react';
import { Lightbulb, Target, AlertTriangle } from 'lucide-react';

interface SCCTRecommendationsProps {
  recommendations: string[];
  careerDirections: string[];
  developmentAreas: string[];
}

export function SCCTRecommendations({
  recommendations,
  careerDirections,
  developmentAreas
}: SCCTRecommendationsProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Target className="w-6 h-6 text-purple-600 mr-2" />
          <h2 className="text-2xl font-semibold text-gray-900">Suggested Career Directions</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {careerDirections.map((direction, index) => (
            <div
              key={index}
              className="bg-purple-50 rounded-lg p-4 border border-purple-100"
            >
              <p className="text-purple-900">{direction}</p>
            </div>
          ))}
        </div>
      </div>

      {developmentAreas.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-900">Areas for Development</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {developmentAreas.map((area, index) => (
              <div
                key={index}
                className="bg-yellow-50 rounded-lg p-4 border border-yellow-100"
              >
                <p className="text-yellow-900">{area}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Lightbulb className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-2xl font-semibold text-gray-900">Overall Recommendations</h2>
        </div>
        <ul className="space-y-3">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span className="text-gray-700">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}