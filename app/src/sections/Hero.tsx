import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowRight, Play, Sparkles, Bot, Workflow, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettings } from '../context/SettingsContext';
import { profileAPI } from '../services/api';
import { getImageUrl } from '../utils/imageUtils';
import type { ProfileSettings } from '../types';

const tags = [
  { icon: Bot, label: 'n8n Expert' },
  { icon: Workflow, label: 'API Integration' },
  { icon: TrendingUp, label: 'AI Automation' },
];

const DEFAULT_KEYWORDS = ["Websites", "Automations", "Landing Pages", "Workflows"];
const DEFAULT_STATIC_TEXT = "Building AI automation for";
const DEFAULT_SUBTITLE = "I design and build clean, high-performing websites and Automation flows that save time and increase conversions.";

function Counter({ value, duration = 1.5, suffix = "", loading = false }: { value: number; duration?: number; suffix?: string; loading?: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!loading) {
      const controls = animate(count, value, { duration });
      return controls.stop;
    }
  }, [value, duration, count, loading]);

  useEffect(() => {
    return rounded.onChange((v) => setDisplayValue(v));
  }, [rounded]);

  if (loading) {
    return <div className="h-6 w-14 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mx-auto mb-1" />;
  }

  return <>{displayValue}{suffix}</>;
}

export default function Hero() {
  const { settings } = useSettings();
  const [profile, setProfile] = useState<ProfileSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [staticText, setStaticText] = useState(DEFAULT_STATIC_TEXT);
  const [subtitle, setSubtitle] = useState(DEFAULT_SUBTITLE);
  const [keywords, setKeywords] = useState(DEFAULT_KEYWORDS);

  // High-Precision Keyword Typing Effect (Matches Old Portfolio)
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = keywords[keywordIndex];

      if (!isDeleting) {
        // Typing state
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(80); // Exact 80ms typing

        if (currentText === fullText) {
          // Finished typing, pause
          setTypingSpeed(900); // Exact 900ms pause
          setIsDeleting(true);
        }
      } else {
        // Deleting state
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(40); // Exact 40ms deleting

        if (currentText === "") {
          setIsDeleting(false);
          setKeywordIndex((prev) => (prev + 1) % keywords.length);
          setTypingSpeed(150); // Small reset delay before next word
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, keywordIndex, typingSpeed]);

  useEffect(() => {
    const fetchHeroSettings = async () => {
      try {
        // Get API URL from environment or use default
        const apiBase = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api';
        const normalizedApi = String(apiBase).replace(/\/+$/, '').endsWith('/api') ? String(apiBase).replace(/\/+$/, '') : String(apiBase).replace(/\/+$/, '') + '/api';
        
        const response = await fetch(`${normalizedApi}/hero-settings`);
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            if (data.data.staticText) setStaticText(data.data.staticText);
            if (data.data.subtitle) setSubtitle(data.data.subtitle);
            if (data.data.typingWords && Array.isArray(data.data.typingWords) && data.data.typingWords.length > 0) {
              setKeywords(data.data.typingWords);
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch hero settings:', err);
        // Will use defaults if fetch fails
      }
    };
    fetchHeroSettings();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await profileAPI.get();
        if (response.data.data) {
          setProfile(response.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setTimeout(() => setLoading(false), 500); // Small delay for aesthetic reasons
      }
    };
    fetchProfile();
  }, []);

  return (
    <section id="hero" className="relative h-auto lg:h-screen lg:max-h-[800px] flex items-center justify-center overflow-hidden pt-8 pb-4 px-4">
      {/* Optimized Background - Subtle & Minimal */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-gray-950 transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-50" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto py-2">
        <div className="grid lg:grid-cols-2 gap-4 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-3 border border-indigo-100 dark:border-indigo-900/50"
            >
              <Sparkles className="w-3.5 h-3.5 fill-indigo-500/20" />
              <span>Creative Portfolio</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-3 tracking-tight">
              {staticText}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-[0.95rem] text-gray-600 dark:text-gray-300 mb-5 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              {subtitle}
              <span
                className="inline-block min-h-[1.2em]"
                style={{ color: '#ff9800' }}
              >
                {currentText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-[3px] h-[0.8em] bg-[#ff9800] ml-1 translate-y-[0.1em]"
                />
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <a
                href="/contact"
              >
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-4 text-sm font-bold group shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-300"
                >
                  Start a Project
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="/services">
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-4 text-sm font-bold group border hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <Play className="mr-2 w-4 h-4 fill-indigo-600 text-indigo-600 group-hover:scale-110 transition-transform" />
                  View Services
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start mt-6"
            >
              {tags.map((tag, idx) => (
                <motion.div
                  key={tag.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm cursor-default transition-all hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10"
                >
                  <tag.icon className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                    {tag.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative group max-w-[340px] w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-600/5 rounded-[1.5rem] blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-700" />

              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-[1.5rem] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/50 dark:border-gray-800/50"
              >
                {/* Profile Photo */}
                <motion.div
                  className="relative w-24 h-24 mx-auto mb-3 rounded-2xl overflow-hidden shadow-lg ring-1 ring-indigo-50 dark:ring-indigo-900/10"
                >
                  {loading ? (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  ) : profile?.profilePhoto ? (
                    <img
                      src={getImageUrl(profile.profilePhoto)}
                      alt="Profile"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-black">
                      AI
                    </div>
                  )}
                </motion.div>

                <div className="text-center">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1 tracking-tight">
                    {settings.siteTitle?.split(' - ')[0] || 'Ashar Iftikhar'}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-bold text-sm mb-5">
                    {settings.siteTitle?.split(' - ')[1] || 'AI Systems Architect'}
                  </p>

                  {/* Stats with Skeletons */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center space-y-0.5">
                      <div className="text-xl font-black text-gray-900 dark:text-white">
                        <Counter value={profile?.aiTools || 15} suffix="+" loading={loading} />
                      </div>
                      <div className="text-[9px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-black">AI Tools</div>
                    </div>
                    <div className="text-center space-y-0.5">
                      <div className="text-xl font-black text-gray-900 dark:text-white">
                        <Counter value={profile?.hoursSaved || 500} suffix="+" loading={loading} />
                      </div>
                      <div className="text-[9px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-black">Hrs Saved</div>
                    </div>
                    <div className="text-center space-y-0.5">
                      <div className="text-xl font-black text-gray-900 dark:text-white">
                        <Counter value={profile?.clients || 50} suffix="+" loading={loading} />
                      </div>
                      <div className="text-[9px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-black">Clients</div>
                    </div>
                  </div>

                  {/* Social Buttons */}
                  <div className="flex justify-center gap-2">
                    {[
                      { icon: Github, href: settings.socialLinks?.github, title: "GitHub" },
                      { icon: Linkedin, href: settings.socialLinks?.linkedin, title: "LinkedIn" },
                      { icon: Twitter, href: settings.socialLinks?.twitter, title: "Twitter" }
                    ].map((social) => social.href && (
                      <motion.a
                        key={social.title}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.08, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all duration-300 shadow-sm"
                        title={social.title}
                      >
                        <social.icon className="w-3 h-3" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>


            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
