import React from "react";
import { useNavigate } from "react-router-dom";

function Herosection() {
  const navigate = useNavigate();
  return (
    <div className="mt-12 bg-[#F9F7F2]">
      <h1 className="text-center mt-4 p-4">Welcome to RSRO Bank</h1>
      <div className="flex justify-center items-center gap-4 p-2 mb-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-[#0B2E53] hover:bg-[#C89D2A] text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-[#0B2E53] hover:bg-[#C89D2A] text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Herosection;
