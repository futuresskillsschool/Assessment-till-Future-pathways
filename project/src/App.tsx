import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/pages/Home';
import { CareerAssessmentLanding } from './components/assessment/CareerAssessmentLanding';
import { AssessmentQuestions } from './components/assessment/AssessmentQuestions';
import { ResultsPage } from './components/ResultsPage';
import { AuthPage } from './components/auth/AuthPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { SCCTAssessmentLanding } from './components/assessment/scct/SCCTAssessmentLanding';
import { SCCTQuestions } from './components/assessment/scct/SCCTQuestions';
import { SCCTResults } from './components/assessment/scct/SCCTResults';
import { PersonalityAssessmentLanding } from './components/assessment/personality/PersonalityAssessmentLanding';
import { PersonalityQuestions } from './components/assessment/personality/PersonalityQuestions';
import { PersonalityResults } from './components/assessment/personality/PersonalityResults';
import { RIASECLanding } from './components/assessment/riasec/RIASECLanding';
import { RIASECQuestions } from './components/assessment/riasec/RIASECQuestions';
import { RIASECResults } from './components/assessment/riasec/RIASECResults';
import { CareerVisionLanding } from './components/assessment/vision/CareerVisionLanding';
import { CareerVisionQuestions } from './components/assessment/vision/CareerVisionQuestions';
import { CareerVisionResults } from './components/assessment/vision/CareerVisionResults';
import { EQAssessmentLanding } from './components/assessment/eq/EQAssessmentLanding';
import { EQQuestions } from './components/assessment/eq/EQQuestions';
import { EQResults } from './components/assessment/eq/EQResults';
import { CareerClustersLanding } from './components/assessment/clusters/CareerClustersLanding';
import { CareerClustersQuestions } from './components/assessment/clusters/CareerClustersQuestions';
import { CareerClustersResults } from './components/assessment/clusters/CareerClustersResults';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow pt-20 pb-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/assessment" element={<CareerAssessmentLanding />} />
                <Route path="/assessment/questions" element={<AssessmentQuestions />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/scct" element={<SCCTAssessmentLanding />} />
                <Route path="/scct/questions" element={<SCCTQuestions />} />
                <Route path="/scct/results" element={<SCCTResults />} />
                <Route path="/personality" element={<PersonalityAssessmentLanding />} />
                <Route path="/personality/questions" element={<PersonalityQuestions />} />
                <Route path="/personality/results" element={<PersonalityResults />} />
                <Route path="/riasec" element={<RIASECLanding />} />
                <Route path="/riasec/questions" element={<RIASECQuestions />} />
                <Route path="/riasec/results" element={<RIASECResults />} />
                <Route path="/vision" element={<CareerVisionLanding />} />
                <Route path="/vision/questions" element={<CareerVisionQuestions />} />
                <Route path="/vision/results" element={<CareerVisionResults />} />
                <Route path="/eq" element={<EQAssessmentLanding />} />
                <Route path="/eq/questions" element={<EQQuestions />} />
                <Route path="/eq/results" element={<EQResults />} />
                <Route path="/clusters" element={<CareerClustersLanding />} />
                <Route path="/clusters/questions" element={<CareerClustersQuestions />} />
                <Route path="/clusters/results" element={<CareerClustersResults />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}