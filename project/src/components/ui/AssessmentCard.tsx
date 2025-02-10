import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface AssessmentCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'blue' | 'purple' | 'green' | 'orange';
  link: string;
}

const colorMap = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600'
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600'
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600'
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-600'
  }
};

export function AssessmentCard({ id, title, description, icon: Icon, color, link }: AssessmentCardProps) {
  const colors = colorMap[color];
  
  return (
    <Link
      to={link}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="p-8">
        <div className={`w-16 h-16 rounded-full ${colors.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-8 h-8 ${colors.text}`} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          {title}
        </h2>
        <p className="text-gray-600">
          {description}
        </p>
        <div className="mt-6 flex items-center text-blue-600 font-medium">
          Take Assessment
          <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
        </div>
      </div>
    </Link>
  );
}