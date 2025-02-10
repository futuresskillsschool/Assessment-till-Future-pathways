import { Answer } from '../types/assessment';

interface RIASECScore {
  type: string;
  score: number;
  description: string;
  careers: string[];
  characteristics: string[];
  workEnvironments: string[];
}

interface RIASECResult {
  scores: RIASECScore[];
  primaryTypes: string[];
  secondaryTypes: string[];
  careerSuggestions: string[];
  overallRecommendations: string[];
}

const RIASEC_TYPES: Record<string, {
  questions: string[];
  description: string;
  careers: string[];
  characteristics: string[];
  workEnvironments: string[];
}> = {
  'Realistic': {
    questions: ['r1', 'r2'],
    description: 'You enjoy hands-on activities and working with tools, machines, or technology.',
    careers: [
      'Computer Technician',
      'Video Game Developer',
      'Robotics Engineer',
      'Sports Coach',
      'Mobile App Developer',
      'Digital Content Creator'
    ],
    characteristics: [
      'Practical',
      'Technical-minded',
      'Hands-on',
      'Systematic',
      'Athletic'
    ],
    workEnvironments: [
      'Technology labs',
      'Gaming studios',
      'Sports facilities',
      'Maker spaces',
      'Digital workshops'
    ]
  },
  'Investigative': {
    questions: ['i1', 'i2'],
    description: 'You enjoy solving problems, conducting experiments, and understanding how things work.',
    careers: [
      'Data Scientist',
      'AI Researcher',
      'Environmental Scientist',
      'Cybersecurity Analyst',
      'Medical Researcher',
      'Tech Innovation Specialist'
    ],
    characteristics: [
      'Analytical',
      'Curious',
      'Problem-solver',
      'Detail-oriented',
      'Scientific'
    ],
    workEnvironments: [
      'Research labs',
      'Tech companies',
      'Innovation centers',
      'Science facilities',
      'Digital research hubs'
    ]
  },
  'Artistic': {
    questions: ['a1', 'a2'],
    description: 'You enjoy creative activities and expressing yourself through art, music, or design.',
    careers: [
      'Digital Artist',
      'UX/UI Designer',
      'Social Media Creator',
      'Game Designer',
      'Music Producer',
      'Animation Artist'
    ],
    characteristics: [
      'Creative',
      'Imaginative',
      'Original',
      'Expressive',
      'Design-oriented'
    ],
    workEnvironments: [
      'Design studios',
      'Digital media agencies',
      'Gaming companies',
      'Creative spaces',
      'Content creation studios'
    ]
  },
  'Social': {
    questions: ['s1', 's2'],
    description: 'You enjoy working with and helping others learn and grow.',
    careers: [
      'Online Teacher',
      'Social Media Manager',
      'Community Manager',
      'Digital Learning Specialist',
      'Youth Counselor',
      'E-sports Coach'
    ],
    characteristics: [
      'Helpful',
      'Collaborative',
      'Understanding',
      'Patient',
      'Communicative'
    ],
    workEnvironments: [
      'Online learning platforms',
      'Social media teams',
      'Community organizations',
      'Digital education spaces',
      'Youth centers'
    ]
  },
  'Enterprising': {
    questions: ['e1', 'e2'],
    description: 'You enjoy leading projects and influencing others with your ideas.',
    careers: [
      'Tech Startup Founder',
      'Digital Marketing Manager',
      'E-commerce Entrepreneur',
      'Content Creator',
      'Project Leader',
      'Innovation Manager'
    ],
    characteristics: [
      'Leadership-oriented',
      'Persuasive',
      'Goal-driven',
      'Confident',
      'Initiative-taking'
    ],
    workEnvironments: [
      'Start-up companies',
      'Digital marketing firms',
      'Online businesses',
      'Tech incubators',
      'Innovation hubs'
    ]
  },
  'Conventional': {
    questions: ['c1', 'c2'],
    description: 'You enjoy organizing information and following clear procedures.',
    careers: [
      'Data Analyst',
      'Digital Project Manager',
      'Quality Assurance Tester',
      'Financial Technology Specialist',
      'Systems Administrator',
      'Digital Operations Coordinator'
    ],
    characteristics: [
      'Organized',
      'Detail-focused',
      'Systematic',
      'Precise',
      'Structured'
    ],
    workEnvironments: [
      'Tech companies',
      'Digital operations centers',
      'Online platforms',
      'Financial technology firms',
      'Data centers'
    ]
  }
};

function calculateTypeScore(answers: Answer[], questionIds: string[]): number {
  const relevantAnswers = answers.filter(a => questionIds.includes(a.questionId));
  if (relevantAnswers.length === 0) return 0;
  
  const total = relevantAnswers.reduce((sum, answer) => {
    return sum + (typeof answer.value === 'number' ? answer.value : 0);
  }, 0);
  
  // Calculate percentage based on maximum possible score (5 points per question)
  return Math.round((total / (relevantAnswers.length * 5)) * 100);
}

function generateCareerSuggestions(primaryTypes: string[]): string[] {
  const suggestions: string[] = [];
  
  // Get top 2 careers from each primary type
  primaryTypes.forEach(type => {
    const careers = RIASEC_TYPES[type].careers.slice(0, 2);
    suggestions.push(...careers);
  });
  
  return [...new Set(suggestions)]; // Remove duplicates
}

function generateRecommendations(scores: RIASECScore[]): string[] {
  const recommendations: string[] = [];
  const highScores = scores.filter(s => s.score >= 70);
  
  // Add personalized recommendations based on high scores
  if (highScores.length > 0) {
    recommendations.push(
      `Focus on careers that combine your strongest interests: ${highScores.map(s => s.type).join(', ')}`
    );
    
    highScores.forEach(score => {
      recommendations.push(
        `Explore activities related to ${score.type} interests like ${score.characteristics.slice(0, 2).join(' and ')}`
      );
    });
  }
  
  // Add general recommendations for teenagers
  recommendations.push(
    'Join clubs or activities that match your interests',
    'Look for online courses or tutorials in your areas of interest',
    'Talk to people working in careers you find interesting',
    'Consider summer programs or workshops in these fields'
  );
  
  return recommendations;
}

export function calculateRIASECResults(answers: Answer[]): RIASECResult {
  // Calculate scores for each type
  const scores = Object.entries(RIASEC_TYPES).map(([type, data]) => ({
    type,
    score: calculateTypeScore(answers, data.questions),
    description: data.description,
    careers: data.careers,
    characteristics: data.characteristics,
    workEnvironments: data.workEnvironments
  }));
  
  // Sort scores from highest to lowest
  scores.sort((a, b) => b.score - a.score);
  
  // Identify primary (≥70%) and secondary (50-69%) types
  const primaryTypes = scores
    .filter(s => s.score >= 70)
    .map(s => s.type);
    
  const secondaryTypes = scores
    .filter(s => s.score >= 50 && s.score < 70)
    .map(s => s.type);
  
  return {
    scores,
    primaryTypes,
    secondaryTypes,
    careerSuggestions: generateCareerSuggestions(primaryTypes),
    overallRecommendations: generateRecommendations(scores)
  };
}