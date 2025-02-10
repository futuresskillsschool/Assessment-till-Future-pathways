import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AssessmentHistory } from './AssessmentHistory';
import { UserStats } from './UserStats';
import { RecommendedPaths } from './RecommendedPaths';
import { ProgressOverview } from './ProgressOverview';

export function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser.displayName}!</h1>
        <p className="mt-2 text-gray-600">Track your progress and view your assessment results</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <UserStats />
        <ProgressOverview />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AssessmentHistory />
        </div>
        <div>
          <RecommendedPaths />
        </div>
      </div>
    </div>
  );
}