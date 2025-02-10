import React from 'react';
import { Clock, Brain, BarChart } from 'lucide-react';

const infoCards = [
  {
    icon: Clock,
    title: '20-30 Minutes',
    description: 'Average completion time',
    color: 'blue'
  },
  {
    icon: Brain,
    title: '94 Questions',
    description: 'Comprehensive analysis',
    color: 'green'
  },
  {
    icon: BarChart,
    title: 'Detailed Report',
    description: 'Personalized insights',
    color: 'purple'
  }
];

export function AssessmentInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {infoCards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className={`inline-flex items-center justify-center w-12 h-12 bg-${card.color}-100 rounded-full mb-4`}>
            <card.icon className={`w-6 h-6 text-${card.color}-600`} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
          <p className="text-gray-600">{card.description}</p>
        </div>
      ))}
    </div>
  );
}