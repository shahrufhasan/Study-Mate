import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
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
  const data = useLoaderData();
  const partner = data.result;
  const navigate = useNavigate();

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
    partnerCont: initialPartnerCont = 0,
  } = partner;

  const [partnerCont, setPartnerCont] = useState(
    Number(initialPartnerCont) || 0
  );

  const badgeColor =
    experienceLevel === "Expert"
      ? "bg-green-300"
      : experienceLevel === "Intermediate"
      ? "bg-yellow-300"
      : "bg-red-300";

  const StudyModeIcon = () => {
    if (studyMode.toLowerCase() === "online")
      return <Wifi className="text-blue-500" size={16} />;
    if (studyMode.toLowerCase() === "offline")
      return <Laptop className="text-gray-600" size={16} />;
    return <Monitor className="text-blue-500" size={16} />;
  };

  const numericRating = Math.max(0, Math.min(5, Number(rating) || 0));

  const handleSendRequest = () => {
    fetch(`http://localhost:3000/partners/${partner._id}/increment`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPartnerCont((prev) => prev + 1);

          Swal.fire({
            title: "Request Sent!",
            text: "Connection count increased successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to increase connection count.",
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

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/partners/${_id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire({
                title: "Deleted!",
                text: "Partner has been deleted successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
              navigate("/findPartners");
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to delete partner.",
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
      }
    });
  };

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
              <Star className="text-yellow-400" size={18} /> {numericRating} / 5
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
              to={`/updatePartner/${_id}`}
              className="btn btn-outline btn-primary w-full"
            >
              Update Info
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-outline btn-secondary w-full"
            >
              Delete Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
