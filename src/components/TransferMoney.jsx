import { useContext, useState, React } from "react";
import { Send, Mail, KeyRound } from "lucide-react";
import LoginContext from "../context/LoginContext";

export default function TransferMoney() {
  const { user, setUser } = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!user) return null;

  function handleTransfer(e) {
    e.preventDefault();
    setError('');
    setMessage('');

    const amountValue = parseFloat(amount);
    if (!email || !pin || !amount) {
      return setError("All fields are required.");
    }
    if (isNaN(amountValue) || amountValue <= 0) {
      return setError("Enter a valid amount.");
    }
    if (pin !== user.password) {
      return setError("Incorrect PIN.");
    }
    if (amountValue > user.balance) {
      return setError("Insufficient balance.");
    }

    const allUsers = JSON.parse(localStorage.getItem("userdata")) || [];
    const receiverIndex = allUsers.findIndex((u) => u.email === email);

    if (receiverIndex === -1) {
      return setError("Recipient not found.");
    }

    const updatedUsers = [...allUsers];
    updatedUsers[receiverIndex].balance += amountValue;

    const senderIndex = updatedUsers.findIndex((u) => u.email === user.email);
    updatedUsers[senderIndex].balance -= amountValue;

    localStorage.setItem("userdata", JSON.stringify(updatedUsers));
    localStorage.setItem("token", JSON.stringify(updatedUsers[senderIndex]));
    setUser(updatedUsers[senderIndex]);

    // Add transaction log
    const transactions = JSON.parse(localStorage.getItem("transaction")) || [];

    transactions.push({
      id: Date.now(),
      fromEmail: user.email,
      toEmail: email,
      amount: amountValue,
      date: new Date().toISOString()
    });

    localStorage.setItem("transaction", JSON.stringify(transactions));

    setMessage("Transfer successful!");
    setEmail('');
    setPin('');
    setAmount('');
  }

  return (
    <div className="bg-inherit rounded-xl p-2 max-w-full">
      <h2 className="text-base font-semibold mb-3 text-gray-800 flex items-center">
        <Send className="w-4 h-4 mr-1 text-blue-600" />
        Transfer Money
      </h2>

      <form onSubmit={handleTransfer} className="space-y-2">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        {/* Recipient Email */}
        <div className="relative">
          <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Recipient Email"
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Amount */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        {/* PIN */}
        <div className="relative">
          <KeyRound className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Your PIN"
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-1.5 text-sm rounded-md hover:bg-blue-500 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
