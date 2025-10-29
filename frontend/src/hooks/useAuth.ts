import { createContext, useContext } from 'react';
interface User {
  _id?: string;
  name?: string;
  email?: string;
  role: string;
}
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (u: User | null) => void;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export default function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
