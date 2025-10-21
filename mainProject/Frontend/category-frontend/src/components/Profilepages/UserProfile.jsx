import React, { useState } from "react";
import {
  User,
  Calendar,
  Users,
  Flag,
  Image,
  MapPin,
  Phone,
  Mail,
  Lock,
  Shield,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addNewUser } from "../services/userService";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    photo: null,
    photoId: "",
    address: "",
    mobileNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    captcha: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

 
  const generateCaptcha = () =>
    Math.random().toString(36).substring(2, 8).toUpperCase();

  const [captchaValue, setCaptchaValue] = useState(generateCaptcha());
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, photo: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        photo: e.target.files[0],
      }));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("Sign up attempted with:", formData);
    const nameRegex = /^[A-Za-z]+$/;
    const mobileRegex = /^\d{10}$/;
    const pincodeRegex = /^\d{6}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const today = new Date();
    const enteredDOB = new Date(formData.dateOfBirth);

    if (!formData.firstName.trim().match(nameRegex)) {
    toast.warn("First name must contain only alphabets");
    } else if (!formData.lastName.trim().match(nameRegex)) {
      toast.warn("Last name must contain only alphabets");
    } else if (!formData.dateOfBirth) {
      toast.warn("Please enter date of birth");
    } else if (enteredDOB >= today) {
      toast.warn("Date of birth must be in the past");
    } else if (!formData.gender) {
      toast.warn("Please select gender");
    } else if (!formData.nationality.trim().match(nameRegex)) {
      toast.warn("Nationality must contain only alphabets");
    } else if (!formData.city.trim().match(nameRegex)) {
      toast.warn("city must contain only alphabets");
    }else if (!formData.state.trim().match(nameRegex)) {
      toast.warn("state must contain only alphabets");
    } else if (!formData.country.trim().match(nameRegex)) {
      toast.warn("country must contain only alphabets");
    }else if (!formData.pinCode.trim().match(pincodeRegex)) {
      toast.warn("pincode must be number and six digits");
    } else if (!formData.photo) {
      toast.warn("Please upload photo ID");
    } else if (formData.photoId.trim().length === 0) {
      toast.warn("Please enter photo ID");
    } else if (!formData.mobileNo.trim().match(mobileRegex)) {
      toast.warn("Mobile number must be in format +91-XXXXXXXXXX");
    } else if (!formData.email.trim().match(emailRegex)) {
      toast.warn("Please enter a valid email ID");
    } else if (!formData.password.match(passwordRegex)) {
      toast.warn(
        "Password must be at least 8 characters with uppercase, lowercase, number and special character"
      );
    } else if (formData.password !== formData.confirmPassword) {
      toast.warn("Passwords do not match");
    } else if (!formData.termsAccepted) {
      toast.warn("Please accept the terms and conditions");
    } else if (!formData.captcha || formData.captcha !== captchaValue) {
      toast.warn("Captcha does not match");
    } else {
      const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        nationality,
        photo,
        photoId,
        city,
        state,
        country,
        pinCode,
        mobileNo,
        email,
        password,
      } = formData;

      const addressObj = {
        city,
        state,
        country,
        pinCode,
      };

      const userobj = {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        nationality,
        photoId,
        phoneNumber: mobileNo,
        email,
        password,
        address: addressObj,
      };

      // Create FormData object
      const userdb = new FormData();
      userdb.append("filedata", JSON.stringify(userobj));
      userdb.append("image", photo);
      // Call the registerUser function
      try {
        const result = await addNewUser(userdb);
        console.log("result in signup page ",result);
        if (result && result.message === "Successfully saved.") {
          toast.success("Successfully registered a user");
          navigate("/login");
        } else {
          console.log("Error while registering the user");
        }
      } catch (error) {
        console.log("error occured during signup!!");
        toast.error("error occured during signup");
      }
    }
  };

  const handleCancel = () => {
    toast.error("rerrodfs");
    setFormData({
      fullName: "",
      dateOfBirth: "",
      gender: "",
      nationality: "",
      photo: null,
      photoId: "",
      address: "",
      mobileNo: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
      captcha: "",
    });
  };

  const generateNewCaptcha = () => {
    setCaptchaValue(generateCaptcha());
  };

  const onBack = () => {
    // use back stack (which is implemented by browser)
    // -1: previous screen
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] py-10 px-4 text-[#0B2E53] font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-[#0B2E53]/20 px-10 py-12">
        <h1 className="text-3xl font-bold text-center text-[#0B2E53] mb-10">
          Sign Up
        </h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First Name */}
          <div>
            <label className="text-sm font-medium text-[#0B2E53] mb-1 flex items-center gap-2">
              <User className="w-4 h-4" /> First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-[#0B2E53] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C89F3D]"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm font-medium text-[#0B2E53] mb-1 flex items-center gap-2">
              <User className="w-4 h-4" /> Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-[#0B2E53] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C89F3D]"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="text-sm font-medium text-[#0B2E53] mb-1 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-[#0B2E53] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C89F3D]"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium text-[#0B2E53] mb-1 flex items-center gap-2">
              <Users className="w-4 h-4" /> Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-[#0B2E53] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C89F3D]"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Nationality */}
          <div>
            <label className="text-sm font-medium text-[#0B2E53] mb-1 flex items-center gap-2">
              <Flag className="w-4 h-4" /> Nationality
            </label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-[#0B2E53] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C89F3D]"
              required
            />
          </div>

          {/* govtid Photo  */}
          <div>
            <label className="text-sm font-medium text-[#0B2E53] mb-1 flex items-center gap-2">
              <Image className="w-4 h-4" /> Photo
            </label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-2 border border-[#0B2E53] rounded-lg bg-white"
              required
            />
          {imagePreview && (
            <div className="mt-2">
              <p className="text-sm text-[#0B2E53]">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Uploaded Preview"
                className="w-32 h-32 object-cover border rounded"
              />
            </div>
          )}
          </div>

          {/* PhotoId */}
          <div>
            <label className="text-sm font-medium text-[#0B2E53] mb-1 flex items-center gap-2">
              PhotoId
            </label>
            <input
              type="text"
              name="photoId"
              value={formData.photoId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-[#0B2E53] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C89F3D]"
              required
            />
          </div>

          {/* Address */}
          <div>
            <div>
            <label className="text-sm font-medium text-[#0B2E53] mb-1 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-[#0B2E53] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C89F3D]"
              required
            />
            </div>

            <div>
              <label className="text-sm font-medium text-[#0B2E53] mb-1 flex items-center gap-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#0B2E53] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C89F3D]"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#0B2E53] mb-1 flex items-center gap-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#0B2E53] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C89F3D]"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#0B2E53] mb-1 flex items-center gap-2">
                Pin Code
              </label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#0B2E53] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C89F3D]"
                required
              />
            </div>
          </div>


          {/* Mobile Number */}
          <div>
            <label className="text-sm font-medium text-[#0B2E53] mb-1 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Mobile No.
            </label>
            <input
              type="tel"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-[#0B2E53] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C89F3D]"
              required
            />
          </div>

          {/* Email ID */}
          <div>
            <label className="text-sm font-medium text-[#0B2E53] mb-1 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email ID
            </label>
            <input
              type="email"
              name="email"
              value={formData.emailId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-[#0B2E53] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C89F3D]"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-[#0B2E53] mb-1 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-[#0B2E53] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C89F3D]"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-[#0B2E53] mb-1 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-[#0B2E53] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C89F3D]"
              required
            />
          </div>

          {/* Terms and Conditions */}
          <div className="col-span-full flex items-start gap-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
              className="w-4 h-4 mt-1 text-[#0B2E53] border-gray-300 rounded focus:ring-[#C89F3D]"
              required
            />
            <label className="text-sm text-[#0B2E53]">
              I agree to the{" "}
              <span className="text-[#0B2E53] underline cursor-pointer hover:text-[#C89F3D]">
                Terms & Conditions
              </span>
            </label>
          </div>

          {/* Captcha */}
          <div className="col-span-full space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#0B2E53]" />
              <span className="font-medium text-sm">Captcha</span>
            </div>
            <div className="flex items-center justify-between bg-[#FDFCF9] border border-[#0B2E53] rounded-lg px-4 py-2">
              <span className="font-mono font-semibold tracking-widest text-[#0B2E53]">
                {captchaValue}
              </span>
              <button
                type="button"
                onClick={generateNewCaptcha}
                className="text-[#0B2E53] hover:text-[#0B2E53]"
                title="Refresh Captcha"
              >
                <RotateCcw className="w-4 h-4 text-[#C89F3D]" />
              </button>
            </div>
            <input
              type="text"
              name="captcha"
              value={formData.captcha}
              onChange={handleInputChange}
              placeholder="Enter captcha"
              className="w-full px-4 py-2 border border-[#0B2E53] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C89F3D]"
              required
            />
          </div>

          {/* Buttons */}
          <div className="text-sm text-[#0B2E53]">
            Already have an account?{" "}
            <button onClick={onBack} className="text-[#C89F3D] underline hover:text-[#0B2E53]">
              Login here
            </button>
          </div>
          <div className="col-span-full flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={handleSignUp}
              className="flex-1 bg-[#0B2E53] hover:bg-[#C89F3D] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;