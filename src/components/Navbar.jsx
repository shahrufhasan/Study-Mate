import React, { use } from "react";
import { Link, NavLink } from "react-router"; // keeping your original import
import logo from "/logo.png";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
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
      {user && (
        <>
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
      )}
    </>
  );

  const handleSignOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged Out",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="navbar py-0 min-h-0 z-10 shadow-sm liquid-card max-w-8xl mx-auto">
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
        {user ? (
          <div className="relative dropdown">
            <div tabIndex={0} role="button" className="cursor-pointer">
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt={user.displayName || "User"}
                  />
                </div>
              </div>
            </div>

            <div className="dropdown-content   absolute right-0 top-12 bg-base-100 shadow-lg rounded-lg w-48 p-3 flex flex-col z-50">
              <span className="font-semibold mb-2 truncate">
                {user.displayName || "User"}
              </span>
              <button
                onClick={handleSignOut}
                className="btn btn-outline btn-primary w-full"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <>
            {" "}
            <Link to="/login" className="btn btn-soft btn-primary">
              Log In
            </Link>
            <Link to="/register" className="btn btn-outline btn-secondary">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
