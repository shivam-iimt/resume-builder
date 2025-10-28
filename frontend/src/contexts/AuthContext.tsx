import React, { useState, useEffect } from "react";
import axios from "../services/api";
import { AuthContext } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  email: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await axios.post("/api/auth/login", { email, password }, { withCredentials: true });
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/editor");
  };

  const signup = async (name: string, email: string, password: string) => {
    const { data } = await axios.post("/api/auth/signup", { name, email, password }, { withCredentials: true });
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/editor");
  };

  const logout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
};
