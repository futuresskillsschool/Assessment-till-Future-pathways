import React from 'react';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface LoginButtonProps {
  className?: string;
}

export function LoginButton({ className }: LoginButtonProps) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (currentUser) {
        await logout();
        navigate('/');
      } else {
        navigate('/auth');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <button
      onClick={handleAuth}
      className={className || "flex items-center px-4 py-2 bg-white text-gray-800 rounded-lg shadow hover:shadow-md transition-all duration-200"}
    >
      <LogIn className="w-5 h-5 mr-2" />
      <span>{currentUser ? 'Sign Out' : 'Sign In'}</span>
    </button>
  );
}