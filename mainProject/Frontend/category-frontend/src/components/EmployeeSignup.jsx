import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addNewEmployee, addNewUser  } from "../services/userService";

function EmployeeSignup() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNo: "",
    dob: "",
    gender: "",
    govtIdType: "",
    govtId: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const {
      email,
      firstName,
      lastName,
      phoneNo,
      dob,
      gender,
      govtIdType,
      govtId,
      password,
      confirmPassword,
    } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validations
    if (!firstName || !lastName) {
      toast.warn("First and last name are required");
    } else if (!emailRegex.test(email)) {
      toast.warn("Enter a valid email");
    } else if (!mobileRegex.test(phoneNo)) {
      toast.warn("Enter a valid 10-digit mobile number");
    } else if (!dob) {
      toast.warn("Date of birth is required");
    } else if (!gender) {
      toast.warn("Please select gender");
    } else if (!govtIdType) {
      toast.warn("Please select government ID type");
    } else if (!govtId) {
      toast.warn("Please enter government ID number");
    } else if (!passwordRegex.test(password)) {
      toast.warn(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      );
    } else if (password !== confirmPassword) {
      toast.warn("Passwords do not match");
    } else {
      const userObj = {
        email,
        firstName,
        lastName,
        phoneNumber : phoneNo,
        dob,
        gender,
        govtIdType,
        govtId,
        password,
      };

      try {
        console.log(userObj)
        const result = await addNewEmployee(userObj);
        console.log(result);
        if (result.status == 201) {
          toast.success("Employee registered successfully");
          navigate("/admindashboard");
        }else if (result.status == 409) {
          console.log(result.response.data.error);
        } else {
          console.log("Registration failed");
        }
      } catch (err) {
        console.log("Employee already exist with email");
        // toast.error("Error during registration");
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#0B2E53]">
        Employee Sign Up
      </h2>
      <form onSubmit={handleSignUp} className="space-y-4">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="phoneNo"
          value={formData.phoneNo}
          onChange={handleInputChange}
          placeholder="Phone Number"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <select
          name="govtIdType"
          value={formData.govtIdType}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Government ID Type</option>
          <option value="AADHAR">Adhaar card</option>
        </select>
        <input
          type="text"
          name="govtId"
          value={formData.govtId}
          onChange={handleInputChange}
          placeholder="Government ID Number"
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-[#0B2E53] text-white py-2 px-4 rounded hover:bg-[#C89F3D] transition"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default EmployeeSignup;
