import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/Home";
import LoginPage from "./components/Login";
import Signup from "./components/Signup";
import CustomerDashboard from "./components/Dashboard/Dashbord";
import EmployeeDashboard from "./components/EmployeeDashBoard/Dashbord";
import AdminDashboard from "./components/AdminDashboard/Dashbord";
import EmployeeSignup from "./components/EmployeeSignup";
import CustomerProfile from "./components/Profilepages/CustomerProfile";
import UpdateCustomerProfile from "./components/Profilepages/CustomerEditProfile";
import { AuthContext } from "./AuthContext/auth.context";
import { useState } from "react";
import EmployeeEditProfile from "./components/Profilepages/EmployeeEditProfile";
import EmployeeProfile from "./components/Profilepages/EmployeeProfile";
import Unauthorized from "./components/UI/Unauthorized";
import NotFound from "./components/UI/Notfound";
import RoleBasedRoute from "./components/UI/RolebasedRoute";

function App() {
  const [user, setUser] = useState(() => {
  const token = sessionStorage.getItem("jwt");
  const role = sessionStorage.getItem("role");
  return token && role ? { token, role } : null;
});
const [userRole, setUserRole] = useState(() => sessionStorage.getItem("role"));


  return (
    <>
      <AuthContext.Provider value={{ user, setUser, userRole, setUserRole }}>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <div className="flex-1 bg-richblack-900">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<LoginPage />} />

              {/* CUSTOMER Routes */}
              <Route
                path="/customerprofile"
                element={
                  <RoleBasedRoute
                    element={<CustomerProfile />}
                    allowedRoles={["ROLE_CUSTOMER"]}
                    userRole={userRole}
                  />
                }
              />
              <Route
                path="/customereditprofile"
                element={
                  <RoleBasedRoute
                    element={<UpdateCustomerProfile />}
                    allowedRoles={["ROLE_CUSTOMER"]}
                    userRole={userRole}
                  />
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RoleBasedRoute
                    element={<CustomerDashboard />}
                    allowedRoles={["ROLE_CUSTOMER"]}
                    userRole={userRole}
                  />
                }
              />

              {/* EMPLOYEE Routes */}
              <Route
                path="/employeeprofile"
                element={
                  <RoleBasedRoute
                    element={<EmployeeProfile />}
                    allowedRoles={["ROLE_EMPLOYEE"]}
                    userRole={userRole}
                  />
                }
              />
              <Route path="/employeesignup" element={
                <RoleBasedRoute
                    element={<EmployeeSignup />}
                    allowedRoles={["ROLE_ADMIN"]}
                    userRole={userRole}
                  />} />
              <Route
                path="/employeeeditprofile"
                element={
                  <RoleBasedRoute
                    element={<EmployeeEditProfile />}
                    allowedRoles={["ROLE_EMPLOYEE"]}
                    userRole={userRole}
                  />
                }
              />
              <Route
                path="/employeedashboard"
                element={
                  <RoleBasedRoute
                    element={<EmployeeDashboard />}
                    allowedRoles={["ROLE_EMPLOYEE"]}
                    userRole={userRole}
                  />
                }
              />

              <Route
                path="/admindashboard"
                element={
                  <RoleBasedRoute
                    element={<AdminDashboard />}
                    allowedRoles={["ROLE_ADMIN"]}
                    userRole={userRole}
                  />
                }
              />

              {/* Unauthorized & 404 */}
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </AuthContext.Provider>

      <ToastContainer />
    </>
  );
}

export default App;
