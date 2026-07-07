import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("ucab_token");
    const storedUser = localStorage.getItem("ucab_user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/users/login", { email, password });
    persistSession(data);
    return data;
  };

  const register = async (name, email, password, phone) => {
    const { data } = await api.post("/users/register", { name, email, password, phone });
    persistSession(data);
    return data;
  };

  const persistSession = (data) => {
    const { token, ...userInfo } = data;
    localStorage.setItem("ucab_token", token);
    localStorage.setItem("ucab_user", JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem("ucab_token");
    localStorage.removeItem("ucab_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
