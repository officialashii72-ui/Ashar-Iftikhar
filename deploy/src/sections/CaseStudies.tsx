import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, TrendingUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = ['all', 'saas', 'coaches', 'agencies'];

const caseStudies = [
  {
    id: 1,
    title: 'SaaS Onboarding Automation',
    client: 'TechStart Inc.',
    category: 'saas',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    problem: 'Manual onboarding was taking 4 hours per customer and causing delays.',
    solution: 'Built an automated onboarding workflow using n8n that integrates with their CRM, email platform, and product analytics.',
    results: {
      hoursSaved: 120,
      improvement: '95% faster onboarding',
    },
    technologies: ['n8n', 'HubSpot', 'Slack', 'Mixpanel'],
  },
  {
    id: 2,
    title: 'Content Repurposing Engine',
    client: 'Coach Sarah Mitchell',
    category: 'coaches',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    problem: 'Spending 20+ hours per week creating content for multiple platforms.',
    solution: 'Created an AI-powered content engine that turns one video into 20+ pieces of content across all platforms.',
    results: {
      hoursSaved: 18,
      improvement: '3x content output',
    },
    technologies: ['OpenAI', 'n8n', 'Buffer', 'Canva API'],
  },
  {
    id: 3,
    title: 'Lead Generation System',
    client: 'Growth Agency Pro',
    category: 'agencies',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
    problem: 'Inconsistent lead flow and manual outreach taking too much time.',
    solution: 'Implemented a complete lead gen system with LinkedIn automation, email sequences, and CRM integration.',
    results: {
      hoursSaved: 25,
      improvement: '400% more leads',
    },
    technologies: ['n8n', 'LinkedIn API', 'Apollo', 'Pipedrive'],
  },
  {
    id: 4,
    title: 'Customer Support Automation',
    client: 'CloudSoft Solutions',
    category: 'saas',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
    problem: 'Support team overwhelmed with repetitive tickets and slow response times.',
    solution: 'Built an AI-powered support system with auto-categorization, smart routing, and automated responses.',
    results: {
      hoursSaved: 80,
      improvement: '70% faster resolution',
    },
    technologies: ['n8n', 'OpenAI', 'Zendesk', 'Slack'],
  },
  {
    id: 5,
    title: 'Course Launch Automation',
    client: 'EduPro Academy',
    category: 'coaches',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    problem: 'Manual course launch process was error-prone and time-consuming.',
    solution: 'Created an end-to-end launch automation including email sequences, payment processing, and student onboarding.',
    results: {
      hoursSaved: 40,
      improvement: 'Zero launch errors',
    },
    technologies: ['n8n', 'Stripe', 'ConvertKit', 'Teachable'],
  },
  {
    id: 6,
    title: 'Reporting Dashboard',
    client: 'Media Masters',
    category: 'agencies',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    problem: 'Spending 10+ hours weekly compiling reports from multiple platforms.',
    solution: 'Built an automated reporting system that pulls data from all platforms and generates client-ready reports.',
    results: {
      hoursSaved: 10,
      improvement: 'Real-time reports',
    },
    technologies: ['n8n', 'Google Sheets', 'Data Studio', 'Supermetrics'],
  },
];

export default function CaseStudies() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCases = activeCategory === 'all'
    ? caseStudies
    : caseStudies.filter((c) => c.category === activeCategory);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Case <span className="text-indigo-600 dark:text-indigo-400">Studies</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Real results from real clients. See how AI automation transformed their businesses.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCases.map((study, index) => (
              <motion.div
                key={study.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium capitalize">
                      {study.category}
                    </span>
                    <h3 className="text-white font-bold text-lg mt-2">{study.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Client: {study.client}
                  </p>

                  {/* Results */}
                  <div className="flex gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {study.results.hoursSaved} hrs saved
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-indigo-500" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {study.results.improvement}
                      </span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    variant="ghost"
                    className="w-full group/btn text-indigo-600 dark:text-indigo-400"
                  >
                    View Case Study
                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="/case-studies">
            <Button
              size="lg"
              variant="outline"
              className="group"
            >
              View All Case Studies
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
