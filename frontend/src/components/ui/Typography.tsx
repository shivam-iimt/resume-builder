export const H1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-3xl md:text-4xl font-semibold text-dark dark:text-white">{children}</h1>
);
export const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-semibold text-dark dark:text-white">{children}</h2>
);
export const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{children}</p>
);
