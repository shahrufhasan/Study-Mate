import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import {
  Star,
  GraduationCap,
  Monitor,
  MapPin,
  Clock,
  Wifi,
  Laptop,
} from "lucide-react";

const PartnerDetails = () => {
  const data = useLoaderData();
  const partner = data.result;

  const {
    name,
    profileImage,
    rating = 0,
    subject,
    studyMode,
    availabiityTime,
    experienceLevel,
    location,
    partnerCont,
  } = partner;

  const navigate = useNavigate();

  // Experience level badge color
  const badgeColor =
    experienceLevel === "Expert"
      ? "bg-green-300"
      : experienceLevel === "Intermediate"
      ? "bg-yellow-300"
      : "bg-red-300";

  // Study mode icon
  const StudyModeIcon = () => {
    if (studyMode.toLowerCase() === "online")
      return <Wifi className="text-blue-500" size={16} />;
    if (studyMode.toLowerCase() === "offline")
      return <Laptop className="text-gray-600" size={16} />;
    return <Monitor className="text-blue-500" size={16} />;
  };

  // Numeric rating
  const numericRating = Math.max(0, Math.min(5, Number(rating) || 0));

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="card bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
        {/* Profile Image */}
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

        {/* Card Content */}
        <div className="p-6 flex flex-col gap-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
          {/* Details */}
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
              <Star className="text-yellow-400" size={18} /> {numericRating} / 5
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-gray-400" size={18} /> Connections:{" "}
              {partnerCont}
            </div>
          </div>

          {/* Back button */}
          <div className="mt-4">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline btn-secondary w-full"
            >
              Send Partner Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
