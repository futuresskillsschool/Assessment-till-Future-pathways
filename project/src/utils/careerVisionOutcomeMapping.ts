// First, let's update the interface to include RIASEC and Big Five
interface CareerVisionResult {
  // Keep existing fields
  personalityProfile: {
    score: number;
    traits: CareerVisionScore[];
  };
  aptitudeAnalysis: {
    score: number;
    traits: CareerVisionScore[];
  };
  careerInterests: {
    primaryClusters: string[];
    secondaryClusters: string[];
    workStylePreference: string;
  };
  recommendedStreams: {
    primary: string[];
    secondary: string[];
  };
  recommendations: {
    immediate: string[];
    longTerm: string[];
    skillDevelopment: string[];
  };
  bigFiveAnalysis: {
    traits: Array<{
      name: string;
      score: number;
      description: string;
      careerImplications: string[];
    }>;
    summary: string;
  };
  riasecAnalysis: {
    primary: Array<{
      type: string;
      score: number;
      description: string;
      careers: string[];
    }>;
    secondary: Array<{
      type: string;
      score: number;
      description: string;
      careers: string[];
    }>;
    summary: string;
  };
}

// Add RIASEC mappings
const RIASEC_QUESTIONS = {
  'Realistic': ['cv11', 'cv18', 'cv19'], // Technical, hands-on
  'Investigative': ['cv12', 'cv13'], // Analytical, research
  'Artistic': ['cv14', 'cv15'], // Creative, expressive
  'Social': ['cv7', 'cv8', 'cv16', 'cv17'], // Helping others
  'Enterprising': ['cv5', 'cv6', 'cv28'], // Leadership, persuasion
  'Conventional': ['cv3', 'cv4', 'cv19'] // Organized, detail-oriented
};

const RIASEC_DESCRIPTIONS = {
  'Realistic': {
    description: 'You prefer working with things rather than ideas or people. You enjoy practical, hands-on problems and solutions.',
    careers: [
      'Engineering',
      'Architecture',
      'Computer Hardware',
      'Construction',
      'Technical Support',
      'Manufacturing'
    ]
  },
  'Investigative': {
    description: 'You like to solve complex problems and engage in research. You enjoy analytical and intellectual activities.',
    careers: [
      'Scientific Research',
      'Data Analysis',
      'Medical Science',
      'Technology Development',
      'Market Research',
      'Academic Research'
    ]
  },
  'Artistic': {
    description: 'You value self-expression and creativity. You prefer unstructured situations and artistic activities.',
    careers: [
      'Graphic Design',
      'Content Creation',
      'Art Direction',
      'UX/UI Design',
      'Creative Writing',
      'Digital Media'
    ]
  },
  'Social': {
    description: 'You enjoy working with and helping others. You prefer activities that involve interpersonal relationships.',
    careers: [
      'Teaching',
      'Counseling',
      'Healthcare',
      'Social Work',
      'Human Resources',
      'Customer Relations'
    ]
  },
  'Enterprising': {
    description: 'You like to lead and persuade others. You enjoy taking risks and starting initiatives.',
    careers: [
      'Business Management',
      'Sales',
      'Marketing',
      'Entrepreneurship',
      'Project Management',
      'Business Development'
    ]
  },
  'Conventional': {
    description: 'You prefer organized, systematic activities. You enjoy working with data and details.',
    careers: [
      'Accounting',
      'Financial Analysis',
      'Quality Assurance',
      'Data Management',
      'Operations',
      'Administrative Management'
    ]
  }
};

