import React from 'react';
import clsx from 'clsx';

type Option = { value: string; label: string };

export default function Select({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label?: string;
  options: Option[];
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
}) {
  return (
    <label className="block text-sm">
      {label && (
        <div className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">{label}</div>
      )}
      <select
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={clsx(
          'w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] focus-ring',
          className,
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
