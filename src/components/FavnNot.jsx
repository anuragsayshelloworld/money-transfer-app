import React from "react";
import { Star } from "lucide-react";

export default function FavouriteContacts() {

  const favourites = [
    {
      id: 1,
      name: "Alex Thompson",
      email: "alex.thompson@email.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      lastTransaction: "Sent $75.00",
      transactionDate: "Yesterday"
    },
    {
      id: 2,
      name: "Jessica Park",
      email: "jessica.park@email.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      lastTransaction: "Received $200.00",
      transactionDate: "2 days ago"
    },
    {
      id: 3,
      name: "David Kim",
      email: "david.kim@email.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      lastTransaction: "Sent $320.00",
      transactionDate: "3 days ago"
    },
    {
      id: 4,
      name: "Rachel Green",
      email: "rachel.green@email.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
      lastTransaction: "Received $150.00",
      transactionDate: "1 week ago"
    },
    {
      id: 5,
      name: "Tom Wilson",
      email: "tom.wilson@email.com",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
      lastTransaction: "Sent $89.50",
      transactionDate: "1 week ago"
    },
    {
      id: 6,
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      avatar: "https://plus.unsplash.com/premium_photo-1661508557554-e3d96f2fdde5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29yZ2VvdXMlMjBnaXJsfGVufDB8fDB8fHww",
      lastTransaction: "Received $500.00",
      transactionDate: "2 weeks ago"
    }
  ];


  return (
    <div className="bg-gray-800 text-white w-80 h-screen flex flex-col">

      {/* Favourites List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3 border-b border-gray-600 p-2 mt-2">
            <h3 className="text-sm font-medium text-gray-300">Favourite Contacts</h3>
            <Star size={16} className="text-yellow-500" />
          </div>
          
          <div className="space-y-1">
            {favourites.map((favourite) => (
              <div key={favourite.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer group">
                <div className="relative">
                  <img 
                    src={favourite.avatar} 
                    alt={favourite.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-yellow-500 rounded-full border-2 border-gray-800">
                    <Star size={8} className="text-gray-800 absolute top-0.5 left-0.5" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{favourite.name}</p>
                  <p className="text-xs text-gray-400 truncate">{favourite.email}</p>
                  <p className="text-xs text-gray-500">{favourite.lastTransaction} • {favourite.transactionDate}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 bg-blue-600 hover:bg-blue-700 text-xs rounded-md">
                  Send
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}