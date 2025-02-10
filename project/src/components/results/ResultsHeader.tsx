import React from 'react';
import { Download } from 'lucide-react';

interface ResultsHeaderProps {
  onDownload: () => void;
}

export function ResultsHeader({ onDownload }: ResultsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Your Assessment Results</h1>
      <button
        onClick={onDownload}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Download className="w-4 h-4 mr-2" />
        Download PDF
      </button>
    </div>
  );
}