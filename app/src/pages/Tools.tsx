import { motion } from 'framer-motion';
import { 
  Layers, 
  Youtube, 
  Linkedin, 
  ClipboardCheck,
  ArrowRight,
  Zap,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const tools = [
  {
    icon: Youtube,
    name: 'Content Repurposer AI',
    description: 'Transform one YouTube video into 20+ pieces of content for all social platforms automatically.',
    features: [
      'Auto-generate social posts',
      'Create video clips',
      'Write blog summaries',
      'Generate email newsletters',
    ],
    benefits: {
      time: 'Save 15+ hours/week',
      output: '10x content output',
    },
    color: 'from-red-500 to-red-600',
  },
  {
    icon: Linkedin,
    name: 'LinkedIn Lead Generator',
    description: 'Automated LinkedIn outreach system that finds, connects, and nurtures your ideal prospects.',
    features: [
      'Smart prospecting',
      'Personalized messages',
      'Follow-up sequences',
      'CRM integration',
    ],
    benefits: {
      time: 'Save 10+ hours/week',
      output: '5x more leads',
    },
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: ClipboardCheck,
    name: 'AI Workflow Audit Tool',
    description: 'Get a comprehensive analysis of your current workflows with automation recommendations.',
    features: [
      'Process mapping',
      'Bottleneck identification',
      'ROI calculation',
      'Implementation roadmap',
    ],
    benefits: {
      time: 'Free 15-min audit',
      output: 'Custom action plan',
    },
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Zap,
    name: 'n8n Workflow Builder',
    description: 'Custom n8n workflows that connect all your apps and automate complex business processes.',
    features: [
      '200+ app integrations',
      'Error handling',
      'Real-time monitoring',
      'Scalable architecture',
    ],
    benefits: {
      time: 'Save 20+ hours/week',
      output: '99.9% uptime',
    },
    color: 'from-purple-500 to-purple-600',
  },
];

export default function Tools() {
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4">
            <Layers className="w-4 h-4" />
            AI Tools
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Tools That <span className="text-indigo-600 dark:text-indigo-400">Work</span> for You
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I build custom AI-powered tools that automate your workflows, 
            generate leads, and create content while you focus on what matters.
          </p>
        </motion.div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <tool.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {tool.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {tool.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {tool.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Benefits */}
              <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm">
                  <Clock className="w-4 h-4" />
                  {tool.benefits.time}
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  {tool.benefits.output}
                </div>
              </div>

              {/* CTA */}
              <a
                href="https://calendly.com/ashariftikhar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full group/btn">
                  Get This Tool
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
