import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useSettings } from '../context/SettingsContext';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  Zap,
  Briefcase,
  FileText,
  Mail,
  Layers,
} from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home', icon: Zap },
  { path: '/tools', label: 'AI Tools', icon: Layers },
  { path: '/services', label: 'Services', icon: Briefcase },
  { path: '/case-studies', label: 'Case Studies', icon: FileText },
  { path: '/blog', label: 'Blog', icon: FileText },
  { path: '/contact', label: 'Contact', icon: Mail },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { settings } = useSettings();
  const location = useLocation();

  useEffect(() => {
    const hero = document.getElementById('hero');
    const observer = new IntersectionObserver(
      ([entry]) => {
        // More resilient detection: true if any part of hero is visible
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-80px 0px 0px 0px" // Account for navbar height so it stays visible until hero is actually leaving
      }
    );
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state for background styling
      setIsScrolled(currentScrollY > 10);

      // Visibility logic: 
      // 1. Mandatory visible if hero is in view
      // 2. Otherwise, hide on scroll down (after initial threshold), show on scroll up
      if (isHeroVisible || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 150) {
        // Hiding threshold increased slightly for stability
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHeroVisible]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg'
        : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-white truncate">
              {settings.siteTitle?.split(' - ')[0] || 'Ashar Iftikhar'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === link.path
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* CTA Button - Desktop */}
            <a
              href={settings.calendlyUrl || "https://calendly.com/ashariftikhar"}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
                Book Free Audit
              </Button>
            </a>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 shadow-xl"
          >
            <div className="px-4 py-6 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${location.pathname === link.path
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95'
                    }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}

              {/* Mobile CTA Button */}
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
                <a
                  href={settings.calendlyUrl || "https://calendly.com/ashariftikhar"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 text-base font-bold shadow-lg shadow-indigo-500/20">
                    Book Free Audit
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
