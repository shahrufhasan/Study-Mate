import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdatePartner = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    profileImage: "",
    subject: "",
    studyMode: "online",
    availabiityTime: "",
    location: "",
    experienceLevel: "Beginner",
    rating: 0,
    partnerCont: 0,
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const res = await fetch(
          `https://study-mate-server-liard.vercel.app/partners/${id}`
        );
        const data = await res.json();

        if (data.success && data.result) {
          setFormData({
            name: data.result.name || "",
            profileImage: data.result.profileImage || "",
            subject: data.result.subject || "",
            studyMode: data.result.studyMode || "online",
            availabiityTime: data.result.availabiityTime || "",
            location: data.result.location || "",
            experienceLevel: data.result.experienceLevel || "Beginner",
            rating: data.result.rating || 0,
            partnerCont: data.result.partnerCont || 0,
            email: data.result.email || "",
          });
        } else {
          setError("Failed to fetch partner details.");
        }
      } catch {
        setError("Something went wrong while fetching partner details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const res = await fetch(
        `https://study-mate-server-liard.vercel.app/partners/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Partner Updated Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(`/partnerdetails/${id}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-100 p-4">
      <div className="card w-full max-w-lg shadow-2xl py-5 space-y-3">
        <h4 className="font-semibold text-4xl text-center mb-4">
          Update Partner
        </h4>
        <form onSubmit={handleSubmit} className="card-body space-y-3">
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input w-full"
          />
          <input
            name="profileImage"
            placeholder="Profile Image URL"
            value={formData.profileImage}
            onChange={handleChange}
            className="input w-full"
          />
          <input
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
            name="availabiityTime"
            placeholder="Availability Time"
            value={formData.availabiityTime}
            onChange={handleChange}
            className="input w-full"
          />
          <input
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
            name="rating"
            type="number"
            min={0}
            max={5}
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            className="input w-full"
          />
          <input
            name="partnerCont"
            type="number"
            min={0}
            placeholder="Partner Count"
            value={formData.partnerCont}
            onChange={handleChange}
            className="input w-full"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            readOnly
            className="input w-full"
          />
          <button
            type="submit"
            className="btn btn-primary w-full mt-3"
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Partner"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePartner;
