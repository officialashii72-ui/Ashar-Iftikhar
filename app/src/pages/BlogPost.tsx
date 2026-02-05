import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  ChevronLeft,
  Twitter,
  Linkedin,
  Loader2,
  Tag,
  User,
  Facebook
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogAPI } from '../services/api';
import type { BlogPost as BlogPostType } from '../types';
import { useSettings } from '../context/SettingsContext';
import SEO from '../components/SEO';
import { getImageUrl } from '../utils/imageUtils';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  // Removed unused navigate
  const { settings } = useSettings();
  const [post, setPost] = useState<BlogPostType | null>(null); // Type changed
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      setIsLoading(true);
      try {
        const response = await blogAPI.getBySlug(slug);

        // Backend returns { success: true, data: { ...post } }
        if (response.data.success && response.data.data) {
          setPost(response.data.data);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Failed to fetch post', err);
        setError('Failed to load post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 text-center px-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {error || 'Post not found'}
        </h1>
        <Link to="/blog">
          <Button variant="outline">
            <ChevronLeft className="mr-2 w-4 h-4" /> {/* Changed from ArrowLeft */}
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  const shareText = `Check out this article: ${post.title}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20"
    >
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link to="/blog">
          <Button variant="ghost" className="group">
            <ChevronLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {/* Changed from ArrowLeft */}
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden">
          <img
            src={getImageUrl(post.featuredImage)}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-block px-4 py-1 rounded-full bg-indigo-600 text-white text-sm font-medium mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold">
              {post.author?.name?.[0] || 'A'}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{post.author?.name || settings.siteTitle?.split(' - ')[0] || 'Ashar Iftikhar'}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Author</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            {new Date(post.createdAt || new Date()).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            {/* Read time would ideally be calculated or stored. Defaulting for now */}
            5 min read
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <User className="w-4 h-4" />
            {post.views || 0} views
          </div>
        </div>

        {/* Share Buttons */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-sm text-gray-500 dark:text-gray-400">Share:</span>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-colors"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-800 transition-colors"
          >
            <Facebook className="w-4 h-4" />
          </a>
        </div>

        <SEO
          title={post.title}
          description={post.excerpt}
          keywords={post.tags?.join(', ') || ''}
        />

        {/* Article Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-pre:bg-gray-900 prose-pre:text-gray-100"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Enjoyed this article?
          </h3>
          <p className="text-white/80 mb-6">
            Subscribe to my newsletter for weekly insights on AI automation and workflow optimization.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 flex-1"
            />
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 rounded-full px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
