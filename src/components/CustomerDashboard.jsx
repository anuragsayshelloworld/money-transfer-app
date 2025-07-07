import React from "react";
import UserDetails from "./UserDetail"; 
import TransferMoney from "./TransferMoney";
import ChangePassword from "./ChangePassword";
import Complaint from "./Complaint";
import TransactionHistory from "./Transaction";
import Khutruke from "./Khutruke";

export default function CustomerDashboard() {
    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen bg-gray-50">
            {/* Upper Section - 3 divs in a row */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="flex-1 rounded-lg shadow-md min-h-48 flex items-center justify-center">
                    <UserDetails/>
                </div>
                <div className="flex-1 rounded-lg shadow-md min-h-48 flex items-center justify-center">
                    <TransferMoney/>
                </div>
                <div className="flex-1 rounded-lg shadow-md min-h-48 flex items-center justify-center">
                    <ChangePassword/>
                </div>
            </div>
            
            {/* Lower Section - 3 divs in a row */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="flex-1 rounded-lg shadow-md min-h-48 flex items-center justify-center">
                    <Complaint/>
                </div>
                <div className="flex-1 rounded-lg shadow-md min-h-48 flex items-center justify-center">
                <TransactionHistory/>
                </div>
                <div className="flex-1 rounded-lg shadow-md min-h-48 flex items-center justify-center">
                    <Khutruke/>
                </div>
            </div>
        </div>
    );
}