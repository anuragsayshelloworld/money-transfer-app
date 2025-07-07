import { useContext, useState, React } from "react";
import LoginContext from "../context/LoginContext";

export default function ChangePassword() {
  const { user, setUser } = useContext(LoginContext);

  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  if (!user) return null;

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!currentPwd || !newPwd || !confirmPwd) {
      return setError("All fields are required.");
    }

    if (currentPwd !== user.password) {
      return setError("Current password is incorrect.");
    }

    if (newPwd !== confirmPwd) {
      return setError("New passwords do not match.");
    }

    if (newPwd.length < 6) {
      return setError("New password must be at least 6 characters.");
    }

    // Update user password in localStorage
    const users = JSON.parse(localStorage.getItem("userdata")) || [];
    const userIndex = users.findIndex((u) => u.email === user.email);
    if (userIndex === -1) {
      return setError("User not found.");
    }

    users[userIndex].password = newPwd;

    localStorage.setItem("userdata", JSON.stringify(users));
    localStorage.setItem("token", JSON.stringify(users[userIndex]));

    setUser(users[userIndex]);

    setMessage("Password changed successfully!");
    setCurrentPwd("");
    setNewPwd("");
    setConfirmPwd("");
  }

  return (
    <div className="bg-inherit rounded-xl p-4 max-w-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <input
          type="password"
          value={currentPwd}
          onChange={(e) => setCurrentPwd(e.target.value)}
          placeholder="Current Password"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          autoComplete="current-password"
        />

        <input
          type="password"
          value={newPwd}
          onChange={(e) => setNewPwd(e.target.value)}
          placeholder="New Password"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          autoComplete="new-password"
        />

        <input
          type="password"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
          placeholder="Confirm New Password"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          autoComplete="new-password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-500 transition-colors"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
