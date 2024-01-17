// authContext.jsx
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [path, setPath] = useState("");

  const login = (userData) => {
    setUser(userData);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.get("http://localhost:8080/", {
        headers: {
          "x-auth-token": token
        }
      })
        .then((response) => {
          setUser(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setPath(token ? "/?auth=profile" : "/?auth=register");
  }, []);

  const logout = () => {
    // Clear user data and token
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setPath, path }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
