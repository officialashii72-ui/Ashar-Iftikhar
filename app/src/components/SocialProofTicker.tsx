import { motion } from 'framer-motion';
import { Award, CheckCircle, Rocket, Users, Briefcase, Zap } from 'lucide-react';

const stats = [
    { icon: Award, text: 'Top Rated AI Expert' },
    { icon: Rocket, text: '50+ Workflows Automated' },
    { icon: Users, text: '30+ Happy Clients' },
    { icon: Briefcase, text: '4+ Years AI Experience' },
    { icon: Zap, text: '99% System Uptime' },
    { icon: CheckCircle, text: '100% Client Satisfaction' },
];

export default function SocialProofTicker() {
    return (
        <div className="relative w-full overflow-hidden bg-white/5 dark:bg-gray-900/40 backdrop-blur-sm border-y border-gray-200/50 dark:border-gray-800/50 py-6">
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 25,
                            ease: 'linear',
                        },
                    }}
                    className="flex gap-12 items-center"
                >
                    {[...stats, ...stats, ...stats].map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-3 text-gray-500 dark:text-gray-400 font-medium"
                        >
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                                <item.icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <span className="text-sm tracking-wide uppercase">{item.text}</span>
                            <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700 ml-8" />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Gradients to fade out edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 dark:from-black to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 dark:from-black to-transparent z-10" />
        </div>
    );
}
