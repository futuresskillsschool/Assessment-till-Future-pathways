import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Wrench, 
  Search, 
  Heart, 
  Briefcase, 
  Palette 
} from 'lucide-react';

const riasecTypes = [
  {
    title: 'Realistic',
    description: 'Hands-on problem solver who likes working with tools, machines, or nature',
    icon: Wrench,
    color: 'blue'
  },
  {
    title: 'Investigative',
    description: 'Analytical thinker who likes to explore and solve complex problems',
    icon: Search,
    color: 'green'
  },
  {
    title: 'Artistic',
    description: 'Creative individual who enjoys self-expression through art and design',
    icon: Palette,
    color: 'yellow'
  },
  {
    title: 'Social',
    description: 'Helper who enjoys working with and helping others',
    icon: Heart,
    color: 'red'
  },
  {
    title: 'Enterprising',
    description: 'Leader who likes to influence, persuade, and manage others',
    icon: Briefcase,
    color: 'purple'
  },
  {
    title: 'Conventional',
    description: 'Organizer who enjoys working with data, details, and processes',
    icon: Compass,
    color: 'orange'
  }
];

export function RIASECLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
            <Compass className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            RIASEC Career Model
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your career interests using Holland's RIASEC model to find occupations that match your personality type.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {riasecTypes.map((type, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 bg-${type.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                <type.icon className={`w-6 h-6 text-${type.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-gray-600">{type.description}</p>
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
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-orange-600 font-semibold">9</span>
                </div>
                <h3 className="font-semibold text-gray-900">Questions</h3>
                <p className="text-gray-600 text-sm">Quick assessment</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-orange-600 font-semibold">5</span>
                </div>
                <h3 className="font-semibold text-gray-900">Minutes</h3>
                <p className="text-gray-600 text-sm">Average completion time</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-orange-600 font-semibold">6</span>
                </div>
                <h3 className="font-semibold text-gray-900">Categories</h3>
                <p className="text-gray-600 text-sm">RIASEC dimensions</p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/riasec/questions')}
              className="inline-flex items-center px-8 py-4 bg-orange-600 text-white rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg"
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