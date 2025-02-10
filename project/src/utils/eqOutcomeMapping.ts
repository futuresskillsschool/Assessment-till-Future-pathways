import { Answer } from '../types/assessment';

interface EQScore {
  category: string;
  score: number;
  level: string;
  description: string;
  strengths: string[];
  growthAreas: string[];
  recommendations: string[];
}

interface EQResult {
  totalScore: number;
  level: string;
  title: string;
  summary: string;
  scores: EQScore[];
  overallRecommendations: string[];
  resources: Array<{ title: string; url: string }>;
}

// Map answer values to scores (1-5)
const ANSWER_SCORES: Record<string, Record<string, number>> = {
  'eq1': {
    'Get angry and accuse them of not caring about you': 1,
    'Feel disappointed but try to understand why they might be distracted': 5,
    'Pretend you\'re not bothered, even though you\'re a little hurt': 3,
    'Stop talking about your news and change the subject': 2
  },
  'eq2': {
    'Laugh along with the classmate': 1,
    'Ignore it and hope it stops': 2,
    'Tell the classmate that it\'s not okay and support the targeted student': 5,
    'Tell the targeted student to ignore the comments': 3
  },
  'eq3': {
    'Isolate yourself and worry constantly': 1,
    'Talk to someone and find healthy ways to manage stress': 5,
    'Procrastinate and avoid thinking about the exams': 2,
    'Try to convince yourself you don\'t care about the exams': 2
  },
  'eq4': {
    'Offer a listening ear and support, letting them know you\'re there': 5,
    'Try to give them advice, even if you\'re not sure what to say': 3,
    'Avoid them because you don\'t know how to handle the situation': 1,
    'Tell them to "toughen up"': 1
  },
  'eq5': {
    'Get defensive and argue with the person giving feedback': 1,
    'Listen to the feedback and try to learn from it': 5,
    'Feel hurt and take it personally': 2,
    'Ignore the feedback completely': 1
  },
  'eq6': {
    'Resort to personal insults and name-calling': 1,
    'Try to see things from their perspective and find a compromise': 5,
    'Refuse to talk to your friend anymore': 2,
    'Give them the silent treatment': 1
  },
  'eq7': {
    'Brag about your achievement to everyone': 2,
    'Celebrate your success and acknowledge your effort': 5,
    'Downplay your achievement, as if it wasn\'t a big deal': 3,
    'Immediately start worrying about your next goal': 2
  },
  'eq8': {
    'Blame someone else': 1,
    'Take responsibility and try to fix the mistake': 5,
    'Try to hide the mistake': 2,
    'Beat yourself up about it excessively': 2
  },
  'eq9': {
    'Ignore them': 2,
    'Make fun of them': 1,
    'Introduce yourself and try to make them feel welcome': 5,
    'Observe them from a distance but don\'t interact': 2
  },
  'eq10': {
    'Try to suppress or ignore your feelings': 2,
    'Find healthy ways to express your emotions': 5,
    'Lash out at others': 1,
    'Engage in self-destructive behaviors': 1
  }
};

const CATEGORIES = {
  'Self-Awareness': ['eq3', 'eq5', 'eq7', 'eq10'],
  'Empathy': ['eq1', 'eq2', 'eq4', 'eq9'],
  'Emotional Management': ['eq6', 'eq8']
};

function calculateCategoryScore(answers: Answer[], questionIds: string[]): number {
  const relevantAnswers = answers.filter(a => questionIds.includes(a.questionId));
  if (relevantAnswers.length === 0) return 0;

  const total = relevantAnswers.reduce((sum, answer) => {
    const questionScores = ANSWER_SCORES[answer.questionId];
    // Get the score based on the selected answer text
    const score = questionScores[answer.value as string] || 1;
    return sum + score;
  }, 0);

  // Calculate percentage: (total / (max possible score per question * number of questions)) * 100
  return Math.round((total / (5 * relevantAnswers.length)) * 100);
}

function getScoreLevel(score: number): string {
  if (score >= 70) return 'high';
  if (score >= 50) return 'moderate';
  return 'low';
}

