import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LogIn, 
  Mail, 
  Lock, 
  User, 
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { saveAssessment } from '../../services/assessmentService';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      handlePostAuthRedirect();
    }
  }, [currentUser]);

  const handlePostAuthRedirect = async () => {
    const from = location.state?.from;
    if (from === 'assessment') {
      const tempAnswers = sessionStorage.getItem('tempAnswers');
      if (tempAnswers) {
        try {
          const answers = JSON.parse(tempAnswers);
          const assessmentId = await saveAssessment({
            userId: currentUser.uid,
            answers,
            result: null,
            completed: false,
            startedAt: Date.now()
          });
          sessionStorage.removeItem('tempAnswers');
          navigate('/assessment');
        } catch (error) {
          console.error('Error saving assessment:', error);
          navigate('/assessment');
        }
      } else {
        navigate('/assessment');
      }
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Email/Password auth implementation will go here
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      await signInWithGoogle();
    } catch (error: any) {
      if (error.code !== 'auth/popup-blocked') {
        setError('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-theme(spacing.20)-theme(spacing.16))] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <GraduationCap className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {location.state?.from === 'assessment' 
              ? 'Sign in to save your assessment progress and view your results' 
              : isLogin ? "Let's continue your learning journey" : 'Start your learning journey today'}
          </p>
        </div>

        {/* Rest of the AuthPage component remains the same */}
      </div>
    </div>
  );
}