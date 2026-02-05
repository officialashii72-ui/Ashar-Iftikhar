import { motion } from 'framer-motion';
import Hero from '../sections/Hero';
import Stats from '../sections/Stats';
import Services from '../sections/Services';
import ToolsShowcase from '../sections/ToolsShowcase';
import Process from '../sections/Process';
import CaseStudies from '../sections/CaseStudies';
import Testimonials from '../sections/Testimonials';
import CTA from '../sections/CTA';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Stats />
      <Services />
      <ToolsShowcase />
      <Process />
      <CaseStudies />
      <Testimonials />
      <CTA />
    </motion.div>
  );
}
