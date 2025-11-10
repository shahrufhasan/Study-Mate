import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../provider/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, setUser, updateUser, signInWithGoogle } =
    use(AuthContext);
  const [nameError, setNameError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;

    if (name.length < 6) {
      setNameError("Name should be at least 6 characters");
      return;
    } else {
      setNameError("");
    }

    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate(location.state ? location.state : "/");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Registered Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch(() => setUser(user));
      })
      .catch((error) => alert(error.code));
  };

  const handleGoogleRegister = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(location.state ? location.state : "/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registered Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5 space-y-3">
        <div className="text-center">
          <h4 className="font-semibold text-4xl mb-4">Join GreenNest</h4>
          <p className="text-primary text-sm">
            Register to continue your green journey
          </p>
        </div>

        <form onSubmit={handleRegister} className="card-body">
          <label className="label">Name</label>
          <input
            name="name"
            type="text"
            className="input"
            placeholder="Name"
            required
          />
          {nameError && <p className="text-red-500">{nameError}</p>}

          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            className="input"
            placeholder="Email"
            required
          />

          <label className="label">Photo URL</label>
          <input
            name="photo"
            type="text"
            className="input"
            placeholder="Photo URL"
            required
          />

          <label className="label">Password</label>
          <input
            name="password"
            type="password"
            className="input"
            placeholder="Password"
            required
          />

          <button type="submit" className="btn btn-primary mt-4 w-full">
            Register
          </button>

          <div className="my-2 text-center">OR CONTINUE WITH</div>

          <button
            type="button"
            onClick={handleGoogleRegister}
            className="btn w-full flex items-center justify-center gap-2"
          >
            <FcGoogle /> Continue With Google
          </button>

          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-primary px-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
