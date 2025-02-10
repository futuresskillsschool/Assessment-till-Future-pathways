import { Answer } from '../types/assessment';

interface PersonalityScore {
  trait: string;
  score: number;
  level: string;
  description: string;
  recommendations: string[];
}

interface PersonalityResult {
  scores: PersonalityScore[];
  overallRecommendations: string[];
  dominantTraits: string[];
  developmentAreas: string[];
}

const traitDescriptions = {
  'Openness': {
    high: 'You are curious, creative, and open to new experiences.',
    moderate: 'You balance tradition with new experiences.',
    low: 'You prefer routine and familiar experiences.'
  },
  'Conscientiousness': {
    high: 'You are organized, responsible, and goal-oriented.',
    moderate: 'You maintain a balance between structure and flexibility.',
    low: 'You prefer a more relaxed and spontaneous approach.'
  },
  'Extraversion': {
    high: 'You are outgoing, energetic, and socially confident.',
    moderate: 'You adapt well to both social and solitary situations.',
    low: 'You prefer quiet, solitary activities.'
  },
  'Agreeableness': {
    high: 'You are compassionate, cooperative, and considerate of others.',
    moderate: 'You balance cooperation with self-assertion.',
    low: 'You are direct and prefer independence.'
  },
  'Neuroticism': {
    high: 'You experience emotions intensely and may be sensitive to stress.',
    moderate: 'You handle stress and emotions with reasonable balance.',
    low: 'You are emotionally stable and resilient to stress.'
  }
};

const recommendations = {
  'Openness': {
    high: [
      'Pursue creative or innovative roles',
      'Seek opportunities for continuous learning',
      'Consider careers in arts, research, or innovation'
    ],
    moderate: [
      'Balance routine tasks with creative projects',
      'Look for roles that combine structure with innovation',
      'Consider project-based work'
    ],
    low: [
      'Focus on roles with clear procedures',
      'Look for positions requiring attention to detail',
      'Consider traditional or structured environments'
    ]
  },
  'Conscientiousness': {
    high: [
      'Seek leadership or management roles',
      'Consider project management positions',
      'Look for roles requiring high organization'
    ],
    moderate: [
      'Balance planning with flexibility',
      'Consider roles with varied responsibilities',
      'Look for positions combining structure and creativity'
    ],
    low: [
      'Consider dynamic, flexible roles',
      'Look for positions with variety',
      'Focus on short-term projects'
    ]
  },
  'Extraversion': {
    high: [
      'Pursue roles involving people interaction',
      'Consider sales or public relations',
      'Look for team-based environments'
    ],
    moderate: [
      'Seek balanced roles with both team and individual work',
      'Consider consulting or teaching',
      'Look for positions with varied interaction levels'
    ],
    low: [
      'Consider roles requiring focus and concentration',
      'Look for positions with independent work',
      'Focus on analytical or technical roles'
    ]
  },
  'Agreeableness': {
    high: [
      'Consider helping professions',
      'Look for collaborative team environments',
      'Pursue roles in counseling or support'
    ],
    moderate: [
      'Seek roles balancing teamwork and independence',
      'Consider mediation or coordination positions',
      'Look for positions requiring diplomacy'
    ],
    low: [
      'Consider decision-making roles',
      'Look for positions requiring objectivity',
      'Focus on analytical or strategic roles'
    ]
  },
  'Neuroticism': {
    high: [
      'Seek roles with clear structure',
      'Consider positions with predictable environments',
      'Look for supportive work cultures'
    ],
    moderate: [
      'Balance challenging with stable responsibilities',
      'Consider roles with moderate pressure',
      'Look for positions with good work-life balance'
    ],
    low: [
      'Consider high-pressure roles',
      'Look for positions with significant responsibility',
      'Pursue leadership opportunities'
    ]
  }
};

function calculateTraitScore(answers: Answer[], prefix: string): number {
  const traitAnswers = answers.filter(a => a.questionId.startsWith(prefix));
  if (traitAnswers.length === 0) return 0;
  
  const total = traitAnswers.reduce((sum, answer) => {
    return sum + (typeof answer.value === 'number' ? answer.value : 0);
  }, 0);
  
  return (total / (traitAnswers.length * 5)) * 100;
}

function getScoreLevel(score: number): string {
  if (score >= 80) return 'high';
  if (score >= 60) return 'moderate';
  return 'low';
}

export function calculatePersonalityResults(answers: Answer[]): PersonalityResult {
  const traits = [
    { prefix: 'o', name: 'Openness' },
    { prefix: 'c', name: 'Conscientiousness' },
    { prefix: 'e', name: 'Extraversion' },
    { prefix: 'a', name: 'Agreeableness' },
    { prefix: 'n', name: 'Neuroticism' }
  ];

  const scores = traits.map(trait => {
    const score = calculateTraitScore(answers, trait.prefix);
    const level = getScoreLevel(score);
    return {
      trait: trait.name,
      score,
      level,
      description: traitDescriptions[trait.name][level],
      recommendations: recommendations[trait.name][level]
    };
  });

  const dominantTraits = scores
    .filter(s => s.score >= 80)
    .map(s => s.trait);

  const developmentAreas = scores
    .filter(s => s.score < 60)
    .map(s => s.trait);

  const overallRecommendations = [
    'Focus on roles that align with your personality strengths',
    'Consider development opportunities in lower-scoring areas',
    'Seek environments that match your interaction preferences',
    'Build on your natural tendencies while remaining adaptable',
    'Consider how your personality traits influence your work style'
  ];

  return {
    scores,
    overallRecommendations,
    dominantTraits,
    developmentAreas
  };
}