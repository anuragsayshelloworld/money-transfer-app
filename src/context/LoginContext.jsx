import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const LoginContext = createContext();
export default LoginContext;

export function LoginProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const parsedUser = JSON.parse(token);
        setUser(parsedUser);
      } catch (err) {
        console.error("Invalid token in localStorage:", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  function login(email) {
    const data = JSON.parse(localStorage.getItem("userdata")) || [];
    const rdata = data.find((i) => i.email === email);
    if (rdata) {
      localStorage.setItem("token", JSON.stringify(rdata));
      setUser(rdata);
    }
  }

  return (
    <LoginContext.Provider value={{ user, setUser, login }}>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
