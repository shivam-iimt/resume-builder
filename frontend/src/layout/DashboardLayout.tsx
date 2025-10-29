
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background dark:bg-dark text-gray-900 dark:text-gray-100">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 transition-all">
        <Navbar />
        <main className="p-6 mt-16">{children}</main>
      </div>
    </div>
  );
}
