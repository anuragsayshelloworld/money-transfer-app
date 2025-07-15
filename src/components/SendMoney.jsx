import React, { useEffect, useState } from "react";
import { Send, User, DollarSign, Shield, CheckCircle, ArrowRight } from "lucide-react";

export default function SendMoney() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
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
          <div className="w-16 h-16 border-4 border-t-transparent border-emerald-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-t-transparent border-emerald-600 rounded-full animate-spin animate-reverse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="text-center">
          <p className="text-xl font-medium mb-2">Initializing Secure Transfer</p>
          <p className="text-gray-400 text-sm">Preparing encrypted connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center px-4 text-white">
      <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/30 p-6 rounded-2xl shadow-lg w-full max-w-sm relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/3 to-blue-500/3 rounded-2xl"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-500/8 rounded-xl border border-emerald-500/15">
              <Send className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Send Money
              </h2>
              <p className="text-gray-400 text-xs">Fast & secure transfers</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Recipient Field */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Send to
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <User className={`w-4 h-4 transition-colors ${focused === 'recipient' ? 'text-emerald-400' : 'text-gray-500'}`} />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-3 bg-gray-800/40 border border-gray-600/30 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500/30 transition-all duration-200 backdrop-blur-sm"
                  placeholder="Recipient name"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  onFocus={() => setFocused('recipient')}
                  onBlur={() => setFocused(null)}
                />
              </div>
            </div>

            {/* Amount Field */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Amount
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <DollarSign className={`w-4 h-4 transition-colors ${focused === 'amount' ? 'text-emerald-400' : 'text-gray-500'}`} />
                </div>
                <input
                  type="number"
                  step="0.01"
                  className="w-full pl-10 pr-3 py-3 bg-gray-800/40 border border-gray-600/30 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500/30 transition-all duration-200 backdrop-blur-sm"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onFocus={() => setFocused('amount')}
                  onBlur={() => setFocused(null)}
                />
                {amount && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-emerald-400 text-xs font-medium">USD</span>
                  </div>
                )}
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-2 p-3 bg-emerald-500/3 border border-emerald-500/15 rounded-lg">
              <Shield className="w-4 h-4 text-emerald-400" />
              <div className="flex-1">
                <p className="text-xs font-medium text-emerald-400">Secure Transfer</p>
                <p className="text-xs text-gray-500">Bank-grade security</p>
              </div>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>

            {/* Submit Button */}
            <div
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-500/20 group cursor-pointer"
            >
              <span className="text-sm">Send Money</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}