import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import {useAtom} from "jotai"
const AuthContext = createContext(null);

import { tokenAtom } from "./atoms.ts";



const AuthProvider = ({ children }) => {
  const [token, setToken] = useAtom(tokenAtom);
  

    const logout = () => {
    setToken(null);
    document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear the token cookie
  };
  const getToken = () => token;
  console.log("Token:", token);
  const authFetch = (url, options = {}) => {
    const headers = {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
    };
    return fetch(url, { ...options, headers });
  };

  return (
    <AuthContext.Provider value={{ logout, getToken, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
