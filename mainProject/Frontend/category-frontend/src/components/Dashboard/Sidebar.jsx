// src/components/Dashboard/Sidebar.js
import React from "react";

const options = [
  "Dashboard",
  "Statements",
  "Send Money",
  "Manage Cards",
];

const Sidebar = ({ selected, setSelected }) => {
  return (
    <div
      className=" w-1/4 bg-[#F9F7F2] border-r border-[#0B2E53] p-4 space-y-2 text-[#0B2E53]"
      style={{ minHeight: "100vh" }}
    >
      {options.map((option) => (
        <button
          key={option}
          className={`w-full py-2 px-3 text-left border text-[#0B2E53] shadow-md rounded mt-4 border-[#0B2E53]
              ${
                selected === option ? "bg-[#0B2E53] text-white shadow-md" : ""
              }`}
          onClick={() => setSelected(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
