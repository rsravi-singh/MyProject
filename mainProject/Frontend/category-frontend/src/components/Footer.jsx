// src/components/Footer.js
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0B2E53] text-white text-sm mt-10 no-underline">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">RSRO Banking</h2>
          <p className="text-gray-300">
            Your trusted partner in secure and innovative banking solutions.
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex gap-3">
            <a href="#" className="p-2 bg-[#0B2E53] border-1 rounded-full hover:bg-yellow-400 hover:text-black transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-[#0B2E53] border-1  rounded-full hover:bg-yellow-400 hover:text-black transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 bg-[#0B2E53] border-1 rounded-full hover:bg-yellow-400 hover:text-black transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-blue-950 text-center py-3 text-gray-400 text-xs">
        © {new Date().getFullYear()} RSRO Banking. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
