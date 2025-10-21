// src/pages/CustomerDashboard.jsx
import React, { useState } from "react";

import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Transaction Status & Management");

  return (
    <div className="flex min-h-screen">
      <Sidebar selected={selectedOption} setSelected={setSelectedOption} />
      <MainContent selected={selectedOption} />
    </div>
  );
};

export default AdminDashboard;
