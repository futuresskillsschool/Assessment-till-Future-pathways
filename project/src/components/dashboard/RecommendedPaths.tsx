import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserAssessments } from '../../services/assessmentService';
import { generateCareerRecommendations } from '../../utils/careerMapping';

export function RecommendedPaths() {
  const [recommendations, setRecommendations] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (currentUser) {
        const assessments = await getUserAssessments(currentUser.uid);
        const completedAssessments = assessments.filter(a => a.completed);
        
        if (completedAssessments.length > 0) {
          const latestAssessment = completedAssessments[0];
          const careerRecs = generateCareerRecommendations(latestAssessment.result);
          setRecommendations(careerRecs.slice(0, 3));
        }
      }
    };

    fetchRecommendations();
  }, [currentUser]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recommended Career Paths</h2>
      {recommendations.length === 0 ? (
        <div className="text-center py-8">
          <Compass className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-gray-600">Complete an assessment to get personalized recommendations</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((rec: any, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{rec.path.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{rec.path.description}</p>
                </div>
                <div className="ml-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {rec.matchScore}% Match
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}