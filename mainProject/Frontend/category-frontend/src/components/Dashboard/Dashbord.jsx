// src/pages/CustomerDashboard.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const CustomerDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('Dashboard');

  return (
    <div className="flex min-h-screen">
      <Sidebar selected={selectedOption} setSelected={setSelectedOption} />
      <MainContent selected={selectedOption} />
    </div>
  );
};

export default CustomerDashboard;
