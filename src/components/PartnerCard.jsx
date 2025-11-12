import React, { useState } from "react";
import {
  Star,
  GraduationCap,
  Monitor,
  MapPin,
  Wifi,
  Laptop,
} from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const PartnerCard = ({ partner }) => {
  const {
    _id,
    name,
    profileImage,
    subject,
    studyMode,
    experienceLevel,
    location,
    rating: initialRating = 0,
  } = partner;

  const [rating, setRating] = useState(Number(initialRating) || 0);
  const [hover, setHover] = useState(null);

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

  const handleRating = (newRating) => {
    setRating(newRating);
    fetch(`http://localhost:3000/partners/${_id}/rating`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: newRating }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "Rating Updated!",
            text: `You rated ${name} ${newRating}`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to update rating.",
            icon: "error",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
        });
      });
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
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={24}
                className={`cursor-pointer transition-colors duration-200 ${
                  i <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                }`}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onClick={() => handleRating(i)}
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
