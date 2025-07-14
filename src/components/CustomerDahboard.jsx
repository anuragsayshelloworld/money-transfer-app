import React from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("MTAToken");
    navigate("/", { replace: true });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Welcome to Customer Dashboard</h1>
      <button onClick={handleLogout} className="border px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition">
        Logout
      </button>
    </div>
  );
}
