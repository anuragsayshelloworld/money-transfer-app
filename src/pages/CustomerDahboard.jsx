import { Route, Routes } from "react-router-dom";
import CustomerDashboardLayout from "../Layout/CustomerDashboardLayout";
import Activities from '../components/Activities';
import React from "react";
import SendMoney from "../components/SendMoney";

export default function CustomerDashboard() {
  return (
    <CustomerDashboardLayout>
      <Routes>
        <Route path="/" element={<Activities />} />
        <Route path="/dashboard" element={<Activities />} />
        <Route path="Sendmoney" element={<SendMoney/>} />
        <Route path="RequestMoney" element={<h1 className="text-white">Request Money Page</h1>} />
        <Route path="Topup" element={<h1 className="text-white">Top Up Page</h1>} />
        <Route path="Notifications" element={<h1 className="text-white">Notifications Page</h1>} />
        <Route path="Support" element={<h1 className="text-white">Support Page</h1>} />
       </Routes>

    </CustomerDashboardLayout>
  );
}
