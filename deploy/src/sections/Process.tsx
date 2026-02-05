import { motion } from 'framer-motion';
import { 
  Search, 
  PenTool, 
  Code2, 
  TestTube, 
  Rocket,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Discovery & Audit',
    description: 'We start with a free 15-minute call to understand your business, current workflows, and identify automation opportunities.',
    duration: 'Free 15-min call',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: PenTool,
    number: '02',
    title: 'System Design',
    description: 'I create a detailed blueprint of your automation system, including workflow diagrams, integrations, and timeline.',
    duration: '2-3 days',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: Code2,
    number: '03',
    title: 'Development & Integration',
    description: 'I build your custom n8n workflows, connect all your apps via APIs, and set up the complete automation system.',
    duration: '1-2 weeks',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: TestTube,
    number: '04',
    title: 'Testing & Training',
    description: 'We thoroughly test all workflows, fix any issues, and I train you or your team on how to use and manage the system.',
    duration: '3-5 days',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: Rocket,
    number: '05',
    title: 'Launch & Support',
    description: 'Your system goes live! I provide ongoing support, monitoring, and optimizations to ensure everything runs smoothly.',
    duration: 'Ongoing',
    color: 'from-orange-500 to-orange-600',
  },
];

export default function Process() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-4">
            <Rocket className="w-4 h-4" />
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-indigo-600 dark:text-indigo-400">5-Step Process</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            A proven methodology to take you from manual processes to 
            fully automated systems that save time and drive growth.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 via-purple-500 via-pink-500 to-orange-500" />

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 h-full border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                  {/* Icon & Number */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-bold flex items-center justify-center shadow-md">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {step.description}
                  </p>

                  {/* Duration Badge */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400">
                    <ArrowRight className="w-3 h-3" />
                    {step.duration}
                  </div>
                </div>

                {/* Arrow - Mobile & Tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
