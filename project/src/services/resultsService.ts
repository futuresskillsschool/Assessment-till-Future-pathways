import { AssessmentResult } from '../types/results';
import { Answer } from '../types/assessment';

const RESULTS_STORAGE_KEY = 'assessmentResults';

export interface StoredResults {
  result: AssessmentResult;
  userData: any;
  answers: Answer[];
  completedAt: number;
}

export function saveResults(data: StoredResults): void {
  try {
    if (!data.result || !data.answers) {
      throw new Error('Invalid results data');
    }
    sessionStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving results:', error);
    throw new Error('Failed to save assessment results');
  }
}

export function loadResults(): StoredResults | null {
  try {
    const stored = sessionStorage.getItem(RESULTS_STORAGE_KEY);
    if (!stored) return null;
    
    const data = JSON.parse(stored);
    if (!data.result || !data.answers) {
      throw new Error('Invalid stored results data');
    }
    
    return data;
  } catch (error) {
    console.error('Error loading results:', error);
    sessionStorage.removeItem(RESULTS_STORAGE_KEY);
    return null;
  }
}

export function clearResults(): void {
  try {
    sessionStorage.removeItem(RESULTS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing results:', error);
  }
}