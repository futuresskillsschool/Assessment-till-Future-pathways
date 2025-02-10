import React from 'react';
import { TraitScore } from '../../types/results';
import { TraitResult } from './TraitResult';

interface ResultsSectionProps {
  title: string;
  icon?: React.ReactNode;
  traits: TraitScore[];
}

export function ResultsSection({ title, icon, traits }: ResultsSectionProps) {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        {icon && <span className="text-blue-600">{icon}</span>}
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      </div>
      
      <div className="divide-y divide-gray-100">
        {traits.map((trait, index) => (
          <TraitResult key={index} trait={trait} />
        ))}
      </div>
    </section>
  );
}