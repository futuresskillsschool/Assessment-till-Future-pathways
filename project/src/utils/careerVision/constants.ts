// Constants for Career Vision Assessment
export const RIASEC_QUESTIONS = {
  'Realistic': ['cv11', 'cv18', 'cv19'], // Technical, hands-on
  'Investigative': ['cv12', 'cv13'], // Analytical, research
  'Artistic': ['cv14', 'cv15'], // Creative, expressive
  'Social': ['cv7', 'cv8', 'cv16', 'cv17'], // Helping others
  'Enterprising': ['cv5', 'cv6', 'cv28'], // Leadership, persuasion
  'Conventional': ['cv3', 'cv4', 'cv19'] // Organized, detail-oriented
};

export const RIASEC_DESCRIPTIONS = {
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