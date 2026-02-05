import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projectsAPI } from '@/services/api';
import type { Project } from '@/types';
import { getImageUrl } from '@/utils/imageUtils';

export default function CaseStudiesPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll();
        const fetchedProjects = response.data.data || [];
        setProjects(Array.isArray(fetchedProjects) ? fetchedProjects : []);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Case Studies
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Real Results, Real{' '}
            <span className="text-indigo-600 dark:text-indigo-400">Businesses</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            See how AI automation transformed these businesses. Every case study
            shows real metrics and real impact.
          </p>
        </motion.div>
      </section>

      {/* Case Studies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {projects.map((study, index) => (
            <motion.article
              key={study._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-lg"
            >
              {/* Image */}
              <div className="relative h-64 lg:h-96">
                <img
                  src={getImageUrl(study.image)}
                  alt={study.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-3">
                    {study.category}
                  </span>
                  <h2 className="text-2xl lg:text-4xl font-bold text-white mb-2">
                    {study.title}
                  </h2>
                  <p className="text-white/80">Client: {study.client || 'Client Confidential'}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                  {/* Challenge & Solution */}
                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        The Challenge
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {study.challenge || 'Details coming soon.'}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        The Solution
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {study.solution || 'Details coming soon.'}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies?.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Results
                    </h3>
                    <div className="space-y-4">
                      {/* Assuming results might be added to schema later, or reusing existing fields if mapped */}
                      {/* For now we can hide this section or show placeholder if empty */}
                      <div className="text-sm text-gray-500 italic">
                        Result metrics available upon request.
                      </div>
                    </div>

                    <a
                      href={`/projects/${study._id}`}
                      className="block mt-6"
                    >
                      <Button className="w-full group">
                        View Details
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
