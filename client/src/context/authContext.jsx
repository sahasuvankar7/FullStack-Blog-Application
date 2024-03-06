// AuthContext.js file this is
import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthContextPro = ({ children }) => {
  // to get the user information from local storage
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      inputs,
      { withCredentials: true }
    );

    setCurrentUser(res.data);
  };
  const logout = async () => {
    await axios.post("http://localhost:8800/api/auth/logout",null,  {
      withCredentials: true,
    });
    setCurrentUser(null);
  };
  // to change user infomation in each time in local storage we use useEffect
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
