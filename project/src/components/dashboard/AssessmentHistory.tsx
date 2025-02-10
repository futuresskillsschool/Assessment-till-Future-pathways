import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Calendar, Clock, CheckCircle, Download } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserAssessments, StoredAssessment } from '../../services/assessmentService';
import { generateResultsPDF } from '../../utils/pdfGenerator';

export function AssessmentHistory() {
  const [assessments, setAssessments] = useState<StoredAssessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssessments = async () => {
      if (currentUser) {
        try {
          const userAssessments = await getUserAssessments(currentUser.uid);
          setAssessments(userAssessments);
        } catch (error) {
          console.error('Error fetching assessments:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAssessments();
  }, [currentUser]);

  const handleDownloadPDF = async (assessment: StoredAssessment) => {
    try {
      setDownloadingId(assessment.id);
      await generateResultsPDF(assessment.result, assessment.userData);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Assessment History</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Assessment History</h2>
      {assessments.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-gray-600">No assessments completed yet</p>
          <button
            onClick={() => navigate('/assessment')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Assessment
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {assessments.map((assessment) => (
            <div
              key={assessment.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Career Assessment {assessment.completed && <CheckCircle className="inline-block w-4 h-4 text-green-500 ml-2" />}
                  </h3>
                  <div className="mt-1 text-sm text-gray-600 space-y-1">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(assessment.startedAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {assessment.completed ? 'Completed' : 'In Progress'}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {assessment.completed && (
                    <button
                      onClick={() => handleDownloadPDF(assessment)}
                      disabled={downloadingId === assessment.id}
                      className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      {downloadingId === assessment.id ? 'Downloading...' : 'Download PDF'}
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/results/${assessment.id}`)}
                    className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View Results
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}