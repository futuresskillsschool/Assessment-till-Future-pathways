import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserAssessments } from '../../services/assessmentService';

export function ProgressOverview() {
  const [progress, setProgress] = useState({
    psychometric: 0,
    skills: 0,
    preferences: 0
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchProgress = async () => {
      if (currentUser) {
        const assessments = await getUserAssessments(currentUser.uid);
        const latestAssessment = assessments[0];

        if (latestAssessment && !latestAssessment.completed) {
          const sectionProgress = {
            psychometric: 0,
            skills: 0,
            preferences: 0
          };

          latestAssessment.answers.forEach(answer => {
            if (answer.questionId.startsWith('p')) sectionProgress.psychometric++;
            if (answer.questionId.startsWith('s')) sectionProgress.skills++;
            if (answer.questionId.startsWith('pref')) sectionProgress.preferences++;
          });

          setProgress({
            psychometric: Math.min(100, (sectionProgress.psychometric / 67) * 100),
            skills: Math.min(100, (sectionProgress.skills / 14) * 100),
            preferences: Math.min(100, (sectionProgress.preferences / 13) * 100)
          });
        }
      }
    };

    fetchProgress();
  }, [currentUser]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Current Progress</h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Psychometric Assessment</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progress.psychometric)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress.psychometric}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Skills Assessment</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progress.skills)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress.skills}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Preferences Assessment</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progress.preferences)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress.preferences}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}