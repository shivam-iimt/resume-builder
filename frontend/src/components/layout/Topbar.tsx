import React from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import { User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Topbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-border bg-card shadow-sm">
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="flex items-center gap-2 bg-muted px-2 py-1 rounded-md text-sm font-medium">
          <User size={16} />
          <span className="hidden sm:block">{user?.name || 'Guest'}</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
