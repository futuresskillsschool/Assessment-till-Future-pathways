import React from 'react';
import { CareerPathRecommendations } from '../CareerPathRecommendations';

interface ResultsRecommendationsProps {
  careerRecommendations: any[];
  overallRecommendations: string[];
}

export function ResultsRecommendations({ 
  careerRecommendations, 
  overallRecommendations 
}: ResultsRecommendationsProps) {
  return (
    <>
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Career Recommendations</h2>
        <CareerPathRecommendations recommendations={careerRecommendations} />
      </section>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Overall Recommendations</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-3">
          {overallRecommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </section>
    </>
  );
}