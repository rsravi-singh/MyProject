import React, { useEffect, useState } from "react";
import { activateCustomer, deleteCustomer, getAdminCustomer } from "../../services/userService";
import { toast } from "react-toastify";

const CustomersManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [modalType, setModalType] = useState(null);

  const fetchCustomers = () => {
    getAdminCustomer()
      .then((res) => {
        const data = res?.data;
        setCustomers(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching customers:", err);
        setCustomers([]);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (custId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const res = await deleteCustomer(custId);
        if (res.status === 200) {
          toast.success("Customer deleted successfully");
          fetchCustomers();
        } else {
          toast.error("Failed to delete customer");
        }
      } catch (err) {
        console.error("Error deleting customer:", err);
        toast.error("Error deleting customer");
      }
    }
  };

  const handleActivate = async (custId) => {
    if (window.confirm("Are you sure you want to activate this customer?")) {
      try {
        const res = await activateCustomer(custId);
        if (res.status === 200) {
          toast.success("Customer activated successfully");
          fetchCustomers();
        } else {
          toast.error("Failed to activate customer");
        }
      } catch (err) {
        console.error("Error activate customer:", err);
        toast.error("Error activate customer");
      }
    }
  };

  const openModal = (customer, type) => {
    setSelectedData(customer);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedData(null);
    setModalType(null);
  };

  return (
    <div className="bg-[#FDFCF9] min-h-screen p-4 sm:p-6 font-sans">
      <h2 className="text-xl sm:text-2xl font-bold text-[#0B2E53] mb-4 sm:mb-6 text-center border-b pb-2">
        Admin: Customer Management
      </h2>

      {customers.length === 0 ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-gray-500 text-base sm:text-lg">No customers found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {customers.map((customer, index) => (
            <div
              key={customer.id}
              className="bg-white p-4 sm:p-5 rounded-lg shadow hover:shadow-lg transition duration-300 border border-[#C89D2A]"
            >
              <h3 className="text-lg font-semibold text-[#0B2E53] break-words">
                {customer.firstName} {customer.lastName}
              </h3>
              <p className="text-sm text-gray-600">S. No. {index + 1}</p>
              <p className="text-sm text-gray-600 break-words">{customer.email}</p>
              <p className="text-sm text-gray-600">Phone: {customer.phoneNumber}</p>
              <p className="text-sm text-gray-600">DOB: {customer.dob}</p>
              <p className="text-sm text-gray-600">Gender: {customer.gender}</p>
              <p className="text-sm text-gray-600">Nationality: {customer.nationality}</p>
              <p className="text-sm text-gray-600">Govt Id: {customer.photoId}</p>
              <p className="text-sm text-gray-600">Status: {customer.status}</p>

              <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-2">
                <button
                  onClick={() => openModal(customer, "account")}
                  className="flex-1 bg-[#0B2E53] text-white px-4 py-1 rounded hover:bg-[#08213D] transition"
                >
                  Account
                </button>
                <button
                  onClick={() => openModal(customer, "card")}
                  className="flex-1 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                >
                  Card
                </button>
                <button
                  onClick={() => openModal(customer, "address")}
                  className="flex-1 bg-[#C89D2A] text-white px-4 py-1 rounded hover:bg-[#A77E20] transition"
                >
                  Address
                </button>
                {customer.status === "ACTIVE" ? (
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="flex-1 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={() => handleActivate(customer.id)}
                    className="flex-1 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                  >
                    Activate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedData && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg sm:text-xl font-bold text-[#0B2E53] mb-4">
              {modalType === "account" && "Account Details"}
              {modalType === "card" && "Card Details"}
              {modalType === "address" && "Address Details"}
            </h2>

            <div className="text-gray-700 space-y-2 text-sm sm:text-base">
              {modalType === "account" && selectedData.account && (
                <>
                  <p>Account Number: {selectedData.account?.accountNumber || "N/A"}</p>
                  <p>Balance: ₹{selectedData.account?.balance ?? "N/A"}</p>
                  <p>Status: {selectedData.account?.status || "N/A"}</p>
                </>
              )}
              {modalType === "card" && selectedData.carddetail && (
                <>
                  <p>Card Number: {selectedData.carddetail?.cardNumber || "N/A"}</p>
                  <p>Expiry: {selectedData.carddetail?.expiry || "N/A"}</p>
                  <p>CVV: {selectedData.carddetail?.cvv || "N/A"}</p>
                  <p>Type: {selectedData.carddetail?.type || "N/A"}</p>
                </>
              )}
              {modalType === "address" && selectedData.address && (
                <>
                  <p>
                    Address: {selectedData.address?.adrLine1 || "N/A"},{" "}
                    {selectedData.address?.adrLine2 || ""}
                  </p>
                  <p>City: {selectedData.address?.city || "N/A"}</p>
                  <p>State: {selectedData.address?.state || "N/A"}</p>
                  <p>Country: {selectedData.address?.country || "N/A"}</p>
                  <p>Pin Code: {selectedData.address?.pincode || "N/A"}</p>
                </>
              )}
            </div>

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
