import { Route, Routes } from "react-router-dom";
import CustomerDashboardLayout from "../Layout/CustomerDashboardLayout";
import Activities from '../components/Activities';
import React from "react";
import SendMoney from "../components/SendMoney";
import RequestMoney from "../components/RequestMoney";
import TopUp from "../components/TopUp";
import SupportChat from "../components/Support";

export default function CustomerDashboard() {
  return (
    <CustomerDashboardLayout>
      <Routes>
        <Route path="/" element={<Activities />} />
        <Route path="/dashboard" element={<Activities />} />
        <Route path="Sendmoney" element={<SendMoney/>} />
        <Route path="RequestMoney" element={<RequestMoney/>} />
        <Route path="Topup" element={<TopUp/>} />
        <Route path="Notifications" element={<h1 className="text-white">Notifications Page</h1>} />
        <Route path="support" element={<SupportChat/>} />
       </Routes>

    </CustomerDashboardLayout>
  );
}
