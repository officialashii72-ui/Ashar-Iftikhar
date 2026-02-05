import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { testimonialsAPI } from '../services/api';
import type { Testimonial } from '../types';
import TestimonialCarousel from '../components/TestimonialCarousel';
import SocialProofTicker from '../components/SocialProofTicker';
import { Loader2 } from 'lucide-react';

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await testimonialsAPI.getAll({ featured: true });
                setTestimonials(response.data.data || []);
            } catch (error) {
                console.error('Failed to fetch testimonials:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <section className="py-24 bg-gray-50 dark:bg-black overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4"
                    >
                        <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                        Social Proof
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                    >
                        What My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Clients Say</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
                    >
                        Real results from businesses transformed by strategic AI integration and custom workflow automation.
                    </motion.p>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative z-10"
                    >
                        <TestimonialCarousel testimonials={testimonials} />
                    </motion.div>
                )}
            </div>

            <div className="mt-20">
                <SocialProofTicker />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 -left-64 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
