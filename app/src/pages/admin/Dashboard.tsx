import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  Briefcase,
  FileText,
  MessageSquare,
  Users,
  Eye,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { dashboardAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';

interface DashboardStats {
  stats: {
    projects: { total: number };
    services: { total: number };
    blogPosts: { total: number; published: number };
    testimonials: { total: number; featured: number };
    messages: { total: number; unread: number };
  };
  recent: {
    messages: Array<{
      _id: string;
      name: string;
      email: string;
      message: string;
      read: boolean;
      createdAt: string;
    }>;
    posts: Array<{
      _id: string;
      title: string;
      views: number;
      published: boolean;
      createdAt: string;
    }>;
    projects: Array<{
      _id: string;
      title: string;
      category: string;
      clientName?: string;
    }>;
  };
}

const statCards = [
  { key: 'projects', icon: FolderKanban, label: 'Projects', color: 'from-blue-500 to-blue-600' },
  { key: 'services', icon: Briefcase, label: 'Services', color: 'from-green-500 to-green-600' },
  { key: 'blogPosts', icon: FileText, label: 'Blog Posts', color: 'from-purple-500 to-purple-600' },
  { key: 'testimonials', icon: Users, label: 'Testimonials', color: 'from-orange-500 to-orange-600' },
  { key: 'messages', icon: MessageSquare, label: 'Messages', color: 'from-pink-500 to-pink-600' },
];

export default function AdminDashboard() {
  const { error } = useToast();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardAPI.getStats();
        setStats(response.data.data);
      } catch (err) {
        error('Failed to fetch stats');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((card, index) => {
          const statValue = stats?.stats[card.key as keyof typeof stats.stats];
          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{card.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {statValue?.total || 0}
              </p>
              {card.key === 'blogPosts' && 'published' in (statValue || {}) && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {(statValue as { published: number }).published} published
                </p>
              )}
              {card.key === 'messages' && 'unread' in (statValue || {}) && (
                <p className="text-xs text-red-500 mt-1">
                  {(statValue as { unread: number }).unread} unread
                </p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm"
        >
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Messages
            </h2>
            <Link
              to="/admin/messages"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-6">
            {stats?.recent.messages && stats.recent.messages.length > 0 ? (
              <div className="space-y-4">
                {stats.recent.messages.map((message) => (
                  <div
                    key={message._id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${message.read
                      ? 'bg-gray-100 dark:bg-gray-700'
                      : 'bg-indigo-100 dark:bg-indigo-900/30'
                      }`}>
                      <MessageSquare className={`w-5 h-5 ${message.read ? 'text-gray-500' : 'text-indigo-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`font-medium truncate ${message.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'
                          }`}>
                          {message.name}
                        </p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${message.read
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-600'
                          }`}>
                          {message.read ? 'Read' : 'Unread'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {message.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No messages yet
              </p>
            )}
          </div>
        </motion.div>

        {/* Recent Blog Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm"
        >
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Blog Posts
            </h2>
            <Link
              to="/admin/blog"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-6">
            {stats?.recent.posts && stats.recent.posts.length > 0 ? (
              <div className="space-y-4">
                {stats.recent.posts.map((post) => (
                  <div
                    key={post._id}
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-900"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Eye className="w-3 h-3" />
                          {post.views} views
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${post.published
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600'
                          }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No blog posts yet
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8"
      >
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/admin/projects/new">
            <button
              className="px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors border border-white/20"
            >
              + New Project
            </button>
          </Link>
          <Link to="/admin/blog/new">
            <button
              className="px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors border border-white/20"
            >
              + New Blog Post
            </button>
          </Link>
          <Link to="/admin/services/new">
            <button
              className="px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors border border-white/20"
            >
              + New Service
            </button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
