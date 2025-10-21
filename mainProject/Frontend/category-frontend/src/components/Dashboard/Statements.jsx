import { useEffect, useState } from "react";
import { getCustomerStatement } from "../../services/userService";

const Statements = () => {
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    transactionType: ''
  });

  const [showAll, setShowAll] = useState(false);
  const [statement, setStatement] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState(null); // Initialize as null 

  useEffect(() => {
    getCustomerStatement().then((res) => {
      if (res.success) {
        setStatement(Array.isArray(res.data) ? res.data : []);
      } else {
        console.log(res.message);
        setStatement([]);
      }
    }).catch((err) => {
      console.error("Error fetching statement:", err);
      setStatement([]);
    });
  }, []);


  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApplyFilter = () => {
    const safeStatement = Array.isArray(statement) ? statement : [];
    const filtered = statement.filter((txn) => {
      const txnDate = new Date(txn.createdAt).toISOString().split('T')[0];
      const isAfterFromDate = filters.fromDate ? txnDate >= filters.fromDate : true;
      const isBeforeToDate = filters.toDate ? txnDate <= filters.toDate : true;
      const matchesType = filters.transactionType
        ? txn.transactionType?.toLowerCase() === filters.transactionType.toLowerCase()
        : true;

      return isAfterFromDate && isBeforeToDate && matchesType;
    });

    setFilteredTransactions(filtered);
    setShowAll(false);
  };

  // Determine which transactions to display
  const displayTransactions = showAll
    ? filteredTransactions || []
    : (filteredTransactions || []).slice(0, 10);

  return (
    <div className="space-y-6 text-[#0B2E53] bg-[#FDFCF9] p-4 min-h-screen">
      {/* Filters */}
      <div className="bg-white p-4 shadow-md rounded space-y-4 border border-[#0B2E53]/10">
        <h2 className="text-xl font-semibold text-center">Transaction Filter</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium">From Date</label>
            <input
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleChange}
              className="w-full border border-[#0B2E53] p-2 rounded focus:ring-2 focus:ring-[#C89D2A]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">To Date</label>
            <input
              type="date"
              name="toDate"
              value={filters.toDate}
              onChange={handleChange}
              className="w-full border border-[#0B2E53] p-2 rounded focus:ring-2 focus:ring-[#C89D2A]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Transaction Type</label>
            <select
              name="transactionType"
              value={filters.transactionType}
              onChange={handleChange}
              className="w-full border border-[#0B2E53] p-2 rounded focus:ring-2 focus:ring-[#C89D2A]"
            >
              <option value="">All</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={handleApplyFilter}
            className="bg-[#C89D2A] text-white px-4 py-2 rounded hover:bg-[#0B2E53]"
          >
            Apply Filter
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-4 shadow-md rounded border border-[#0B2E53]/10">
        <h2 className="text-lg font-semibold mb-4">Transactions</h2>

        {filteredTransactions === null ? (
          <p className="text-sm text-gray-500 text-center">
            Please apply filters to view transactions
          </p>
        ) : displayTransactions.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">
            No transactions found for the selected filters
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-[#0B2E53] text-sm">
              <thead>
                <tr className="bg-[#0B2E53] text-white">
                  <th className="border border-[#0B2E53] px-4 py-2 text-left">Date</th>
                  <th className="border border-[#0B2E53] px-4 py-2 text-left">Type</th>
                  <th className="border border-[#0B2E53] px-4 py-2 text-left">Description</th>
                  <th className="border border-[#0B2E53] px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {displayTransactions.map((txn, idx) => (
                  <tr
                    key={idx}
                    className="odd:bg-white even:bg-blue-50 text-[#0B2E53]"
                  >
                    <td className="border border-[#0B2E53] px-4 py-2">{txn.createdAt.split('T')[0]}</td>
                    <td className="border border-[#0B2E53] px-4 py-2">{txn.transactionType}</td>
                    <td className="border border-[#0B2E53] px-4 py-2">{txn.description}</td>
                    <td className="border border-[#0B2E53] px-4 py-2 text-right">
                      {(txn.transactionType === "CREDIT" ? "+" : "-") + "₹" + txn.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredTransactions && filteredTransactions.length > 10 && !showAll && (
          <div className="text-right mt-4">
            <button
              onClick={() => setShowAll(true)}
              className="text-[#C89D2A] underline text-sm hover:text-[#0B2E53]"
            >
              Show more transactions
            </button>
          </div>
        )}
      </div>

      {/* Future Download */}
      {filteredTransactions && (
        <div className="text-right">
          <button className="bg-[#C89D2A] text-white px-4 py-2 rounded opacity-60 cursor-not-allowed">
            Download PDF (Coming Soon)
          </button>
        </div>
      )}
    </div>
  );
};

export default Statements;