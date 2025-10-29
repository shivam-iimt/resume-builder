import { motion } from 'framer-motion';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({
  children,
  variant = 'primary',
  onClick,
  className,
  type = 'button',
}: Props) {
  const base = 'px-5 py-2.5 rounded-xl font-medium transition-all';
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-soft',
    outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50',
    ghost: 'text-dark hover:bg-light',
  };
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      className={clsx(base, variants[variant], className)}
    >
      {children}
    </motion.button>
  );
}
