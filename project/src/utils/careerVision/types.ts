// Types for Career Vision Assessment
export interface CareerVisionScore {
  trait: string;
  score: number;
  description: string;
  recommendations: string[];
  suitableCareers: string[];
}

export interface CareerVisionResult {
  personalityProfile: {
    score: number;
    traits: CareerVisionScore[];
  };
  aptitudeAnalysis: {
    score: number;
    traits: CareerVisionScore[];
  };
  careerInterests: {
    primaryClusters: string[];
    secondaryClusters: string[];
    workStylePreference: string;
  };
  recommendedStreams: {
    primary: string[];
    secondary: string[];
  };
  recommendations: {
    immediate: string[];
    longTerm: string[];
    skillDevelopment: string[];
  };
  bigFiveAnalysis: {
    traits: Array<{
      name: string;
      score: number;
      description: string;
      careerImplications: string[];
    }>;
    summary: string;
  };
  riasecAnalysis: {
    primary: Array<{
      type: string;
      score: number;
      description: string;
      careers: string[];
    }>;
    secondary: Array<{
      type: string;
      score: number;
      description: string;
      careers: string[];
    }>;
    summary: string;
  };
}