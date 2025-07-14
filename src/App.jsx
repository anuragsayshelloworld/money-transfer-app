import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import CustomerDashboard from "./components/CustomerDahboard";
import ProtectedRoute from "./components/ProtectedRoute";
import React from "react";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
