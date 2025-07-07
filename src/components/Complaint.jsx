import { useState, useContext, React } from "react";
import LoginContext from "../context/LoginContext";

export default function Complaint() {
  const { user } = useContext(LoginContext);
  const [complaint, setComplaint] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!complaint.trim()) {
      return setError("Please enter your complaint.");
    }

    if (!user) {
      return setError("You must be logged in to submit a complaint.");
    }

    const complaints = JSON.parse(localStorage.getItem("complaint")) || [];

    const newComplaint = {
      id: Date.now(),
      text: complaint.trim(),
      date: new Date().toISOString(),
      complainerEmail: user.email,  // <-- Save user email here
    };

    complaints.push(newComplaint);

    localStorage.setItem("complaint", JSON.stringify(complaints));

    setMessage("Complaint submitted successfully!");
    setComplaint("");
  }

  return (
    <div className="bg-inherit rounded-xl p-4 max-w-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Customer Complaint</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Write your complaint here..."
          rows={4}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-500 transition-colors"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}
