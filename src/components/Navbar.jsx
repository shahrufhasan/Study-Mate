import React from "react";
import { Link, NavLink } from "react-router"; // keeping your original import
import logo from "/logo.png";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "text-gray-700"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/findPartners"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "text-gray-700"
          }
        >
          Find Partners
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/createProfile"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "text-gray-700"
          }
        >
          Create Partner Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myConncetion"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "text-gray-700"
          }
        >
          My Connections
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar py-0 min-h-0 z-10 shadow-sm glass-card max-w-8xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/">
          <img src={logo} className="w-50" alt="Logo" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex gap-2">
        <a className="btn btn-grediant">Log In</a>
        <a className="btn btn-outline btn-secondary">Register</a>
      </div>
    </div>
  );
};

export default Navbar;
