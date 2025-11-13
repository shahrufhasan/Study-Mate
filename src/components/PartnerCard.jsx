import React from "react";
import {
  Star,
  GraduationCap,
  Monitor,
  MapPin,
  Wifi,
  Laptop,
} from "lucide-react";
import { Link } from "react-router";

const PartnerCard = ({ partner }) => {
  const {
    _id,
    name,
    profileImage,
    subject,
    studyMode,
    experienceLevel,
    location,
    rating = 0,
  } = partner;

  const badgeColor = () => {
    switch (experienceLevel?.toLowerCase()) {
      case "expert":
        return "bg-green-300";
      case "intermediate":
        return "bg-yellow-300";
      case "beginner":
        return "bg-red-300";
      default:
        return "bg-gray-600";
    }
  };

  const StudyModeIcon = () => {
    if (studyMode?.toLowerCase() === "online")
      return <Wifi size={16} className="text-blue-500" />;
    if (studyMode?.toLowerCase() === "offline")
      return <Laptop size={16} className="text-gray-600" />;
    return <Monitor size={16} className="text-blue-500" />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full max-w-sm mx-auto overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={profileImage}
          alt={name}
          className="w-full h-56 object-cover"
        />
        <div
          className={`absolute top-3 right-3 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full shadow ${badgeColor()}`}
        >
          {experienceLevel}
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1 p-6 text-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">{name}</h2>

          <p className="text-gray-500 mb-3 flex items-center justify-center gap-2">
            <GraduationCap size={18} className="text-purple-600" /> {subject}
          </p>

          <div className="flex justify-center items-center gap-4 text-sm text-gray-600 mb-3">
            <span className="flex items-center gap-1">
              <StudyModeIcon /> {studyMode}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={16} className="text-red-500" />{" "}
              {location || "Unknown"}
            </span>
          </div>

          <div className="flex justify-center items-center mb-5 gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={24}
                className={
                  i <= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
        </div>

        <div className="mt-4">
          <Link
            to={`/partnerdetails/${_id}`}
            className="w-full btn btn-outline btn-secondary"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;
