import { useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

export default function CalendlyWidget() {
  const { settings } = useSettings();
  const calendlyUrl = settings.calendlyUrl || 'https://calendly.com/ashariftikhar';
  
  useEffect(() => {
    // Reload the Calendly widget if it exists in the window object
    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: calendlyUrl,
        parentElement: document.getElementById('calendly-inline'),
        prefilled: {},
      });
    }
  }, [calendlyUrl]);

  return (
    <div
      id="calendly-inline"
      style={{
        minWidth: '100%',
        height: '100%',
        minHeight: '650px',
      }}
      className="rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800"
    />
  );
}
