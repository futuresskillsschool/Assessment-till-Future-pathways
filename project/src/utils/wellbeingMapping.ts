import { Answer } from '../types/assessment';

interface WellbeingScore {
  category: string;
  score: number;
  level: string;
  description: string;
  recommendations: string[];
}

const CATEGORIES = {
  SOCIAL_INTERACTION: ['si1', 'si2', 'si3'],
  EMOTIONAL_WELLBEING: ['mw1', 'mw2', 'mw3', 'mw4'],
  FAMILY_SUPPORT: ['fh1', 'fh2', 'fh3'],
  ACADEMIC_ADJUSTMENT: ['sa1', 'sa2', 'sa3', 'sa4']
};

function calculateCategoryScore(answers: Answer[], questionIds: string[]): number {
  const relevantAnswers = answers.filter(a => questionIds.includes(a.questionId));
  if (relevantAnswers.length === 0) return 0;

  const valueMap = {
    'Very Comfortable': 5, 'Mostly Comfortable': 4, 'Neutral': 3, 'Mostly Uncomfortable': 2, 'Very Uncomfortable': 1,
    'Very Often': 5, 'Often': 4, 'Sometimes': 3, 'Rarely': 2, 'Never': 1,
    'Very positive': 5, 'Mostly positive': 4, 'Neutral': 3, 'Mostly negative': 2, 'Very negative': 1,
    'Not at all': 5, 'Several days': 4, 'More than half the days': 2, 'Nearly every day': 1,
    'Very Supported': 5, 'Mostly Supported': 4, 'Not Very Supported': 2, 'Not at all Supported': 1,
    'Very Open': 5, 'Mostly Open': 4, 'Mostly Closed': 2, 'Very Closed': 1,
    'Very Well': 5, 'Mostly Well': 4, 'Not Very Well': 2, 'Not at all Well': 1,
    'Very Confident': 5, 'Mostly Confident': 4, 'Not Very Confident': 2, 'Not at all Confident': 1,
    'I find them very motivating': 5, 'I find them somewhat motivating': 4, 'I feel neutral': 3,
    'I find them somewhat overwhelming': 2, 'I find them very overwhelming': 1,
    'I feel very comfortable sharing': 5, 'I feel somewhat comfortable sharing': 4,
    'I feel somewhat uncomfortable sharing': 2, 'I feel very uncomfortable sharing': 1
  };

  const total = relevantAnswers.reduce((sum, answer) => {
    const value = valueMap[answer.value as keyof typeof valueMap] || 3; // Default to neutral if not found
    return sum + value;
  }, 0);

  return Math.round((total / (relevantAnswers.length * 5)) * 100);
}

function getCategoryDescription(category: string, score: number): WellbeingScore {
  const descriptions: Record<string, WellbeingScore> = {
    SOCIAL_INTERACTION: {
      category: 'Social Interaction',
      score,
      level: score > 70 ? 'Strong' : score > 40 ? 'Moderate' : 'Developing',
      description: score > 70 
        ? 'Highly comfortable and engaged in social interactions'
        : score > 40
        ? 'Moderately comfortable in social situations'
        : 'May benefit from developing social confidence',
      recommendations: score > 70
        ? ['Continue fostering positive social connections', 'Consider mentoring others', 'Take on leadership roles']
        : score > 40
        ? ['Gradually increase social participation', 'Practice sharing ideas in small groups', 'Join study groups']
        : ['Start with one-on-one interactions', 'Set small social goals', 'Seek supportive environments']
    },
    EMOTIONAL_WELLBEING: {
      category: 'Emotional Well-being',
      score,
      level: score > 70 ? 'Strong' : score > 40 ? 'Moderate' : 'Needs Support',
      description: score > 70
        ? 'Maintaining positive emotional balance'
        : score > 40
        ? 'Managing emotions with some challenges'
        : 'May benefit from additional emotional support',
      recommendations: score > 70
        ? ['Continue healthy coping strategies', 'Share success with others', 'Maintain work-life balance']
        : score > 40
        ? ['Develop stress management techniques', 'Practice self-care regularly', 'Seek support when needed']
        : ['Consider counseling support', 'Build regular relaxation practices', 'Create a support network']
    },
    FAMILY_SUPPORT: {
      category: 'Family Support',
      score,
      level: score > 70 ? 'Strong' : score > 40 ? 'Moderate' : 'Developing',
      description: score > 70
        ? 'Strong family support system'
        : score > 40
        ? 'Moderate family support with some areas for improvement'
        : 'May benefit from strengthening family connections',
      recommendations: score > 70
        ? ['Maintain open communication', 'Share goals and progress', 'Include family in career planning']
        : score > 40
        ? ['Schedule regular family discussions', 'Share academic challenges', 'Build trust gradually']
        : ['Seek additional support systems', 'Consider family counseling', 'Build communication skills']
    },
    ACADEMIC_ADJUSTMENT: {
      category: 'Academic Adjustment',
      score,
      level: score > 70 ? 'Strong' : score > 40 ? 'Moderate' : 'Developing',
      description: score > 70
        ? 'Well-adjusted to academic demands'
        : score > 40
        ? 'Managing academic requirements with some challenges'
        : 'May benefit from additional academic support',
      recommendations: score > 70
        ? ['Set challenging academic goals', 'Help peers with studies', 'Explore advanced opportunities']
        : score > 40
        ? ['Develop study strategies', 'Seek help when needed', 'Build time management skills']
        : ['Work with academic advisors', 'Join study groups', 'Use academic support services']
    }
  };

  return descriptions[category];
}

export function calculateWellbeingScores(answers: Answer[]): WellbeingScore[] {
  return Object.entries(CATEGORIES).map(([category, questionIds]) => {
    const score = calculateCategoryScore(answers, questionIds);
    return getCategoryDescription(category, score);
  });
}