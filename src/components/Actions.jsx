import React from "react";
import { Send, DollarSign, CreditCard, History, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Actions() {
    const navigate = useNavigate();
    const actions = [
        {
            id: 'send',
            icon: Send,
            label: 'Send Money',
            color: 'text-emerald-400',
            hoverColor: 'hover:text-emerald-300',
            navto: '/dashboard/Sendmoney'
        },
        {
            id: 'request',
            icon: DollarSign,
            label: 'Request Money',
            color: 'text-blue-400',
            hoverColor: 'hover:text-blue-300',
            navto: '/dashboard/RequestMoney'
        },
        {
            id: 'topup',
            icon: CreditCard,
            label: 'Top up',
            color: 'text-purple-400',
            hoverColor: 'hover:text-purple-300',
            navto: '/dashboard/Topup'
        },
        {
            id: 'history',
            icon: History,
            label: 'Activities',
            color: 'text-amber-400',
            hoverColor: 'hover:text-amber-300',
            navto: '/dashboard'
        },

        {
            id: 'support',
            icon: HelpCircle,
            label: 'Support',
            color: 'text-cyan-400',
            hoverColor: 'hover:text-cyan-300',
            navto: '/dashboard/support'
        }
    ];

    return (
        <div className="flex gap-2 p-4">
            {actions.map((action) => {
                const IconComponent = action.icon;
                return (
                    <button
                        onClick={()=>navigate(action.navto)}
                        key={action.id}
                        className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-all duration-200 group border border-gray-600 hover:border-gray-500 ${action.color} ${action.hoverColor} shadow-2xl shadow-black/50`}
                    >
                        <IconComponent 
                            size={20} 
                            className="mb-1.5 transition-transform duration-200 group-hover:scale-110" 
                        />
                        <span className="text-xs font-medium text-gray-200 group-hover:text-white transition-colors duration-200 text-center leading-tight">
                            {action.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}