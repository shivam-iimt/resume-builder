type Props = {
  children: React.ReactNode;
  className?: string;
};
export default function Card({ children, className = '' }: Props) {
  return (
    <div
      className={`bg-white dark:bg-dark/60 shadow-soft rounded-2xl p-6 backdrop-blur-md border border-gray-100 dark:border-gray-800 ${className}`}
    >
      {children}
    </div>
  );
}
