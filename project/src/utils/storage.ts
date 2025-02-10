import { Answer } from '../types/assessment';

const STORAGE_KEY = 'future_skills_assessment';

export interface StoredAssessment {
  answers: Answer[];
  timestamp: number;
  completed: boolean;
  sessionId?: string;
  userData?: any;
}

export function saveAssessmentProgress(data: StoredAssessment): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...data,
      sessionId: data.sessionId || generateSessionId(),
    }));
  } catch (error) {
    console.error('Error saving assessment progress:', error);
  }
}

export function loadAssessmentProgress(): StoredAssessment | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored);
    // Check if the session is older than 30 minutes
    if (Date.now() - data.timestamp > 30 * 60 * 1000) {
      clearAssessmentProgress();
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error loading assessment progress:', error);
    return null;
  }
}

export function clearAssessmentProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing assessment progress:', error);
  }
}

function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}