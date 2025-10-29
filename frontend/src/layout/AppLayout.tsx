import { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background dark:bg-dark text-dark dark:text-white">
      <Navbar />
      <Sidebar />
      <main className="pt-20 pl-64 pr-6 pb-10">{children}</main>
    </div>
  );
}
