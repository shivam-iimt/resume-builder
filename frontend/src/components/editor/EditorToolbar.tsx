import React from 'react';
import { Button } from '../ui/Button';
import { Sun, Moon, Eye, Save, FileText } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
// import { useTheme } from '../../contexts/ThemeContext';

export default function EditorToolbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-[var(--color-bg-secondary)] sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" icon={<FileText size={16} />}>
          Templates
        </Button>
        <Button variant="ghost" size="sm" icon={<Eye size={16} />}>
          Preview
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="solid"
          size="sm"
          icon={<Save size={16} />}
          onClick={() => console.log('Manual save clicked')}
        >
          Save
        </Button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
}
