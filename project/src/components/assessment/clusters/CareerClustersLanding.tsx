import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket,
  Code,
  Palette,
  Database,
  Briefcase,
  Heart
} from 'lucide-react';

const clusters = [
  {
    title: 'Tech Innovator & Builder',
    description: 'Create and build the technologies of tomorrow',
    icon: Code,
    color: 'blue'
  },
  {
    title: 'Digital Creator & Storyteller',
    description: 'Design immersive digital experiences and content',
    icon: Palette,
    color: 'purple'
  },
  {
    title: 'Data Analyst & Scientist',
    description: 'Decode patterns and insights from data',
    icon: Database,
    color: 'green'
  },
  {
    title: 'Future-Focused Entrepreneur',
    description: 'Lead innovation and build tech ventures',
    icon: Briefcase,
    color: 'orange'
  },
  {
    title: 'Tech-Enabled Helper',
    description: 'Use technology to solve social challenges',
    icon: Heart,
    color: 'red'
  }
];

export function CareerClustersLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Rocket className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Future Pathways Explorer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover which emerging tech-focused career clusters align with your interests and explore exciting future possibilities in the digital age.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {clusters.map((cluster, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 bg-${cluster.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                <cluster.icon className={`w-6 h-6 text-${cluster.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{cluster.title}</h3>
              <p className="text-gray-600">{cluster.description}</p>
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
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-semibold">15</span>
                </div>
                <h3 className="font-semibold text-gray-900">Questions</h3>
                <p className="text-gray-600 text-sm">Quick assessment</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-semibold">10</span>
                </div>
                <h3 className="font-semibold text-gray-900">Minutes</h3>
                <p className="text-gray-600 text-sm">Average time</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-semibold">5</span>
                </div>
                <h3 className="font-semibold text-gray-900">Clusters</h3>
                <p className="text-gray-600 text-sm">Career categories</p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/clusters/questions')}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
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