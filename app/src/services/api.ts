import axios, { type AxiosInstance, type AxiosError } from 'axios';
import type { ApiResponse } from '../types';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse>) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post<ApiResponse>('/auth/login', { email, password }),
  register: (email: string, password: string, name: string) =>
    api.post<ApiResponse>('/auth/register', { email, password, name }),
  getMe: () => api.get<ApiResponse>('/auth/me'),
  updateProfile: (data: { name?: string; avatar?: string }) =>
    api.put<ApiResponse>('/auth/profile', data),
  changePassword: (currentPassword: string, newPassword: string) =>
    api.put<ApiResponse>('/auth/password', { currentPassword, newPassword }),
};

// Projects API
export const projectsAPI = {
  getAll: (params?: { category?: string; featured?: boolean }) =>
    api.get<ApiResponse>('/projects', { params }),
  getById: (id: string) => api.get<ApiResponse>(`/projects/${id}`),
  create: (data: FormData) =>
    api.post<ApiResponse>('/projects', data),
  update: (id: string, data: FormData) =>
    api.put<ApiResponse>(`/projects/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/projects/${id}`),
  reorder: (orders: { id: string; order: number }[]) =>
    api.put<ApiResponse>('/projects/reorder', { orders }),
};

// Services API
export const servicesAPI = {
  getAll: (params?: { active?: boolean }) =>
    api.get<ApiResponse>('/services', { params }),
  getById: (id: string) => api.get<ApiResponse>(`/services/${id}`),
  create: (data: any) => api.post<ApiResponse>('/services', data),
  update: (id: string, data: any) => api.put<ApiResponse>(`/services/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/services/${id}`),
};

// Blog API
export const blogAPI = {
  getAll: (params?: {
    category?: string;
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => api.get<ApiResponse>('/blog', { params }),
  getBySlug: (slug: string) => api.get<ApiResponse>(`/blog/${slug}`),
  getById: (id: string) => api.get<ApiResponse>(`/blog/id/${id}`),
  getCategories: () => api.get<ApiResponse>('/blog/categories'),
  create: (data: FormData) =>
    api.post<ApiResponse>('/blog', data),
  update: (id: string, data: FormData) =>
    api.put<ApiResponse>(`/blog/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/blog/${id}`),
};

// Testimonials API
export const testimonialsAPI = {
  getAll: (params?: { featured?: boolean }) =>
    api.get<ApiResponse>('/testimonials', { params }),
  getById: (id: string) => api.get<ApiResponse>(`/testimonials/${id}`),
  create: (data: FormData) =>
    api.post<ApiResponse>('/testimonials', data),
  update: (id: string, data: FormData) =>
    api.put<ApiResponse>(`/testimonials/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/testimonials/${id}`),
};

// Contact API
export const contactAPI = {
  submit: (data: { name: string; email: string; message: string }) =>
    api.post<ApiResponse>('/contact', data),
  getAll: (params?: { read?: boolean; page?: number; limit?: number }) =>
    api.get<ApiResponse>('/contact', { params }),
  getById: (id: string) => api.get<ApiResponse>(`/contact/${id}`),
  markAsRead: (id: string) => api.put<ApiResponse>(`/contact/${id}/read`),
  markAsReplied: (id: string) => api.put<ApiResponse>(`/contact/${id}/reply`),
  delete: (id: string) => api.delete<ApiResponse>(`/contact/${id}`),
  getUnreadCount: () => api.get<ApiResponse>('/contact/unread/count'),
};

// Settings API
export const settingsAPI = {
  get: () => api.get<ApiResponse>('/settings'),
  getPublic: () => api.get<ApiResponse>('/settings/public'),
  update: (data: any) =>
    api.put<ApiResponse>('/settings', data),
};

// Profile API
export const profileAPI = {
  get: () => api.get<ApiResponse>('/admin/profile'),
  update: (data: FormData) =>
    api.put<ApiResponse>('/admin/profile', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getPublic: () => api.get<ApiResponse>('/profile'),
};

export const getProfile = () => api.get<ApiResponse>('/admin/profile');
export const updateProfile = (data: FormData) => api.put<ApiResponse>('/admin/profile', data);
export const getPublicProfile = () => api.get<ApiResponse>('/profile');

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get<ApiResponse>('/admin/dashboard'),
  getAnalytics: (days?: number) =>
    api.get<ApiResponse>('/admin/dashboard/analytics', { params: { days } }),
};

// Upload API
export const uploadAPI = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post<ApiResponse>('/admin/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadMultiple: (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    return api.post<ApiResponse>('/admin/upload/multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getFiles: () => api.get<ApiResponse>('/admin/upload'),
  deleteFile: (filename: string) =>
    api.delete<ApiResponse>(`/admin/upload/${filename}`),
};

export default api;
