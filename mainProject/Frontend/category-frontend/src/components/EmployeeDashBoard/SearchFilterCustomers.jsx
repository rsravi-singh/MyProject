import React, { useEffect, useState } from "react";
import { getAdminCustomer, getEmployeeCustomer } from "../../services/userService";
import { toast } from "react-toastify";

const CustomersManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [modalType, setModalType] = useState(null);

  
  useEffect(() => {
  getEmployeeCustomer()
    .then((res) => {
      const data = Array.isArray(res?.data ?? res) ? (res.data ?? res) : []; 
      setCustomers(data); // ✅ always array
    })
    .catch((err) => {
      console.error("Error fetching employee customers:", err);
      setCustomers([]); // fallback to empty list
    });
}, []);

  const openModal = (customer, type) => {
    setSelectedData(customer);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedData(null);
    setModalType(null);
  };

  return (
    <div className="bg-[#FDFCF9] min-h-screen p-6 font-sans">
      <h2 className="text-2xl font-bold text-[#0B2E53] mb-6 text-center border-b pb-2">
        Employee: Customer Management
      </h2>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer, index) => (
          <div
            key={customer.id}
            className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition duration-300 border border-[#C89D2A]"
          >
            <h3 className="text-lg font-semibold text-[#0B2E53]">
              {customer.firstName} {customer.lastName}
            </h3>
            <p className="text-sm text-gray-600">S. No. {index + 1}</p>
            <p className="text-sm text-gray-600">{customer.email}</p>
            <p className="text-sm text-gray-600">Phone: {customer.phoneNumber}</p>
            <p className="text-sm text-gray-600">Date of Birth: {customer.dob}</p>
            <p className="text-sm text-gray-600">Gender: {customer.gender}</p>
            <p className="text-sm text-gray-600">Nationality: {customer.nationality}</p>
            <p className="text-sm text-gray-600">Govt Id no : {customer.photoId}</p>
            <p className="text-sm text-gray-600">Status : {customer.status}</p>
            <p className="text-sm text-gray-700">Govt Id Photo</p>
            {customer.photo && (
              <div className="md:col-span-2">
                <img
                  src={`data:image/png;base64,${customer.photo}`}
                  alt="govt photo id"
                  className="w-40 h-40 object-cover rounded shadow border"
                />
              </div>
            )}
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => openModal(customer, "account")}
                className="bg-[#0B2E53] text-white px-4 py-1 rounded hover:bg-[#08213D] transition"
              >
                See Account Details
              </button>
              <button
                onClick={() => openModal(customer, "card")}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
              >
                See Card Details
              </button>
              <button
                onClick={() => openModal(customer, "address")}
                className="bg-[#C89D2A] text-white px-4 py-1 rounded hover:bg-[#A77E20] transition"
              >
                See Address Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedData && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Content */}
            <h2 className="text-xl font-bold text-[#0B2E53] mb-4">
              {modalType === "account" && "Account Details"}
              {modalType === "card" && "Card Details"}
              {modalType === "address" && "Address Details"}
            </h2>

            {modalType === "account" && selectedData.account && (
              <ul className="text-gray-700 space-y-2">
                <li>Account Number: {selectedData.account.accountNumber}</li>
                <li>Balance: ₹{selectedData.account.balance}</li>
                <li>Status: {selectedData.account.status}</li>
              </ul>
            )}

            {modalType === "card" && selectedData.carddetail && (
              <ul className="text-gray-700 space-y-2">
                <li>Card Number: {selectedData.carddetail.cardNumber}</li>
                <li>Expiry: {selectedData.carddetail.expiry}</li>
                <li>CVV: {selectedData.carddetail.cvv}</li>
                <li>Type: {selectedData.carddetail.type}</li>
              </ul>
            )}

            {modalType === "address" && selectedData.address && (
              <ul className="text-gray-700 space-y-2">
                <li>Address: {selectedData.address.adrLine1}, {selectedData.address.adrLine2}</li>
                <li>City: {selectedData.address.city}</li>
                <li>State: {selectedData.address.state}</li>
                <li>Country: {selectedData.address.country}</li>
                <li>Pin Code: {selectedData.address.pinCode}</li>
              </ul>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersManagement;
