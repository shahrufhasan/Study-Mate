import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdatePartner = () => {
  const data = useLoaderData();
  const partner = data.result || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: partner.name || "",
    profileImage: partner.profileImage || "",
    subject: partner.subject || "",
    studyMode: partner.studyMode || "online",
    availabiityTime: partner.availabiityTime || "",
    location: partner.location || "",
    experienceLevel: partner.experienceLevel || "Beginner",
    rating: partner.rating || 0,
    partnerCont: partner.partnerCont || 0,
    email: partner.email || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`http://localhost:3000/partners/${partner._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Partner Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(`/partnerdetails/${partner._id}`);
        } else {
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: "Something went wrong while updating partner.",
          });
        }
      })
      .catch((err) => {
        console.error("Error updating partner:", err);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Something went wrong while updating partner.",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-100 p-4">
      <div className="card bg-base-100 w-full max-w-lg shadow-2xl py-5 space-y-3">
        <div className="text-center">
          <h4 className="font-semibold text-4xl mb-4">Update Study Partner</h4>
          <p className="text-primary text-sm">
            Modify the details of your partner
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-body space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input w-full"
          />

          <input
            type="url"
            name="profileImage"
            placeholder="Profile Image URL"
            value={formData.profileImage}
            onChange={handleChange}
            className="input w-full"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="input w-full"
          />

          <select
            name="studyMode"
            value={formData.studyMode}
            onChange={handleChange}
            className="input w-full"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          <input
            type="text"
            name="availabiityTime"
            placeholder="Availability Time"
            value={formData.availabiityTime}
            onChange={handleChange}
            className="input w-full"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="input w-full"
          />

          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="input w-full"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>

          <input
            type="number"
            name="rating"
            placeholder="Rating (0-5)"
            value={formData.rating}
            onChange={handleChange}
            min={0}
            max={5}
            className="input w-full"
          />

          <input
            type="number"
            name="partnerCont"
            placeholder="Partner Count"
            value={formData.partnerCont}
            onChange={handleChange}
            min={0}
            className="input w-full"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="input w-full"
          />

          <button
            type="submit"
            className="btn btn-primary w-full mt-3"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Partner"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePartner;
