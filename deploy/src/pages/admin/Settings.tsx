import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, Globe, Mail, Link as LinkIcon, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { settingsAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';

interface Settings {
  siteTitle: string;
  siteDescription: string;
  contactEmail: string;
  calendlyUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    replit: string;
  };
  seoData: {
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string;
  };
}

const defaultSettings: Settings = {
  siteTitle: 'Ashar Iftikhar - AI Business Systems',
  siteDescription: 'Building AI Business Systems That Generate Revenue',
  contactEmail: 'ashar@ashariftikhar.com',
  calendlyUrl: 'https://calendly.com/ashariftikhar',
  socialLinks: {
    github: '',
    linkedin: '',
    twitter: '',
    replit: '',
  },
  seoData: {
    defaultTitle: 'Ashar Iftikhar - AI Business Systems Builder',
    defaultDescription: 'I build AI business systems that generate revenue through workflow automation, lead generation, and content engines.',
    defaultKeywords: 'AI automation, n8n, workflow automation, lead generation, content engine, business systems',
  },
};

export default function AdminSettings() {
  const { success, error } = useToast();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.get();
      if (response.data.data) {
        setSettings({ ...defaultSettings, ...response.data.data });
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append('siteTitle', settings.siteTitle);
      formData.append('siteDescription', settings.siteDescription);
      formData.append('contactEmail', settings.contactEmail);
      formData.append('calendlyUrl', settings.calendlyUrl);
      formData.append('socialLinks', JSON.stringify(settings.socialLinks));
      formData.append('seoData', JSON.stringify(settings.seoData));

      await settingsAPI.update(formData);
      success('Settings saved successfully');
    } catch (err) {
      error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your website settings and configuration
        </p>
      </div>

      {/* General Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            General Settings
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Site Title
            </label>
            <Input
              value={settings.siteTitle}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
              placeholder="Your site title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Site Description
            </label>
            <Input
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              placeholder="Brief description of your site"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contact Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                placeholder="your@email.com"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Calendly URL
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={settings.calendlyUrl}
                onChange={(e) => setSettings({ ...settings, calendlyUrl: e.target.value })}
                placeholder="https://calendly.com/yourname"
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <LinkIcon className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Social Links
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GitHub
            </label>
            <Input
              value={settings.socialLinks.github}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, github: e.target.value },
                })
              }
              placeholder="https://github.com/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              LinkedIn
            </label>
            <Input
              value={settings.socialLinks.linkedin}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                })
              }
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Twitter
            </label>
            <Input
              value={settings.socialLinks.twitter}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                })
              }
              placeholder="https://twitter.com/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Replit
            </label>
            <Input
              value={settings.socialLinks.replit}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, replit: e.target.value },
                })
              }
              placeholder="https://replit.com/@username"
            />
          </div>
        </div>
      </div>

      {/* SEO Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Image className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            SEO Settings
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default Meta Title
            </label>
            <Input
              value={settings.seoData.defaultTitle}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seoData: { ...settings.seoData, defaultTitle: e.target.value },
                })
              }
              placeholder="Default page title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default Meta Description
            </label>
            <textarea
              value={settings.seoData.defaultDescription}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seoData: { ...settings.seoData, defaultDescription: e.target.value },
                })
              }
              placeholder="Default page description"
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default Keywords
            </label>
            <Input
              value={settings.seoData.defaultKeywords}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seoData: { ...settings.seoData, defaultKeywords: e.target.value },
                })
              }
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
