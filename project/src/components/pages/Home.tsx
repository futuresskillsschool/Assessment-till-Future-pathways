import React from 'react';
import { 
  Target, 
  Brain, 
  Compass, 
  Briefcase, 
  Lightbulb, 
  Heart, 
  Microscope,
  GraduationCap,
  Eye,
  Smile,
  Rocket
} from 'lucide-react';
import { AssessmentCard } from '../ui/AssessmentCard';

const assessments = [
  {
    id: 'career',
    title: 'Career Path Assessment',
    description: 'Discover your ideal career path through our comprehensive assessment that analyzes your personality, skills, and preferences.',
    icon: Target,
    color: 'blue' as const,
    link: '/assessment'
  },
  {
    id: 'vision',
    title: 'Career Vision Assessment',
    description: 'Clarify your long-term career aspirations and create a roadmap for your professional future through guided self-reflection.',
    icon: Eye,
    color: 'purple' as const,
    link: '/vision'
  },
  {
    id: 'scct',
    title: 'SCCT Assessment',
    description: 'Evaluate your career choices based on Social Cognitive Career Theory, exploring self-efficacy, outcome expectations, and personal goals.',
    icon: Brain,
    color: 'purple' as const,
    link: '/scct'
  },
  {
    id: 'personality',
    title: 'Personality Assessment',
    description: 'Gain deep insights into your personality traits and understand how they influence your work style and career choices.',
    icon: Heart,
    color: 'green' as const,
    link: '/personality'
  },
  {
    id: 'riasec',
    title: 'RIASEC Model',
    description: "Discover your career interests using Holland's RIASEC model to find occupations that match your personality type.",
    icon: Compass,
    color: 'orange' as const,
    link: '/riasec'
  },
  {
    id: 'eq',
    title: 'EQ Navigator',
    description: 'Explore your emotional intelligence through real-life scenarios and discover strategies for better relationships and personal growth.',
    icon: Smile,
    color: 'purple' as const,
    link: '/eq'
  },
  {
    id: 'clusters',
    title: 'Future Pathways Explorer',
    description: 'Discover which emerging tech-focused career clusters align with your interests and strengths, and explore exciting future career possibilities.',
    icon: Rocket,
    color: 'blue' as const,
    link: '/clusters'
  }
];

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Professional Assessments
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Take our scientifically validated assessments to gain valuable insights into your personality, skills, values, and career potential.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {assessments.map((assessment) => (
          <AssessmentCard key={assessment.id} {...assessment} />
        ))}
      </div>
    </div>
  );
}
