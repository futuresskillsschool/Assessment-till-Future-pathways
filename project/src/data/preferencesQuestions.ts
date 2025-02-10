import { Section } from '../types/assessment';

export const preferencesSection: Section = {
  id: 'preferences',
  title: 'Career Preferences Assessment',
  description: 'This section helps us understand your work style and career interests.',
  questions: [
    {
      id: 'pref1',
      text: 'I prefer working in a group rather than alone.',
      type: 'likert'
    },
    {
      id: 'pref2',
      text: 'I like taking on leadership roles in a group.',
      type: 'likert'
    },
    {
      id: 'pref3',
      text: 'I enjoy activities that involve science and technology.',
      type: 'likert'
    },
    {
      id: 'pref4',
      text: 'I like tasks that require creativity and artistic skills.',
      type: 'likert'
    },
    {
      id: 'pref5',
      text: 'I prefer working on projects that involve teamwork and collaboration.',
      type: 'likert'
    },
    {
      id: 'pref6',
      text: 'I am interested in leadership and management roles.',
      type: 'likert'
    },
    {
      id: 'pref7',
      text: 'I enjoy organizing and planning events or activities.',
      type: 'likert'
    },
    {
      id: 'pref8',
      text: 'I have a clear idea of what career I want to pursue.',
      type: 'likert'
    },
    {
      id: 'pref9',
      text: 'I have set specific career goals for myself.',
      type: 'likert'
    },
    {
      id: 'pref10',
      text: 'I plan to pursue higher education to achieve my career goals.',
      type: 'likert'
    },
    {
      id: 'pref11',
      text: 'Which career clusters interest you?',
      type: 'multiple',
      options: [
        'Technology & Software Development',
        'Business & Management',
        'Creative Arts & Design',
        'Science & Research',
        'Healthcare & Medicine',
        'Education & Teaching',
        'Engineering & Architecture',
        'Media & Communications',
        'Finance & Economics',
        'Law & Legal Services',
        'Environmental Science',
        'Social Services',
        'Hospitality & Tourism',
        'Manufacturing & Construction',
        'Agriculture & Natural Resources',
        'Government & Public Service'
      ]
    },
    {
      id: 'pref12',
      text: 'What type of work environment do you prefer?',
      type: 'multiple',
      options: [
        'Fast-paced and dynamic',
        'Structured and organized',
        'Creative and flexible',
        'Collaborative and team-oriented',
        'Independent and autonomous',
        'Customer-facing',
        'Research-oriented',
        'Project-based',
        'Remote work',
        'Office-based',
        'Field work',
        'Mixed environment'
      ]
    },
    {
      id: 'pref13',
      text: 'What are your long-term career goals?',
      type: 'multiple',
      options: [
        'Leadership position',
        'Expert in field',
        'Own business',
        'Research and innovation',
        'Teaching and mentoring',
        'Work-life balance',
        'International opportunities',
        'Social impact',
        'High income potential',
        'Job security',
        'Continuous learning',
        'Career advancement'
      ]
    }
  ]
};