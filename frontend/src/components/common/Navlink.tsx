import { Link, useRoute } from 'wouter';
import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: (props: { isActive: boolean }) => string | string;
}

export default function NavLink({ href, children, className }: NavLinkProps) {
  const [isActive] = useRoute(href);

  const classValue = typeof className === 'function' ? className({ isActive }) : className || '';

  return (
    <Link href={href}>
      <a className={classValue}>{children}</a>
    </Link>
  );
}
