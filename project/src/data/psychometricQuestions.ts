import { Section } from '../types/assessment';

export const psychometricSection: Section = {
  id: 'psychometric',
  title: 'Psychometric Assessment',
  description: 'This section helps us understand your personality traits, behaviors, and preferences.',
  questions: [
    {
      id: 'p1',
      text: 'I enjoy exploring new ideas or subjects.',
      type: 'likert'
    },
    {
      id: 'p2',
      text: 'I like learning about new cultures or traditions.',
      type: 'likert'
    },
    {
      id: 'p3',
      text: 'I make sure to complete my homework/assignments on time.',
      type: 'likert'
    },
    {
      id: 'p4',
      text: 'I am well-organized and keep my study materials/books in order.',
      type: 'likert'
    },
    {
      id: 'p5',
      text: 'I enjoy participating in group discussions in class.',
      type: 'likert'
    },
    {
      id: 'p6',
      text: 'I like being the centre of attention at social gatherings.',
      type: 'likert'
    },
    {
      id: 'p7',
      text: 'I often help my classmates with their studies.',
      type: 'likert'
    },
    {
      id: 'p8',
      text: 'I get along well with most of my classmates and teachers.',
      type: 'likert'
    },
    {
      id: 'p9',
      text: 'I often feel anxious before exams.',
      type: 'likert'
    },
    {
      id: 'p10',
      text: 'I get upset easily when things don\'t go as planned.',
      type: 'likert'
    },
    {
      id: 'p11',
      text: 'I enjoy working on science/non-science projects or experiments.',
      type: 'likert'
    },
    {
      id: 'p12',
      text: 'I enjoy solving puzzles and brainteasers.',
      type: 'likert'
    },
    {
      id: 'p13',
      text: 'I like doing research on topics that interest me.',
      type: 'likert'
    },
    {
      id: 'p14',
      text: 'I enjoy drawing, painting, designing, or any other forms of art.',
      type: 'likert'
    },
    {
      id: 'p15',
      text: 'I like writing stories, poems, or essays.',
      type: 'likert'
    },
    {
      id: 'p16',
      text: 'I enjoy helping my friends with their problems.',
      type: 'likert'
    },
    {
      id: 'p17',
      text: 'I like participating in community service activities.',
      type: 'likert'
    },
    {
      id: 'p18',
      text: 'I enjoy working with numbers and data.',
      type: 'likert'
    },
    {
      id: 'p19',
      text: 'I like following a set schedule and routine.',
      type: 'likert'
    },
    {
      id: 'p20',
      text: 'I want to be very good in my studies and extracurricular activities.',
      type: 'likert'
    },
    {
      id: 'p21',
      text: 'It is important for me to accomplish my goals and set new ones.',
      type: 'likert'
    },
    {
      id: 'p22',
      text: 'I prefer to work on my own projects rather than in a group.',
      type: 'likert'
    },
    {
      id: 'p23',
      text: 'I like making my own decisions about my future.',
      type: 'likert'
    },
    {
      id: 'p24',
      text: 'Being recognized for my achievements is important to me.',
      type: 'likert'
    },
    {
      id: 'p25',
      text: 'I like receiving awards and praise for my work.',
      type: 'likert'
    },
    {
      id: 'p26',
      text: 'Having good relationships with my friends and teachers is important to me.',
      type: 'likert'
    },
    {
      id: 'p27',
      text: 'I enjoy working and studying with others.',
      type: 'likert'
    },
    {
      id: 'p28',
      text: 'I value the support and guidance from my teachers and parents.',
      type: 'likert'
    },
    {
      id: 'p29',
      text: 'Having supportive friends is important to me.',
      type: 'likert'
    },
    {
      id: 'p30',
      text: 'I believe I can succeed in any career I choose.',
      type: 'likert'
    },
    {
      id: 'p31',
      text: 'I am confident in my ability to solve complex problems.',
      type: 'likert'
    },
    {
      id: 'p32',
      text: 'I can handle the challenges of a professional career.',
      type: 'likert'
    },
    {
      id: 'p33',
      text: 'I am good at managing time and tasks effectively.',
      type: 'likert'
    },
    {
      id: 'p34',
      text: 'I can learn new skills quickly and efficiently.',
      type: 'likert'
    },
    {
      id: 'p35',
      text: 'A good career will help me achieve financial stability.',
      type: 'likert'
    },
    {
      id: 'p36',
      text: 'Having a successful career will make my family proud.',
      type: 'likert'
    },
    {
      id: 'p37',
      text: 'I believe my career will allow me to contribute to society.',
      type: 'likert'
    },
    {
      id: 'p38',
      text: 'I expect to have job satisfaction in my chosen career.',
      type: 'likert'
    },
    {
      id: 'p39',
      text: 'I think my career will help me achieve my personal goals.',
      type: 'likert'
    },
    {
      id: 'p65',
      text: 'Which of the following best describe your personality?',
      type: 'multiple',
      options: [
        'Outgoing and social',
        'Quiet and reserved',
        'Creative and artistic',
        'Logical and analytical',
        'Caring and supportive',
        'Organized and methodical',
        'Adventurous and risk-taking',
        'Cautious and careful'
      ]
    },
    {
      id: 'p66',
      text: 'How do you typically handle challenges?',
      type: 'multiple',
      options: [
        'Break them down into smaller tasks',
        'Seek help from others',
        'Research and plan thoroughly',
        'Trust my instincts',
        'Try different approaches',
        'Persist until solved',
        'Learn from failures',
        'Avoid if possible'
      ]
    },
    {
      id: 'p67',
      text: 'What activities do you enjoy in your free time?',
      type: 'multiple',
      options: [
        'Reading and learning',
        'Sports and exercise',
        'Arts and crafts',
        'Music and performance',
        'Gaming and technology',
        'Social activities',
        'Nature and outdoors',
        'Volunteering and helping others'
      ]
    },
    // Adding new questions
    // Social Interaction & Comfort
    {
      id: 'si1',
      text: 'How comfortable are you interacting with classmates from different backgrounds or social groups?',
      type: 'choice',
      options: ['Very Comfortable', 'Mostly Comfortable', 'Neutral', 'Mostly Uncomfortable', 'Very Uncomfortable']
    },
    {
      id: 'si2',
      text: 'How often do you participate in school events or extracurricular activities?',
      type: 'choice',
      options: ['Very Often', 'Often', 'Sometimes', 'Rarely', 'Never']
    },
    {
      id: 'si3',
      text: 'When working on group projects, how do you feel about sharing your ideas and opinions?',
      type: 'choice',
      options: [
        'I feel very comfortable sharing',
        'I feel somewhat comfortable sharing',
        'I feel neutral',
        'I feel somewhat uncomfortable sharing',
        'I feel very uncomfortable sharing'
      ]
    },
    // Mood & Emotional Well-being
    {
      id: 'mw1',
      text: 'Over the past few weeks, how often have you felt stressed or under pressure due to schoolwork or exams?',
      type: 'choice',
      options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
    },
    {
      id: 'mw2',
      text: 'How often do you find time to relax and engage in activities you enjoy?',
      type: 'choice',
      options: ['Very Often', 'Often', 'Sometimes', 'Rarely', 'Never']
    },
    {
      id: 'mw3',
      text: 'How would you describe your overall mood and emotional state these days?',
      type: 'choice',
      options: ['Very positive', 'Mostly positive', 'Neutral', 'Mostly negative', 'Very negative']
    },
    {
      id: 'mw4',
      text: 'How often do you have difficulty concentrating or focusing on your studies?',
      type: 'choice',
      options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
    },
    // Family & Home Life
    {
      id: 'fh1',
      text: 'How supported do you feel by your family in your academic and personal goals?',
      type: 'choice',
      options: ['Very Supported', 'Mostly Supported', 'Neutral', 'Not Very Supported', 'Not at all Supported']
    },
    {
      id: 'fh2',
      text: 'How open is communication between you and your family members about your feelings and concerns?',
      type: 'choice',
      options: ['Very Open', 'Mostly Open', 'Neutral', 'Mostly Closed', 'Very Closed']
    },
    {
      id: 'fh3',
      text: 'How often do you feel a sense of harmony and understanding within your family?',
      type: 'choice',
      options: ['Very Often', 'Often', 'Sometimes', 'Rarely', 'Never']
    },
    // School & Academic Experience
    {
      id: 'sa1',
      text: 'How do you feel about the academic expectations placed on you by your school and family?',
      type: 'choice',
      options: [
        'I find them very motivating',
        'I find them somewhat motivating',
        'I feel neutral',
        'I find them somewhat overwhelming',
        'I find them very overwhelming'
      ]
    },
    {
      id: 'sa2',
      text: 'How confident are you in your ability to succeed in your studies?',
      type: 'choice',
      options: ['Very Confident', 'Mostly Confident', 'Neutral', 'Not Very Confident', 'Not at all Confident']
    },
    {
      id: 'sa3',
      text: 'How well do you feel your teachers understand your individual learning needs and challenges?',
      type: 'choice',
      options: ['Very Well', 'Mostly Well', 'Neutral', 'Not Very Well', 'Not at all Well']
    },
    {
      id: 'sa4',
      text: 'How comfortable are you seeking help from teachers or classmates when you need it?',
      type: 'choice',
      options: ['Very Comfortable', 'Mostly Comfortable', 'Neutral', 'Mostly Uncomfortable', 'Very Uncomfortable']
    }
  ]
};