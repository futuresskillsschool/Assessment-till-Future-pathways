import { Answer } from '../../types/assessment';
import { CareerVisionResult } from './types';
import { calculateBigFiveAnalysis } from './bigFiveAnalysis';
import { calculateRIASECScores } from './riasecAnalysis';
import { calculateAptitudeScore, getAptitudeDescription, getAptitudeRecommendations } from './aptitudeAnalysis';
import { 
  getStreamRecommendations, 
  generateImmediateRecommendations, 
  generateLongTermRecommendations,
  generateSkillDevelopmentRecommendations 
} from './recommendations';

export function calculateCareerVisionResults(answers: Answer[]): CareerVisionResult {
  const bigFiveAnalysis = calculateBigFiveAnalysis(answers);
  const riasecAnalysis = calculateRIASECScores(answers);
  
  const aptitudeAnswers = answers.filter(a => ['cv23', 'cv24', 'cv25', 'cv26'].includes(a.questionId));
  const aptitudeScore = calculateAptitudeScore(aptitudeAnswers);
  
  const careerInterestAnswer = answers.find(a => a.questionId === 'cv29');
  const careerInterests = Array.isArray(careerInterestAnswer?.value) ? careerInterestAnswer.value : [];
  
  const workStyleAnswer = answers.find(a => a.questionId === 'cv30');
  const workStyle = workStyleAnswer?.value || 'Mixed environment';
  
  const streamRecs = getStreamRecommendations(bigFiveAnalysis.traits, aptitudeScore);

  return {
    personalityProfile: {
      score: Math.round(bigFiveAnalysis.traits.reduce((sum, t) => sum + t.score, 0) / 5),
      traits: bigFiveAnalysis.traits.map(t => ({
        trait: t.name,
        score: t.score,
        description: t.description,
        recommendations: t.careerImplications,
        suitableCareers: []
      }))
    },
    aptitudeAnalysis: {
      score: aptitudeScore,
      traits: [{
        trait: 'Logical Reasoning',
        score: aptitudeScore,
        description: getAptitudeDescription(aptitudeScore),
        recommendations: getAptitudeRecommendations(aptitudeScore),
        suitableCareers: []
      }]
    },
    careerInterests: {
      primaryClusters: careerInterests.slice(0, 3),
      secondaryClusters: careerInterests.slice(3),
      workStylePreference: workStyle
    },
    recommendedStreams: streamRecs,
    recommendations: {
      immediate: generateImmediateRecommendations(streamRecs.primary),
      longTerm: generateLongTermRecommendations(careerInterests),
      skillDevelopment: generateSkillDevelopmentRecommendations(bigFiveAnalysis.traits)
    },
    bigFiveAnalysis,
    riasecAnalysis
  };
}