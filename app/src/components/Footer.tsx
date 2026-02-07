import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSettings } from '../context/SettingsContext';
import { useState, useEffect } from 'react';
import type { Service } from '../types';

const footerLinks = {
  quickLinks: [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'Testimonials', path: '/#testimonials' },
    { label: 'Contact', path: '/contact' },
  ],
  company: [
    { label: 'Blog', path: '/blog' },
    { label: 'About', path: '/' },
    { label: 'Contact', path: '/contact' },
  ],
  tools: [
    { label: 'Content Repurposer', path: '/tools' },
    { label: 'LinkedIn Generator', path: '/tools' },
    { label: 'All Tools', path: '/tools' },
  ],
};

// Fallback social icons mapping
export default function Footer() {
  const { settings } = useSettings();
  const [services, setServices] = useState<Service[]>([]);
  
  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiBase = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api';
        const normalizedApi = String(apiBase).replace(/\/+$/, '').endsWith('/api') ? String(apiBase).replace(/\/+$/, '') : String(apiBase).replace(/\/+$/, '') + '/api';
        
        const response = await fetch(`${normalizedApi}/services`);
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setServices(data.data.slice(0, 4)); // Show first 4 services
          }
        }
      } catch (err) {
        console.error('Failed to fetch services:', err);
      }
    };
    
    fetchServices();
  }, []);
  
  // Calculate days since start (assuming start date)
  const startDate = new Date('2024-01-01');
  const today = new Date();
  const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const socialLinks = settings.socialLinks ? [
    { icon: Github, href: settings.socialLinks.github, label: 'GitHub' },
    { icon: Linkedin, href: settings.socialLinks.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: settings.socialLinks.twitter, label: 'Twitter' },
  ].filter(link => link.href) : [];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column - Full width on mobile/tablet */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                {settings.siteTitle || 'AsharIftikhar'}
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
              {settings.siteDescription || 'Building AI Business Systems That Generate Revenue. Helping coaches, SaaS founders, and agencies automate their workflows.'}
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Subscribe to my newsletter
              </p>
              <div className="flex gap-2 max-w-sm">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links - Dynamic from API */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {services.length > 0 ? (
                services.map((service) => (
                  <li key={service._id}>
                    <Link
                      to="/services"
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm"
                    >
                      {service.title || service.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link
                    to="/services"
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm"
                  >
                    View All Services
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Links */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              AI Tools
            </h3>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
              <div className="flex items-center gap-1">
                <span>Made with</span>
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                <span>by {settings.siteTitle?.split(' - ')[0] || 'Ashar Iftikhar'}</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>Day {daysPassed} of 270</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Legal */}
            <div className="text-sm text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
