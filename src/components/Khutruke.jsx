import React, { useState } from "react";
import { PlusCircle, Coins, Settings } from "lucide-react";

export default function Khutruke() {
    const [khutrukeAmount] = useState(2850.00);
    const [addAmount, setAddAmount] = useState("");
    const [goalAmount] = useState(5000.00);

    return (
        <div className="h-full flex flex-col overflow-hidden px-4">
            {/* Header */}
            <div className="px-3 mt-2 py-2 border-b border-gray-600">
                <h2 className="text-gray-200 text-xs font-semibold uppercase tracking-wider">
                    Khutruke (खुत्रुके)
                </h2>
            </div>

            {/* Khutruke Display Section */}
            <div className="flex-1 p-3 flex flex-col min-h-0">
                {/* Khutruke Icon and Savings Amount */}
                <div className="flex items-center justify-between mb-3">
                    {/* Left side - Progress */}
                    <div className="text-left">
                        <p className="text-gray-400 text-xs">Progress</p>
                        <p className="text-white text-xs font-medium">
                            {khutrukeAmount.toFixed(0)}/{goalAmount.toFixed(0)}
                        </p>
                    </div>

                    {/* Center - Khutruke and Total */}
                    <div className="flex flex-col items-center">
                        <div className="relative mb-2">
                            {/* Traditional Clay Khutruke representation */}
                            <div className="w-12 h-12 min-w-6 min-h-6 bg-gradient-to-b from-red-400 to-red-600 rounded-full flex items-center justify-center border-2 border-red-500 shadow-lg">
                                <Coins className="w-6 h-6 text-yellow-200" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-yellow-500 rounded-full border-2 border-gray-800"></div>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-300 text-xs mb-1">Total Savings</p>
                            <h3 className="text-white font-semibold text-sm">
                                Rs. {khutrukeAmount.toFixed(2)}
                            </h3>
                        </div>
                    </div>

                    {/* Right side - Settings */}
                    <div className="text-right">
                        <button className="p-1.5 text-gray-400 hover:text-gray-200 transition-colors duration-200">
                            <Settings className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Add Money Section */}
                <div className="mb-3 flex-shrink-0">
                    <div className="flex items-center space-x-2">
                        <input
                            type="number"
                            placeholder="Amount to save"
                            value={addAmount}
                            onChange={(e) => setAddAmount(e.target.value)}
                            className="flex-1 bg-gray-600 text-white text-xs px-2 py-1.5 rounded-md border border-gray-500 focus:border-green-500 focus:outline-none placeholder-gray-400"
                        />
                        <button className="bg-green-600 hover:bg-green-500 text-white p-1.5 rounded-md transition-colors duration-200 flex-shrink-0">
                            <PlusCircle className="w-3 h-3" />
                        </button>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Add to savings</p>
                </div>

                {/* Break Khutruke Section */}
                <div className="mb-3 flex-shrink-0">
                    <button className="w-full bg-orange-800 hover:bg-orange-7   00 text-white py-1.5 px-3 rounded-md transition-colors duration-200 flex items-center justify-center space-x-1.5 text-xs">
                        <span>Break Khutruke</span>
                    </button>
                    <p className="text-gray-400 text-xs mt-1 text-center">Get all Rs. {khutrukeAmount.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}