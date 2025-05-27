// context/LoginContext.jsx
import React, { createContext, useState } from "react";

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [logger, setLogger] = useState(null);

  return (
    <LoginContext.Provider value={{ logger, setLogger }}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginContext;
