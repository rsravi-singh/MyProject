// src/components/Navbar.js
import { useContext } from "react";
import ProfileDropdown from "./UI/ProfileDown";
import RSROBank from "../assets/Images/RSROBank.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext/auth.context";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const role = sessionStorage.getItem("role");

  const hiddenRoutes = ["/", "/login", "/signup"];
  const shouldHideDropdown = hiddenRoutes.includes(location.pathname);

  return (
    <nav className="bg-[#0B2E53] text-white px-6 py-3 shadow-md flex items-center justify-between no-underline">
      <div className="text-xl font-bold tracking-wide">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="text-white d-flex">
            <img
              src={RSROBank}
              alt=""
              style={{
                width: "7%",
                borderRadius: "50%",
                height: "5%",
              }}
            />
            <span style={{ padding: "5px" }}> RSRO Bank</span>
          </div>
        </Link>
      </div>
      <div className="space-x-4 text-sm">
        {!user && (
          <Link to="/login" className="hover:underline text-white">
            Login
          </Link>
        )}
        {!user && (
          <Link to="/signup" className="hover:underline text-white">
            Sign Up
          </Link>
        )}
        {user && (
          <>
            {role === 'ROLE_ADMIN' && (
              <Link to="/admindashboard" className="hover:underline text-white">
                Admin Dashboard
              </Link>
            )}
            {role === 'ROLE_CUSTOMER' && (
              <Link to="/dashboard" className="hover:underline text-white">
                Dashboard
              </Link>
            )}
            {role === 'ROLE_EMPLOYEE' && (
              <Link to="/employeedashboard" className="hover:underline text-white">
                Employee Dashboard
              </Link>
            )}
          </>
        )}
        {user && <ProfileDropdown />}
      </div>
    </nav>
  );
};

export default Navbar;
