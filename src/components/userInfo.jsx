import React, { useState } from "react";
import { LogOut, User, Mail, Wallet } from "lucide-react";

export default function UserInfo() {
    const data = localStorage.getItem("MTAToken");
    const parsedData = JSON.parse(data);
    const [logoutPrompt, setLogoutPrompt] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        setLoading(true);
        setTimeout(()=>{
        setLoading(false);    
        localStorage.removeItem("MTAToken");
        window.location.href = "/"; 
        },3000)
        
    };

    return (
        <div className="h-full flex flex-col overflow-hidden px-4">

       {/*yeslai pachhi chhutai component banauchhu*/}
{(logoutPrompt || loading) && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center">
    {loading ? (
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-t-transparent border-b-transparent border-l-white border-r-white rounded-full animate-spin"></div>
        <p className="text-white text-lg tracking-wide animate-pulse">Logging out...</p>
      </div>
    ) : (
      <div className="bg-gray-800/80 text-white p-6 rounded-xl shadow-2xl w-[300px] text-center space-y-4 z-50 border border-gray-600 backdrop-blur-md">
        <p className="text-lg font-semibold">Are you sure you want to logout?</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            onClick={handleLogout}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
            onClick={() => setLogoutPrompt(false)}
          >
            No
          </button>
        </div>
      </div>
    )}
  </div>
)}


            
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
                        onClick={()=>setLogoutPrompt(true)}
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