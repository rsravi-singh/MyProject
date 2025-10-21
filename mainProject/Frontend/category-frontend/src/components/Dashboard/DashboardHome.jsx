import React, { useEffect, useState } from "react";
import MiniStatement from "./MiniStatement";
import { getCustomerDashBoardDetailByUserId } from "../../services/userService";

const DashboardHome = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getCustomerDashBoardDetailByUserId();
        if (res.success) {
          setUserData(res.data);
          console.log("Fetched user data successfully");
        } else {
          console.log(res.message);
        }
      } catch (err) {
        console.log("Unexpected error occurred");
        console.error(err);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* User Info + Card */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* User Info */}
        <div className="bg-[#FDFCF9] p-4 shadow-md rounded w-full md:w-1/2 text-sm sm:text-base">
          <p>Full Name: {userData.fullName || "Loading..."}</p>
          <p>Account Number: {userData.accountNo || "Loading..."}</p>
          <p>Account Balance: {userData.balance || "Loading..."}</p>
          <p>Email: {userData.email || "Loading..."}</p>
          <p>Mobile: +91-{userData.mobile || "Loading..."}</p>
        </div>

        {/* Card */}
        <div className="bg-white p-3 sm:p-4 shadow-md rounded w-full md:max-w-md mx-auto group perspective">
          <div className="relative w-full h-48 sm:h-56 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            
            {/* Front Side */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl text-white p-4 sm:p-6 [backface-visibility:hidden] flex flex-col justify-between">
              <div className="flex justify-between text-xs sm:text-sm">
                <p>Debit Card</p>
                <p>RSRO Bank</p>
              </div>
              <div className="text-lg sm:text-2xl font-mono tracking-widest break-all">
                {userData?.card?.cardNumber || "---- ---- ---- XXXX"}
              </div>
              <div className="flex justify-between text-xs sm:text-sm mt-2 sm:mt-4">
                <div>
                  <div className="opacity-70">Card Holder</div>
                  <div className="font-semibold">
                    {userData?.card ? userData.fullName : "---- ----"}
                  </div>
                </div>
                <div>
                  <div className="opacity-70">Valid Thru</div>
                  <div className="font-semibold">
                    {userData?.card?.expiry || "----"}
                  </div>
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl text-white p-4 sm:p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between">
              <div className="flex justify-between text-xs sm:text-sm">
                <p>Debit Card</p>
                <p>RSRO Bank</p>
              </div>
              <div className="w-full mt-2 sm:mt-4">
                <div className="opacity-70">CVV</div>
                <p>{userData?.card?.cvv || "----"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Statement */}
      <MiniStatement transactions={userData.transaction || []} />
    </div>
  );
};

export default DashboardHome;
