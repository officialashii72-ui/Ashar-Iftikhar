import { useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
}

export default function SEO({ title, description, keywords }: SEOProps) {
    const { settings } = useSettings();

    useEffect(() => {
        // Update Document Title
        const siteTitle = title
            ? `${title} | ${settings.siteTitle || 'Ashar Iftikhar'}`
            : (settings.seoData?.defaultTitle || settings.siteTitle || 'Ashar Iftikhar - AI Business Systems');

        document.title = siteTitle;

        // Update Meta Description
        const metaDescription = description || settings.seoData?.defaultDescription || settings.siteDescription;
        if (metaDescription) {
            let metaDescTag = document.querySelector('meta[name="description"]');
            if (!metaDescTag) {
                metaDescTag = document.createElement('meta');
                metaDescTag.setAttribute('name', 'description');
                document.head.appendChild(metaDescTag);
            }
            metaDescTag.setAttribute('content', metaDescription);
        }

        // Update Meta Keywords
        const metaKeywords = keywords || settings.seoData?.defaultKeywords;
        if (metaKeywords) {
            let metaKeyTag = document.querySelector('meta[name="keywords"]');
            if (!metaKeyTag) {
                metaKeyTag = document.createElement('meta');
                metaKeyTag.setAttribute('name', 'keywords');
                document.head.appendChild(metaKeyTag);
            }
            metaKeyTag.setAttribute('content', metaKeywords);
        }
    }, [title, description, keywords, settings]);

    return null;
}
