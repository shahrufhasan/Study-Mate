import React, { useState, use } from "react";
import { useLoaderData, Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthContext";
import {
  Star,
  GraduationCap,
  Monitor,
  MapPin,
  Wifi,
  Laptop,
} from "lucide-react";

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

  const StudyModeIcon = () => {
    if (partner.studyMode?.toLowerCase() === "online")
      return <Wifi size={18} className="text-blue-500" />;
    if (partner.studyMode?.toLowerCase() === "offline")
      return <Laptop size={18} className="text-gray-600" />;
    return <Monitor size={18} className="text-blue-500" />;
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="card rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 w-full h-64 md:h-auto">
          <img
            src={partner.profileImage}
            alt={partner.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 w-full p-6 flex flex-col justify-center gap-4 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-500">{partner.name}</h2>

          <p className="flex justify-center md:justify-start items-center gap-2 text-gray-600">
            <GraduationCap className="text-purple-600" size={20} />{" "}
            <span>{partner.subject}</span>
          </p>

          <p className="flex justify-center md:justify-start items-center gap-2 text-gray-600">
            <StudyModeIcon /> <span>{partner.studyMode}</span>
          </p>

          <p className="flex justify-center md:justify-start items-center gap-2 text-gray-600">
            <MapPin className="text-red-500" size={18} />{" "}
            <span>{partner.location}</span>
          </p>

          <p className="flex justify-center md:justify-start items-center gap-2 text-gray-600">
            <span className="font-semibold">Experience:</span>{" "}
            {partner.experienceLevel}
          </p>

          <div className="flex justify-center md:justify-start items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={22}
                className={
                  i <= partner.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <p className="text-gray-600">
            <span className="font-semibold">Connections:</span> {partnerCont}
          </p>

          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
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
