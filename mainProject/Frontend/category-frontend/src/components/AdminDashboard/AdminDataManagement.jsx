import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../config";
import { toast } from "react-toastify";

const RatesManagement = () => {
  const [rates, setRates] = useState({ loanRates: [], fdRates: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const res = await axios.get(`${config.serverURL}/admin/rates`); // adjust baseURL if needed
      setRates(res.data);
      setLoading(false);
    } catch (err) {
      // console.error("Failed to fetch rates", err);
      toast.error("Unable to fetch data!!");
    }
  };

  const handleRateChange = (type, index, key, value) => {
    const updated = [...rates[type]];
    updated[index][key] = value;
    setRates({ ...rates, [type]: updated });
  };

  const handleSave = async () => {
    try {
      await axios.put(`${config.serverURL}/admin/rates`, rates);
      //alert("Rates updated successfully!");
      fetchRates();
      console.log("Data updated successfully!!");
    } catch (err) {
      console.error("Failed to update rates", err);
      // alert("Error updating rates.");
      console.log("Data updation failed!!");
    }
  };

  if (loading) return <p>Loading rates...</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-[#0B2E53] mb-4">
        Bank Rates Management
      </h2>

      {/* Loan Rates */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[#C89D2A] mb-2">
          Loan Rates
        </h3>
        {rates.loanRates.map((rate, idx) => (
          <div key={idx} className="flex gap-4 mb-2">
            <input
              className="border p-2 w-1/2"
              value={rate.type}
              onChange={(e) =>
                handleRateChange("loanRates", idx, "type", e.target.value)
              }
            />
            <input
              className="border p-2 w-1/2"
              value={rate.rate}
              onChange={(e) =>
                handleRateChange("loanRates", idx, "rate", e.target.value)
              }
            />
          </div>
        ))}
      </div>

      {/* FD Rates */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[#C89D2A] mb-2">FD Rates</h3>
        {rates.fdRates.map((rate, idx) => (
          <div key={idx} className="flex gap-4 mb-2">
            <input
              className="border p-2 w-1/2"
              value={rate.term}
              onChange={(e) =>
                handleRateChange("fdRates", idx, "term", e.target.value)
              }
            />
            <input
              className="border p-2 w-1/2"
              value={rate.rate}
              onChange={(e) =>
                handleRateChange("fdRates", idx, "rate", e.target.value)
              }
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default RatesManagement;
