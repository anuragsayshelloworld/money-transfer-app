import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, HelpCircle, Clock } from "lucide-react";

export default function SupportChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your support assistant. I can help you with frequently asked questions. What can I help you with today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const faqs = [
    {
      keywords: ['password', 'reset', 'forgot', 'login', 'access'],
      response: "To reset your password:\n1. Go to the login page\n2. Click 'Forgot Password'\n3. Enter your email address\n4. Check your email for reset instructions\n\nIf you're still having trouble, please contact our support team."
    },
    {
      keywords: ['transfer', 'send money', 'payment', 'failed', 'pending'],
      response: "For payment issues:\n• Failed transfers are usually due to insufficient funds or network issues\n• Pending transfers typically process within 1-2 business days\n• Check your transaction history for status updates\n• Contact your bank if the issue persists"
    },
    {
      keywords: ['fees', 'charges', 'cost', 'price', 'money'],
      response: "Our fee structure:\n• Domestic transfers: Free\n• International transfers: $2.99\n• Mobile top-ups: No additional fees\n• Card payments: 2.9% processing fee\n\nAll fees are clearly shown before you confirm any transaction."
    },
    {
      keywords: ['account', 'verify', 'verification', 'identity'],
      response: "Account verification:\n• Upload a government-issued ID\n• Provide proof of address (utility bill or bank statement)\n• Verification usually takes 1-3 business days\n• You'll receive an email once approved\n\nVerified accounts have higher transaction limits."
    },
    {
      keywords: ['security', 'safe', 'protect', 'hack', 'fraud'],
      response: "Your security is our priority:\n• We use 256-bit encryption\n• Two-factor authentication available\n• Never share your login details\n• Monitor your account regularly\n• Report suspicious activity immediately\n\nWe're constantly monitoring for fraudulent activity."
    },
    {
      keywords: ['limit', 'maximum', 'minimum', 'amount'],
      response: "Transaction limits:\n• Unverified accounts: $500/day\n• Verified accounts: $5,000/day\n• Minimum transfer: $1\n• Mobile top-up: $5-$100\n\nLimits reset daily at midnight EST."
    },
    {
      keywords: ['support', 'help', 'contact', 'human', 'agent'],
      response: "Need to speak with a human agent?\n• Email: support@yourapp.com\n• Phone: 1-800-SUPPORT\n• Live chat: Available 24/7\n• Response time: Usually within 2 hours\n\nI'm here to help with common questions anytime!"
    }
  ];

  const quickQuestions = [
    "How do I reset my password?",
    "What are your fees?",
    "How long do transfers take?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const findFAQResponse = (message) => {
    const lowercaseMessage = message.toLowerCase();
    for (let faq of faqs) {
      if (faq.keywords.some(keyword => lowercaseMessage.includes(keyword))) {
        return faq.response;
      }
    }
    return "I'm sorry, I didn't understand that question. Here are some things I can help you with:\n\n• Password reset and login issues\n• Payment and transfer problems\n• Account verification\n• Fees and limits\n• Security questions\n\nTry asking about one of these topics, or contact our support team for personalized help.";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: findFAQResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
<div className="w-full h-[70dvh] overflow-hidden flex flex-col bg-gray-800 text-white">

      {/* Header */}
      <div className="bg-gray-800/60 backdrop-blur-sm border-b border-gray-700/30 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/8 rounded-xl border border-blue-500/15">
            <HelpCircle className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Support Chat
            </h1>
            <p className="text-gray-400 text-xs">Get help with your account</p>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="p-4 border-b border-gray-700/30">
        <p className="text-sm text-gray-400 mb-3">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="px-3 py-1.5 bg-gray-700/40 hover:bg-gray-700/60 border border-gray-600/30 rounded-full text-xs text-gray-300 transition-all duration-200"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'bot' && (
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-blue-400" />
              </div>
            )}
            
            <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.type === 'user' ? 'order-first' : ''}`}>
              <div className={`p-3 rounded-2xl ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white ml-auto' 
                  : 'bg-gray-700/40 border border-gray-600/30 text-gray-100'
              }`}>
                <p className="text-sm whitespace-pre-line">{message.content}</p>
              </div>
              <div className={`flex items-center gap-1 mt-1 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {message.type === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 bg-gray-600/40 border border-gray-500/30 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-300" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-blue-400" />
            </div>
            <div className="bg-gray-700/40 border border-gray-600/30 rounded-2xl p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700/30">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-gray-700/40 border border-gray-600/30 rounded-xl text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all duration-200"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl transition-all duration-200 flex items-center justify-center"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}