import React, { useEffect, useState, ReactNode } from 'react';
import api from '../api/axiosInstance';
import { getAccessToken, setAccessToken, clearAccessToken } from '../utils/token';
import { AuthContext } from '../hooks/useAuth';

interface User {
  _id?: string;
  name?: string;
  email?: string;
  role: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const token = getAccessToken();
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      const res = await api.get('/auth/me');
      setUser(res.data?.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    const accessToken = res.data?.accessToken || res.data?.data?.accessToken;
    if (accessToken) setAccessToken(accessToken);
    await fetchMe();
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await api.post('/auth/register', { name, email, password });
    const accessToken = res.data?.accessToken || res.data?.data?.accessToken;
    if (accessToken) setAccessToken(accessToken);
    await fetchMe();
  };

  const logout = () => {
    clearAccessToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
