import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { settingsAPI } from '../services/api';

interface Settings {
    siteTitle?: string;
    siteDescription?: string;
    contactEmail?: string;
    location?: string;
    responseTime?: string;
    calendlyUrl?: string;
    socialLinks?: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        replit?: string;
    };
    seoData?: {
        defaultTitle?: string;
        defaultDescription?: string;
        defaultKeywords?: string;
    };
}

interface SettingsContextType {
    settings: Settings;
    isLoading: boolean;
    refetch: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<Settings>({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchSettings = async () => {
        try {
            setIsLoading(true);
            const response = await settingsAPI.get();
            setSettings(response.data.data || {});
        } catch (error) {
            console.error('Failed to fetch settings:', error);
            // Use default settings on error
            setSettings({
                siteTitle: 'AsharIftikhar',
                siteDescription: 'AI Business Systems',
                contactEmail: 'contact@example.com',
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, isLoading, refetch: fetchSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
