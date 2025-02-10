import React, { useState, useEffect } from 'react';
import { Award, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserAssessments } from '../../services/assessmentService';

export function UserStats() {
  const [stats, setStats] = useState({
    totalAssessments: 0,
    completedAssessments: 0,
    averageScore: 0
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      if (currentUser) {
        const assessments = await getUserAssessments(currentUser.uid);
        const completed = assessments.filter(a => a.completed);
        const avgScore = completed.reduce((acc, curr) => {
          const scores = Object.values(curr.result.skills).map(s => s.score);
          return acc + (scores.reduce((a, b) => a + b, 0) / scores.length);
        }, 0) / (completed.length || 1);

        setStats({
          totalAssessments: assessments.length,
          completedAssessments: completed.length,
          averageScore: Math.round(avgScore)
        });
      }
    };

    fetchStats();
  }, [currentUser]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Your Statistics</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-2">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalAssessments}</div>
          <div className="text-sm text-gray-600">Total Assessments</div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-2">
            <Award className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.completedAssessments}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-2">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.averageScore}%</div>
          <div className="text-sm text-gray-600">Average Score</div>
        </div>
      </div>
    </div>
  );
}