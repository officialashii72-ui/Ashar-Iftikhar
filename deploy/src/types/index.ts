// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  avatar?: string;
}

// Project Types
export interface Project {
  _id: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  technologies: string[];
  results: {
    hoursSaved?: number;
    improvement?: string;
    revenue?: string;
  };
  category: 'saas' | 'coaches' | 'agencies' | 'other';
  clientName?: string;
  featured: boolean;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Service Types
export interface Service {
  _id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  icon: string;
  active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Blog Post Types
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  author: {
    name: string;
  };
  published: boolean;
  views: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  createdAt: string;
  updatedAt: string;
}

// Testimonial Types
export interface Testimonial {
  _id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  image?: string;
  featured: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

// Contact Message Types
export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: string;
  updatedAt: string;
}

// Site Settings Types
export interface SiteSettings {
  _id: string;
  siteTitle: string;
  siteDescription: string;
  logo?: string;
  favicon?: string;
  contactEmail: string;
  calendlyUrl: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    replit?: string;
  };
  seoData: {
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string;
    ogImage?: string;
  };
  updatedAt: string;
}

// Dashboard Stats Types
export interface DashboardStats {
  stats: {
    projects: { total: number };
    services: { total: number };
    blogPosts: { total: number; published: number };
    testimonials: { total: number; featured: number };
    messages: { total: number; unread: number };
  };
  recent: {
    messages: ContactMessage[];
    posts: BlogPost[];
    projects: Project[];
  };
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: any[];
}

// Pagination Types
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// File Upload Types
export interface UploadedFile {
  filename: string;
  originalname: string;
  path: string;
  size: number;
  mimetype: string;
}

// Theme Types
export type Theme = 'light' | 'dark';

// Toast Types
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}
