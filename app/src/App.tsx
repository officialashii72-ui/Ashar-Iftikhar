import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { SettingsProvider } from './context/SettingsContext';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Lazy Loaded Components
const Home = lazy(() => import('./pages/Home'));
const Tools = lazy(() => import('./pages/Tools'));
const Services = lazy(() => import('./pages/Services'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProjects = lazy(() => import('./pages/admin/Projects'));
const AdminServices = lazy(() => import('./pages/admin/Services'));
const AdminBlog = lazy(() => import('./pages/admin/Blog'));
const AdminTestimonials = lazy(() => import('./pages/admin/Testimonials'));
const AdminMessages = lazy(() => import('./pages/admin/Messages'));
const AdminMedia = lazy(() => import('./pages/admin/Media'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));
const AdminProfile = lazy(() => import('./pages/admin/Profile'));

// Admin Forms
const ProjectForm = lazy(() => import('./pages/admin/ProjectForm'));
const ServiceForm = lazy(() => import('./pages/admin/ServiceForm'));
const BlogForm = lazy(() => import('./pages/admin/BlogForm'));
const TestimonialForm = lazy(() => import('./pages/admin/TestimonialForm'));

// Protected Route
import ProtectedRoute from './components/ProtectedRoute';

// Scroll to top
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <SettingsProvider>
            <Router>
              <ScrollToTop />
              <AnimatePresence mode="wait">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<MainLayout />}>
                      <Route index element={<Home />} />
                      <Route path="tools" element={<Tools />} />
                      <Route path="services" element={<Services />} />
                      <Route path="case-studies" element={<CaseStudies />} />
                      <Route path="blog" element={<Blog />} />
                      <Route path="blog/:slug" element={<BlogPost />} />
                      <Route path="contact" element={<Contact />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute>
                          <AdminLayout />
                        </ProtectedRoute>
                      }
                    >
                      <Route index element={<AdminDashboard />} />
                      <Route path="projects" element={<AdminProjects />} />
                      <Route path="projects/new" element={<ProjectForm />} />
                      <Route path="projects/edit/:id" element={<ProjectForm />} />

                      <Route path="services" element={<AdminServices />} />
                      <Route path="services/new" element={<ServiceForm />} />
                      <Route path="services/edit/:id" element={<ServiceForm />} />

                      <Route path="blog" element={<AdminBlog />} />
                      <Route path="blog/new" element={<BlogForm />} />
                      <Route path="blog/edit/:id" element={<BlogForm />} />

                      <Route path="testimonials" element={<AdminTestimonials />} />
                      <Route path="testimonials/new" element={<TestimonialForm />} />
                      <Route path="testimonials/edit/:id" element={<TestimonialForm />} />

                      <Route path="messages" element={<AdminMessages />} />
                      <Route path="media" element={<AdminMedia />} />
                      <Route path="settings" element={<AdminSettings />} />
                      <Route path="profile" element={<AdminProfile />} />
                    </Route>
                  </Routes>
                </Suspense>
              </AnimatePresence>
            </Router>
          </SettingsProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
