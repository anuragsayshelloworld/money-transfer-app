import { useContext, React } from "react";
import LoginContext from '../context/LoginContext';
import { User, Mail, Briefcase, Wallet } from 'lucide-react';

export default function UserDetail() {
  const { user } = useContext(LoginContext);

  if (!user) return null;

  return (
    <div className="bg-inherit rounded-xl p-4 max-w-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Account Info</h2>
      
      <div className="flex items-center mb-3 text-gray-700">
        <User className="w-5 h-5 mr-2 text-gray-500" />
        <span>{user.fullname}</span>
      </div>

      <div className="flex items-center mb-3 text-gray-700">
        <Mail className="w-5 h-5 mr-2 text-gray-500" />
        <span>{user.email}</span>
      </div>

      <div className="flex items-center mb-3 text-gray-700">
        <Briefcase className="w-5 h-5 mr-2 text-gray-500" />
        <span className="capitalize">{user.role === 'user' ? 'App user' : 'Administrator' }</span>
      </div>

      <div className="flex items-center text-gray-700">
        <Wallet className="w-5 h-5 mr-2 text-gray-500" />
        <span>Balance: <span className="font-medium text-black">Rs. {user.balance}</span></span>
      </div>
    </div>
  );
}
