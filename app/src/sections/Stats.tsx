import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bot, Clock, Target, TrendingUp } from 'lucide-react';

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function StatItem({ icon: Icon, value, suffix, label, delay }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
            <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        <div className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">
          {count}
          <span className="text-indigo-600 dark:text-indigo-400">{suffix}</span>
        </div>
        <div className="text-gray-600 dark:text-gray-400">{label}</div>
      </div>
    </motion.div>
  );
}

const stats = [
  { icon: Bot, value: 15, suffix: '+', label: 'AI Tools Built' },
  { icon: Clock, value: 500, suffix: '+', label: 'Hours Saved for Clients' },
  { icon: TrendingUp, value: 50, suffix: '+', label: 'Happy Clients' },
  { icon: Target, value: 270, suffix: '', label: 'Days to ₹1 Crore Goal' },
];

export default function Stats() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Numbers That <span className="text-indigo-600 dark:text-indigo-400">Speak</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real results from real implementations. Every number represents hours saved, 
            processes optimized, and businesses transformed.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
