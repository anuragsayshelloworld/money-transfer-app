import CustomerDashboard from "./pages/CustomerDahboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import React from "react";

export default function App() {
  return <Routes>
          <Route path="/" element={<PublicRoute> <Login /> </PublicRoute>} />
          <Route path="/dashboard" element={ <ProtectedRoute> <CustomerDashboard/> </ProtectedRoute> } />
         </Routes>
                              }
