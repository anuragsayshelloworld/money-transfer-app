import { useContext, React } from "react";
import LoginContext from "../context/LoginContext";

export default function TransactionHistory() {
  const { user } = useContext(LoginContext);

  if (!user) return null;

  const transactions = JSON.parse(localStorage.getItem("transaction")) || [];

  // Filter only transactions related to this user
  const userTransactions = transactions
    .filter(
      (t) => t.fromEmail === user.email || t.toEmail === user.email
    )
    // Sort newest first
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="max-w-md max-h-64 overflow-y-auto bg-inherit rounded-md p-3 border border-gray-300">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Transaction History</h2>

      {userTransactions.length === 0 ? (
        <p className="text-gray-600 text-sm">No transactions found.</p>
      ) : (
        <ul className="space-y-2">
          {userTransactions.map((tx) => {
            const isSent = tx.fromEmail === user.email;
            return (
              <li
                key={tx.id}
                className={`flex justify-between items-center p-2 rounded-md ${
                  isSent ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                }`}
              >
                <div className="text-sm">
                  <p className="font-medium">
                    {isSent ? `Sent to ${tx.toEmail}` : `Received from ${tx.fromEmail}`}
                  </p>
                  <p className="text-xs text-gray-600">
                    {new Date(tx.date).toLocaleString()}
                  </p>
                </div>
                <div className="font-semibold">
                  {isSent ? "-" : "+"}Rs. {tx.amount}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
