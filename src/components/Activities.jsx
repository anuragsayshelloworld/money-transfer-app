import React from "react";
import { ArrowUpRight, ArrowDownLeft, CreditCard, Smartphone, User, Building2 } from "lucide-react";

export default function Activities() {
    const activities = [
        {
            id: 1,
            type: 'sent',
            description: 'Money sent to John Doe',
            amount: -250.00,
            date: '2 hours ago',
            icon: ArrowUpRight,
            color: 'text-red-400',
            bgColor: 'bg-red-400/10'
        },
        {
            id: 2,
            type: 'received',
            description: 'Money received from Sarah Wilson',
            amount: 150.00,
            date: '5 hours ago',
            icon: ArrowDownLeft,
            color: 'text-green-400',
            bgColor: 'bg-green-400/10'
        },
        {
            id: 3,
            type: 'topup',
            description: 'Account top up via card',
            amount: 500.00,
            date: '1 day ago',
            icon: CreditCard,
            color: 'text-blue-400',
            bgColor: 'bg-blue-400/10'
        },
        {
            id: 4,
            type: 'sent',
            description: 'Mobile recharge',
            amount: -25.00,
            date: '2 days ago',
            icon: Smartphone,
            color: 'text-purple-400',
            bgColor: 'bg-purple-400/10'
        },
        {
            id: 5,
            type: 'received',
            description: 'Salary from ABC Corp',
            amount: 2500.00,
            date: '3 days ago',
            icon: Building2,
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-400/10'
        },
        {
            id: 6,
            type: 'sent',
            description: 'Payment to Mike Johnson',
            amount: -80.00,
            date: '4 days ago',
            icon: User,
            color: 'text-orange-400',
            bgColor: 'bg-orange-400/10'
        }
    ];

    return (
        <div className="w-[80%] px-4 h-[380px] overflow-y-scroll scrollbar-hide border-r border-gray-600">
            <div className="flex items-center bg-gray-800 justify-between mb-2 sticky top-0 z-10">
                <h2 className="text-xl font-semibold text-white py-2">Recent Activities</h2>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Set Filter
                </button>
            </div>
            
            <div className="space-y-3">
                {activities.map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                        <div
                            key={activity.id}
                            className="flex items-center p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-200 border border-gray-600/50 hover:border-gray-500/50"
                        >
                            <div className={`p-2 rounded-full ${activity.bgColor} mr-3`}>
                                <IconComponent size={16} className={activity.color} />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    {activity.description}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {activity.date}
                                </p>
                            </div>
                            
                            <div className="text-right">
                                <p className={`text-sm font-semibold ${
                                    activity.amount > 0 ? 'text-green-400' : 'text-red-400'
                                }`}>
                                    {activity.amount > 0 ? '+' : ''}${Math.abs(activity.amount).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}