import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Target, Lightbulb, Puzzle, Shield } from 'lucide-react';
import { SCCTInfoCard } from './SCCTInfoCard';

const sections = [
  {
    title: 'Self-Efficacy',
    description: 'Evaluate your confidence and belief in your abilities to succeed in various career-related tasks.',
    icon: Brain,
    color: 'blue'
  },
  {
    title: 'Outcome Expectations',
    description: 'Understand your beliefs about the potential results and rewards of your career choices.',
    icon: Target,
    color: 'green'
  },
  {
    title: 'Career Interests',
    description: 'Explore your preferences for different types of work activities and environments.',
    icon: Lightbulb,
    color: 'yellow'
  },
  {
    title: 'Career Goals',
    description: 'Assess your short-term and long-term career aspirations and planning.',
    icon: Puzzle,
    color: 'purple'
  },
  {
    title: 'Barriers & Supports',
    description: 'Identify factors that may help or hinder your career development journey.',
    icon: Shield,
    color: 'red'
  }
];

export function SCCTAssessmentLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
            <Brain className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            SCCT Career Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on Social Cognitive Career Theory, this assessment helps you understand your career development through the lens of self-beliefs, expectations, and goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sections.map((section, index) => (
            <SCCTInfoCard key={index} {...section} />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              What to Expect
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-purple-600 font-semibold">25</span>
                </div>
                <h3 className="font-semibold text-gray-900">Questions</h3>
                <p className="text-gray-600 text-sm">Comprehensive evaluation</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-purple-600 font-semibold">15</span>
                </div>
                <h3 className="font-semibold text-gray-900">Minutes</h3>
                <p className="text-gray-600 text-sm">Average completion time</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-purple-600 font-semibold">5</span>
                </div>
                <h3 className="font-semibold text-gray-900">Categories</h3>
                <p className="text-gray-600 text-sm">Key SCCT dimensions</p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/scct/questions')}
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
            >
              Begin Assessment
              <span className="ml-2">→</span>
            </button>
            
            <p className="mt-4 text-sm text-gray-500">
              Your responses will be saved automatically
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}