import React, { useEffect, useState } from 'react';
import { getPendingCustomer, verifyCustomer } from '../../services/userService';
import { toast } from 'react-toastify';

const SearchFilterRequests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState([]);

  const fetchRequests = () => {
    getPendingCustomer()
      .then((response) => {
        if (response && response.data) {
          setCustomers(Array.isArray(response.data) ? response.data : []);
        } else {
          console.warn("Unexpected API response structure");
          setCustomers([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
        setCustomers([]);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleVerify = async (id) => {
    const res = await verifyCustomer(id);
    if (res.status == 200) {
      console.log(`Customer verified successfully`);
      fetchRequests();
    } else {
      toast.error(res.message);
    }
  };

  const filteredCustomers = customers.filter((cust) => {
    const fullName = `${cust.firstName} ${cust.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      cust.id.toString().includes(searchQuery)
    );
  });

  return (
    <div className="bg-[#FDFCF9] min-h-screen p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-[#0B2E53] mb-6">
          Pending Customer Verification
        </h2>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by Name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-[#C89D2A] rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
        </div>

        {/* Customer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((cust) => (
              <div
                key={cust.id}
                className="bg-white border border-gray-200 rounded-xl shadow-md p-4 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-[#0B2E53] mb-2">
                    {cust.firstName} {cust.lastName}
                  </h3>
                  <p className="text-sm text-gray-700">ID: {cust.id}</p>
                  <p className="text-sm text-gray-700">DOB: {cust.dob}</p>
                  <p className="text-sm text-gray-700">Gender: {cust.gender}</p>
                  <p className="text-sm text-gray-700">
                    Phone: {cust.phoneNumber}
                  </p>
                  <p className="text-sm text-gray-700">
                    Nationality: {cust.nationality}
                  </p>
                  <p className="text-sm text-gray-700">Photo ID: {cust.photoId}</p>
                  <p className="text-sm text-gray-700">Govt Id Photo</p>
                  {cust.photo && (
                    <div className="md:col-span-2">
                      <img
                        src={`data:image/png;base64,${cust.photo}`}
                        alt="govt photo id"
                        className="w-40 h-40 object-cover rounded shadow border"
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleVerify(cust.id)}
                  className="mt-4 bg-[#0B2E53] text-white px-4 py-2 rounded hover:bg-[#08213D] transition"
                >
                  Verify
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No customers found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilterRequests;
