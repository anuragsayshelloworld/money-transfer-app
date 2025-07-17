import React, { useEffect, useState } from "react";
import { Smartphone, Phone, DollarSign, Shield, CheckCircle, Zap } from "lucide-react";

export default function TopUp() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [focused, setFocused] = useState(null);

  const quickAmounts = [5, 10, 20, 50];

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleQuickAmount = (value) => {
    setAmount(value.toString());
  };

  if (loading) {
    return (
      <div className="flex flex-col mb-48 items-center justify-center h-full w-full text-white gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-t-transparent border-orange-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-t-transparent border-orange-600 rounded-full animate-spin animate-reverse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="text-center">
          <p className="text-xl font-medium mb-2">Processing Top Up</p>
          <p className="text-gray-400 text-sm">Connecting to carrier network...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center px-4 text-white">
      <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/30 p-6 rounded-2xl shadow-lg w-full max-w-sm relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/3 to-red-500/3 rounded-2xl"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-500/8 rounded-xl border border-orange-500/15">
              <Smartphone className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Mobile Top Up
              </h2>
              <p className="text-gray-400 text-xs">Recharge phone credit</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Phone Number and Amount Fields - Inline */}
            <div className="flex gap-3">
              <div className="flex-1 space-y-1">
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Phone number
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                    <Phone className={`w-4 h-4 transition-colors ${focused === 'phoneNumber' ? 'text-orange-400' : 'text-gray-500'}`} />
                  </div>
                  <input
                    type="tel"
                    className="w-full pl-10 pr-3 py-3 bg-gray-800/40 border border-gray-600/30 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 focus:border-orange-500/30 transition-all duration-200 backdrop-blur-sm"
                    placeholder="+977 98XXXXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onFocus={() => setFocused('phoneNumber')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              </div>

              <div className="w-24 space-y-1">
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Amount
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                    <DollarSign className={`w-4 h-4 transition-colors ${focused === 'amount' ? 'text-orange-400' : 'text-gray-500'}`} />
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full pl-10 pr-2 py-3 bg-gray-800/40 border border-gray-600/30 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 focus:border-orange-500/30 transition-all duration-200 backdrop-blur-sm"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onFocus={() => setFocused('amount')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Quick amounts
              </label>
              <div className="grid grid-cols-4 gap-2">
                {quickAmounts.map((value) => (
                  <button
                    key={value}
                    onClick={() => handleQuickAmount(value)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                      amount === value.toString()
                        ? 'bg-orange-500/20 border border-orange-500/30 text-orange-400'
                        : 'bg-gray-800/40 border border-gray-600/30 text-gray-400 hover:bg-gray-700/40 hover:border-gray-500/30'
                    }`}
                  >
                    ${value}
                  </button>
                ))}
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-2 p-3 bg-orange-500/3 border border-orange-500/15 rounded-lg">
              <Shield className="w-4 h-4 text-orange-400" />
              <div className="flex-1">
                <p className="text-xs font-medium text-orange-400">Instant Recharge</p>
                <p className="text-xs text-gray-500">Direct to carrier</p>
              </div>
              <CheckCircle className="w-4 h-4 text-orange-400" />
            </div>

            {/* Submit Button */}
            <div
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-orange-800 to-orange-700 hover:from-orange-700 hover:to-orange-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-orange-500/20 group cursor-pointer"
            >
              <Zap className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="text-sm">Recharge Now</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}