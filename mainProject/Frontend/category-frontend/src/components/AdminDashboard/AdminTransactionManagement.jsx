import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAdminStatement } from "../../services/userService";
import { toast } from "react-toastify";

const TransactionManagement = () => {
  const [filters, setFilters] = useState({
    senderAccount: "",
    status: "",
    transactionType: "",
    senderName: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // ✅ Fetch transactions from backend
  const allTransaction = async () => {
    try {
      const res = await getAdminStatement();
      const data = res?.data;
    setTransactions(Array.isArray(data) ? data : []);
      console.log('Statement fetch successful!');
    } catch (error) {
      console.error('Transaction failed:', error);
      setTransactions([]);
      console.log(error.response?.data?.message || 'Transfer failed.');
    }
  }
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
    <div className="bg-[#FDFCF9] min-h-screen p-4 sm:p-6 font-sans max-w-5xl">
      <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0B2E53] mb-4 sm:mb-6 text-center border-b pb-2">
          Transaction Management Dashboard
        </h2>

        {/* 🔍 Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {[
            { placeholder: "Sender Account", key: "senderAccount" },
            { placeholder: "Status", key: "status" },
            { placeholder: "Transaction Type", key: "transactionType" },
            { placeholder: "Sender Name", key: "senderName" }
          ].map(({ placeholder, key }) => (
            <input
              key={key}
              type="text"
              placeholder={placeholder}
              value={filters[key]}
              onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
              className="border border-[#C89D2A] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A] text-sm sm:text-base"
            />
          ))}
        </div>

        {/* 📋 Transaction Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm sm:text-base">
            <thead className="bg-[#0B2E53] text-white">
              <tr>
                {[
                  "Sender Account", "Receiver Account", "Sender Name", "Sender Email",
                  "Amount", "Mode", "Type", "Status", "Date", "Action"
                ].map((head) => (
                  <th key={head} className="px-3 sm:px-4 py-2 whitespace-nowrap">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((t, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-3 sm:px-4 py-2 whitespace-nowrap">{t.senderAccount}</td>
                    <td className="px-3 sm:px-4 py-2 whitespace-nowrap">{t.receiverAccount}</td>
                    <td className="px-3 sm:px-4 py-2 whitespace-nowrap">{t.senderName}</td>
                    <td className="px-3 sm:px-4 py-2 whitespace-nowrap">{t.senderEmail}</td>
                    <td className="px-3 sm:px-4 py-2 whitespace-nowrap">₹{t.amount}</td>
                    <td className="px-3 sm:px-4 py-2 whitespace-nowrap">{t.transactionMode}</td>
                    <td className="px-3 sm:px-4 py-2 whitespace-nowrap">{t.transactionType}</td>
                    <td className="px-3 sm:px-4 py-2 whitespace-nowrap">{t.status}</td>
                    <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                      {new Date(t.createdAt).toLocaleString()}
                    </td>
                    <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedTransaction(t)}
                        className="bg-[#C89D2A] text-white px-2 sm:px-3 py-1 rounded hover:bg-[#A77E20] text-xs sm:text-sm"
                      >
                        View
                      </button>
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
        </div>

        {/* 📌 Transaction Detail Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 mt-12 flex items-center justify-center z-50">
            {/* Background Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setSelectedTransaction(null)}
            ></div>

            {/* Modal Card */}
            <div className="relative bg-[#F9F7F2] border border-[#C89D2A] rounded-lg shadow-lg w-[95%] sm:max-w-lg p-4 sm:p-6 z-10">
              <h3 className="text-lg sm:text-xl font-bold text-[#0B2E53] mb-4">
                Transaction - {selectedTransaction.senderName}
              </h3>

              <ul className="space-y-2 text-[#0B2E53] text-sm sm:text-base">
                <li><strong>Sender Account:</strong> {selectedTransaction.senderAccount}</li>
                <li><strong>Receiver Account:</strong> {selectedTransaction.receiverAccount}</li>
                <li><strong>Sender Email:</strong> {selectedTransaction.senderEmail}</li>
                <li><strong>Amount:</strong> ₹{selectedTransaction.amount}</li>
                <li><strong>Mode:</strong> {selectedTransaction.transactionMode}</li>
                <li><strong>Type:</strong> {selectedTransaction.transactionType}</li>
                <li><strong>Status:</strong> {selectedTransaction.status}</li>
                <li><strong>Date:</strong> {new Date(selectedTransaction.createdAt).toLocaleString()}</li>
                <li><strong>Description:</strong> {selectedTransaction.description}</li>
              </ul>

              {/* Close Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="bg-gray-600 text-white px-4 sm:px-5 py-2 rounded-lg hover:bg-gray-700 transition text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default TransactionManagement;
