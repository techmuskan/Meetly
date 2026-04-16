import * as React from "react";
import axios from "axios";
import { HttpStatusCode } from "axios";
import { AuthContext } from "./AuthContextValue";

const client = axios.create({
  baseURL: "http://localhost:8000/api/v1/users/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = React.useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const handleLogin = async (username, password) => {
    const response = await client.post("http://localhost:8000/api/v1/users/login", { username, password });

    if (response.status === HttpStatusCode.Ok) {
    const token = response?.data?.token;
    const user = { username, token };
    setUserData(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  return response?.data;
  };

  const handleRegister = async (username, name, password) => {
    const response = await client.post("http://localhost:8000/api/v1/users/register", { username, name, password });
    return response?.data?.message;
  };

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("user");
  };

  const value = React.useMemo(
    () => ({ userData, handleLogin, handleRegister, handleLogout }),
    [userData],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
