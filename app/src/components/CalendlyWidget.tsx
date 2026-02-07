import { useSettings } from '../context/SettingsContext';

export default function CalendlyWidget() {
  const { settings } = useSettings();
  const calendlyUrl = settings.calendlyUrl || 'https://calendly.com/ashariftikhar';

  return (
    <div className="rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 flex items-center justify-center">
      <a
        href={calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow"
      >
        Schedule a call
      </a>
    </div>
  );
}
