import React from 'react';
import clsx from 'clsx';

type Props = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'neutral';
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({
  children,
  onClick,
  className,
  icon,
  variant = 'primary',
  ariaLabel,
  type = 'button',
}: Props) {
  const base =
    'btn inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium focus-ring';
  const variants: Record<string, string> = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm',
    ghost: 'bg-transparent text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900',
    neutral:
      'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700',
  };

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      className={clsx(base, variants[variant], className)}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
}
