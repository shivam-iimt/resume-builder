import React from 'react';
import clsx from 'clsx';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | boolean;
  className?: string;
};

export default function Input({ label, error, className, ...rest }: InputProps) {
  return (
    <label className="block text-sm">
      {label && (
        <div className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">{label}</div>
      )}
      <input
        {...rest}
        className={clsx(
          'w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] focus-ring',
          'placeholder:opacity-60',
          className,
        )}
      />
      {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
    </label>
  );
}
