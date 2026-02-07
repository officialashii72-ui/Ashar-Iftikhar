import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Sparkles, 
  Linkedin, 
  Youtube, 
  ClipboardList,
  Loader2,
  Check,
  Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock AI generation function
const mockGenerateContent = async (type: string): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  if (type === 'youtube') {
    return [
      '🚀 "Just discovered how AI can save 10+ hours every week on content creation. Here\'s the exact workflow I built..."',
      '💡 "The biggest mistake I see coaches making? Doing everything manually. Here\'s how to fix that:"',
      '⚡ "From 20 hours to 2 hours per week - here\'s my complete content automation breakdown 👇"',
    ];
  }
  
  if (type === 'linkedin') {
    return [
      'Subject: Quick question about {{company}}\'s lead gen\n\nHi {{name}},\n\nI noticed {{company}} has been growing fast. Are you still handling outreach manually?\n\nI help similar companies automate 80% of their lead gen.\n\nWorth a 15-min chat?',
      'Subject: {{company}} + AI Automation\n\nHi {{name}},\n\nSaw {{company}}\'s latest post about scaling. Thought you might find this interesting...',
    ];
  }
  
  return [];
};

export default function ToolsShowcase() {
  const [activeTab, setActiveTab] = useState('youtube');
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setIsGenerating(true);
    setResults([]);
    
    try {
      const generated = await mockGenerateContent(activeTab);
      setResults(generated);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="tools" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Interactive Demo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Try My <span className="text-indigo-600 dark:text-indigo-400">AI Tools</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Experience the power of AI automation. These are simplified demos 
            of the tools I build for my clients.
          </p>
        </motion.div>

        {/* Tools Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* Tab Headers */}
              <TabsList className="w-full grid grid-cols-3 rounded-none bg-gray-100 dark:bg-gray-900 p-0">
                <TabsTrigger
                  value="youtube"
                  className="flex items-center gap-2 py-4 rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                >
                  <Youtube className="w-4 h-4" />
                  <span className="hidden sm:inline">Content Repurposer</span>
                  <span className="sm:hidden">Repurposer</span>
                </TabsTrigger>
                <TabsTrigger
                  value="linkedin"
                  className="flex items-center gap-2 py-4 rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="hidden sm:inline">LinkedIn Generator</span>
                  <span className="sm:hidden">LinkedIn</span>
                </TabsTrigger>
                <TabsTrigger
                  value="audit"
                  className="flex items-center gap-2 py-4 rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                >
                  <ClipboardList className="w-4 h-4" />
                  <span className="hidden sm:inline">AI Audit</span>
                  <span className="sm:hidden">Audit</span>
                </TabsTrigger>
              </TabsList>

              {/* Content Repurposer */}
              <TabsContent value="youtube" className="p-6 sm:p-8 mt-0">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Paste YouTube Video URL
                    </label>
                    <div className="flex gap-3">
                      <Input
                        placeholder="https://youtube.com/watch?v=..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleGenerate}
                        disabled={!input.trim() || isGenerating}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        {isGenerating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Generate
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {results.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Generated Social Posts:
                        </p>
                        {results.map((result, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 relative group"
                          >
                            <p className="text-gray-700 dark:text-gray-300 pr-10">
                              {result}
                            </p>
                            <button
                              onClick={() => handleCopy(result, index)}
                              className="absolute top-4 right-4 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              {copiedIndex === index ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-500" />
                              )}
                            </button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </TabsContent>

              {/* LinkedIn Generator */}
              <TabsContent value="linkedin" className="p-6 sm:p-8 mt-0">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Target Company Name
                    </label>
                    <div className="flex gap-3">
                      <Input
                        placeholder="e.g., Acme Corp"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleGenerate}
                        disabled={!input.trim() || isGenerating}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        {isGenerating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Generate
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {results.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Generated Outreach Messages:
                        </p>
                        {results.map((result, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 relative group whitespace-pre-wrap"
                          >
                            <p className="text-gray-700 dark:text-gray-300 pr-10 text-sm">
                              {result}
                            </p>
                            <button
                              onClick={() => handleCopy(result, index)}
                              className="absolute top-4 right-4 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              {copiedIndex === index ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-500" />
                              )}
                            </button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </TabsContent>

              {/* AI Audit */}
              <TabsContent value="audit" className="p-6 sm:p-8 mt-0">
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <ClipboardList className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Custom Automation Solutions
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    Let&apos;s discuss your business automation needs and find the perfect solutions for your workflow.
                  </p>
                  <a
                    href="/contact"
                  >
                    <Button
                      size="lg"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8"
                    >
                      Start a Project
                    </Button>
                  </a>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
