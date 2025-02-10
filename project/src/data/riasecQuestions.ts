import { Section } from '../types/assessment';

export const riasecSection: Section = {
  id: 'riasec',
  title: 'RIASEC Career Assessment',
  description: 'This assessment helps determine your career interests based on Holland\'s RIASEC model.',
  questions: [
    // Realistic (2 questions)
    {
      id: 'r1',
      text: 'I enjoy building or fixing things with my hands.',
      type: 'likert'
    },
    {
      id: 'r2',
      text: 'I like learning how machines and technology work.',
      type: 'likert'
    },
    // Investigative (2 questions)
    {
      id: 'i1',
      text: 'I enjoy solving puzzles and complex problems.',
      type: 'likert'
    },
    {
      id: 'i2',
      text: 'I like doing experiments and discovering how things work.',
      type: 'likert'
    },
    // Artistic (2 questions)
    {
      id: 'a1',
      text: 'I enjoy expressing myself through art, music, or writing.',
      type: 'likert'
    },
    {
      id: 'a2',
      text: 'I like coming up with creative ideas and solutions.',
      type: 'likert'
    },
    // Social (2 questions)
    {
      id: 's1',
      text: 'I enjoy helping others learn new things.',
      type: 'likert'
    },
    {
      id: 's2',
      text: 'I like working with others in group activities.',
      type: 'likert'
    },
    // Enterprising (2 questions)
    {
      id: 'e1',
      text: 'I enjoy leading group projects or activities.',
      type: 'likert'
    },
    {
      id: 'e2',
      text: 'I like presenting my ideas and convincing others.',
      type: 'likert'
    },
    // Conventional (2 questions)
    {
      id: 'c1',
      text: 'I enjoy organizing and keeping track of information.',
      type: 'likert'
    },
    {
      id: 'c2',
      text: 'I like following clear rules and instructions.',
      type: 'likert'
    }
  ]
};