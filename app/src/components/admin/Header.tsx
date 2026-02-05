import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, Sun, Moon, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '@/components/ui/button';
import { contactAPI } from '../../services/api';

export default function AdminHeader() {
  const { theme, setTheme } = useTheme();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await contactAPI.getUnreadCount();
        setUnreadCount(response.data.data.count);
      } catch (error) {
        console.error('Failed to fetch unread count:', error);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-0 text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </Button>

        {/* Notifications */}
        <Link to="/admin/messages">
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Button>
        </Link>

        {/* View Site */}
        <Link to="/" target="_blank">
          <Button variant="ghost" size="sm" className="gap-2">
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">View Site</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
