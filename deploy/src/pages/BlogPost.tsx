import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock blog post data
const mockPost = {
  _id: '1',
  title: 'How to Build Your First n8n Workflow: A Complete Guide',
  slug: 'how-to-build-first-n8n-workflow',
  content: `
    <p>n8n is a powerful workflow automation tool that allows you to connect different apps and services without writing code. In this comprehensive guide, I'll walk you through building your first workflow from scratch.</p>

    <h2>What is n8n?</h2>
    <p>n8n (pronounced "n-eight-n") is an extendable workflow automation tool that enables you to connect anything to everything. It's similar to Zapier or Make (formerly Integromat), but with some key advantages:</p>
    <ul>
      <li><strong>Self-hosted option:</strong> You can run n8n on your own servers for complete control</li>
      <li><strong>Fair-code license:</strong> The source code is available and you can modify it</li>
      <li><strong>No limits:</strong> Create unlimited workflows without pricing tiers</li>
      <li><strong>400+ integrations:</strong> Connect with popular apps and services</li>
    </ul>

    <h2>Getting Started</h2>
    <p>Before we dive into building workflows, let's set up n8n. You have two options:</p>
    <h3>Option 1: n8n Cloud (Easiest)</h3>
    <p>Sign up for a free account at n8n.io. This gives you a hosted instance with 1,000 free executions per month.</p>

    <h3>Option 2: Self-hosted</h3>
    <p>If you're technical, you can self-host n8n using Docker:</p>
    <pre><code>docker run -it --rm \\
  --name n8n \\
  -p 5678:5678 \\
  -v ~/.n8n:/home/node/.n8n \\
  n8nio/n8n</code></pre>

    <h2>Building Your First Workflow</h2>
    <p>Let's create a simple workflow that sends you a Slack message when a new row is added to a Google Sheet. This is a common automation that many businesses need.</p>

    <h3>Step 1: Create a New Workflow</h3>
    <p>Click the "Add Workflow" button and give it a name like "Google Sheets to Slack Notification".</p>

    <h3>Step 2: Add the Trigger</h3>
    <p>Search for "Google Sheets" in the node panel and select "Google Sheets Trigger". Configure it to watch for new rows in your spreadsheet.</p>

    <h3>Step 3: Add the Action</h3>
    <p>Add a Slack node and configure it to send a message to your desired channel. You can use data from the Google Sheets trigger to customize the message.</p>

    <h3>Step 4: Test and Activate</h3>
    <p>Click "Execute Workflow" to test it manually. Once you're satisfied, toggle the workflow to active.</p>

    <h2>Best Practices</h2>
    <p>Here are some tips to help you build better workflows:</p>
    <ul>
      <li><strong>Name your nodes:</strong> Give descriptive names to make debugging easier</li>
      <li><strong>Use error handling:</strong> Add error paths to handle failures gracefully</li>
      <li><strong>Document your workflows:</strong> Add notes to explain complex logic</li>
      <li><strong>Test thoroughly:</strong> Always test with real data before going live</li>
    </ul>

    <h2>Next Steps</h2>
    <p>Now that you've built your first workflow, explore more advanced features:</p>
    <ul>
      <li>HTTP requests for custom API integrations</li>
      <li>Function nodes for data transformation</li>
      <li>Conditional logic with IF nodes</li>
      <li>Error handling and retry logic</li>
    </ul>

    <p>Happy automating! If you need help with complex workflows, feel free to reach out.</p>
  `,
  excerpt: 'Learn the fundamentals of n8n and build your first automation workflow from scratch. Perfect for beginners.',
  category: 'n8n Tutorials',
  tags: ['n8n', 'automation', 'tutorial', 'workflow'],
  author: { name: 'Ashar Iftikhar' },
  published: true,
  views: 1250,
  featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
  readTime: '8 min read',
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = mockPost;

  // In a real app, fetch the post by slug
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
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
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden">
          <img
            src={post.featuredImage}
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
              {post.author.name[0]}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{post.author.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Author</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <User className="w-4 h-4" />
            {post.views} views
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

        {/* Article Content */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-pre:bg-gray-900 prose-pre:text-gray-100"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            {post.tags.map((tag) => (
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
