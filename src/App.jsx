import React from "react"
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App(){
    return <>
           <BrowserRouter>
           <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/> 
           </Routes>
           </BrowserRouter> 
            
           </>
}