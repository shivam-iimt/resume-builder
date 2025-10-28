import React, { useState } from 'react';
import { Home, FileText, LogOut, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', icon: <Home size={18} />, path: '/' },
    { name: 'Editor', icon: <FileText size={18} />, path: '/editor' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavItems = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex-1 mt-4">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={onClick}
          className="flex items-center gap-3 px-4 py-2 mx-2 rounded-md text-sm font-medium hover:bg-muted transition"
        >
          {item.icon}
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-card border-r border-border shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="text-lg font-semibold">ResumePro</span>
        </div>
        <NavItems />
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 250, damping: 25 }}
              className="fixed top-0 left-0 z-50 w-64 h-full bg-card border-r border-border shadow-xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="text-lg font-semibold">ResumePro</span>
                <button onClick={() => setOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <NavItems onClick={() => setOpen(false)} />
              <div className="p-4 border-t border-border">
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-card p-2 rounded-md border border-border shadow-sm"
        onClick={() => setOpen(true)}
      >
        <Menu size={20} />
      </button>
    </>
  );
};

export default Sidebar;
