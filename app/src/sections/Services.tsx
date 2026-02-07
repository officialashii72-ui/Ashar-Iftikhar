import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Zap, Users, FileText, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { servicesAPI } from '../services/api';
import { useSettings } from '../context/SettingsContext';
import type { Service } from '../types';

export default function Services() {
  const { settings } = useSettings();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await servicesAPI.getAll();
      // Filter only active services and sort by order
      const activeServices = (response.data.data || [])
        .filter((s: Service) => s.active)
        .sort((a: Service, b: Service) => (a.order || 0) - (b.order || 0));
      setServices(activeServices);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'zap': return Zap;
      case 'users': return Users;
      case 'filetext': return FileText;
      case 'bot': return Bot;
      default: return Zap;
    }
  };

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
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = getIcon(service.icon || 'zap');
              return (
                <motion.div
                  key={service._id}
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
                    className={`h-full bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border-2 transition-all duration-300 ${service.popular
                        ? 'border-indigo-500 dark:border-indigo-400 shadow-xl shadow-indigo-500/10'
                        : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                      }`}
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {service.title || service.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {service.shortDescription || service.description}
                    </p>

                    {/* Price */}
                    <div className="mb-6">
                      <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        {service.price}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {service.features?.map((feature) => (
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
                      href={settings.calendlyUrl || "https://calendly.com/ashariftikhar"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-auto"
                    >
                      <Button
                        className={`w-full group ${service.popular
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
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
