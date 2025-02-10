import { RouteObject } from 'react-router-dom';
import { LandingPage } from '../components/LandingPage';
import { AssessmentContainer } from '../components/assessment/AssessmentContainer';
import { ResultsPage } from '../components/ResultsPage';
import { AuthPage } from '../components/auth/AuthPage';
import { Dashboard } from '../components/dashboard/Dashboard';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/auth',
    element: <AuthPage />
  },
  {
    path: '/assessment',
    element: <AssessmentContainer />
  },
  {
    path: '/results',
    element: <ResultsPage />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  }
];