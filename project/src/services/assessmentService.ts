import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  updateDoc 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Answer } from '../types/assessment';
import { AssessmentResult } from '../types/results';

export interface StoredAssessment {
  id: string;
  userId: string;
  answers: Answer[];
  result: AssessmentResult | null;
  completed: boolean;
  startedAt: number;
  completedAt?: number;
  userData?: any;
}

export async function saveAssessment(assessment: Partial<StoredAssessment>): Promise<string> {
  try {
    if (!assessment.id) {
      // Create new assessment
      const assessmentsRef = collection(db, 'assessments');
      const newAssessmentRef = doc(assessmentsRef);
      const assessmentData = {
        ...assessment,
        id: newAssessmentRef.id,
      };
      
      await setDoc(newAssessmentRef, assessmentData);
      return newAssessmentRef.id;
    } else {
      // Update existing assessment
      const assessmentRef = doc(db, 'assessments', assessment.id);
      await updateDoc(assessmentRef, assessment);
      return assessment.id;
    }
  } catch (error) {
    console.error('Error saving assessment:', error);
    throw error;
  }
}

export async function getAssessment(id: string): Promise<StoredAssessment | null> {
  try {
    const assessmentRef = doc(db, 'assessments', id);
    const assessmentDoc = await getDoc(assessmentRef);
    
    if (!assessmentDoc.exists()) {
      console.error('Assessment not found:', id);
      return null;
    }
    
    return assessmentDoc.data() as StoredAssessment;
  } catch (error) {
    console.error('Error getting assessment:', error);
    throw error;
  }
}

export async function getUserAssessments(userId: string): Promise<StoredAssessment[]> {
  try {
    const assessmentsRef = collection(db, 'assessments');
    const q = query(
      assessmentsRef,
      where('userId', '==', userId),
      orderBy('startedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as StoredAssessment);
  } catch (error) {
    console.error('Error getting user assessments:', error);
    throw error;
  }
}

export async function updateAssessmentProgress(
  id: string,
  answers: Answer[],
  completed: boolean = false
): Promise<void> {
  try {
    const assessmentRef = doc(db, 'assessments', id);
    const updateData: Partial<StoredAssessment> = {
      answers,
      completed,
    };
    
    if (completed) {
      updateData.completedAt = Date.now();
    }
    
    await updateDoc(assessmentRef, updateData);
  } catch (error) {
    console.error('Error updating assessment progress:', error);
    throw error;
  }
}