import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../provider/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn, signInWithGoogle, setUser, logOut, resetPassword } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    signIn(email, password)
      .then((result) => {
        setUser(result.user);
        navigate(location.state ? location.state : "/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    setError("");
    signInWithGoogle()
      .then((result) => {
        const isNewUser = result._tokenResponse?.isNewUser;
        if (isNewUser) {
          logOut();
          toast.error(
            "This Google account is not registered. Please register first."
          );
        } else {
          setUser(result.user);
          navigate(location.state ? location.state : "/");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => setError(err.message));
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    if (!forgotEmail) {
      toast.error("Please enter your email!");
      return;
    }
    resetPassword(forgotEmail)
      .then(() => toast.success("Password reset email sent!"))
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5 space-y-3">
        <div className="text-center">
          <h4 className="font-semibold text-4xl mb-4">Welcome Back</h4>
          <p className="text-primary text-sm">Login to continue your journey</p>
        </div>

        {!showForgot ? (
          <form onSubmit={handleLogin} className="card-body">
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
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

            <p
              onClick={() => setShowForgot(true)}
              className="text-sm text-red-500 cursor-pointer mt-1 hover:underline"
            >
              Forgot Password?
            </p>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary mt-4 w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="my-2 text-center">OR CONTINUE WITH</div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn w-full flex items-center justify-center gap-2"
            >
              <FcGoogle /> Continue With Google
            </button>

            <p className="text-center mt-2">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary px-1">
                Register
              </Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="card-body">
            <label className="label">Enter your email to reset password</label>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="input"
              placeholder="Email"
              required
            />

            <button type="submit" className="btn btn-red mt-4 w-full">
              Send Reset Email
            </button>

            <p
              onClick={() => setShowForgot(false)}
              className="text-sm text-primary cursor-pointer mt-2 hover:underline text-center"
            >
              Back to Login
            </p>
          </form>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
