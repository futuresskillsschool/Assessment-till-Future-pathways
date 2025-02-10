import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Heart, Smile, Shield, Users } from 'lucide-react';

const eqAspects = [
  {
    title: 'Self-Awareness',
    description: 'Understand your emotions and reactions better',
    icon: Brain,
    color: 'purple'
  },
  {
    title: 'Empathy',
    description: 'Connect with and understand others\' feelings',
    icon: Heart,
    color: 'red'
  },
  {
    title: 'Emotional Management',
    description: 'Handle stress and emotions effectively',
    icon: Shield,
    color: 'blue'
  },
  {
    title: 'Social Skills',
    description: 'Build stronger relationships with peers',
    icon: Users,
    color: 'green'
  }
];

export function EQAssessmentLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
            <Smile className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            EQ Navigator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your emotional intelligence strengths and learn how to navigate relationships, stress, and personal growth more effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {eqAspects.map((aspect, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 bg-${aspect.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                <aspect.icon className={`w-6 h-6 text-${aspect.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{aspect.title}</h3>
              <p className="text-gray-600">{aspect.description}</p>
            </div>
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
                  <span className="text-purple-600 font-semibold">10</span>
                </div>
                <h3 className="font-semibold text-gray-900">Questions</h3>
                <p className="text-gray-600 text-sm">Real-life scenarios</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-purple-600 font-semibold">10</span>
                </div>
                <h3 className="font-semibold text-gray-900">Minutes</h3>
                <p className="text-gray-600 text-sm">Quick assessment</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-purple-600 font-semibold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900">Areas</h3>
                <p className="text-gray-600 text-sm">Key EQ dimensions</p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/eq/questions')}
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
            >
              Begin Assessment
              <span className="ml-2">→</span>
            </button>
            
            <p className="mt-4 text-sm text-gray-500">
              Designed for students aged 13-17
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}