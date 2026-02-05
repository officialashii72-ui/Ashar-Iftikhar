import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Mail,
  MailOpen,
  Reply,
  Trash2,
  Check,
  Loader2,
  Calendar,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { contactAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminMessages() {
  const { success, error } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await contactAPI.getAll();
      setMessages(response.data.data?.messages || []);
    } catch (err) {
      error('Failed to fetch messages');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await contactAPI.markAsRead(id);
      setMessages(
        messages.map((m) => (m._id === id ? { ...m, read: true } : m))
      );
      if (selectedMessage?._id === id) {
        setSelectedMessage({ ...selectedMessage, read: true });
      }
      success('Marked as read');
    } catch (err) {
      error('Failed to mark as read');
    }
  };

  const handleMarkAsReplied = async (id: string) => {
    try {
      await contactAPI.markAsReplied(id);
      setMessages(
        messages.map((m) => (m._id === id ? { ...m, replied: true } : m))
      );
      if (selectedMessage?._id === id) {
        setSelectedMessage({ ...selectedMessage, replied: true });
      }
      success('Marked as replied');
    } catch (err) {
      error('Failed to mark as replied');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await contactAPI.delete(id);
      setMessages(messages.filter((m) => m._id !== id));
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
      success('Message deleted');
    } catch (err) {
      error('Failed to delete message');
    }
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Contact form submissions from your website
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Messages */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden max-h-[600px] overflow-y-auto">
          {filteredMessages.map((message) => (
            <button
              key={message._id}
              onClick={() => {
                setSelectedMessage(message);
                if (!message.read) handleMarkAsRead(message._id);
              }}
              className={`w-full p-4 text-left border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors ${
                selectedMessage?._id === message._id
                  ? 'bg-indigo-50 dark:bg-indigo-900/20'
                  : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.read
                    ? 'bg-gray-100 dark:bg-gray-700'
                    : 'bg-indigo-100 dark:bg-indigo-900/30'
                }`}>
                  {message.read ? (
                    <MailOpen className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Mail className="w-5 h-5 text-indigo-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`font-medium truncate ${
                      message.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'
                    }`}>
                      {message.name}
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {message.message}
                  </p>
                  {message.replied && (
                    <span className="inline-flex items-center gap-1 mt-1 text-xs text-green-600">
                      <Check className="w-3 h-3" />
                      Replied
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}

          {filteredMessages.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery ? 'No messages found' : 'No messages yet'}
              </p>
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xl font-semibold">
                    {selectedMessage.name[0]}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedMessage.name}
                    </h2>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!selectedMessage.replied && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkAsReplied(selectedMessage._id)}
                    >
                      <Reply className="w-4 h-4 mr-2" />
                      Mark Replied
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-6 mb-6 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {selectedMessage.read ? 'Read' : 'Unread'}
                </span>
              </div>

              {/* Message */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Reply Button */}
              <div className="mt-6">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Your message`}
                >
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Reply className="w-4 h-4 mr-2" />
                    Reply via Email
                  </Button>
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-12 text-center">
              <Mail className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Select a message
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Click on a message from the list to view its details
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
