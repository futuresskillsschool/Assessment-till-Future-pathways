import { Section } from '../types/assessment';

export const careerVisionSection: Section = {
  id: 'vision',
  title: 'Career Vision Assessment',
  description: 'This assessment helps us understand your career aspirations and create a personalized roadmap for your future.',
  questions: [
    // Section 1 - Psychometric Based
    // Big Five Personality Traits
    {
      id: 'cv1',
      text: 'I enjoy exploring new ideas or subjects.',
      type: 'likert'
    },
    {
      id: 'cv2',
      text: 'I like learning about new cultures or traditions.',
      type: 'likert'
    },
    {
      id: 'cv3',
      text: 'I make sure to complete my homework/assignments on time.',
      type: 'likert'
    },
    {
      id: 'cv4',
      text: 'I am well-organized and keep my study materials/books in order.',
      type: 'likert'
    },
    {
      id: 'cv5',
      text: 'I enjoy participating in group discussions in class.',
      type: 'likert'
    },
    {
      id: 'cv6',
      text: 'I like being the centre of attention at social gatherings.',
      type: 'likert'
    },
    {
      id: 'cv7',
      text: 'I often help my classmates with their studies.',
      type: 'likert'
    },
    {
      id: 'cv8',
      text: 'I get along well with most of my classmates and teachers.',
      type: 'likert'
    },
    {
      id: 'cv9',
      text: 'I often feel anxious before exams.',
      type: 'likert'
    },
    {
      id: 'cv10',
      text: 'I get upset easily when things don\'t go as planned or as expected.',
      type: 'likert'
    },
    // RIASEC Model
    {
      id: 'cv11',
      text: 'I enjoy working on science/non-science projects or experiments.',
      type: 'likert'
    },
    {
      id: 'cv12',
      text: 'I enjoy solving puzzles and brainteasers.',
      type: 'likert'
    },
    {
      id: 'cv13',
      text: 'I like doing research on topics that interest me.',
      type: 'likert'
    },
    {
      id: 'cv14',
      text: 'I enjoy drawing, painting, designing, or any other forms of art.',
      type: 'likert'
    },
    {
      id: 'cv15',
      text: 'I like writing stories, poems, or essays.',
      type: 'likert'
    },
    {
      id: 'cv16',
      text: 'I enjoy helping my friends with their problems.',
      type: 'likert'
    },
    {
      id: 'cv17',
      text: 'I like participating in community service activities.',
      type: 'likert'
    },
    {
      id: 'cv18',
      text: 'I enjoy working with numbers and data.',
      type: 'likert'
    },
    {
      id: 'cv19',
      text: 'I like following a set schedule and routine.',
      type: 'likert'
    },
    // Personality Traits
    {
      id: 'cv20',
      text: 'Which of the following best describe your personality?',
      type: 'multiple',
      options: [
        'Outgoing',
        'Analytical',
        'Creative',
        'Detail-oriented',
        'Empathetic',
        'Adventurous',
        'Organized',
        'Independent',
        'Cooperative',
        'Ambitious',
        'Patient',
        'Assertive',
        'Flexible',
        'Responsible',
        'Optimistic',
        'Curious',
        'Practical',
        'Sensitive',
        'Confident',
        'Strategic'
      ]
    },
    {
      id: 'cv21',
      text: 'How do you typically handle challenges?',
      type: 'multiple',
      options: [
        'Stay calm and think through solutions',
        'Seek help from others',
        'Take immediate action',
        'Analyze the problem in detail',
        'Try to avoid the situation',
        'Look for creative solutions',
        'Break the problem into smaller parts',
        'Use past experiences to guide decisions',
        'Consult with a mentor or expert',
        'Collaborate with a team',
        'Remain optimistic and positive',
        'Develop a step-by-step plan',
        'Take a break and revisit later'
      ]
    },
    {
      id: 'cv22',
      text: 'What activities do you enjoy in your free time?',
      type: 'multiple',
      options: [
        'Reading',
        'Playing sports',
        'Artistic activities (painting, drawing)',
        'Solving puzzles',
        'Socializing with friends',
        'Volunteering',
        'Traveling',
        'Gaming',
        'Cooking',
        'Writing',
        'Gardening',
        'Listening to music',
        'Watching movies or TV shows',
        'Practicing a musical instrument',
        'Hiking or outdoor activities',
        'Working on DIY projects',
        'Learning new skills or hobbies',
        'Meditating or practicing yoga',
        'Exercising or going to the gym'
      ]
    },
    // Section 2 - Skills and Aptitude Based
    {
      id: 'cv23',
      text: 'What is the next number in the sequence 2, 4, 8, 16, ...?',
      type: 'choice',
      options: ['24', '32', '64', '128']
    },
    {
      id: 'cv24',
      text: 'What is 15% of 200?',
      type: 'choice',
      options: ['20', '30', '40', '50']
    },
    {
      id: 'cv25',
      text: 'Which word does not belong in the following list? Dog, Cat, Bird, Car.',
      type: 'choice',
      options: ['Dog', 'Cat', 'Bird', 'Car']
    },
    {
      id: 'cv26',
      text: 'Which shape completes the pattern?',
      type: 'choice',
      options: ['Circle', 'Square', 'Triangle', 'Rectangle']
    },
    // Section 3 - Preferences Based
    {
      id: 'cv27',
      text: 'I prefer working in a group rather than alone.',
      type: 'likert'
    },
    {
      id: 'cv28',
      text: 'I like taking on leadership roles in a group.',
      type: 'likert'
    },
    {
      id: 'cv29',
      text: 'Which career clusters interest you?',
      type: 'multiple',
      options: [
        'Health Science',
        'Information Technology',
        'Arts, Audio/Video Technology, and Communications',
        'Education and Training',
        'Finance',
        'Hospitality and Tourism',
        'Human Services',
        'Science, Technology, Engineering, and Mathematics (STEM)',
        'Business Management and Administration',
        'Law, Public Safety, Corrections, and Security',
        'Agriculture, Food, and Natural Resources',
        'Manufacturing',
        'Marketing, Sales, and Service',
        'Government and Public Administration',
        'Architecture and Construction',
        'Transportation, Distribution, and Logistics',
        'Energy and Utilities',
        'Environmental Science',
        'Real Estate',
        'Media and Entertainment',
        'Nonprofit and Social Services',
        'Fashion and Design',
        'Sports and Recreation'
      ]
    },
    {
      id: 'cv30',
      text: 'What type of work environment do you prefer?',
      type: 'choice',
      options: [
        'Collaborative and team-oriented',
        'Independent and autonomous',
        'Research-oriented',
        'Project-based/Short-term',
        'Remote work',
        'Office-based',
        'Field work',
        'Mixed environment(remote, field and office-based)',
        'Open to anything'
      ]
    }
  ]
};