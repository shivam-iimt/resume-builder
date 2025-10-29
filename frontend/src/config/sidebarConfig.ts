export interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  roles?: string[]; // visible only for these roles
}

export const sidebarItems: NavItem[] = [
  { label: 'Dashboard', path: '/', roles: ['user', 'admin'] },
  { label: 'My Resume', path: '/resume', roles: ['user'] },
  { label: 'Applications', path: '/applications', roles: ['user'] },
  { label: 'Users', path: '/admin/users', roles: ['admin'] },
  { label: 'Settings', path: '/settings', roles: ['user', 'admin'] },
];
