export interface CareerPath {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  personalityFit: string[];
  growthPotential: string;
  salary: {
    entry: string;
    mid: string;
    senior: string;
  };
  industries: string[];
}

export interface CareerRecommendation {
  path: CareerPath;
  reasonsForMatch: string[];
  suggestedNextSteps: string[];
}