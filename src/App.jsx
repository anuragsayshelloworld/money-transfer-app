import { useContext, useEffect, useState } from "react";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import LoginContext from "./context/LoginContext";
import CustomerDashboard from "./components/Customer";

export default function App() {
  const { logger, setLogger } = useContext(LoginContext);
  const [role, setRole] = useState(0);
  
  
  useEffect(() => {
  const savedUser =
    JSON.parse(localStorage.getItem("remembrance")) ||
    JSON.parse(sessionStorage.getItem("remembrance")) ||
    null;

    if (savedUser !== null){

  setLogger(savedUser);

  const userDetails = JSON.parse(localStorage.getItem("userdetails")); 
  const requiredUser = userDetails?.find(
    (user) => user.phonenumber === savedUser
  );



  setRole(requiredUser.role);
}
  
}, [logger]);

if(logger !== null){
  if(role===1){
    return <AdminDashboard/>
  }
  else{
    return <CustomerDashboard/>
  }
}
else{
  return <Login/>
}

}
