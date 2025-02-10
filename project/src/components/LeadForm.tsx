import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, GraduationCap, Briefcase, Target, Wrench } from 'lucide-react';

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  education: string;
  currentProfession: string;
  goals: string;
  preferredSkills: string[];
}

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => Promise<void>;
}

export function LeadForm({ onSubmit }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    city: '',
    education: '',
    currentProfession: '',
    goals: '',
    preferredSkills: []
  });

  const skillOptions = [
    { category: 'Technical', skills: [
      'Programming',
      'Data Analysis',
      'Web Development',
      'Mobile Development',
      'Cloud Computing',
      'DevOps',
      'Cybersecurity'
    ]},
    { category: 'Business', skills: [
      'Project Management',
      'Business Analysis',
      'Marketing',
      'Sales',
      'Finance',
      'Strategy',
      'Operations'
    ]},
    { category: 'Creative', skills: [
      'Graphic Design',
      'UI/UX Design',
      'Content Creation',
      'Video Production',
      'Animation',
      'Creative Writing',
      'Digital Art'
    ]},
    { category: 'Soft Skills', skills: [
      'Leadership',
      'Communication',
      'Problem Solving',
      'Team Collaboration',
      'Time Management',
      'Critical Thinking',
      'Emotional Intelligence'
    ]}
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkillChange = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      preferredSkills: prev.preferredSkills.includes(skill)
        ? prev.preferredSkills.filter(s => s !== skill)
        : [...prev.preferredSkills, skill]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Almost There!</h2>
          <p className="text-blue-100">Complete your profile to receive your personalized career insights</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4 mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="w-4 h-4 mr-2" />
                  City *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Education Level *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                >
                  <option value="">Select education level</option>
                  <option value="high_school">High School</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                  <option value="postgraduate">Post Graduate</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Current Profession
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.currentProfession}
                  onChange={(e) => setFormData({ ...formData, currentProfession: e.target.value })}
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Target className="w-4 h-4 mr-2" />
                  Career Goals *
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  placeholder="What are your career aspirations?"
                />
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-8">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-4">
              <Wrench className="w-4 h-4 mr-2" />
              Preferred Skills to Develop (Select at least one) *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillOptions.map((category) => (
                <div key={category.category} className="space-y-2">
                  <h4 className="font-medium text-gray-900">{category.category}</h4>
                  {category.skills.map((skill) => (
                    <label key={skill} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.preferredSkills.includes(skill)}
                        onChange={() => handleSkillChange(skill)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{skill}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting || formData.preferredSkills.length === 0}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'View My Career Analysis'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}