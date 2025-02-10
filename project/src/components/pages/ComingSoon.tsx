import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

export function ComingSoon() {
  return (
    <div className="min-h-[calc(100vh-theme(spacing.20)-theme(spacing.16))] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
          <Clock className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Coming Soon
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          We're working hard to bring you this assessment. Stay tuned for updates!
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}