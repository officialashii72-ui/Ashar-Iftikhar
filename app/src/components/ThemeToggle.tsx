import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import type { Theme } from '../types';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const options: { id: Theme; label: string; icon: typeof Sun }[] = [
        { id: 'light', label: 'Light', icon: Sun },
        { id: 'dark', label: 'Dark', icon: Moon },
        { id: 'system', label: 'System', icon: Monitor },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group shadow-sm dark:shadow-none"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={theme}
                            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            {theme === 'light' && <Sun className="w-5 h-5 text-amber-500" />}
                            {theme === 'dark' && <Moon className="w-5 h-5 text-indigo-400" />}
                            {theme === 'system' && <Monitor className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
                        </motion.div>
                    </AnimatePresence>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-36 mt-2 p-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-800 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200"
            >
                {options.map((option) => (
                    <DropdownMenuItem
                        key={option.id}
                        onClick={() => setTheme(option.id)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer mb-0.5 last:mb-0 ${theme === option.id
                            ? 'bg-indigo-500 text-white'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <option.icon className={`w-4 h-4 ${theme === option.id ? 'text-white' : ''}`} />
                            {option.label}
                        </div>
                        {theme === option.id && (
                            <motion.div
                                layoutId="active-indicator"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                            >
                                <Check className="w-4 h-4" />
                            </motion.div>
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
