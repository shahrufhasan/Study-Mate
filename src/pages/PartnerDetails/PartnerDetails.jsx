import React, { useState, use } from "react";
import { useLoaderData, Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthContext";

const PartnerDetails = () => {
  const { user } = use(AuthContext);
  const data = useLoaderData();
  const partner = data.result;
  const [partnerCont, setPartnerCont] = useState(partner.partnerCont || 0);

  if (!partner)
    return <div className="text-center mt-20">No partner found</div>;

  const handleSendRequest = async () => {
    if (!user?.email) {
      Swal.fire("Error!", "You must be logged in to send request.", "error");
      return;
    }

    const res = await fetch(
      "https://study-mate-server-liard.vercel.app/myConnections",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          partnerId: partner._id,
        }),
      }
    );
    const result = await res.json();
    if (result.success) {
      setPartnerCont((prev) => prev + 1);
      Swal.fire(
        "Success!",
        "Request sent and added to My Connection.",
        "success"
      );
    } else {
      Swal.fire("Error!", "Failed to send request.", "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="card bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="relative">
          <img
            src={partner.profileImage}
            alt={partner.name}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="p-6 flex flex-col gap-4 text-center">
          <h2 className="text-3xl font-bold">{partner.name}</h2>
          <p>Subject: {partner.subject}</p>
          <p>Study Mode: {partner.studyMode}</p>
          <p>Location: {partner.location}</p>
          <p>Experience: {partner.experienceLevel}</p>
          <p>Rating: {partner.rating}</p>
          <p>Connections: {partnerCont}</p>
          <div className="mt-4 flex flex-col gap-3">
            <button
              onClick={handleSendRequest}
              className="btn btn-outline btn-secondary"
            >
              Send Request
            </button>
            <Link to="/findPartners" className="btn btn-outline btn-primary">
              Back To All Partners
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
