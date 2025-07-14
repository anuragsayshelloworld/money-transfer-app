import React from "react";
import { LogOut, User, Mail, Wallet } from "lucide-react";

export default function UserInfo() {
    const data = localStorage.getItem("MTAToken");
    const parsedData = JSON.parse(data);

    const handleLogout = () => {
        localStorage.removeItem("MTAToken");
        // I will add the redirect logic later
        window.location.href = "/";
    };

    return (
        <div className="h-full flex flex-col overflow-hidden px-4">
            {/* Header */}
            <div className="px-3 py-2 border-b border-gray-600">
                <h2 className="text-gray-200 text-xs font-semibold uppercase tracking-wider">
                    Account
                </h2>
            </div>

            {/* User Profile Section */}
            <div className="flex-1 p-3 flex flex-col min-h-0">
                {/* Profile Picture and Name */}
                <div className="flex flex-col items-center mb-3">
                    <div className="relative mb-2">
                        <img 
                            src={parsedData.picture} 
                            alt="Profile"
                            className="w-12 h-12 rounded-full border-2 border-gray-500 object-cover"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                    </div>
                    <h3 className="text-white font-semibold text-md text-center truncate w-full">
                    {parsedData.name?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </h3>
                </div>

                {/* User Details */}
                <div className="space-y-2 mb-4 flex-shrink-0">
                    <div className="flex items-center space-x-2 text-gray-300">
                        <Mail className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="text-md truncate">{parsedData.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                        <Wallet className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="text-md font-medium">$ {parsedData.balance} .00</span>
                    </div>
                </div>

                {/* Account Actions */}
                <div className="space-y-2 mt-2 flex-shrink-0">
                    <button className="w-full bg-gray-600 hover:bg-gray-500 text-white py-1.5 px-3 rounded-md transition-colors duration-200 flex items-center justify-center space-x-1.5 text-xs">
                        <User className="w-3 h-3" />
                        <span>Edit Profile</span>
                    </button>
                    
                    <button 
                        onClick={handleLogout}
                        className="w-full bg-red-800 hover:bg-red-700 text-white py-1.5 px-3 rounded-md transition-colors duration-200 flex items-center justify-center space-x-1.5 text-xs"
                    >
                        <LogOut className="w-3 h-3" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}