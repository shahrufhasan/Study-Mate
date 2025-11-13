import React from "react";
import { useRouteError, Link } from "react-router";
import { AlertTriangle } from "lucide-react";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center gap-4">
          <AlertTriangle size={60} className="text-red-500" />
          <h1 className="text-4xl font-bold text-gray-800">Oops!</h1>
          <p className="text-gray-600 text-lg">
            Sorry, an unexpected error has occurred.
          </p>

          {error && (
            <div className="text-sm text-gray-500 mt-2">
              <p>
                <strong>Status:</strong> {error.status || "Unknown"}
              </p>
              <p>
                <strong>Message:</strong>{" "}
                {error.statusText || error.message || "Something went wrong."}
              </p>
            </div>
          )}

          <Link
            to="/"
            className="mt-6 inline-block bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
