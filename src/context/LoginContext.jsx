import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    useEffect(()=>{
       const data = JSON.parse(localStorage.getItem("MTAToken")) || '';
       if(data){
       setUser(data);
       } 
    },[])
    return <AuthContext.Provider value={{user, setUser}}>
              {children}
          </AuthContext.Provider>
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
