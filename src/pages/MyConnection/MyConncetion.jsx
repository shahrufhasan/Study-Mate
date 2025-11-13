import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyConncetion = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedConnections = JSON.parse(localStorage.getItem("myConnections"));
    setConnections(storedConnections);
    setLoading(false);
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the partner from the database!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/partners/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setConnections((prev) => prev.filter((conn) => conn._id !== id));
              const updated = JSON.parse(
                localStorage.getItem("myConnections") || "[]"
              ).filter((conn) => conn._id !== id);
              localStorage.setItem("myConnections", JSON.stringify(updated));
              Swal.fire("Deleted!", "Partner has been deleted.", "success");
            } else {
              Swal.fire("Error!", "Failed to delete partner.", "error");
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (connections.length === 0)
    return (
      <div className="flex flex-col items-center justify-center mt-16">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No Connections Found
        </h2>
        <p className="text-gray-500 text-center max-w-sm">
          You haven’t connected with any study partners yet.
        </p>
      </div>
    );

  return (
    <div className="my-10 max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">
        My Connections
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 hidden md:table-header-group">
            <tr>
              <th className="py-3 px-6 text-left">Profile</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Subject</th>
              <th className="py-3 px-6 text-left">Study Mode</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="md:table-row-group">
            {connections.map((conn) => (
              <tr
                key={conn._id}
                className="border border-gray-300 rounded-lg block md:table-row mb-4 md:mb-0 hover:bg-emerald-50 transition-all duration-300"
              >
                <td className="py-3 px-6 md:table-cell block">
                  <div className="flex md:block items-center gap-2">
                    <img
                      src={conn.profileImage}
                      alt={conn.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="md:hidden font-medium text-gray-800">
                      {conn.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-gray-800 md:table-cell block">
                  {conn.name}
                </td>
                <td className="py-3 px-6 text-gray-600 md:table-cell block">
                  {conn.subject}
                </td>
                <td className="py-3 px-6 text-gray-600 md:table-cell block">
                  {conn.studyMode}
                </td>
                <td className="py-3 px-6 md:table-cell block">
                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/updatePartner/${conn._id}`}
                      className="btn btn-outline btn-primary w-full"
                    >
                      Update Info
                    </Link>
                    <button
                      onClick={() => handleDelete(conn._id)}
                      className="btn btn-outline btn-secondary w-full"
                    >
                      Delete Partner
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyConncetion;
