import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { getAuth } from "firebase/auth";
import {
  Star,
  GraduationCap,
  Monitor,
  MapPin,
  Clock,
  Wifi,
  Laptop,
} from "lucide-react";
import Swal from "sweetalert2";

const PartnerDetails = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const [partnerCont, setPartnerCont] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const auth = getAuth();
        const token = auth.currentUser
          ? await auth.currentUser.getIdToken()
          : null;

        const res = await fetch(`http://localhost:3000/partners/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const data = await res.json();
        if (data.success && data.result) {
          setPartner(data.result);
          setPartnerCont(Number(data.result.partnerCont) || 0);
        } else setError("Failed to fetch partner details.");
      } catch {
        setError("Something went wrong while fetching partner data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, [id]);

  const handleSendRequest = async () => {
    if (!partner?._id)
      return Swal.fire("Error!", "Partner ID missing", "error");

    try {
      const res = await fetch(
        `http://localhost:3000/partners/${partner._id}/increment`,
        {
          method: "PATCH",
        }
      );
      const data = await res.json();
      if (data.success) {
        setPartnerCont((prev) => prev + 1);
        Swal.fire("Request Sent!", "Connection count increased.", "success");
      } else throw new Error();
    } catch {
      Swal.fire("Error!", "Failed to increase connection count.", "error");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );

  if (error || !partner)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error || "Partner not found."}
      </div>
    );

  const {
    _id,
    name,
    profileImage,
    rating = 0,
    subject,
    studyMode,
    availabiityTime,
    experienceLevel,
    location,
  } = partner;
  const badgeColor =
    experienceLevel === "Expert"
      ? "bg-green-300"
      : experienceLevel === "Intermediate"
      ? "bg-yellow-300"
      : "bg-red-300";
  const StudyModeIcon = () =>
    studyMode?.toLowerCase() === "online" ? (
      <Wifi className="text-blue-500" size={16} />
    ) : studyMode?.toLowerCase() === "offline" ? (
      <Laptop className="text-gray-600" size={16} />
    ) : (
      <Monitor className="text-blue-500" size={16} />
    );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="card bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="relative">
          <img
            src={profileImage}
            alt={name}
            className="w-full h-fit object-cover"
          />
          <div
            className={`absolute top-4 right-4 px-4 py-1 text-sm font-semibold rounded-full shadow ${badgeColor}`}
          >
            {experienceLevel}
          </div>
        </div>

        <div className="p-6 flex flex-col gap-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600 text-left">
            <div className="flex items-center gap-2">
              <GraduationCap className="text-purple-600" size={18} /> {subject}
            </div>
            <div className="flex items-center gap-2">
              <StudyModeIcon /> {studyMode}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-red-500" size={18} /> {location}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-blue-600" size={18} /> {availabiityTime}
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" size={18} /> {rating} / 5
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-gray-400" size={18} /> Connections:{" "}
              {partnerCont}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <button
              onClick={handleSendRequest}
              className="btn btn-outline btn-secondary w-full"
            >
              Send Request
            </button>
            <Link
              to="/findPartners"
              className="btn btn-outline btn-primary w-full"
            >
              Back To All Partners
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
