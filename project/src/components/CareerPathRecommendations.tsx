import React from 'react';
import { Briefcase, TrendingUp, Target, Users, Book } from 'lucide-react';
import { CareerRecommendation } from '../types/career';

interface CareerPathRecommendationsProps {
  recommendations: CareerRecommendation[];
}

export function CareerPathRecommendations({ recommendations }: CareerPathRecommendationsProps) {
  return (
    <div className="space-y-6">
      {recommendations.map((rec, index) => (
        <div 
          key={index}
          className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${
            rec.matchScore >= 85 ? 'border-green-500' :
            rec.matchScore >= 70 ? 'border-blue-500' :
            'border-yellow-500'
          }`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {rec.path.title}
                </h3>
                <p className="text-gray-600 mt-1">{rec.path.description}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className={`
                  text-2xl font-bold rounded-full w-20 h-20 flex items-center justify-center
                  ${rec.matchScore >= 85 ? 'bg-green-100 text-green-700' :
                    rec.matchScore >= 70 ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'}
                `}>
                  {rec.matchScore}%
                </div>
                <span className="text-sm text-gray-600 mt-1">Match Score</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-3">
                  <Target className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-medium text-gray-900">Why This Matches You</h4>
                </div>
                <ul className="space-y-2">
                  {rec.reasonsForMatch.map((reason, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <span className="text-blue-500 mr-2">•</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                  <h4 className="font-medium text-gray-900">Salary Range</h4>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between items-center">
                    <span>Entry Level</span>
                    <span className="font-medium">{rec.path.salary.entry}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mid-Career</span>
                    <span className="font-medium">{rec.path.salary.mid}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Senior Level</span>
                    <span className="font-medium">{rec.path.salary.senior}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-3">
                <Book className="w-5 h-5 text-purple-600 mr-2" />
                <h4 className="font-medium text-gray-900">Required Skills</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {rec.path.requiredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-3">
                <Users className="w-5 h-5 text-orange-600 mr-2" />
                <h4 className="font-medium text-gray-900">Key Industries</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {rec.path.industries.map((industry, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center mb-3">
                <Briefcase className="w-5 h-5 text-indigo-600 mr-2" />
                <h4 className="font-medium text-gray-900">Next Steps</h4>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {rec.suggestedNextSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start text-gray-600">
                    <span className="text-indigo-500 mr-2">•</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}