import { Answer } from '../types/assessment';

interface CareerCluster {
  name: string;
  title: string;
  description: string;
  careers: Array<{
    title: string;
    description: string;
  }>;
  skills: string[];
  courses: string[];
}

interface ClusterResult {
  cluster: CareerCluster;
  score: number;
  level: string;
  matchReasons: string[];
}

interface ClustersResult {
  primaryClusters: ClusterResult[];
  secondaryClusters: ClusterResult[];
  overallSummary: string;
  recommendations: string[];
}

const CAREER_CLUSTERS: Record<string, CareerCluster> = {
  'tech_innovator': {
    name: 'Tech Innovator & Builder',
    title: 'The Future Architect: Building Tomorrow\'s World with Technology',
    description: 'You are fascinated by how things work and love to create and fix them! You are likely drawn to building new technologies, software, and even robots. In the future, the world needs people like you to design and build the amazing tech we\'ll all use.',
    careers: [
      {
        title: 'AI Solutions Architect',
        description: 'Design and build AI systems for businesses and organizations'
      },
      {
        title: 'Robotics Engineer',
        description: 'Create and improve robots for various industries'
      },
      {
        title: 'VR/AR Developer',
        description: 'Build immersive and interactive digital experiences'
      },
      {
        title: 'Biotech Engineer',
        description: 'Create new healthcare technologies using engineering principles'
      }
    ],
    skills: [
      'Programming',
      'Problem-solving',
      'System design',
      'Technical creativity',
      'Analytical thinking'
    ],
    courses: [
      'Computer Science',
      'Robotics',
      'AI & Machine Learning',
      'Engineering Design'
    ]
  },
  'digital_creator': {
    name: 'Digital Creator & Storyteller',
    title: 'The Metaverse Maestro: Crafting Immersive Digital Worlds',
    description: 'You have a creative soul and love expressing yourself through art, stories, music, videos, or games! You are likely interested in creating digital content and experiences that entertain and engage people.',
    careers: [
      {
        title: 'Metaverse Architect',
        description: 'Design and build virtual worlds and experiences'
      },
      {
        title: 'Digital Content Strategist',
        description: 'Create AI-driven content across platforms'
      },
      {
        title: 'Game Designer',
        description: 'Create next-generation video games and interactive experiences'
      },
      {
        title: 'Digital Fashion Designer',
        description: 'Design virtual clothing and accessories for avatars'
      }
    ],
    skills: [
      'Digital art',
      'Storytelling',
      'UI/UX design',
      'Creative thinking',
      'Visual communication'
    ],
    courses: [
      'Digital Arts',
      'Game Development',
      'Interactive Media',
      'Creative Technology'
    ]
  },
  'data_analyst': {
    name: 'Data Analyst & Scientist',
    title: 'The Insight Navigator: Decoding the World with Data',
    description: 'You are naturally curious about numbers, patterns, and solving puzzles! You like to analyze information and find hidden meanings within data. In the future, data will be everywhere, and we need skilled people to make sense of it all.',
    careers: [
      {
        title: 'AI Ethicist',
        description: 'Ensure AI systems are used responsibly and fairly'
      },
      {
        title: 'Data Scientist',
        description: 'Use data to forecast future trends and help organizations plan'
      },
      {
        title: 'Cybersecurity Analyst',
        description: 'Protect sensitive data and systems from cyber threats'
      },
      {
        title: 'Bioinformatician',
        description: 'Analyze biological data to understand diseases and develop treatments'
      }
    ],
    skills: [
      'Data analysis',
      'Statistical thinking',
      'Pattern recognition',
      'Problem-solving',
      'Critical thinking'
    ],
    courses: [
      'Data Science',
      'Statistics',
      'Machine Learning',
      'Research Methods'
    ]
  },
  'future_entrepreneur': {
    name: 'Future-Focused Entrepreneur & Leader',
    title: 'The Innovation Catalyst: Leading the Tech Revolution',
    description: 'You are a natural leader with big ideas and a drive to make things happen! You are likely interested in starting your own projects or businesses and leading teams.',
    careers: [
      {
        title: 'Innovation Manager',
        description: 'Lead teams to develop and implement new technologies'
      },
      {
        title: 'Tech Startup Founder',
        description: 'Create new businesses that solve social or environmental problems'
      },
      {
        title: 'Digital Transformation Consultant',
        description: 'Help traditional businesses adapt to the digital age'
      },
      {
        title: 'E-commerce Strategist',
        description: 'Develop online business strategies using AI personalization'
      }
    ],
    skills: [
      'Leadership',
      'Strategic thinking',
      'Innovation management',
      'Business acumen',
      'Communication'
    ],
    courses: [
      'Entrepreneurship',
      'Business Technology',
      'Innovation Management',
      'Digital Strategy'
    ]
  },
  'tech_helper': {
    name: 'Tech-Enabled Helper & Problem Solver',
    title: 'The Compassionate Technologist: Using Tech for Good',
    description: 'You are caring and want to use your skills to help people and make a positive impact on the world! You believe technology can be a powerful tool for solving real-world problems.',
    careers: [
      {
        title: 'Telehealth Specialist',
        description: 'Use technology to provide healthcare services remotely'
      },
      {
        title: 'EdTech Innovator',
        description: 'Develop new technologies to make learning more effective'
      },
      {
        title: 'Environmental Data Analyst',
        description: 'Use data to monitor and address environmental issues'
      },
      {
        title: 'Assistive Technology Developer',
        description: 'Create technologies to help people with disabilities'
      }
    ],
    skills: [
      'Problem-solving',
      'Empathy',
      'Technical skills',
      'Communication',
      'Project management'
    ],
    courses: [
      'Social Innovation',
      'Healthcare Technology',
      'Environmental Science',
      'Assistive Technology'
    ]
  }
};

