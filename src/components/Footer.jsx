import React from "react";
import logo from "/logo.png";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { SiX } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch justify-items-center">
          <div className="flex flex-col justify-start h-full items-center md:items-start text-center md:text-left gap-4">
            <img src={logo} className="w-40 mb-2" alt="StudyMate Logo" />
            <p className="text-sm">
              StudyMate is an online platform designed to help students connect,
              collaborate, and excel in their studies. It offers tools for
              sharing notes, joining study groups, and accessing learning
              resources, making learning more interactive, organized, and fun.
            </p>
          </div>

          <div className="flex flex-col justify-start h-full items-center md:items-start text-center md:text-left gap-2">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="flex flex-col gap-1 text-sm">
              <li className="link link-hover cursor-pointer">Home</li>
              <li className="link link-hover cursor-pointer">Find Partner</li>
              <li className="link link-hover cursor-pointer">Create Profile</li>
              <li className="link link-hover cursor-pointer">My Connection</li>
            </ul>
          </div>

          <div className="flex flex-col justify-start h-full items-center md:items-start text-center md:text-left gap-2">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex flex-col gap-2 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <FaFacebook className="text-2xl" /> Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-pink-500 transition-colors"
              >
                <FaInstagram className="text-2xl" /> Instagram
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <SiX className="text-2xl" /> X
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-700 transition-colors"
              >
                <FaLinkedin className="text-2xl" /> LinkedIn
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-red-600 transition-colors"
              >
                <FaYoutube className="text-2xl" /> YouTube
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-t border-gray-300" />

        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} StudyMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
