import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-dark/40 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <h1 className="font-semibold text-lg text-dark dark:text-white">BrandName</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:scale-105 transition-transform"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-gray-700" />
            ) : (
              <Sun className="w-4 h-4 text-yellow-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
