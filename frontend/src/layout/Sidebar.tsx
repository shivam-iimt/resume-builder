import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { NavItem, sidebarItems } from '../config/sidebarConfig';
import NavLink from '../components/common/Navlink';

export default function Sidebar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const filteredItems = sidebarItems.filter(
    (item: NavItem) => !item.roles || item.roles.includes(user?.role || 'user'),
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg shadow-lg"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen bg-white dark:bg-dark shadow-lg border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 z-40`}
      >
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-dark dark:text-white">Dashboard</h2>
        </div>

        <nav className="mt-4 space-y-1">
          {filteredItems.map((item) => (
            <NavLink
              key={item.path}
              href={item.path}
              className={({ isActive }) =>
                `block px-6 py-3 text-sm font-medium transition-colors rounded-lg
                ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
