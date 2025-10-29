import React from 'react';
import { Input as AntInput } from 'antd';
import clsx from 'clsx';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
}

export default function Input({
  placeholder,
  value,
  onChange,
  className,
  type = 'text',
}: InputProps) {
  return (
    <AntInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={clsx(
        'rounded-xl border-gray-200 focus:border-primary focus:shadow-soft transition-all',
        className,
      )}
    />
  );
}