// Big Five Analysis
function calculateBigFiveAnalysis(answers: Answer[]) {
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

function calculateRIASECScores(answers: Answer[]) {
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

export function calculateCareerVisionResults(answers: Answer[]): CareerVisionResult {
  const bigFiveAnalysis = calculateBigFiveAnalysis(answers);
  const riasecAnalysis = calculateRIASECScores(answers);
  
  const aptitudeAnswers = answers.filter(a => ['cv23', 'cv24', 'cv25', 'cv26'].includes(a.questionId));
  const aptitudeScore = calculateAptitudeScore(aptitudeAnswers);
  
  const careerInterestAnswer = answers.find(a => a.questionId === 'cv29');
  const careerInterests = Array.isArray(careerInterestAnswer?.value) ? careerInterestAnswer.value : [];
  
  const workStyleAnswer = answers.find(a => a.questionId === 'cv30');
  const workStyle = workStyleAnswer?.value || 'Mixed environment';
  
  const streamRecs = getStreamRecommendations(bigFiveAnalysis.traits, aptitudeScore);

  return {
    personalityProfile: {
      score: Math.round(bigFiveAnalysis.traits.reduce((sum, t) => sum + t.score, 0) / 5),
      traits: bigFiveAnalysis.traits.map(t => ({
        trait: t.name,
        score: t.score,
        description: t.description,
        recommendations: t.careerImplications,
        suitableCareers: []
      }))
    },
    aptitudeAnalysis: {
      score: aptitudeScore,
      traits: [{
        trait: 'Logical Reasoning',
        score: aptitudeScore,
        description: getAptitudeDescription(aptitudeScore),
        recommendations: getAptitudeRecommendations(aptitudeScore),
        suitableCareers: []
      }]
    },
    careerInterests: {
      primaryClusters: careerInterests.slice(0, 3),
      secondaryClusters: careerInterests.slice(3),
      workStylePreference: workStyle
    },
    recommendedStreams: streamRecs,
    recommendations: {
      immediate: generateImmediateRecommendations(streamRecs.primary),
      longTerm: generateLongTermRecommendations(careerInterests),
      skillDevelopment: generateSkillDevelopmentRecommendations(bigFiveAnalysis.traits)
    },
    bigFiveAnalysis,
    riasecAnalysis
  };
}

// Helper functions
function calculateAptitudeScore(answers: Answer[]): number {
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

function getAptitudeDescription(score: number): string {
  if (score >= 80) return 'Excellent analytical and problem-solving abilities';
  if (score >= 60) return 'Good logical reasoning skills with room for development';
  return 'Consider focusing on strengthening analytical skills';
}

function getAptitudeRecommendations(score: number): string[] {
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

function getStreamRecommendations(
  traits: Array<{ name: string; score: number }>,
  aptitudeScore: number
) {
  const primary = [];
  const secondary = [];

  if (aptitudeScore >= 70 && traits.find(t => t.name === 'Openness')?.score ?? 0 >= 70) {
    primary.push('Science & Technology');
  } else {
    secondary.push('Science & Technology');
  }

  if (traits.find(t => t.name === 'Extraversion')?.score ?? 0 >= 70) {
    primary.push('Commerce');
  } else {
    secondary.push('Commerce');
  }

  if (traits.find(t => t.name === 'Agreeableness')?.score ?? 0 >= 70) {
    primary.push('Humanities');
  } else {
    secondary.push('Humanities');
  }

  if (traits.find(t => t.name === 'Openness')?.score ?? 0 >= 70) {
    primary.push('Creative Arts');
  } else {
    secondary.push('Creative Arts');
  }

  return { primary, secondary };
}

function generateImmediateRecommendations(streams: string[]): string[] {
  return [
    `Consider ${streams.join(' or ')} stream for further education`,
    'Research entrance exams required for your chosen field',
    'Start preparing for competitive exams early',
    'Join relevant study groups or coaching classes',
    'Develop good study habits and time management skills'
  ];
}

function generateLongTermRecommendations(careers: string[]): string[] {
  return [
    `Research detailed requirements for ${careers.slice(0, 3).join(', ')}`,
    'Connect with professionals in your chosen field',
    'Look for internship opportunities',
    'Build a strong academic foundation',
    'Develop relevant skills through online courses'
  ];
}

function generateSkillDevelopmentRecommendations(traits: Array<{ name: string; score: number }>): string[] {
  const recommendations = [
    'Focus on communication skills through debates and presentations',
    'Develop computer literacy and basic programming skills',
    'Practice time management and organization',
    'Build teamwork skills through group activities',
    'Learn a new language or technical skill'
  ];

  traits.forEach(trait => {
    if (trait.score < 60) {
      recommendations.push(`Improve ${trait.name.toLowerCase()} through targeted activities`);
    }
  });

  return recommendations;
}