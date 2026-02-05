import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/Sidebar';
import AdminHeader from '../components/admin/Header';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <div className="lg:ml-64">
        <AdminHeader />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
