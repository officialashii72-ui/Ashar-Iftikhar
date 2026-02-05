import { motion } from 'framer-motion';
import { Check, ArrowRight, Briefcase, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    title: 'AI Workflow Automation',
    description: 'Streamline your business processes with intelligent automation that works 24/7.',
    price: '₹25,000',
    priceNote: 'Starting price',
    features: [
      'Custom n8n workflow design & development',
      'Integration with 50+ apps and APIs',
      'Error handling & monitoring setup',
      'Complete documentation',
      'Team training session',
      '30 days of support',
    ],
    idealFor: 'Businesses looking to automate repetitive tasks',
    deliverables: ['Workflow diagrams', 'n8n workflows', 'Documentation', 'Training video'],
  },
  {
    title: 'AI-Powered Lead System',
    description: 'Complete lead generation and nurturing system that fills your pipeline automatically.',
    price: '₹50,000',
    priceNote: 'Setup fee + ₹15,000/month',
    features: [
      'LinkedIn automation & outreach',
      'Email sequence automation',
      'CRM integration & lead scoring',
      'Lead qualification system',
      'Monthly optimization',
      'Weekly performance reports',
    ],
    idealFor: 'B2B companies and agencies',
    deliverables: ['Lead gen system', 'Email templates', 'CRM setup', 'Analytics dashboard'],
    popular: true,
  },
  {
    title: 'Content Engine Setup',
    description: 'Turn one piece of content into 20+ assets across all platforms automatically.',
    price: '₹35,000',
    priceNote: 'One-time setup',
    features: [
      'Content repurposing workflow',
      'Social media scheduling',
      'AI-powered caption generation',
      'Hashtag optimization',
      'Analytics dashboard',
      '60 days of support',
    ],
    idealFor: 'Coaches, creators, and marketers',
    deliverables: ['Content workflow', 'Scheduling setup', 'Brand guidelines', 'Training'],
  },
  {
    title: 'Custom AI Integration',
    description: 'Bespoke AI solutions tailored to your specific business needs.',
    price: 'Custom',
    priceNote: 'Based on requirements',
    features: [
      'Discovery & requirements analysis',
      'Custom AI solution design',
      'Full-stack development',
      'API development & integration',
      'Testing & quality assurance',
      'Ongoing maintenance & support',
    ],
    idealFor: 'Enterprise and complex requirements',
    deliverables: ['Custom solution', 'Source code', 'API docs', 'SLA agreement'],
  },
];

export default function Services() {
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
            <Briefcase className="w-4 h-4" />
            Services
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Services Built for{' '}
            <span className="text-indigo-600 dark:text-indigo-400">Results</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From workflow automation to complete AI systems, I offer solutions 
            that save time, reduce costs, and drive growth.
          </p>
        </motion.div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 border-2 transition-all duration-300 ${
                service.popular
                  ? 'border-indigo-500 shadow-xl shadow-indigo-500/10'
                  : 'border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600'
              }`}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  {service.popular && (
                    <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4">
                      Most Popular
                    </span>
                  )}
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {service.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                      {service.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                      {service.priceNote}
                    </span>
                  </div>

                  {/* CTA */}
                  <a
                    href="https://calendly.com/ashariftikhar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className={`group ${
                        service.popular
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          : ''
                      }`}
                    >
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Features */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      What's Included:
                    </h3>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                        >
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For & Deliverables */}
                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Ideal For:
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {service.idealFor}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Deliverables:
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {service.deliverables.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Custom Projects CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-center"
        >
          <Bot className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Have a Custom Project in Mind?
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            I specialize in building custom AI solutions. Let's discuss your unique 
            requirements and create something amazing together.
          </p>
          <a
            href="https://calendly.com/ashariftikhar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-indigo-600 hover:bg-gray-100"
            >
              Book a Free Consultation
            </Button>
          </a>
        </motion.div>
      </section>
    </motion.div>
  );
}
