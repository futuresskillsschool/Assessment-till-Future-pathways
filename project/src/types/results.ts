export interface TraitScore {
  trait: string;
  score: number;
  description: string;
  recommendations: string[];
}

export interface AssessmentResult {
  psychometric: {
    personalityTraits: TraitScore[];
    learningStyle: TraitScore[];
    socialBehavior: TraitScore[];
  };
  skills: {
    technical: TraitScore[];
    analytical: TraitScore[];
    soft: TraitScore[];
  };
  preferences: {
    workStyle: TraitScore[];
    careerPaths: string[];
  };
  overallRecommendations: string[];
}