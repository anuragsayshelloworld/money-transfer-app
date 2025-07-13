import { useNavigate } from "react-router-dom";
import useLocalstorage from "./hooks/useLocalstorage";
import Login from './pages/Login';
import CustomerDashboard from "./components/CustomerDahboard";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import React from "react";

export default function App(){
    
    const isUseralreadyLoggedIn = useLocalstorage('MTAtoken', 'get', false, true);
    const navigate = useNavigate();

    useEffect(() => {
        if(isUseralreadyLoggedIn){
        navigate("/customerdashboard", {replace: true});
        }
    }, [isUseralreadyLoggedIn, navigate]);

    return <Routes>
            <Route path = '/' element = {<Login  />}/>
            <Route path = '/customerdashboard' element = {<CustomerDashboard/>}/>
           </Routes> 
}