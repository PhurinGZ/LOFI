// autcontext.jsx
import React, { createContext, useContext, useState } from "react";

// Create the authentication context
const AuthContext = createContext();

// Create a provider component to wrap your app and provide authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // You can replace null with the initial user state or fetch from local storage
  const [path, setPath] = useState("/?auth=register");

  const login = (userData) => {
    // Logic to handle user login
    setUser(userData);
  };

  const logout = () => {
    // Logic to handle user logout
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setPath, path }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
