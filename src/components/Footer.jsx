import React from "react";
import logo from "/logo.png"; // Replace with your logo path
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content p-10 rounded-t-lg">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Logo & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center mb-2">
            <img src={logo} alt="Logo" className="w-12 h-12 mr-2" />
            <span className="text-xl font-bold">ProjectName</span>
          </div>
          <p className="text-gray-600 max-w-sm">
            ProjectName is a platform that connects partners and professionals,
            helping you build meaningful connections and grow your network.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <nav className="grid gap-2">
            <a className="link link-hover">About Us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press Kit</a>
          </nav>
        </div>

        {/* Column 3: Social Media */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition text-white">
              <FaFacebookF />
            </a>
            <a className="p-2 rounded-full bg-gray-800 hover:bg-sky-400 transition text-white">
              <FaTwitter />
            </a>
            <a className="p-2 rounded-full bg-gray-800 hover:bg-blue-500 transition text-white">
              <FaLinkedinIn />
            </a>
            <a className="p-2 rounded-full bg-gray-800 hover:bg-pink-500 transition text-white">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="mt-10 border-t border-gray-300 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ProjectName. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
