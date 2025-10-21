// src/components/Dashboard/MainContent.js
import React from "react";
import SearchFilterTransactions from "../EmployeeDashBoard/SearchFilterTransactions";
import CustomersManagement from "./AdminCustomerManagement";
import EmployeeManagement from "./AdminEmployeeManagement";
import TransactionManagement from "./AdminTransactionManagement";
// import UserDataManagement from "./AdminDataManagement";
import RatesManagement from "./AdminDataManagement";

const MainContent = ({ selected }) => {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      {selected === "Transaction Status & Management" && (
        <TransactionManagement />
      )}
      {/* Add: `else if` for other options like Loan, Statements etc later */}
      {selected === "Customer Management" && <CustomersManagement />}
      {selected === "Transaction Management" && <SearchFilterTransactions />}
      {selected === "Employee Management" && <EmployeeManagement />}
      {selected === "Data Updation and Maintenance" && <RatesManagement />}
    </div>
  );
};

export default MainContent;
