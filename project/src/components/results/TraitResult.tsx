import React from 'react';
import { TraitScore } from '../../types/results';

interface TraitResultProps {
  trait: TraitScore;
}

function getScoreLabel(score: number): { text: string; className: string } {
  if (score >= 80) {
    return { text: 'High', className: 'bg-green-100 text-green-800' };
  } else if (score >= 60) {
    return { text: 'Moderate', className: 'bg-yellow-100 text-yellow-800' };
  } else {
    return { text: 'Low', className: 'bg-red-100 text-red-800' };
  }
}

export function TraitResult({ trait }: TraitResultProps) {
  const scoreLabel = getScoreLabel(trait.score);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold text-gray-900">{trait.trait}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${scoreLabel.className}`}>
          {scoreLabel.text}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${trait.score}%` }}
        />
      </div>

      <div className="space-y-4">
        <p className="text-gray-700">{trait.description}</p>
        
        {trait.recommendations.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Recommendations:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {trait.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}