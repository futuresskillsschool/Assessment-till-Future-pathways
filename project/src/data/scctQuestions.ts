import { Section } from '../types/assessment';

export const scctSection: Section = {
  id: 'scct',
  title: 'SCCT Career Assessment',
  description: 'This assessment evaluates your career development through the lens of Social Cognitive Career Theory.',
  questions: [
    // Self-Efficacy
    {
      id: 'se1',
      text: 'I believe I can succeed in any career I choose.',
      type: 'likert'
    },
    {
      id: 'se2',
      text: 'I am confident in my ability to solve complex problems.',
      type: 'likert'
    },
    {
      id: 'se3',
      text: 'I can handle the challenges of a professional career.',
      type: 'likert'
    },
    {
      id: 'se4',
      text: 'I am good at managing time and tasks effectively.',
      type: 'likert'
    },
    {
      id: 'se5',
      text: 'I can learn new skills quickly and efficiently.',
      type: 'likert'
    },
    // Outcome Expectations
    {
      id: 'oe1',
      text: 'A good career will help me achieve financial stability.',
      type: 'likert'
    },
    {
      id: 'oe2',
      text: 'Having a successful career will make my family proud.',
      type: 'likert'
    },
    {
      id: 'oe3',
      text: 'I believe my career will allow me to contribute to society.',
      type: 'likert'
    },
    {
      id: 'oe4',
      text: 'I expect to have job satisfaction in my chosen career.',
      type: 'likert'
    },
    {
      id: 'oe5',
      text: 'I think my career will help me achieve my personal goals.',
      type: 'likert'
    },
    // Career Interests
    {
      id: 'ci1',
      text: 'I enjoy activities that involve science and technology.',
      type: 'likert'
    },
    {
      id: 'ci2',
      text: 'I like tasks that require creativity and artistic skills.',
      type: 'likert'
    },
    {
      id: 'ci3',
      text: 'I prefer working on projects that involve teamwork and collaboration.',
      type: 'likert'
    },
    {
      id: 'ci4',
      text: 'I am interested in leadership and management roles.',
      type: 'likert'
    },
    {
      id: 'ci5',
      text: 'I enjoy organizing and planning events or activities.',
      type: 'likert'
    },
    // Career Goals
    {
      id: 'cg1',
      text: 'I have a clear idea of what career I want to pursue.',
      type: 'likert'
    },
    {
      id: 'cg2',
      text: 'I have set specific career goals for myself.',
      type: 'likert'
    },
    {
      id: 'cg3',
      text: 'I plan to pursue higher education to achieve my career goals.',
      type: 'likert'
    },
    {
      id: 'cg4',
      text: 'I am taking steps to gain experience in my field of interest.',
      type: 'likert'
    },
    {
      id: 'cg5',
      text: 'I am determined to achieve my career goals no matter what obstacles I face.',
      type: 'likert'
    },
    // Barriers and Supports
    {
      id: 'bs1',
      text: 'I have access to the resources I need to pursue my career goals.',
      type: 'likert'
    },
    {
      id: 'bs2',
      text: 'I receive support from my family in my career choices.',
      type: 'likert'
    },
    {
      id: 'bs3',
      text: 'I have mentors who guide me in my career path.',
      type: 'likert'
    },
    {
      id: 'bs4',
      text: 'I am aware of the challenges in my chosen career field.',
      type: 'likert'
    },
    {
      id: 'bs5',
      text: 'I have strategies to overcome potential barriers to my career success.',
      type: 'likert'
    }
  ]
};