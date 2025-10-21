import React, { useContext, useEffect, useState } from "react";
import Herosection from "./Herosection";
import Chatbot from "./UI/Chatbot";
import { AuthContext } from "../AuthContext/auth.context";
import { motion } from "framer-motion";

const HomePage = () => {
  // const [loanRates, setLoanRates] = useState([
  //   { type: "Home Loan", rate: "7.5% p.a." },
  //   { type: "Personal Loan", rate: "10.2% p.a." },
  //   { type: "Education Loan", rate: "8.3% p.a." },
  // ]);

  // const [fdRates, setFdRates] = useState([
  //   { term: "1 Year", rate: "6.5% p.a." },
  //   { term: "3 Years", rate: "7.0% p.a." },
  //   { term: "5 Years", rate: "7.5% p.a." },
  // ]);

  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   axios
  //     .get(`${config.serverURL}/admin/rates`)
  //     .then((response) => {
  //       setLoanRates(response.data.loanRates || loanRates);
  //       setFdRates(response.data.fdRates || fdRates);
  //     })
  //     .catch(() => {
  //       console.warn("Using default rates as fallback.");
  //     });
  // }, []);

  const sectionFade = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      {!user && <Herosection />}

      {/* About the Bank */}
      <motion.section
        className="px-6 py-12 bg-white shadow-sm"
        initial="hidden"
        whileInView="visible"
        variants={sectionFade}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-[#0B2E53] mb-4">About Our Bank</h2>
        <p className="text-lg leading-relaxed">
          Welcome to <span className="font-semibold">RSRO Bank</span> – your trusted partner in financial growth.
          We’ve been serving customers for over <span className="text-blue-700">25 years</span> with cutting-edge
          banking solutions, secure digital platforms, and a strong commitment
          to customer satisfaction.
        </p>
      </motion.section>

      {/* Services Offered */}
      <motion.section
        className="px-6 py-12 bg-white shadow-sm"
        initial="hidden"
        whileInView="visible"
        variants={sectionFade}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Digital Banking",
              desc: "24/7 access to your accounts via secure mobile & online banking apps.",
            },
            {
              title: "Personal & Business Loans",
              desc: "Low-interest loans tailored to meet your financial needs.",
            },
            {
              title: "Fixed Deposits",
              desc: "Invest safely and earn attractive returns with flexible FD tenures.",
            },
            {
              title: "Safe Deposit Lockers",
              desc: "Keep your valuables secure in our state-of-the-art lockers.",
            },
            {
              title: "International Banking",
              desc: "Remittance, forex cards, and NRI services for global citizens.",
            },
          ].map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 p-4 rounded-lg shadow transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Chatbot */}
      <Chatbot />

      {/* Contact Info */}
      <motion.section
        className="px-6 py-12 bg-[#F9F7F2] text-blue-900"
        initial="hidden"
        whileInView="visible"
        variants={sectionFade}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>Email: <a href="mailto:support@rsrobank.com" className="underline">support@rsrobank.com</a></p>
        <p>Phone: 1800-123-4567</p>
        <p>Address: RSRO Bank, Sector 10, Financial District, Mumbai, India</p>
      </motion.section>
    </div>
  );
};

export default HomePage;
