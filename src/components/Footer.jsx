import React from "react";
import logo from "/logo.png";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaXTwitter, // The X (Twitter) icon from react-icons
} from "react-icons/fa6"; // use fa6 for the updated X icon

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-3">
            <img src={logo} alt="StudyMate Logo" className="w-10 h-10" />
            <h2 className="text-2xl font-bold text-primary">StudyMate</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            StudyMate helps students and learners find compatible study
            partners, collaborate effectively, and grow together through shared
            learning experiences.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-lg mb-3">Connect with us</h3>
          <div className="flex gap-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-black transition"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-700 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <h3 className="font-semibold text-lg mb-3">Stay Updated</h3>
          <p className="text-gray-600 text-sm mb-2 text-center md:text-right">
            Get the latest updates, study tips, and partner recommendations.
          </p>
          <button className="btn btn-primary btn-sm mt-2">Subscribe Now</button>
        </div>
      </div>

      <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">StudyMate</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
