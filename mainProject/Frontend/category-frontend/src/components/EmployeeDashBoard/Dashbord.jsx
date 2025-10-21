// src/pages/CustomerDashboard.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const EmployeeDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('Customer Management');

  return (
    <div className="flex min-h-screen">
      <Sidebar selected={selectedOption} setSelected={setSelectedOption} />
      <MainContent selected={selectedOption} />
    </div>
  );
};

export default EmployeeDashboard;
