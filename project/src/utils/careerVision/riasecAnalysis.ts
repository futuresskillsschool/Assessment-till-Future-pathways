import { Answer } from '../../types/assessment';
import { RIASEC_QUESTIONS, RIASEC_DESCRIPTIONS } from './constants';

export function calculateRIASECScores(answers: Answer[]) {
  const scores = Object.entries(RIASEC_QUESTIONS).map(([type, questions]) => {
    const typeAnswers = answers.filter(a => questions.includes(a.questionId));
    const score = typeAnswers.reduce((sum, answer) => {
      return sum + (typeof answer.value === 'number' ? answer.value : 0);
    }, 0) / (questions.length * 5) * 100;

    return {
      type,
      score: Math.round(score),
      description: RIASEC_DESCRIPTIONS[type as keyof typeof RIASEC_DESCRIPTIONS].description,
      careers: RIASEC_DESCRIPTIONS[type as keyof typeof RIASEC_DESCRIPTIONS].careers
    };
  });

  scores.sort((a, b) => b.score - a.score);

  return {
    primary: scores.slice(0, 3),
    secondary: scores.slice(3),
    summary: generateRIASECSummary(scores)
  };
}

function generateRIASECSummary(scores: Array<{ type: string; score: number }>) {
  const topTypes = scores
    .filter(s => s.score >= 70)
    .map(s => s.type);

  if (topTypes.length > 0) {
    return `Your interests align strongly with ${topTypes.join(', ')} occupations. This suggests you would thrive in careers that combine ${topTypes.map(t => t.toLowerCase()).join(' and ')} activities.`;
  }
  
  return 'Your interests show a balanced profile across different types of work. Consider exploring careers that combine multiple aspects of your interests.';
}