import React, { useEffect, useState, use } from "react";
import { AuthContext } from "../../provider/AuthContext";
import { Star } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyConnection = () => {
  const { user } = use(AuthContext);
  const [connections, setConnections] = useState([]);

  const fetchConnections = async () => {
    if (!user?.email) return;
    const res = await fetch(
      `https://study-mate-server-liard.vercel.app/myConnections?userEmail=${user.email}`
    );
    const data = await res.json();
    setConnections(data || []);
  };

  useEffect(() => {
    fetchConnections();
  }, [user?.email]);

  const handleDelete = async (partnerId) => {
    if (!user?.email) {
      Swal.fire("Error", "User not logged in", "error");
      return;
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will remove the connection permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `https://study-mate-server-liard.vercel.app/myConnections/${partnerId}?userEmail=${user.email}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {
        setConnections((prev) => prev.filter((p) => p._id !== partnerId));
        Swal.fire("Deleted!", "Connection removed successfully.", "success");
      } else {
        Swal.fire("Error", data.message || "Failed to delete", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="my-10 max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center gap-3 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          My Connections
        </h1>
        <p className="text-gray-600 text-lg md:text-xl text-center">
          Here are all the study partners you’ve connected with. Keep learning
          and growing together!
        </p>
      </div>

      {connections.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No Connections Found
          </h2>
          <p className="text-gray-500 text-center max-w-sm">
            You haven’t connected with any study partners yet. Explore partners
            and start building your study network!
          </p>
        </div>
      ) : (
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
                  className="border border-gray-300 rounded-lg block
                     md:table-row mb-4 md:mb-0 hover:bg-emerald-50 transition-all duration-300"
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
                    <span className="md:hidden font-semibold">Name: </span>
                    {conn.name}
                  </td>
                  <td className="py-3 px-6 text-gray-600 md:table-cell block">
                    <span className="md:hidden font-semibold">Subject: </span>
                    {conn.subject}
                  </td>
                  <td className="py-3 px-6 text-gray-600 md:table-cell block">
                    <span className="md:hidden font-semibold">Mode: </span>
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
                        Delete Connection
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyConnection;
