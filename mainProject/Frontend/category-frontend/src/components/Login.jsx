import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService";
import { AuthContext } from "../AuthContext/auth.context";
import { Lock, User } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setUserRole } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);

      if (response.token) {
        toast.success(`Logged in as ${email}`);
        sessionStorage.setItem("jwt", response.token);
        sessionStorage.setItem("role", response.role);

        setUser({ token: response.token, role: response.role });
        setUserRole(response.role);

        // ✅ Set Axios default header immediately
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
        if (response.role === "ROLE_ADMIN") {
          navigate("/admindashboard");
        } else if (response.role === "ROLE_EMPLOYEE") {
          navigate("/employeedashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error(response.message || "Login failed. Check credentials.");
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);

    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] py-10 px-4 text-[#0B2E53] font-sans flex justify-center items-center">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-[#0B2E53]/20 px-10 py-12">
        <h2 className="text-3xl font-bold text-center text-[#0B2E53] mb-10">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              <User className="w-4 h-4 inline-block mr-1" /> Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              <Lock className="w-4 h-4 inline-block mr-1" /> Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0B2E53] text-white font-semibold py-2 rounded-lg hover:bg-[#143c6b] transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
