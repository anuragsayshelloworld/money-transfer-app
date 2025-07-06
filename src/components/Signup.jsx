import React, { useState } from "react";
import { Mail, Lock, User, Check, X, Loader2 } from "lucide-react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    
    const Navigate = useNavigate();

    
    const [formData, setFormData] = useState({ fullname: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [modal, setModal] = useState(false);
    const [pin, setPin] = useState('');
    const [pinInput, setPinInput] = useState('');
    const [verifying, setVerifying] = useState(false);
    const [success, setSuccess] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        setTimeout(() => {
            const { fullname, email, password } = formData;

            if (!fullname || !email || !password) {
                setError("Please fill in all fields");
                setLoading(false);
                return;
            }

            if (password.length < 6) {
                setError("Password must be at least 6 characters");
                setLoading(false);
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError("Please enter a valid email address");
                setLoading(false);
                return;
            }

            const hasSpecialChars = /[^a-zA-Z\s]/;
            if (hasSpecialChars.test(fullname)) {
                setError("Name should only contain letters and spaces");
                setLoading(false);
                return;
            }

            const PIN = Math.floor(1000 + Math.random() * 9000); 
            setPin(PIN); 

            // Send actual email with PIN
            emailjs.send(
                "service_6vjrpop",          
                "template_5ri4xxa",         
                {
                    fullname: formData.fullname,
                    email: formData.email,
                    pin_code: PIN
                },
                "cm1wHY7sIZ75KbKOv"        
            ).then(() => {
                setModal(true);
                setLoading(false);
            }).catch((error) => {
                console.error("EmailJS Error:", error);
                setError("Failed to send verification email. Please try again.");
                setLoading(false);
            });
        }, 1000);
    }

    function handlePinVerify() {
        if (!pinInput) {
            setError("Please enter the PIN");
            return;
        }

        setVerifying(true);
        setError("");

        setTimeout(() => {
            if (Number(pin) === Number(pinInput)) {
                setSuccess(true);
                setVerifying(false);
                
                // Show success state for 2 seconds before navigating
                setTimeout(() => {
                    Navigate('/');
                }, 2000);
            } else {
                setError("Invalid PIN. Please check your email and try again.");
                setVerifying(false);
            }
        }, 1000);
    }

    function handleInputChange(field, value) {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (error) setError(''); // Clear error when user starts typing
    }

    function handlePinInputChange(value) {
        setPinInput(value);
        if (error) setError(''); // Clear error when user starts typing
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-sm text-center">{error}</p>
                    </div>
                )}

                {/* Verification Modal */}
                {modal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
                            {success ? (
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                        <Check className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">Account Created!</h2>
                                    <p className="text-gray-600 text-sm">Redirecting to login page...</p>
                                    <div className="flex justify-center">
                                        <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Mail className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Check Your Email</h2>
                                        <p className="text-gray-600 text-sm">We have sent a 4-digit PIN to {formData.email}</p>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            maxLength={4}
                                            value={pinInput}
                                            onChange={(e) => handlePinInputChange(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg font-semibold tracking-widest"
                                            placeholder="••••"
                                        />
                                        
                                        <button
                                            onClick={handlePinVerify}
                                            disabled={verifying || !pinInput}
                                            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                        >
                                            {verifying ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span>Verifying...</span>
                                                </>
                                            ) : (
                                                <span>Verify PIN</span>
                                            )}
                                        </button>
                                        
                                        <button
                                            onClick={() => setModal(false)}
                                            className="w-full text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Cancel</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Main Form */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
                        <p className="text-gray-600 text-sm">Join us today and get started</p>
                    </div>

                    <div onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={formData.fullname}
                                    onChange={(e) => handleInputChange('fullname', e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
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
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Create a password"
                                />
                            </div>
                            <p className="text-xs text-gray-500">Must be at least 6 characters</p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <span>Create Account</span>
                            )}
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={() => Navigate('/')}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}