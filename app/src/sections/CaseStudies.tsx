import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ComparisonSlider from '../components/ComparisonSlider';

const categories = ['all', 'saas', 'coaches', 'agencies'];

const caseStudies = [
  // ... existing 6 items ...
  {
    id: 1,
    title: 'SaaS Onboarding Automation',
    client: 'TechStart Inc.',
    category: 'saas',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    problem: 'Manual onboarding was taking 4 hours per customer and causing delays.',
    solution: 'Built an automated onboarding workflow using n8n that integrates with their CRM, email platform, and product analytics.',
    results: { hoursSaved: 120, improvement: '95% faster' },
    technologies: ['n8n', 'HubSpot', 'Slack'],
  },
  {
    id: 2,
    title: 'Content Repurposing Engine',
    client: 'Coach Sarah Mitchell',
    category: 'coaches',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    problem: 'Spending 20+ hours per week creating content for multiple platforms.',
    solution: 'Created an AI-powered content engine that turns one video into 20+ pieces of content across all platforms.',
    results: { hoursSaved: 18, improvement: '3x output' },
    technologies: ['OpenAI', 'n8n', 'Buffer'],
  },
  {
    id: 3,
    title: 'Lead Generation System',
    client: 'Growth Agency Pro',
    category: 'agencies',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
    problem: 'Inconsistent lead flow and manual outreach taking too much time.',
    solution: 'Implemented a complete lead gen system with LinkedIn automation, email sequences, and CRM integration.',
    results: { hoursSaved: 25, improvement: '400% leads' },
    technologies: ['n8n', 'LinkedIn', 'Apollo'],
  },
  {
    id: 4,
    title: 'Customer Support Bot',
    client: 'CloudSoft Solutions',
    category: 'saas',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
    problem: 'Support team overwhelmed with repetitive tickets and slow response times.',
    solution: 'Built an AI-powered support system with auto-categorization, smart routing, and automated responses.',
    results: { hoursSaved: 80, improvement: '70% faster' },
    technologies: ['n8n', 'OpenAI', 'Zendesk'],
  },
  {
    id: 5,
    title: 'Course Launch System',
    client: 'EduPro Academy',
    category: 'coaches',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    problem: 'Manual course launch process was error-prone and time-consuming.',
    solution: 'Created an end-to-end launch automation including email sequences, payment processing, and student onboarding.',
    results: { hoursSaved: 40, improvement: 'Zero errors' },
    technologies: ['n8n', 'Stripe', 'ConvertKit'],
  },
  {
    id: 6,
    title: 'Agency Reporting Hub',
    client: 'Media Masters',
    category: 'agencies',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    problem: 'Spending 10+ hours weekly compiling reports from multiple platforms.',
    solution: 'Built an automated reporting system that pulls data from all platforms and generates client-ready reports.',
    results: { hoursSaved: 10, improvement: 'Real-time' },
    technologies: ['n8n', 'Sheets', 'Looker'],
  },
  {
    id: 7,
    title: 'E-commerce Ops AI',
    client: 'StyleStore',
    category: 'saas',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=600&h=400&fit=crop',
    problem: 'Inventory management and order processing were manual and slow.',
    solution: 'Automated inventory syncing and order notifications across all channels.',
    results: { hoursSaved: 30, improvement: '100% acc.' },
    technologies: ['n8n', 'Shopify', 'Airtable'],
  },
  {
    id: 8,
    title: 'Recruitment Auto-Filter',
    client: 'HireFast',
    category: 'agencies',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop',
    problem: 'Recruiters drowning in unqualified resumes.',
    solution: 'AI agent scans resumes, scores them against job descriptions, and drafts outreach.',
    results: { hoursSaved: 45, improvement: '2x placements' },
    technologies: ['n8n', 'OpenAI', 'Greenhouse'],
  },
];

export default function CaseStudies() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCases = activeCategory === 'all'
    ? caseStudies
    : caseStudies.filter((c) => c.category === activeCategory);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          // ... header stays same ...
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Case <span className="text-indigo-600 dark:text-indigo-400">Studies</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Real results from real clients.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 ${activeCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Case Studies Grid - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCases.map((study, index) => (
              <motion.div
                key={study.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300 flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden shrink-0">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-1 block">
                      {study.client}
                    </span>
                    <h3 className="font-bold text-base leading-tight">{study.title}</h3>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium capitalize border border-white/20">
                      {study.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Results Metrics */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-2 text-center">
                      <div className="text-sm font-bold text-green-700 dark:text-green-400">
                        {study.results.hoursSaved}h
                      </div>
                      <div className="text-[10px] text-green-600/80 dark:text-green-500/80 font-medium">Saved</div>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-lg p-2 text-center">
                      <div className="text-sm font-bold text-indigo-700 dark:text-indigo-400">
                        {study.results.improvement}
                      </div>
                      <div className="text-[10px] text-indigo-600/80 dark:text-indigo-500/80 font-medium">Impact</div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {study.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Spacer to push button dowm */}
                  <div className="mt-auto pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full h-8 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 group/btn"
                    >
                      View Details
                      <ExternalLink className="ml-1.5 w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Visual Transformation Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white dark:bg-gray-800/50 rounded-[2.5rem] p-8 md:p-12 border border-indigo-100 dark:border-indigo-900/30">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Visual Transformation
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                See the Impact of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">AI Optimization</span>
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Witness how we transform chaotic, manual legacy workflows into streamlined, AI-powered automation engines. Use the slider to see the difference in operational efficiency and data clarity.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">85%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Error Reduction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">12x</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Processing Speed</div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-2xl">
              <ComparisonSlider
                beforeImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
                afterImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                beforeLabel="Legacy Workflow"
                afterLabel="AI Automated Engine"
              />
            </div>
          </div>
        </motion.div>

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
