import { createContext, useContext, useState } from "react";
export const AuthContext = createContext({
  auth: localStorage.getItem("auth") ? true : false,
});

export const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem("auth") ? true : false);

  const login = (name) => {
    localStorage.setItem("auth", true);
    setAuth((user) => true);
  };

  // Logout updates the user data to default
  const logout = () => {
    setAuth((user) => false);
  };
  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
