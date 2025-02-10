import { Answer } from '../../types/assessment';

export function getStreamRecommendations(
  traits: Array<{ name: string; score: number }>,
  aptitudeScore: number
) {
  const primary = [];
  const secondary = [];

  // Find Openness trait
  const opennessTrait = traits.find(t => t.name === 'Openness');
  const opennessScore = opennessTrait ? opennessTrait.score : 0;

  // Find Extraversion trait
  const extraversionTrait = traits.find(t => t.name === 'Extraversion');
  const extraversionScore = extraversionTrait ? extraversionTrait.score : 0;

  // Find Agreeableness trait
  const agreeablenessTrait = traits.find(t => t.name === 'Agreeableness');
  const agreeablenessScore = agreeablenessTrait ? agreeablenessTrait.score : 0;

  // Science & Technology recommendation
  if (aptitudeScore >= 70 && opennessScore >= 70) {
    primary.push('Science & Technology');
  } else {
    secondary.push('Science & Technology');
  }

  // Commerce recommendation
  if (extraversionScore >= 70) {
    primary.push('Commerce');
  } else {
    secondary.push('Commerce');
  }

  // Humanities recommendation
  if (agreeablenessScore >= 70) {
    primary.push('Humanities');
  } else {
    secondary.push('Humanities');
  }

  // Creative Arts recommendation
  if (opennessScore >= 70) {
    primary.push('Creative Arts');
  } else {
    secondary.push('Creative Arts');
  }

  return { primary, secondary };
}

export function generateImmediateRecommendations(streams: string[]): string[] {
  return [
    `Consider ${streams.join(' or ')} stream for further education`,
    'Research entrance exams required for your chosen field',
    'Start preparing for competitive exams early',
    'Join relevant study groups or coaching classes',
    'Develop good study habits and time management skills'
  ];
}

export function generateLongTermRecommendations(careers: string[]): string[] {
  const careerList = careers.slice(0, 3);
  return [
    careerList.length > 0 
      ? `Research detailed requirements for ${careerList.join(', ')}`
      : 'Research requirements for your fields of interest',
    'Connect with professionals in your chosen field',
    'Look for internship opportunities',
    'Build a strong academic foundation',
    'Develop relevant skills through online courses'
  ];
}

export function generateSkillDevelopmentRecommendations(traits: Array<{ name: string; score: number }>): string[] {
  const recommendations = [
    'Focus on communication skills through debates and presentations',
    'Develop computer literacy and basic programming skills',
    'Practice time management and organization',
    'Build teamwork skills through group activities',
    'Learn a new language or technical skill'
  ];

  // Add trait-specific recommendations
  traits.forEach(trait => {
    if (trait.score && trait.score < 60) {
      recommendations.push(`Improve ${trait.name.toLowerCase()} through targeted activities`);
    }
  });

  return recommendations;
}