import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Heart, Users, Smile, Shield } from 'lucide-react';

const personalityTraits = [
  {
    title: 'Openness',
    description: 'Your curiosity and willingness to try new experiences',
    icon: Brain,
    color: 'blue'
  },
  {
    title: 'Conscientiousness',
    description: 'Your organization and responsibility levels',
    icon: Shield,
    color: 'green'
  },
  {
    title: 'Extraversion',
    description: 'Your social energy and interaction preferences',
    icon: Users,
    color: 'yellow'
  },
  {
    title: 'Agreeableness',
    description: 'Your empathy and cooperation with others',
    icon: Heart,
    color: 'red'
  },
  {
    title: 'Neuroticism',
    description: 'Your emotional stability and stress response',
    icon: Smile,
    color: 'purple'
  }
];

export function PersonalityAssessmentLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Heart className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Personality Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your unique personality traits and understand how they influence your behavior, relationships, and career choices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {personalityTraits.map((trait, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 bg-${trait.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                <trait.icon className={`w-6 h-6 text-${trait.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{trait.title}</h3>
              <p className="text-gray-600">{trait.description}</p>
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
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-green-600 font-semibold">10</span>
                </div>
                <h3 className="font-semibold text-gray-900">Questions</h3>
                <p className="text-gray-600 text-sm">Quick assessment</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-green-600 font-semibold">5</span>
                </div>
                <h3 className="font-semibold text-gray-900">Minutes</h3>
                <p className="text-gray-600 text-sm">Average completion time</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-green-600 font-semibold">5</span>
                </div>
                <h3 className="font-semibold text-gray-900">Traits</h3>
                <p className="text-gray-600 text-sm">Personality dimensions</p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/personality/questions')}
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
            >
              Begin Assessment
              <span className="ml-2">→</span>
            </button>
            
            <p className="mt-4 text-sm text-gray-500">
              Takes only 5 minutes to complete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}