const QUESTION_MAPPINGS: Record<string, string[]> = {
  'cc1': ['tech_innovator'],
  'cc2': ['digital_creator'],
  'cc3': ['data_analyst'],
  'cc4': ['future_entrepreneur'],
  'cc5': ['tech_helper'],
  'cc6': ['tech_innovator', 'digital_creator'],
  'cc7': ['digital_creator', 'future_entrepreneur'],
  'cc8': ['data_analyst', 'tech_helper'],
  'cc9': ['future_entrepreneur'],
  'cc10': ['tech_helper', 'tech_innovator'],
  'cc11': ['digital_creator'],
  'cc12': ['tech_innovator', 'data_analyst'],
  'cc13': ['data_analyst', 'future_entrepreneur'],
  'cc14': ['future_entrepreneur'],
  'cc15': ['tech_helper']
};

function calculateClusterScores(answers: Answer[]): Record<string, number> {
  const scores: Record<string, number> = {
    'tech_innovator': 0,
    'digital_creator': 0,
    'data_analyst': 0,
    'future_entrepreneur': 0,
    'tech_helper': 0
  };

  let questionCounts: Record<string, number> = { ...scores };

  answers.forEach(answer => {
    const mappedClusters = QUESTION_MAPPINGS[answer.questionId] || [];
    const value = typeof answer.value === 'number' ? answer.value : 3;

    mappedClusters.forEach(cluster => {
      scores[cluster] += value;
      questionCounts[cluster]++;
    });
  });

  // Calculate percentages
  Object.keys(scores).forEach(cluster => {
    const maxPossible = questionCounts[cluster] * 5;
    scores[cluster] = Math.round((scores[cluster] / maxPossible) * 100);
  });

  return scores;
}

function getMatchLevel(score: number): string {
  if (score >= 80) return 'Excellent Match';
  if (score >= 70) return 'Strong Match';
  if (score >= 60) return 'Good Match';
  return 'Potential Match';
}

function generateMatchReasons(cluster: string, answers: Answer[]): string[] {
  const reasons: string[] = [];
  const relevantQuestions = Object.entries(QUESTION_MAPPINGS)
    .filter(([_, clusters]) => clusters.includes(cluster))
    .map(([qId]) => qId);

  const highScoreAnswers = answers.filter(a => 
    relevantQuestions.includes(a.questionId) && 
    (typeof a.value === 'number' && a.value >= 4)
  );

  if (highScoreAnswers.length > 0) {
    reasons.push('You showed strong interest in activities related to this field');
  }

  // Add cluster-specific reasons
  switch (cluster) {
    case 'tech_innovator':
      reasons.push('You enjoy working with technology and solving technical problems');
      break;
    case 'digital_creator':
      reasons.push('You have a strong creative and artistic inclination');
      break;
    case 'data_analyst':
      reasons.push('You show strong analytical and logical thinking abilities');
      break;
    case 'future_entrepreneur':
      reasons.push('You demonstrate leadership qualities and business interest');
      break;
    case 'tech_helper':
      reasons.push('You show a strong desire to help others through technology');
      break;
  }

  return reasons;
}

export function calculateCareerClustersResults(answers: Answer[]): ClustersResult {
  const scores = calculateClusterScores(answers);
  
  const results = Object.entries(scores).map(([clusterId, score]) => ({
    cluster: CAREER_CLUSTERS[clusterId],
    score,
    level: getMatchLevel(score),
    matchReasons: generateMatchReasons(clusterId, answers)
  }));

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  const primaryClusters = results.filter(r => r.score >= 70);
  const secondaryClusters = results.filter(r => r.score < 70 && r.score >= 50);

  const overallSummary = primaryClusters.length > 0
    ? `You show strong alignment with ${primaryClusters.length} career clusters that match your interests and preferences. These emerging fields offer exciting opportunities for your future career journey.`
    : 'Your interests span multiple areas, which gives you flexibility in choosing your career path. Consider exploring these clusters further to find your best fit.';

  const recommendations = [
    'Research the specific careers within your top clusters',
    'Look for internship or project opportunities in these fields',
    'Connect with professionals working in these areas',
    'Consider taking relevant courses or certifications',
    'Join clubs or activities related to your interests'
  ];

  return {
    primaryClusters,
    secondaryClusters,
    overallSummary,
    recommendations
  };
}