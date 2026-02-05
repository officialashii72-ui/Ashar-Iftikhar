import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const caseStudies = [
  {
    id: 1,
    title: 'SaaS Onboarding Automation',
    client: 'TechStart Inc.',
    industry: 'SaaS',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    challenge: 'Manual onboarding was taking 4 hours per customer, causing delays and inconsistent experiences.',
    solution: 'Built an end-to-end automated onboarding workflow using n8n that integrates with their CRM, email platform, and product analytics.',
    results: [
      { metric: '95%', label: 'Faster onboarding' },
      { metric: '120', label: 'Hours saved monthly' },
      { metric: '0', label: 'Manual errors' },
    ],
    technologies: ['n8n', 'HubSpot', 'Slack', 'Mixpanel', 'Stripe'],
    testimonial: {
      quote: 'The onboarding automation has been a game-changer. Our team can now focus on customer success instead of manual data entry.',
      author: 'Raj Patel',
      role: 'CEO',
    },
  },
  {
    id: 2,
    title: 'Content Repurposing Engine',
    client: 'Coach Sarah Mitchell',
    industry: 'Coaching',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
    challenge: 'Spending 20+ hours per week creating content for multiple platforms, leading to burnout.',
    solution: 'Created an AI-powered content engine that turns one video into 20+ pieces of content across all platforms automatically.',
    results: [
      { metric: '18', label: 'Hours saved weekly' },
      { metric: '3x', label: 'Content output' },
      { metric: '40%', label: 'Engagement increase' },
    ],
    technologies: ['OpenAI', 'n8n', 'Buffer', 'Canva API', 'YouTube API'],
    testimonial: {
      quote: 'I went from struggling to post consistently to having content scheduled weeks in advance. Best investment for my business.',
      author: 'Sarah Mitchell',
      role: 'Business Coach',
    },
  },
  {
    id: 3,
    title: 'Lead Generation System',
    client: 'Growth Agency Pro',
    industry: 'Agency',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop',
    challenge: 'Inconsistent lead flow and manual outreach taking too much time from the sales team.',
    solution: 'Implemented a complete lead gen system with LinkedIn automation, email sequences, and CRM integration.',
    results: [
      { metric: '400%', label: 'More qualified leads' },
      { metric: '25', label: 'Hours saved weekly' },
      { metric: '3x', label: 'ROI in 2 months' },
    ],
    technologies: ['n8n', 'LinkedIn API', 'Apollo', 'Pipedrive', 'OpenAI'],
    testimonial: {
      quote: 'Our sales team loves the quality of leads coming in. The system runs 24/7 and keeps our pipeline full.',
      author: 'Emily Chen',
      role: 'Marketing Director',
    },
  },
];

export default function CaseStudiesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20"
    >
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Case Studies
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Real Results, Real{' '}
            <span className="text-indigo-600 dark:text-indigo-400">Businesses</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            See how AI automation transformed these businesses. Every case study 
            shows real metrics and real impact.
          </p>
        </motion.div>
      </section>

      {/* Case Studies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-lg"
            >
              {/* Image */}
              <div className="relative h-64 lg:h-96">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-3">
                    {study.industry}
                  </span>
                  <h2 className="text-2xl lg:text-4xl font-bold text-white mb-2">
                    {study.title}
                  </h2>
                  <p className="text-white/80">Client: {study.client}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                  {/* Challenge & Solution */}
                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        The Challenge
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {study.challenge}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        The Solution
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {study.solution}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                      <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                        "{study.testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold">
                          {study.testimonial.author[0]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {study.testimonial.author}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {study.testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Results
                    </h3>
                    <div className="space-y-4">
                      {study.results.map((result) => (
                        <div
                          key={result.label}
                          className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6"
                        >
                          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                            {result.metric}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {result.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <a
                      href="https://calendly.com/ashariftikhar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-6"
                    >
                      <Button className="w-full group">
                        Get Similar Results
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
