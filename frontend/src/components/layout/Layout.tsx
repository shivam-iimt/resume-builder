import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 flex flex-col min-h-screen">
      <Topbar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  </div>
);

export default Layout;