function getCategoryDetails(category: string, score: number): EQScore {
  const level = getScoreLevel(score);
  const levels = {
    high: level === 'high',
    moderate: level === 'moderate',
    low: level === 'low'
  };

  const details: Record<string, {
    description: string;
    strengths: string[];
    growthAreas: string[];
    recommendations: string[];
  }> = {
    'Self-Awareness': {
      description: levels.high 
        ? 'You show strong self-awareness and understanding of your emotions'
        : levels.moderate
        ? 'You have a developing sense of self-awareness'
        : 'You could benefit from developing stronger self-awareness',
      strengths: levels.high 
        ? ['Recognize and understand your emotions well', 'Good at self-reflection']
        : ['Some ability to recognize emotions', 'Willing to learn and grow'],
      growthAreas: levels.high
        ? ['Continue developing emotional vocabulary', 'Share insights with others']
        : ['Practice identifying emotions', 'Develop self-reflection habits'],
      recommendations: levels.high
        ? ['Keep a mood journal', 'Share your experiences with peers']
        : ['Start mindfulness practices', 'Talk to trusted adults about feelings']
    },
    'Empathy': {
      description: levels.high
        ? 'You show strong empathy and understanding for others'
        : levels.moderate
        ? 'You show developing empathy skills'
        : 'You could benefit from developing stronger empathy',
      strengths: levels.high
        ? ['Good at understanding others\' feelings', 'Supportive friend']
        : ['Show potential for empathy', 'Care about others'],
      growthAreas: levels.high
        ? ['Lead by example', 'Help others develop empathy']
        : ['Practice perspective-taking', 'Listen more actively'],
      recommendations: levels.high
        ? ['Mentor others', 'Join peer support programs']
        : ['Practice active listening', 'Read stories about different experiences']
    },
    'Emotional Management': {
      description: levels.high
        ? 'You handle emotions effectively and positively'
        : levels.moderate
        ? 'You show developing emotional management skills'
        : 'You could benefit from developing better emotional management',
      strengths: levels.high
        ? ['Good emotional regulation', 'Positive coping strategies']
        : ['Some coping mechanisms', 'Willing to improve'],
      growthAreas: levels.high
        ? ['Share strategies with others', 'Handle complex situations']
        : ['Develop healthy coping strategies', 'Practice stress management'],
      recommendations: levels.high
        ? ['Learn advanced coping techniques', 'Help others manage stress']
        : ['Try breathing exercises', 'Talk to counselors about stress management']
    }
  };

  return {
    category,
    score,
    level,
    ...details[category]
  };
}

export function calculateEQResults(answers: Answer[]): EQResult {
  const categoryScores = Object.entries(CATEGORIES).map(([category, questionIds]) => {
    const score = calculateCategoryScore(answers, questionIds);
    return getCategoryDetails(category, score);
  });

  const totalScore = Math.round(
    categoryScores.reduce((sum, cat) => sum + cat.score, 0) / categoryScores.length
  );

  const level = getScoreLevel(totalScore);
  const levels = {
    expert: level === 'high',
    proficient: level === 'moderate',
    developing: level === 'low' && totalScore >= 40,
    emerging: level === 'low' && totalScore < 40
  };

  const result: EQResult = {
    totalScore,
    level,
    title: levels.expert 
      ? 'Empathetic Explorer'
      : levels.proficient
      ? 'Developing Navigator'
      : levels.developing
      ? 'Emerging Explorer'
      : 'Compass Explorer',
    summary: levels.expert
      ? 'You demonstrate exceptional emotional intelligence across multiple areas. Your ability to understand and manage emotions, both your own and others\', is impressive.'
      : levels.proficient
      ? 'You show strong emotional intelligence skills with some areas for growth. You\'re on a great path to developing even stronger emotional awareness and management.'
      : levels.developing
      ? 'You\'re developing your emotional intelligence skills. With practice and support, you can strengthen these important abilities.'
      : 'You\'re at the beginning of your emotional intelligence journey. Everyone starts somewhere, and there\'s great potential for growth!',
    scores: categoryScores,
    overallRecommendations: [
      'Practice mindfulness and self-reflection daily',
      'Seek support from trusted adults when needed',
      'Join school clubs or activities to practice social skills',
      'Read books or watch videos about emotional intelligence',
      'Keep a journal to track your emotional experiences'
    ],
    resources: [
      {
        title: 'Mindfulness for Teens',
        url: 'https://mindfulnessforteens.com'
      },
      {
        title: 'Child Mind Institute',
        url: 'https://childmind.org'
      },
      {
        title: 'NIMHANS Youth Resources',
        url: 'https://nimhans.ac.in/pssmhs-nimhans/youth-resources/'
      }
    ]
  };

  return result;
}