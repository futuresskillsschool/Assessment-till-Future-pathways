import { Section } from '../types/assessment';

export const skillsSection: Section = {
  id: 'skills',
  title: 'Skills & Aptitude Assessment',
  description: 'This section evaluates your technical skills, problem-solving abilities, and analytical thinking.',
  questions: [
    {
      id: 's1',
      text: 'I can use computer applications like MS Word and Excel effectively.',
      type: 'likert'
    },
    {
      id: 's2',
      text: 'I am comfortable with basic programming or coding tasks.',
      type: 'likert'
    },
    {
      id: 's3',
      text: 'I enjoy solving math problems and logical puzzles.',
      type: 'likert'
    },
    {
      id: 's4',
      text: 'I can analyze data and draw conclusions from it.',
      type: 'likert'
    },
    {
      id: 's5',
      text: 'I enjoy creating new things, whether it\'s art, music, writing, or any art form.',
      type: 'likert'
    },
    {
      id: 's6',
      text: 'I can come up with innovative solutions to problems.',
      type: 'likert'
    },
    {
      id: 's7',
      text: 'I can communicate my thoughts/ideas effectively to others.',
      type: 'likert'
    },
    {
      id: 's8',
      text: 'I am good at resolving conflicts and bringing people together.',
      type: 'likert'
    },
    {
      id: 's9',
      text: 'What is the next number in the sequence: 2, 4, 8, 16, ...?',
      type: 'choice',
      options: ['24', '32', '64', '128']
    },
    {
      id: 's10',
      text: 'What is 15% of 200?',
      type: 'choice',
      options: ['20', '30', '40', '50']
    },
    {
      id: 's11',
      text: 'Which word does not belong in the following list? Dog, Cat, Bird, Car.',
      type: 'choice',
      options: ['Dog', 'Cat', 'Bird', 'Car']
    },
    {
      id: 's12',
      text: 'Which shape completes the pattern?',
      type: 'choice',
      options: ['Circle', 'Square', 'Triangle', 'Rectangle']
    },
    {
      id: 's13',
      text: 'Which skills do you feel confident in?',
      type: 'multiple',
      options: [
        'Computer Programming',
        'Data Analysis',
        'Graphic Design',
        'Writing and Communication',
        'Problem Solving',
        'Project Management',
        'Research and Analysis',
        'Leadership',
        'Public Speaking',
        'Critical Thinking',
        'Time Management',
        'Team Collaboration',
        'Creative Design',
        'Mathematical Skills',
        'Scientific Research',
        'Technical Writing'
      ]
    }
  ]
};