import { useContext, useState, useEffect, React } from "react";
import { PiggyBank, CalendarClock } from "lucide-react";
import LoginContext from "../context/LoginContext";

export default function Khutruke() {
  const { user, setUser } = useContext(LoginContext);
  const [amount, setAmount] = useState('');
  const [khutruke, setKhutruke] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      const allKhutruke = JSON.parse(localStorage.getItem("khutruke")) || {};
      setKhutruke(allKhutruke[user.email] || null);
    }
  }, [user]);

  if (!user) return null;

  const handleDeposit = () => {
    setError('');
    setMessage('');

    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) return setError("Enter a valid amount.");
    if (value > user.balance) return setError("Insufficient balance.");

    // Update main balance
    const users = JSON.parse(localStorage.getItem("userdata")) || [];
    const userIndex = users.findIndex(u => u.email === user.email);
    users[userIndex].balance -= value;
    localStorage.setItem("userdata", JSON.stringify(users));
    localStorage.setItem("token", JSON.stringify(users[userIndex]));
    setUser(users[userIndex]);

    // Update Khutruke
    const allKhutruke = JSON.parse(localStorage.getItem("khutruke")) || {};
    const existing = allKhutruke[user.email] || {
      amount: 0,
      createdAt: new Date().toISOString()
    };
    const updated = {
      amount: existing.amount + value,
      createdAt: existing.createdAt
    };
    allKhutruke[user.email] = updated;
    localStorage.setItem("khutruke", JSON.stringify(allKhutruke));
    setKhutruke(updated);

    // Add to transactions
    const tx = JSON.parse(localStorage.getItem("transaction")) || [];
    tx.push({
      email: user.email,
      type: "khutruke-deposit",
      amount: value,
      date: new Date().toISOString()
    });
    localStorage.setItem("transaction", JSON.stringify(tx));

    setAmount('');
    setMessage("Money added to Khutruke.");
  };

  const handleBreak = () => {
    const users = JSON.parse(localStorage.getItem("userdata")) || [];
    const userIndex = users.findIndex(u => u.email === user.email);
    users[userIndex].balance += khutruke.amount;
    localStorage.setItem("userdata", JSON.stringify(users));
    localStorage.setItem("token", JSON.stringify(users[userIndex]));
    setUser(users[userIndex]);

    const allKhutruke = JSON.parse(localStorage.getItem("khutruke")) || {};
    delete allKhutruke[user.email];
    localStorage.setItem("khutruke", JSON.stringify(allKhutruke));
    setKhutruke(null);

    const tx = JSON.parse(localStorage.getItem("transaction")) || [];
    tx.push({
      email: user.email,
      type: "khutruke-break",
      amount: khutruke.amount,
      date: new Date().toISOString()
    });
    localStorage.setItem("transaction", JSON.stringify(tx));

    setMessage("Khutruke broken. Balance returned.");
  };

  const canBreak = khutruke && new Date() - new Date(khutruke.createdAt) >= 365 * 24 * 60 * 60 * 1000;

  return (
    <div className="bg-inherit dark:bg-zinc-900 rounded-xl p-5 shadow-sm max-w-full text-sm text-gray-800 dark:text-gray-100">
      <div className="flex items-center mb-3">
        <PiggyBank className="w-5 h-5 text-pink-600 mr-2" />
        <h2 className="text-base font-semibold">Khutruke Savings</h2>
      </div>

      {error && <p className="text-red-600 text-xs mb-2">{error}</p>}
      {message && <p className="text-green-600 text-xs mb-2">{message}</p>}

      {khutruke && (
        <div className="mb-3 space-y-1">
          <p>💰 Saved: <strong>Rs. {khutruke.amount}</strong></p>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
            <CalendarClock className="w-4 h-4" />
            Created: {new Date(khutruke.createdAt).toLocaleDateString()}
          </div>
        </div>
      )}

      {/* Deposit Field */}
      <div className="flex gap-2 mb-3">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to save"
          className="flex-1 px-3 py-1.5 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-pink-500 text-sm"
        />
        <button
          onClick={handleDeposit}
          className="bg-pink-600 text-white px-4 py-1.5 rounded hover:bg-pink-500 transition-colors text-sm"
        >
          Save
        </button>
      </div>

      {/* Break Button */}
      {khutruke && (
        <button
          onClick={handleBreak}
          disabled={!canBreak}
          className={`w-full py-1.5 text-sm rounded ${
            canBreak
              ? "bg-green-600 text-white hover:bg-green-500"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          {canBreak ? "Break Khutruke" : "Locked for 1 year"}
        </button>
      )}
    </div>
  );
}
