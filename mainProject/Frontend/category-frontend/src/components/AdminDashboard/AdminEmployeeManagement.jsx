import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, getAdminEmployee } from "../../services/userService";
import { toast } from "react-toastify";

const EmployeeManagement = () => {
  const [searchName, setSearchName] = useState("");
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [employees, setEmployees] = useState([]);

  // Function to fetch all customers
    const fetchEmployee = () => {
      getAdminEmployee()
        .then((res) => {
          setEmployees(res); // use .data if axios response
        })
        .catch((err) => {
          console.error("Error fetching employees:", err);
        });
    };
  useEffect(() => {
    fetchEmployee();
  }, []);

  const filteredEmployees = (employees || []).filter(
    (emp) =>
      emp.firstName?.toLowerCase().includes(searchName.toLowerCase()) &&
      (emp.govtId ? emp.govtId.includes(searchId) : false)
  );

  const handleDelete = async (empId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      // Add your delete API call here
      const res = await deleteEmployee(empId);
      if (res.status == 200) {
        fetchEmployee();
        console.log("employee deleted");
      } else {
        toast.error("error");
      }
      alert("Employee deleted successfully");
    }
  };

  const handleAddEmployee = () => {
    navigate("/employeesignup");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-[#FDFCF9] min-h-screen p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-[#0B2E53] mb-6 text-center border-b pb-2">
          Employee Management
        </h2>

        <div className="flex justify-center items-center my-6">
          <button
            className="bg-[#0B2E53] text-white px-6 py-2 rounded hover:bg-[#08213D] transition-all"
            onClick={handleAddEmployee}
          >
            Add Employee
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border border-[#C89D2A] rounded px-3 py-2 focus:ring-2 focus:ring-[#C89D2A] focus:outline-none"
          />
          <input
            type="text"
            placeholder="Search by Employee Govt ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="border border-[#C89D2A] rounded px-3 py-2 focus:ring-2 focus:ring-[#C89D2A] focus:outline-none"
          />
        </div>

        {filteredEmployees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((emp, index) => (
              <div
                key={emp.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-[#0B2E53]">
                        {emp.firstName} {emp.lastName}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        S.No.: {index + 1}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${emp.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                        }`}
                    >
                      {emp.status || "UNKNOWN"}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-[#C89D2A] mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-gray-700">
                        {emp.email || "Email not provided"}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-[#C89D2A] mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="text-gray-700">
                        {emp.phoneNumber || "Phone not provided"}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-[#C89D2A] mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-gray-700">
                        DOB: {formatDate(emp.dob)}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-[#C89D2A] mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Govt ID: {emp.govtId || "Not provided"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <svg
              className="w-16 h-16 mx-auto text-[#C89D2A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-4 text-lg font-medium text-[#0B2E53]">
              No matching employees found
            </p>
            <p className="text-gray-600">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeManagement;