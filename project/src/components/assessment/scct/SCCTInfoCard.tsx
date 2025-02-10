import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SCCTInfoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const colorMap = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  purple: 'bg-purple-100 text-purple-600',
  red: 'bg-red-100 text-red-600'
};

export function SCCTInfoCard({ title, description, icon: Icon, color }: SCCTInfoCardProps) {
  const colorClasses = colorMap[color as keyof typeof colorMap];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className={`w-12 h-12 ${colorClasses} rounded-lg flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}