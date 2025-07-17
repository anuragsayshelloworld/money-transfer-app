import React, { useEffect, useState } from "react";
import { Download, User, DollarSign, Shield, CheckCircle, ArrowLeft } from "lucide-react";

export default function RequestMoney() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [requestFrom, setRequestFrom] = useState("");
  const [reason, setReason] = useState("");
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  if (loading) {
    return (
      <div className="flex flex-col mb-48 items-center justify-center h-full w-full text-white gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-t-transparent border-blue-600 rounded-full animate-spin animate-reverse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="text-center">
          <p className="text-xl font-medium mb-2">Preparing Request</p>
          <p className="text-gray-400 text-sm">Setting up secure connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center px-4 text-white">
      <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/30 p-6 rounded-2xl shadow-lg w-full max-w-sm relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-purple-500/3 rounded-2xl"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/8 rounded-xl border border-blue-500/15">
              <Download className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Request Money
              </h2>
              <p className="text-gray-400 text-xs">Quick payment requests</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Request From and Amount Fields - Inline */}
            <div className="flex gap-3">
              <div className="flex-1 space-y-1">
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Request from
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                    <User className={`w-4 h-4 transition-colors ${focused === 'requestFrom' ? 'text-blue-400' : 'text-gray-500'}`} />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-3 bg-gray-800/40 border border-gray-600/30 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all duration-200 backdrop-blur-sm"
                    placeholder="Person's name"
                    value={requestFrom}
                    onChange={(e) => setRequestFrom(e.target.value)}
                    onFocus={() => setFocused('requestFrom')}
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
                    <DollarSign className={`w-4 h-4 transition-colors ${focused === 'amount' ? 'text-blue-400' : 'text-gray-500'}`} />
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full pl-10 pr-2 py-3 bg-gray-800/40 border border-gray-600/30 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all duration-200 backdrop-blur-sm"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onFocus={() => setFocused('amount')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              </div>
            </div>

            {/* Reason Field */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Reason (optional)
              </label>
              <div className="relative group">
                <textarea
                  className="w-full px-3 py-3 bg-gray-800/40 border border-gray-600/30 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all duration-200 backdrop-blur-sm resize-none"
                  placeholder="What's this for?"
                  rows="2"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  onFocus={() => setFocused('reason')}
                  onBlur={() => setFocused(null)}
                />
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-2 p-3 bg-blue-500/3 border border-blue-500/15 rounded-lg">
              <Shield className="w-4 h-4 text-blue-400" />
              <div className="flex-1">
                <p className="text-xs font-medium text-blue-400">Secure Request</p>
                <p className="text-xs text-gray-500">Privacy protected</p>
              </div>
              <CheckCircle className="w-4 h-4 text-blue-400" />
            </div>

            {/* Submit Button */}
            <div
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-800 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-blue-500/20 group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm">Send Request</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}