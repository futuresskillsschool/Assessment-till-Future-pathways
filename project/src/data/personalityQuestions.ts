import { Section } from '../types/assessment';

export const personalitySection: Section = {
  id: 'personality',
  title: 'Personality Assessment',
  description: 'This assessment helps us understand your personality traits and behavioral tendencies.',
  questions: [
    {
      id: 'o1',
      text: 'I enjoy exploring new ideas or subjects.',
      type: 'likert'
    },
    {
      id: 'o2',
      text: 'I like learning about new cultures or traditions.',
      type: 'likert'
    },
    {
      id: 'c1',
      text: 'I make sure to complete my homework/assignments on time.',
      type: 'likert'
    },
    {
      id: 'c2',
      text: 'I am well-organized and keep my study materials/books in order.',
      type: 'likert'
    },
    {
      id: 'e1',
      text: 'I enjoy participating in group discussions in class.',
      type: 'likert'
    },
    {
      id: 'e2',
      text: 'I like being the centre of attention at social gatherings.',
      type: 'likert'
    },
    {
      id: 'a1',
      text: 'I often help my classmates with their studies.',
      type: 'likert'
    },
    {
      id: 'a2',
      text: 'I get along well with most of my classmates and teachers.',
      type: 'likert'
    },
    {
      id: 'n1',
      text: 'I often feel anxious before exams.',
      type: 'likert'
    },
    {
      id: 'n2',
      text: "I get upset easily when things don't go as planned.",
      type: 'likert'
    }
  ]
};