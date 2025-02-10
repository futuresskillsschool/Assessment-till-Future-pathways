import React from 'react';
import { CareerRecommendation } from '../types/career';
import { Briefcase, TrendingUp, Building, GraduationCap } from 'lucide-react';

interface CareerRecommendationsProps {
  recommendations: CareerRecommendation[];
}

export function CareerRecommendations({ recommendations }: CareerRecommendationsProps) {
  return (
    <div className="space-y-8">
      {recommendations.map((rec, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              {rec.path.title}
            </h3>
            <p className="text-gray-600">{rec.path.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-3">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-medium text-gray-900">Salary Progression</h4>
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

            <div>
              <div className="flex items-center mb-3">
                <GraduationCap className="w-5 h-5 text-purple-600 mr-2" />
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
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center mb-3">
              <Building className="w-5 h-5 text-orange-600 mr-2" />
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
      ))}
    </div>
  );
}