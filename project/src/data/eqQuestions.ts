import { Section } from '../types/assessment';

export const eqSection: Section = {
  id: 'eq',
  title: 'EQ Navigator Assessment',
  description: 'Discover your emotional intelligence strengths and areas for growth through real-life scenarios.',
  questions: [
    {
      id: 'eq1',
      text: "You're excited to share some good news with a friend, but they seem distracted and uninterested. You...",
      type: 'choice',
      options: [
        'Get angry and accuse them of not caring about you',
        'Feel disappointed but try to understand why they might be distracted',
        'Pretend you\'re not bothered, even though you\'re a little hurt',
        'Stop talking about your news and change the subject'
      ]
    },
    {
      id: 'eq2',
      text: "You witness a classmate making fun of another student's appearance. You...",
      type: 'choice',
      options: [
        'Laugh along with the classmate',
        'Ignore it and hope it stops',
        'Tell the classmate that it\'s not okay and support the targeted student',
        'Tell the targeted student to ignore the comments'
      ]
    },
    {
      id: 'eq3',
      text: "You're feeling really stressed about upcoming exams. You...",
      type: 'choice',
      options: [
        'Isolate yourself and worry constantly',
        'Talk to someone and find healthy ways to manage stress',
        'Procrastinate and avoid thinking about the exams',
        'Try to convince yourself you don\'t care about the exams'
      ]
    },
    {
      id: 'eq4',
      text: "A friend is going through a tough time (e.g., family issues, break-up). You...",
      type: 'choice',
      options: [
        'Offer a listening ear and support, letting them know you\'re there',
        'Try to give them advice, even if you\'re not sure what to say',
        'Avoid them because you don\'t know how to handle the situation',
        'Tell them to "toughen up"'
      ]
    },
    {
      id: 'eq5',
      text: "You receive constructive criticism on a project. You...",
      type: 'choice',
      options: [
        'Get defensive and argue with the person giving feedback',
        'Listen to the feedback and try to learn from it',
        'Feel hurt and take it personally',
        'Ignore the feedback completely'
      ]
    },
    {
      id: 'eq6',
      text: "You have a strong disagreement with a friend. You...",
      type: 'choice',
      options: [
        'Resort to personal insults and name-calling',
        'Try to see things from their perspective and find a compromise',
        'Refuse to talk to your friend anymore',
        'Give them the silent treatment'
      ]
    },
    {
      id: 'eq7',
      text: "You achieve a goal you've been working towards. You...",
      type: 'choice',
      options: [
        'Brag about your achievement to everyone',
        'Celebrate your success and acknowledge your effort',
        'Downplay your achievement, as if it wasn\'t a big deal',
        'Immediately start worrying about your next goal'
      ]
    },
    {
      id: 'eq8',
      text: "You make a mistake. You...",
      type: 'choice',
      options: [
        'Blame someone else',
        'Take responsibility and try to fix the mistake',
        'Try to hide the mistake',
        'Beat yourself up about it excessively'
      ]
    },
    {
      id: 'eq9',
      text: "You see a new student struggling to fit in. You...",
      type: 'choice',
      options: [
        'Ignore them',
        'Make fun of them',
        'Introduce yourself and try to make them feel welcome',
        'Observe them from a distance but don\'t interact'
      ]
    },
    {
      id: 'eq10',
      text: "You feel overwhelmed by your emotions. You...",
      type: 'choice',
      options: [
        'Try to suppress or ignore your feelings',
        'Find healthy ways to express your emotions',
        'Lash out at others',
        'Engage in self-destructive behaviors'
      ]
    }
  ]
};