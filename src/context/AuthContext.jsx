import { useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const response = await api.get("/api/auth/me");
          setUser(response.data.data);
        } catch {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/api/auth/login", { email, password });
    const { accessToken, refreshToken, user: authenticatedUser } = response.data.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const register = async (data) => {
    await api.post("/api/auth/register", data);
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch {
      // Local logout should still succeed if the API is unavailable.
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const isAuthenticated = () => Boolean(user);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
