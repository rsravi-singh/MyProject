import React from 'react';
const MiniStatement = ({ transactions }) => {
  return (
    <div className="bg-[#FDFCF9] p-4 shadow-md rounded border border-[#0B2E53]/10">
      <h2 className="text-lg font-semibold mb-4">Mini Statement</h2>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-[#0B2E53] text-sm">
            <thead>
              <tr className="bg-[#0B2E53] text-white">
                <th className="border border-[#0B2E53] px-4 py-2 text-left">Date</th>
                <th className="border border-[#0B2E53] px-4 py-2 text-left">Recipient AccountNo</th>
                <th className="border border-[#0B2E53] px-4 py-2 text-left">Description</th>
                <th className="border border-[#0B2E53] px-4 py-2 text-left">Type</th>
                <th className="border border-[#0B2E53] px-4 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-blue-50 text-[#0B2E53]">
                  <td className="border border-[#0B2E53] px-4 py-2">{txn.createdAt?.substring(0, 10)}</td>
                  <td className="border border-[#0B2E53] px-4 py-2">{txn.receiverAccount}</td>
                  <td className="border border-[#0B2E53] px-4 py-2">{txn.description || txn.desc}</td>
                  <td className="border border-[#0B2E53] px-4 py-2">{txn.transactionType}</td>
                  <td className="border border-[#0B2E53] px-4 py-2 text-right">
                    {(txn.transactionType === "CREDIT" ? "+" : "-") + " ₹" + txn.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

  );
};

export default MiniStatement;
