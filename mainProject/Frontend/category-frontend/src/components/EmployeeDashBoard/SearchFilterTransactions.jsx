import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAdminStatement, getEmployeeStatement } from "../../services/userService";
import { toast } from "react-toastify";

const TransactionManagement = () => {
  const [filters, setFilters] = useState({
    senderAccount: "",
    status: "",
    transactionType: "",
    senderName: "",
  });
  const [transactions, setTransactions] = useState([]);

  // ✅ Fetch transactions from backend
  const allTransaction = async () => {
    try {
      const res = await getEmployeeStatement();
      const data = Array.isArray(res?.data ?? res) ? (res.data ?? res) : [];
      setTransactions(data); // ✅ always array
      console.log("Statement fetch successful!");
    } catch (error) {
      console.error("Transaction failed:", error);
      console.log(error.response?.data?.message || "Transfer failed.");
      setTransactions([]); // fallback
    }
  };
  useEffect(() => {
    allTransaction();
  }, []);

  // ✅ Filter logic
  const filteredTransactions = (Array.isArray(transactions) ? transactions : []).filter((t) =>
    t.senderAccount.toString().includes(filters.senderAccount) &&
    t.status.toLowerCase().includes(filters.status.toLowerCase()) &&
    t.transactionType.toLowerCase().includes(filters.transactionType.toLowerCase()) &&
    (t.senderName || "").toLowerCase().includes(filters.senderName.toLowerCase())
  );

  return (
    <div className="bg-[#FDFCF9] min-h-screen p-6 font-sans">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#0B2E53] mb-6 text-center border-b pb-2">
          Transaction Management Dashboard
        </h2>

        {/* 🔍 Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { placeholder: "Sender Account", key: "senderAccount" },
            { placeholder: "Status", key: "status" },
            { placeholder: "Transaction Type", key: "transactionType" },
            { placeholder: "Sender Name", key: "senderName" },
          ].map((f) => (
            <input
              key={f.key}
              type="text"
              placeholder={f.placeholder}
              value={filters[f.key]}
              onChange={(e) => setFilters({ ...filters, [f.key]: e.target.value })}
              className="border border-[#C89D2A] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
            />
          ))}
        </div>

        {/* 📋 Transaction Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 hidden md:table">
            <thead className="bg-[#0B2E53] text-white">
              <tr>
                <th className="px-4 py-2">Sender Account</th>
                <th className="px-4 py-2">Receiver Account</th>
                <th className="px-4 py-2">Sender Name</th>
                <th className="px-4 py-2">Sender Email</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Mode</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((t, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{t.senderAccount}</td>
                    <td className="px-4 py-2">{t.receiverAccount}</td>
                    <td className="px-4 py-2">{t.senderName}</td>
                    <td className="px-4 py-2">{t.senderEmail}</td>
                    <td className="px-4 py-2">₹{t.amount}</td>
                    <td className="px-4 py-2">{t.transactionMode}</td>
                    <td className="px-4 py-2">{t.transactionType}</td>
                    <td className="px-4 py-2">{t.status}</td>
                    <td className="px-4 py-2">
                      {new Date(t.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="text-center text-[#C89D2A] py-4 font-medium"
                  >
                    No matching transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* 📱 Mobile Card View */}
          <div className="space-y-4 md:hidden">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
                >
                  <p><span className="font-semibold">Sender Account:</span> {t.senderAccount}</p>
                  <p><span className="font-semibold">Receiver Account:</span> {t.receiverAccount}</p>
                  <p><span className="font-semibold">Sender Name:</span> {t.senderName}</p>
                  <p><span className="font-semibold">Sender Email:</span> {t.senderEmail}</p>
                  <p><span className="font-semibold">Amount:</span> ₹{t.amount}</p>
                  <p><span className="font-semibold">Mode:</span> {t.transactionMode}</p>
                  <p><span className="font-semibold">Type:</span> {t.transactionType}</p>
                  <p><span className="font-semibold">Status:</span> {t.status}</p>
                  <p><span className="font-semibold">Date:</span> {new Date(t.createdAt).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-[#C89D2A] font-medium">
                No matching transactions found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default TransactionManagement;
