import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '../../context/ToastContext';

interface HeroSettings {
  staticText: string;
  subtitle: string;
  typingWords: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

const defaultSettings: HeroSettings = {
  staticText: "Building AI automation for",
  subtitle: "I design and build clean, high-performing websites and Automation flows that save time and increase conversions.",
  typingWords: ["Websites", "Automations", "Landing Pages", "Workflows"],
  typingSpeed: 80,
  deletingSpeed: 40,
  pauseDuration: 900
};

export default function AdminHeroSettings() {
  const { success, error } = useToast();
  const [settings, setSettings] = useState<HeroSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [wordInput, setWordInput] = useState("");
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewText, setPreviewText] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/hero-settings', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch hero settings`);
      }
      const data = await response.json();
      if (data.data) {
        setSettings(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch hero settings:', err);
      error('Could not load current settings. Using defaults.');
      // Keep default settings if fetch fails
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/hero-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(settings),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        error(`Server error: ${response.status} ${response.statusText}. Check browser console.`);
        setIsSaving(false);
        return;
      }

      const data = await response.json();
      
      if (response.ok && data.success) {
        success('Hero settings saved successfully!');
      } else if (response.status === 503) {
        error('Database connection error. Contact your admin to check MongoDB.');
      } else if (response.status === 401) {
        error('Not authenticated. Please login again.');
      } else {
        error(data.message || `Error: ${response.statusText}`);
      }
    } catch (err) {
      console.error('Save error:', err);
      error(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddWord = () => {
    if (wordInput.trim() && !settings.typingWords.includes(wordInput.trim())) {
      setSettings({
        ...settings,
        typingWords: [...settings.typingWords, wordInput.trim()],
      });
      setWordInput("");
    }
  };

  const handleRemoveWord = (index: number) => {
    setSettings({
      ...settings,
      typingWords: settings.typingWords.filter((_, i) => i !== index),
    });
  };

  // Simple preview animation
  useEffect(() => {
    if (settings.typingWords.length === 0) return;

    const interval = setInterval(() => {
      setPreviewIndex((prev) => (prev + 1) % settings.typingWords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [settings.typingWords]);

  useEffect(() => {
    setPreviewText(settings.typingWords[previewIndex] || "");
  }, [previewIndex, settings.typingWords]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Hero Settings</h1>
          </div>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Customize the hero section typing animation</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Settings Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-8 space-y-6 md:space-y-8">
              {/* Static Text */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 md:mb-3">
                  Static Text
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  The non-animated text that appears before the typing words
                </p>
                <input
                  type="text"
                  value={settings.staticText}
                  onChange={(e) => setSettings({ ...settings, staticText: e.target.value })}
                  className="w-full px-3 md:px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder='e.g., "Building AI automation for"'
                />
              </div>

              {/* Subtitle Text */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 md:mb-3">
                  Subtitle / Description
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  The main description text that appears before the rotating words
                </p>
                <textarea
                  value={settings.subtitle}
                  onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
                  className="w-full px-3 md:px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder='e.g., "I design and build clean, high-performing websites..."'
                  rows={4}
                />
              </div>

              {/* Typing Words */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 md:mb-3">
                  Rotating Words
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 md:mb-3">
                  Add words that will be typed and rotated in the hero section
                </p>

                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                  <input
                    type="text"
                    value={wordInput}
                    onChange={(e) => setWordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddWord()}
                    placeholder="Add a word..."
                    className="flex-1 px-3 md:px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <Button
                    onClick={handleAddWord}
                    variant="outline"
                    className="whitespace-nowrap text-sm"
                  >
                    Add
                  </Button>
                </div>

                {settings.typingWords.length > 0 ? (
                  <div className="space-y-2">
                    {settings.typingWords.map((word, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 md:p-3 rounded-lg"
                      >
                        <span className="text-sm md:text-base text-gray-700 dark:text-gray-200 font-medium">{word}</span>
                        <button
                          onClick={() => handleRemoveWord(index)}
                          className="text-red-500 hover:text-red-700 text-xs md:text-sm font-semibold"
                        >
                          Remove
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">No words added yet</p>
                )}
              </div>

              {/* Performance Settings */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Typing Speed (ms)
                  </label>
                  <input
                    type="number"
                    value={settings.typingSpeed || 80}
                    onChange={(e) => setSettings({ ...settings, typingSpeed: parseInt(e.target.value) })}
                    className="w-full px-2 md:px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Delete Speed (ms)
                  </label>
                  <input
                    type="number"
                    value={settings.deletingSpeed || 40}
                    onChange={(e) => setSettings({ ...settings, deletingSpeed: parseInt(e.target.value) })}
                    className="w-full px-2 md:px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Pause (ms)
                  </label>
                  <input
                    type="number"
                    value={settings.pauseDuration || 900}
                    onChange={(e) => setSettings({ ...settings, pauseDuration: parseInt(e.target.value) })}
                    className="w-full px-2 md:px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm md:text-base font-semibold py-2 md:py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-8 sticky top-4 md:top-6">
              <h3 className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 md:mb-6">Live Preview</h3>

              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-4 md:p-8 text-white min-h-[250px] md:min-h-[300px] flex flex-col justify-center">
                <div className="text-sm md:text-lg font-bold mb-3 md:mb-4">
                  <span>{settings.staticText}</span>
                </div>

                <div className="text-xs md:text-sm leading-relaxed mb-4 md:mb-6">
                  <span>{settings.subtitle}</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200 inline-block ml-1 font-semibold">
                    {previewText}
                  </span>
                </div>

                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/20">
                  <p className="text-xs text-white/60 mb-2 md:mb-3">Rotating words:</p>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {settings.typingWords.map((word, idx) => (
                      <span
                        key={idx}
                        className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium transition-all ${
                          idx === previewIndex
                            ? 'bg-white text-indigo-600 scale-105'
                            : 'bg-white/20 text-white'
                        }`}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-[10px] md:text-xs text-blue-800 dark:text-blue-200">
                  <strong>Note:</strong> Changes will appear on the homepage immediately after saving.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
