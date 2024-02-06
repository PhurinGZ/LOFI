// authContext.jsx
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [path, setPath] = useState("");

  const login = (userData) => {
    setUser(userData);
    // getUser(userData._id); // Skip fetching user data on login if it was already fetched
  };

  const getUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:8000/")
        .then((response) => {
          getUser(response.data.data._id);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }

    // Set path
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
