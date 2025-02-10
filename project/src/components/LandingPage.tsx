import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Compass, Brain, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function LandingPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleBeginAssessment = () => {
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Your Perfect Career Path
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take our comprehensive career assessment to uncover your strengths, interests, and ideal career matches. Get personalized recommendations based on your unique profile.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Psychometric Analysis</h3>
            <p className="text-gray-600">
              Understand your personality traits, behaviors, and natural inclinations through scientifically validated assessments.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Compass className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Skills and Aptitude Analysis</h3>
            <p className="text-gray-600">
              Evaluate your technical abilities, problem-solving capabilities, and cognitive skills to identify your core strengths and potential growth areas.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Preferences Analysis</h3>
            <p className="text-gray-600">
              Discover your ideal work environment, preferred career paths, and long-term professional goals through comprehensive preference mapping.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our comprehensive assessment takes about 20-30 minutes to complete. You'll receive detailed insights and personalized career recommendations upon completion.
          </p>
          <button
            onClick={handleBeginAssessment}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            Begin Assessment
          </button>
        </div>
      </div>
    </div>
  );
}