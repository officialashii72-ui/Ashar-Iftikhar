import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Briefcase, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { servicesAPI } from '@/services/api';
import type { Service } from '@/types';
// Removed unused getImageUrl

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesAPI.getAll({ active: true });
        const fetchedServices = response.data.data || [];
        setServices(Array.isArray(fetchedServices) ? fetchedServices : []);
      } catch (error) {
        console.error('Failed to fetch services', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

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
              key={service._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 border-2 transition-all duration-300 ${service.popular
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
                    {service.title || service.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {service.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                      {service.price}
                    </span>
                    {/* Add price note if available in schema, otherwise static or omitted */}
                  </div>

                  {/* CTA */}
                  <a
                    href="https://calendly.com/ashariftikhar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className={`group ${service.popular
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
                      {/* Ensure features is an array before mapping */}
                      {Array.isArray(service.features) && service.features.map((feature) => (
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
