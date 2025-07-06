import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const Navigate = useNavigate();

   function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    const doesUserExist = userdata.some((item)=>item.password === password && item.email === email);
    if(doesUserExist){
        setTimeout(()=>{
        Navigate('/customerdashboard', {replace: true})
        setLoading(false);
        },1000)
    }
    else{
     setError('Wrong Crendentials');
     setLoading(false);
    }
   }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                {/* Main Form */}
                {error && (
                    <i className='text-red-600 py=2'>Wrong Credentials</i>
                )}
                <form onSubmit={handleSubmit}>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-600 text-sm">Sign in to your account</p>
                    </div>

                    <div className="space-y-6">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    type="password"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                         {loading ? 'Logging in...' : 'Sign In'}   
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don&apos;t have an account?{' '}
                            <button
                                onClick={() => Navigate('/signup')}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Create Account
                            </button>
                        </p>
                    </div>
                </div>
                </form>

            </div>
        </div>
    );
}