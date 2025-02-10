import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Clock, Brain, BarChart } from 'lucide-react';
import { AssessmentInfo } from './AssessmentInfo';
import { AssessmentSteps } from './AssessmentSteps';

export function CareerAssessmentLanding() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
          <Target className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Career Path Assessment
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover your ideal career path through our comprehensive assessment that analyzes your personality, skills, and preferences.
        </p>
      </div>

      <AssessmentInfo />
      <AssessmentSteps onBegin={() => navigate('/assessment/questions')} />
    </div>
  );
}