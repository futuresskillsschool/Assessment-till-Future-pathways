import { Answer } from '../types/assessment';

interface SCCTScore {
  category: string;
  score: number;
  level: string;
  description: string;
  recommendations: string[];
}

interface SCCTResult {
  scores: SCCTScore[];
  overallRecommendations: string[];
  careerDirections: string[];
  developmentAreas: string[];
}

const categoryDescriptions = {
  'Self-Efficacy': {
    high: 'Strong belief in your abilities to succeed across various career-related tasks.',
    moderate: 'Moderate confidence in your career-related capabilities.',
    low: 'Room for growth in your career-related self-confidence.'
  },
  'Outcome Expectations': {
    high: 'Clear and positive expectations about career outcomes and rewards.',
    moderate: 'Balanced view of career outcomes and benefits.',
    low: 'Uncertainty about career outcomes and benefits.'
  },
  'Career Interests': {
    high: 'Strong and well-defined career interests and preferences.',
    moderate: 'Developing career interests and preferences.',
    low: 'Exploring career interests and preferences.'
  },
  'Career Goals': {
    high: 'Clear, specific, and well-planned career objectives.',
    moderate: 'Developing career goals and plans.',
    low: 'Need for more defined career goals and planning.'
  },
  'Barriers and Supports': {
    high: 'Strong support system and effective strategies for overcoming barriers.',
    moderate: 'Adequate support and awareness of barriers.',
    low: 'Need for additional support and barrier management strategies.'
  }
};

const recommendations = {
  'Self-Efficacy': {
    high: [
      'Take on leadership roles in projects',
      'Mentor others in your area of expertise',
      'Pursue advanced certifications or training'
    ],
    moderate: [
      'Set progressive challenge levels in your work',
      'Seek feedback from mentors and peers',
      'Document your achievements and successes'
    ],
    low: [
      'Break down complex tasks into smaller steps',
      'Start with achievable goals to build confidence',
      'Join supportive professional groups or communities'
    ]
  },
  'Outcome Expectations': {
    high: [
      'Research advanced career opportunities',
      'Network with industry leaders',
      'Create long-term career development plans'
    ],
    moderate: [
      'Research industry trends and opportunities',
      'Connect with professionals in your field',
      'Set specific career milestones'
    ],
    low: [
      'Explore different career paths and outcomes',
      'Talk to professionals about their experiences',
      'Learn about various career benefits and rewards'
    ]
  },
  'Career Interests': {
    high: [
      'Pursue specialized training in your areas of interest',
      'Join professional associations',
      'Attend industry conferences and workshops'
    ],
    moderate: [
      'Experiment with different work activities',
      'Take on varied projects to explore interests',
      'Shadow professionals in different roles'
    ],
    low: [
      'Try career exploration activities',
      'Take interest assessments',
      'Volunteer in different fields'
    ]
  },
  'Career Goals': {
    high: [
      'Create detailed 5-year career plan',
      'Seek advancement opportunities',
      'Build strategic professional relationships'
    ],
    moderate: [
      'Set short-term career objectives',
      'Create action plans for goals',
      'Regular goal progress review'
    ],
    low: [
      'Start with small, achievable career goals',
      'Work with a career counselor',
      'Research career paths and requirements'
    ]
  },
  'Barriers and Supports': {
    high: [
      'Help others overcome career barriers',
      'Build professional support networks',
      'Share successful strategies with peers'
    ],
    moderate: [
      'Strengthen support networks',
      'Develop contingency plans',
      'Seek additional resources and support'
    ],
    low: [
      'Identify specific barriers and challenges',
      'Connect with mentors and advisors',
      'Research support resources and programs'
    ]
  }
};

function calculateCategoryScore(answers: Answer[], categoryPrefix: string): number {
  const categoryAnswers = answers.filter(a => a.questionId.startsWith(categoryPrefix));
  if (categoryAnswers.length === 0) return 0;
  
  const total = categoryAnswers.reduce((sum, answer) => {
    return sum + (typeof answer.value === 'number' ? answer.value : 0);
  }, 0);
  
  return (total / (categoryAnswers.length * 5)) * 100;
}

function getScoreLevel(score: number): string {
  if (score >= 80) return 'high';
  if (score >= 60) return 'moderate';
  return 'low';
}

function generateCareerDirections(scores: SCCTScore[]): string[] {
  const highScores = scores.filter(s => s.score >= 80);
  const directions = [];

  if (highScores.find(s => s.category === 'Self-Efficacy')) {
    directions.push('Leadership and management roles');
    directions.push('Entrepreneurial ventures');
  }

  if (highScores.find(s => s.category === 'Career Interests')) {
    directions.push('Specialized technical roles');
    directions.push('Creative and innovative positions');
  }

  if (highScores.find(s => s.category === 'Career Goals')) {
    directions.push('Research and development');
    directions.push('Strategic planning roles');
  }

  return directions.length > 0 ? directions : ['Explore various career paths to find your best fit'];
}

export function calculateSCCTResults(answers: Answer[]): SCCTResult {
  const categories = [
    { prefix: 'se', name: 'Self-Efficacy' },
    { prefix: 'oe', name: 'Outcome Expectations' },
    { prefix: 'ci', name: 'Career Interests' },
    { prefix: 'cg', name: 'Career Goals' },
    { prefix: 'bs', name: 'Barriers and Supports' }
  ];

  const scores = categories.map(cat => {
    const score = calculateCategoryScore(answers, cat.prefix);
    const level = getScoreLevel(score);
    return {
      category: cat.name,
      score,
      level,
      description: categoryDescriptions[cat.name][level],
      recommendations: recommendations[cat.name][level]
    };
  });

  const careerDirections = generateCareerDirections(scores);
  const developmentAreas = scores
    .filter(s => s.score < 60)
    .map(s => s.category);

  const overallRecommendations = [
    'Focus on developing areas with lower scores through targeted activities and learning',
    'Build on your strengths in high-scoring areas',
    'Seek mentorship and guidance in your career development journey',
    'Regularly review and update your career goals and plans',
    'Continue to build your professional network and support system'
  ];

  return {
    scores,
    overallRecommendations,
    careerDirections,
    developmentAreas
  };
}