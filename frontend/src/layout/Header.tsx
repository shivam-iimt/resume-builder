import React from 'react';
import { Bell, Menu } from 'lucide-react';
import ThemeSwitcher from '../components/ui/ThemeSwitcher';
import { motion } from 'framer-motion';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="h-16 bg-surface border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
        >
          <Menu size={20} />
        </motion.button>
        <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <motion.button whileTap={{ scale: 0.9 }} className="p-2 rounded-lg hover:bg-gray-100">
          <Bell size={18} />
        </motion.button>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
