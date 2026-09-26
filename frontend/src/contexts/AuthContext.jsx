import axios from "axios";
import { createContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";

export const AuthContext = createContext({});
const client = axios.create({ baseURL: `${server}/api/v1/users`, timeout: 12000 });

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const clearSession = useCallback(() => { localStorage.removeItem("token"); localStorage.removeItem("meetly_user"); }, []);
  const request = useCallback(async (config) => {
    try { return await client(config); } catch (error) {
      if (error.response?.status === 401) { clearSession(); navigate("/auth"); }
      throw error;
    }
  }, [clearSession, navigate]);
  const handleRegister = (name, username, password) => request({ method: "post", url: "/register", data: { name, username, password } }).then(({ data }) => data.message);
  const handleLogin = async (username, password) => {
    const { data } = await request({ method: "post", url: "/login", data: { username, password } });
    localStorage.setItem("token", data.token); localStorage.setItem("meetly_user", JSON.stringify(data.user)); navigate("/home");
  };
  const getHistoryOfUser = () => request({ method: "get", url: "/get_all_activity", params: { token: localStorage.getItem("token") } }).then(({ data }) => data);
  const addToUserHistory = (meetingCode) => request({ method: "post", url: "/add_to_activity", data: { token: localStorage.getItem("token"), meeting_code: meetingCode } });
  return <AuthContext.Provider value={{ addToUserHistory, getHistoryOfUser, handleRegister, handleLogin, clearSession }}>{children}</AuthContext.Provider>;
};
