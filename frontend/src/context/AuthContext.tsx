import React, { createContext, useState, useEffect } from "react";

interface AuthContextProps {
  authToken: string | null;
  authTokenType: string | null;
  username: string;
  userId: string;
  login: (
    token: string,
    type: string,
    username: string,
    userId: string,
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authTokenType, setAuthTokenType] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem("authToken");
      const type = localStorage.getItem("authTokenType");
      const user = localStorage.getItem("username");
      const id = localStorage.getItem("userId");
      if (token && type && user && id) {
        setAuthToken(token);
        setAuthTokenType(type);
        setUsername(user);
        setUserId(id);
      }
    };
    initAuth();
  }, []);

  const login = (
    token: string,
    type: string,
    username: string,
    userId: string,
  ) => {
    setAuthToken(token);
    setAuthTokenType(type);
    setUsername(username);
    setUserId(userId);
    localStorage.setItem("authToken", token);
    localStorage.setItem("authTokenType", type);
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);
  };

  const logout = () => {
    setAuthToken(null);
    setAuthTokenType(null);
    setUsername("");
    setUserId("");
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenType");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider
      value={{ authToken, authTokenType, username, userId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
