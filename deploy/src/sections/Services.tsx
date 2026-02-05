import { motion } from 'framer-motion';
import { ArrowRight, Check, Zap, Users, FileText, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Zap,
    title: 'AI Workflow Automation',
    description: 'Automate repetitive tasks and streamline your business processes with intelligent n8n workflows.',
    price: 'Starting at ₹25,000',
    features: [
      'Custom n8n workflow design',
      'API integrations (50+ apps)',
      'Error handling & monitoring',
      'Documentation & training',
      '30-day support',
    ],
    popular: false,
  },
  {
    icon: Users,
    title: 'AI-Powered Lead System',
    description: 'Complete lead generation and nurturing system that works 24/7 to fill your pipeline.',
    price: '₹50,000 setup + ₹15,000/month',
    features: [
      'LinkedIn automation',
      'Email outreach sequences',
      'CRM integration',
      'Lead scoring & qualification',
      'Monthly optimization',
      'Weekly performance reports',
    ],
    popular: true,
  },
  {
    icon: FileText,
    title: 'Content Engine Setup',
    description: 'Turn one piece of content into 20+ assets across all platforms automatically.',
    price: '₹35,000 one-time',
    features: [
      'Content repurposing workflow',
      'Social media scheduling',
      'AI-powered caption generation',
      'Hashtag optimization',
      'Analytics dashboard',
      '60-day support',
    ],
    popular: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4">
            <Bot className="w-4 h-4" />
            Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            AI Solutions That{' '}
            <span className="text-indigo-600 dark:text-indigo-400">Drive Growth</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            From workflow automation to complete lead generation systems, 
            I build solutions that save time and increase revenue.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`h-full bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border-2 transition-all duration-300 ${
                  service.popular
                    ? 'border-indigo-500 dark:border-indigo-400 shadow-xl shadow-indigo-500/10'
                    : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                }`}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {service.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {service.price}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="https://calendly.com/ashariftikhar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    className={`w-full group ${
                      service.popular
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900'
                    }`}
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
