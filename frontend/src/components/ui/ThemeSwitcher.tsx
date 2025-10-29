import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <motion.button
      whileTap={{ rotate: 20, scale: 0.9 }}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-xl bg-surface shadow-soft border border-gray-200 hover:shadow-md transition-all"
    >
      {theme === 'light' ? (
        <Moon size={18} className="text-text" />
      ) : (
        <Sun size={18} className="text-text" />
      )}
    </motion.button>
  );
}
