import React from "react";
import { Search } from "lucide-react";

export default function SearchComponent() {
  return (
    <div className="w-[90%] flex justify-center items-center">
      <div className="relative w-full max-w-sm">
        {/* Search Icon */}
        <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={16} />
        </div>

        {/* Input Field */}
        <input
          type="search"
          placeholder="Search via Email"
          className="
            w-full pl-8 pr-24 py-2 bg-gray-700/50 text-white placeholder-gray-400 text-sm
            rounded-md border border-gray-600 transition-all duration-200 outline-none
            hover:border-gray-500 hover:bg-gray-700/60
            focus:border-blue-500 focus:bg-gray-700/70 focus:shadow-lg focus:shadow-blue-500/20
          "
        />
        
        {/* Keyboard Shortcuts */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          <kbd className="px-1.5 py-0.5 bg-gray-800 text-gray-400 text-xs rounded 
                          border border-gray-600 font-mono">
            Ctrl + K
          </kbd>
          <span className="text-gray-500 text-xs">/</span>
          <kbd className="px-1.5 py-0.5 bg-gray-800 text-gray-400 text-xs rounded 
                          border border-gray-600 font-mono">
            ⌘ + K
          </kbd>
        </div>
      </div>
    </div>
  );
}