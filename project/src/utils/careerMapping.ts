import { CareerPath, CareerRecommendation } from '../types/career';
import { AssessmentResult } from '../types/results';

// ... (keep existing code until generateCareerRecommendations function)

export function generateCareerRecommendations(
  result: AssessmentResult,
  preferredSkills?: string[]
): CareerRecommendation[] {
  // Calculate matches for all careers
  const recommendations = careerPaths.map(career => {
    const personalityScore = calculatePersonalityMatch(result, career);
    const skillsScore = calculateSkillsMatch(result, career);
    const preferredSkillsScore = preferredSkills ? matchPreferredSkills(preferredSkills, career) : 0;
    
    const totalScore = (personalityScore + skillsScore + (preferredSkillsScore || 0)) / 
      (preferredSkills ? 3 : 2);

    return {
      path: career,
      reasonsForMatch: generateMatchReasons(result, career),
      suggestedNextSteps: generateNextSteps(career)
    };
  });

  // Sort by match score and return top 2 recommendations
  return recommendations
    .sort((a, b) => {
      const aScore = calculateOverallFit(a, result);
      const bScore = calculateOverallFit(b, result);
      return bScore - aScore;
    })
    .slice(0, 2);
}

function calculateOverallFit(recommendation: CareerRecommendation, result: AssessmentResult): number {
  // Complex fit calculation based on multiple factors
  const personalityFit = recommendation.reasonsForMatch.length;
  const skillsFit = recommendation.path.requiredSkills.filter(skill => 
    result.skills.technical.score > 70 || 
    result.skills.analytical.score > 70 ||
    result.skills.soft.some(s => s.score > 70)
  ).length;
  
  return personalityFit + skillsFit;
}