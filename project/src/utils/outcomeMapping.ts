import { Answer } from '../types/assessment';
import { AssessmentResult, TraitScore } from '../types/results';
import { calculateWellbeingScores } from './wellbeingMapping';

// Trait categories with question mappings
const PERSONALITY_TRAITS = {
  OPENNESS: ['p1', 'p2', 'p13', 'p14', 'p15', 'p34'],
  CONSCIENTIOUSNESS: ['p3', 'p4', 'p19', 'p20', 'p33', 'p21'],
  EXTRAVERSION: ['p5', 'p6', 'p27', 'p29'],
  AGREEABLENESS: ['p7', 'p8', 'p16', 'p17', 'p26'],
  EMOTIONAL_STABILITY: ['p9', 'p10']
};

// Learning style categories
const LEARNING_STYLES = {
  ANALYTICAL: ['p11', 'p12', 'p13', 's3', 's4'],
  CREATIVE: ['p14', 'p15', 'pref4', 's5'],
  PRACTICAL: ['p3', 'p4', 'p33', 's1'],
  SOCIAL: ['p27', 'pref5']
};

function calculateTraitScore(answers: Answer[], questionIds: string[]): number {
  const relevantAnswers = answers.filter(a => questionIds.includes(a.questionId));
  if (relevantAnswers.length === 0) return 0;
  
  const total = relevantAnswers.reduce((sum, answer) => {
    let value = 0;
    if (typeof answer.value === 'number') {
      value = answer.value;
    } else if (Array.isArray(answer.value)) {
      value = (answer.value.length / questionIds.length) * 5;
    }
    return sum + value;
  }, 0);
  
  return Math.round((total / (relevantAnswers.length * 5)) * 100);
}

function getPersonalityTraitDescription(trait: string, score: number): TraitScore {
  const descriptions: Record<string, TraitScore> = {
    OPENNESS: {
      trait: 'Openness to Experience',
      score,
      description: score > 70 
        ? 'Highly curious and creative with a strong appetite for learning' 
        : 'Practical and conventional in approach',
      recommendations: score > 70 
        ? [
          'Consider careers in research, innovation, or creative fields',
          'Look for roles that involve continuous learning',
          'Seek opportunities for creative problem-solving'
        ] 
        : [
          'Consider structured roles with clear guidelines',
          'Focus on practical, hands-on work',
          'Look for positions with established procedures'
        ]
    },
    CONSCIENTIOUSNESS: {
      trait: 'Conscientiousness',
      score,
      description: score > 70 
        ? 'Highly organized and detail-oriented with strong work ethic' 
        : 'Flexible and adaptable in approach',
      recommendations: score > 70 
        ? [
          'Consider project management or administrative roles',
          'Look for positions requiring attention to detail',
          'Seek roles with clear processes and structure'
        ] 
        : [
          'Consider dynamic, creative positions',
          'Look for roles with variety and flexibility',
          'Seek positions that value adaptability'
        ]
    },
    EXTRAVERSION: {
      trait: 'Extraversion',
      score,
      description: score > 70 
        ? 'Outgoing and energized by social interaction' 
        : 'Reserved and comfortable working independently',
      recommendations: score > 70 
        ? [
          'Consider roles involving people interaction',
          'Look for team-based environments',
          'Seek positions with networking opportunities'
        ] 
        : [
          'Consider roles allowing independent work',
          'Look for positions requiring focus and concentration',
          'Seek environments with moderate social interaction'
        ]
    },
    AGREEABLENESS: {
      trait: 'Agreeableness',
      score,
      description: score > 70 
        ? 'Cooperative and focused on helping others' 
        : 'Independent and task-focused',
      recommendations: score > 70 
        ? [
          'Consider helping professions or support roles',
          'Look for collaborative environments',
          'Seek positions involving mentoring or teaching'
        ] 
        : [
          'Consider analytical or technical roles',
          'Look for positions requiring objective decision-making',
          'Seek roles with clear performance metrics'
        ]
    },
    EMOTIONAL_STABILITY: {
      trait: 'Emotional Stability',
      score,
      description: score > 70 
        ? 'Calm and resilient under pressure' 
        : 'Sensitive to environment and change',
      recommendations: score > 70 
        ? [
          'Consider high-pressure or dynamic roles',
          'Look for positions with significant responsibility',
          'Seek challenging environments'
        ] 
        : [
          'Consider structured, predictable environments',
          'Look for positions with good work-life balance',
          'Seek supportive work cultures'
        ]
    }
  };
  
  return descriptions[trait] || {
    trait,
    score,
    description: score > 70 ? 'Strong capability' : 'Area for development',
    recommendations: [
      score > 70 
        ? 'Continue leveraging this strength in your career choices'
        : 'Consider development opportunities in this area'
    ]
  };
}

export function calculateResults(answers: Answer[]): AssessmentResult {
  // Calculate personality traits
  const personalityTraits = Object.entries(PERSONALITY_TRAITS).map(([trait, questions]) => {
    const score = calculateTraitScore(answers, questions);
    return getPersonalityTraitDescription(trait, score);
  });

  // Calculate learning styles
  const learningStyles = Object.entries(LEARNING_STYLES).map(([style, questions]) => ({
    trait: style,
    score: calculateTraitScore(answers, questions),
    description: `Your preference for ${style.toLowerCase()} learning`,
    recommendations: []
  }));

  // Calculate wellbeing scores
  const wellbeingScores = calculateWellbeingScores(answers);

  // Generate overall recommendations
  const recommendations = [
    ...personalityTraits
      .filter(trait => trait.score >= 70)
      .map(trait => `Your strong ${trait.trait} suggests you would excel in roles that value these characteristics.`),
    ...wellbeingScores
      .filter(score => score.score < 60)
      .map(score => `Consider focusing on ${score.category.toLowerCase()} development through ${score.recommendations[0].toLowerCase()}`)
  ];

  return {
    psychometric: {
      personalityTraits,
      learningStyle: learningStyles,
      socialBehavior: wellbeingScores
    },
    skills: {
      technical: {
        trait: 'Technical Skills',
        score: calculateTraitScore(answers, ['s1', 's2', 'pref3']),
        description: 'Your technical and analytical capabilities',
        recommendations: []
      },
      analytical: {
        trait: 'Analytical Skills',
        score: calculateTraitScore(answers, ['s3', 's4']),
        description: 'Your problem-solving and logical thinking abilities',
        recommendations: []
      },
      soft: [
        {
          trait: 'Communication',
          score: calculateTraitScore(answers, ['s7', 's8']),
          description: 'Your ability to communicate and collaborate effectively',
          recommendations: []
        }
      ]
    },
    preferences: {
      workStyle: [
        {
          trait: 'Team Collaboration',
          score: calculateTraitScore(answers, ['pref1', 'pref5']),
          description: 'Your preference for working in teams',
          recommendations: []
        }
      ],
      careerPaths: []
    },
    overallRecommendations: recommendations
  };
}