import React from "react";
import {
  Star,
  GraduationCap,
  Monitor,
  MapPin,
  Wifi,
  Laptop,
} from "lucide-react";

const PartnerCard = ({ partner }) => {
  const {
    name,
    profileImage,
    subject,
    studyMode,
    experienceLevel,
    location,
    rating = 0,
  } = partner;

  const numericRating = Math.max(0, Math.min(5, Number(rating) || 0));

  const badgeColor = () => {
    switch (experienceLevel.toLowerCase()) {
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

  const FullStar = ({ size = 20 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 .587l3.668 7.431L23.6 9.75l-5.8 5.656L19.335 23 12 19.771 4.665 23l1.535-7.594L.4 9.75l7.932-1.732L12 .587z"
        fill="#FACC15"
      />
    </svg>
  );

  const HalfStar = ({ size = 20 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="halfGrad">
          <stop offset="50%" stopColor="#FACC15" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M12 .587l3.668 7.431L23.6 9.75l-5.8 5.656L19.335 23 12 19.771 4.665 23l1.535-7.594L.4 9.75l7.932-1.732L12 .587z"
        fill="url(#halfGrad)"
        stroke="#FACC15"
        strokeWidth="1"
      />
    </svg>
  );

  const StudyModeIcon = () => {
    if (studyMode.toLowerCase() === "online")
      return <Wifi size={16} className="text-blue-500" />;
    if (studyMode.toLowerCase() === "offline")
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
              <StudyModeIcon />
              {studyMode}
            </span>

            <span className="flex items-center gap-1">
              <MapPin size={16} className="text-red-500" />
              {location || "Unknown"}
            </span>
          </div>

          <div className="flex justify-center items-center mb-5 gap-1">
            {[...Array(5)].map((_, i) => {
              if (numericRating >= i + 1) {
                return <FullStar key={i} size={20} />;
              } else if (numericRating > i && numericRating < i + 1) {
                return <HalfStar key={i} size={20} />;
              } else {
                return (
                  <Star
                    key={i}
                    size={20}
                    strokeWidth={1.8}
                    className="text-gray-300"
                  />
                );
              }
            })}
          </div>
        </div>

        <div className="mt-4">
          <button className="w-full btn bnt-outline btn-secondary">
            View Profile{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;
