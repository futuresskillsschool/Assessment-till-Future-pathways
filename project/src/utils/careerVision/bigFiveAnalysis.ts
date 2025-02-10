import { Answer } from '../../types/assessment';

export function calculateBigFiveAnalysis(answers: Answer[]) {
  const traits = [
    {
      name: 'Openness',
      questions: ['cv1', 'cv2'],
      description: (score: number) => score > 70 
        ? 'You are highly curious and open to new experiences'
        : 'You prefer familiar and traditional approaches',
      implications: (score: number) => score > 70
        ? ['Well-suited for creative and innovative roles', 'Consider research or artistic careers']
        : ['Consider structured roles with clear guidelines', 'Look for positions with established procedures']
    },
    {
      name: 'Conscientiousness',
      questions: ['cv3', 'cv4'],
      description: (score: number) => score > 70
        ? 'You are highly organized and detail-oriented'
        : 'You prefer flexibility and spontaneity',
      implications: (score: number) => score > 70
        ? ['Excel in project management roles', 'Consider analytical or planning positions']
        : ['Look for roles with variety', 'Consider creative or dynamic positions']
    },
    {
      name: 'Extraversion',
      questions: ['cv5', 'cv6'],
      description: (score: number) => score > 70
        ? 'You are outgoing and energized by social interaction'
        : 'You prefer working independently',
      implications: (score: number) => score > 70
        ? ['Consider sales or management roles', 'Look for team-based environments']
        : ['Consider technical or analytical roles', 'Look for independent work opportunities']
    },
    {
      name: 'Agreeableness',
      questions: ['cv7', 'cv8'],
      description: (score: number) => score > 70
        ? 'You are cooperative and focused on helping others'
        : 'You are independent and objective in your approach',
      implications: (score: number) => score > 70
        ? ['Well-suited for helping professions', 'Consider teaching or counseling roles']
        : ['Consider analytical or technical roles', 'Look for positions requiring objective decision-making']
    },
    {
      name: 'Neuroticism',
      questions: ['cv9', 'cv10'],
      description: (score: number) => score > 70
        ? 'You may benefit from low-stress environments'
        : 'You handle pressure well',
      implications: (score: number) => score > 70
        ? ['Consider structured, predictable environments', 'Look for roles with good work-life balance']
        : ['Consider challenging, dynamic roles', 'Look for positions with significant responsibility']
    }
  ];

  const results = traits.map(trait => {
    const traitAnswers = answers.filter(a => trait.questions.includes(a.questionId));
    const score = traitAnswers.reduce((sum, answer) => {
      return sum + (typeof answer.value === 'number' ? answer.value : 0);
    }, 0) / (trait.questions.length * 5) * 100;

    return {
      name: trait.name,
      score: Math.round(score),
      description: trait.description(score),
      careerImplications: trait.implications(score)
    };
  });

  return {
    traits: results,
    summary: generateBigFiveSummary(results)
  };
}

function generateBigFiveSummary(traits: Array<{ name: string; score: number }>) {
  const highTraits = traits.filter(t => t.score >= 70).map(t => t.name);
  
  if (highTraits.length > 0) {
    return `Your personality profile shows strong ${highTraits.join(', ')}. This combination suggests you would excel in careers that value these traits.`;
  }
  
  return 'Your personality profile shows a balanced combination of traits, suggesting adaptability across different career paths.';
}