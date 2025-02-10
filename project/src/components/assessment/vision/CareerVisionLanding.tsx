import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Target, Brain, Heart, Compass } from 'lucide-react';

const visionAspects = [
  {
    title: 'Self-Discovery',
    description: 'Understand your core values, interests, and natural inclinations',
    icon: Eye,
    color: 'blue'
  },
  {
    title: 'Skills Analysis',
    description: 'Evaluate your current abilities and potential for growth',
    icon: Brain,
    color: 'purple'
  },
  {
    title: 'Career Alignment',
    description: 'Match your profile with suitable career paths',
    icon: Target,
    color: 'green'
  },
  {
    title: 'Future Planning',
    description: 'Create a roadmap for your professional development',
    icon: Compass,
    color: 'orange'
  }
];

export function CareerVisionLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
            <Eye className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Career Vision Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your professional path and create a clear vision for your future career through our comprehensive assessment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {visionAspects.map((aspect, index) => (
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
                  <span className="text-purple-600 font-semibold">32</span>
                </div>
                <h3 className="font-semibold text-gray-900">Questions</h3>
                <p className="text-gray-600 text-sm">Comprehensive evaluation</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-purple-600 font-semibold">20</span>
                </div>
                <h3 className="font-semibold text-gray-900">Minutes</h3>
                <p className="text-gray-600 text-sm">Average completion time</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-purple-600 font-semibold">4</span>
                </div>
                <h3 className="font-semibold text-gray-900">Sections</h3>
                <p className="text-gray-600 text-sm">Comprehensive analysis</p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/vision/questions')}
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
            >
              Begin Assessment
              <span className="ml-2">→</span>
            </button>
            
            <p className="mt-4 text-sm text-gray-500">
              Takes only 20 minutes to complete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}