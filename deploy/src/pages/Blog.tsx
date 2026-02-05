import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, ArrowRight, Tag, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';

const categories = ['All', 'n8n Tutorials', 'API Integration', 'Business Automation', 'AI Tools'];

// Mock data for initial render
const mockPosts: BlogPost[] = [
  {
    _id: '1',
    title: 'How to Build Your First n8n Workflow: A Complete Guide',
    slug: 'how-to-build-first-n8n-workflow',
    excerpt: 'Learn the fundamentals of n8n and build your first automation workflow from scratch. Perfect for beginners.',
    content: '',
    category: 'n8n Tutorials',
    tags: ['n8n', 'automation', 'tutorial'],
    author: { name: 'Ashar Iftikhar' },
    published: true,
    views: 1250,
    featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    _id: '2',
    title: '5 AI Automation Ideas That Will Save You 20+ Hours Per Week',
    slug: 'ai-automation-ideas-save-time',
    excerpt: 'Discover five powerful AI automation workflows that can dramatically reduce your manual work hours.',
    content: '',
    category: 'Business Automation',
    tags: ['AI', 'automation', 'productivity'],
    author: { name: 'Ashar Iftikhar' },
    published: true,
    views: 2100,
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
  },
  {
    _id: '3',
    title: 'Integrating OpenAI with Your Business: A Practical Guide',
    slug: 'integrating-openai-business-guide',
    excerpt: 'Step-by-step guide to integrating OpenAI API into your business workflows for maximum impact.',
    content: '',
    category: 'API Integration',
    tags: ['OpenAI', 'API', 'integration'],
    author: { name: 'Ashar Iftikhar' },
    published: true,
    views: 1800,
    featuredImage: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=600&h=400&fit=crop',
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z',
  },
  {
    _id: '4',
    title: 'Building a Content Repurposing Engine with n8n and AI',
    slug: 'content-repurposing-engine-n8n-ai',
    excerpt: 'Learn how to build an automated system that turns one piece of content into 20+ assets.',
    content: '',
    category: 'AI Tools',
    tags: ['content', 'n8n', 'AI'],
    author: { name: 'Ashar Iftikhar' },
    published: true,
    views: 950,
    featuredImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop',
    createdAt: '2023-12-28T10:00:00Z',
    updatedAt: '2023-12-28T10:00:00Z',
  },
  {
    _id: '5',
    title: 'The Complete Guide to LinkedIn Automation (Without Getting Banned)',
    slug: 'linkedin-automation-guide',
    excerpt: 'How to safely automate your LinkedIn outreach while staying compliant with platform rules.',
    content: '',
    category: 'Business Automation',
    tags: ['LinkedIn', 'automation', 'lead generation'],
    author: { name: 'Ashar Iftikhar' },
    published: true,
    views: 3200,
    featuredImage: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=600&h=400&fit=crop',
    createdAt: '2023-12-20T10:00:00Z',
    updatedAt: '2023-12-20T10:00:00Z',
  },
  {
    _id: '6',
    title: 'API Integration Best Practices for 2024',
    slug: 'api-integration-best-practices-2024',
    excerpt: 'Essential best practices for integrating APIs into your business workflows securely and efficiently.',
    content: '',
    category: 'API Integration',
    tags: ['API', 'best practices', 'integration'],
    author: { name: 'Ashar Iftikhar' },
    published: true,
    views: 750,
    featuredImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    createdAt: '2023-12-15T10:00:00Z',
    updatedAt: '2023-12-15T10:00:00Z',
  },
];

export default function Blog() {
  const [posts] = useState<BlogPost[]>(mockPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20"
    >
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
            <FileText className="w-4 h-4" />
            Blog
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Insights on <span className="text-indigo-600 dark:text-indigo-400">AI & Automation</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Learn about n8n, API integrations, and business automation. 
            Practical guides and tutorials to help you work smarter.
          </p>
        </motion.div>
      </section>

      {/* Search & Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 rounded-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-xs font-medium text-gray-700 dark:text-gray-300">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span>{post.views} views</span>
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        <span className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </section>
    </motion.div>
  );
}
