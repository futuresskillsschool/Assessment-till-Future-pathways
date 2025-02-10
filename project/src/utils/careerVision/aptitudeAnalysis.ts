import { Answer } from '../../types/assessment';

export function calculateAptitudeScore(answers: Answer[]): number {
  const correctAnswers = {
    'cv23': '32', // Sequence
    'cv24': '30', // Percentage
    'cv25': 'Car', // Odd one out
    'cv26': 'Circle' // Pattern
  };

  let correct = 0;
  answers.forEach(answer => {
    if (answer.value === correctAnswers[answer.questionId as keyof typeof correctAnswers]) {
      correct++;
    }
  });

  return Math.round((correct / 4) * 100);
}

export function getAptitudeDescription(score: number): string {
  if (score >= 80) return 'Excellent analytical and problem-solving abilities';
  if (score >= 60) return 'Good logical reasoning skills with room for development';
  return 'Consider focusing on strengthening analytical skills';
}

export function getAptitudeRecommendations(score: number): string[] {
  if (score >= 80) {
    return [
      'Consider STEM fields or analytical careers',
      'Take advanced mathematics or science courses',
      'Participate in olympiads and competitions'
    ];
  }
  if (score >= 60) {
    return [
      'Practice problem-solving regularly',
      'Focus on understanding concepts thoroughly',
      'Consider additional tutoring in challenging areas'
    ];
  }
  return [
    'Start with basic concept strengthening',
    'Use interactive learning tools and apps',
    'Seek help with difficult topics early'
  ];
}