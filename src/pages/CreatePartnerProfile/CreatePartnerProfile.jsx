import React, { use, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthContext";
import { useNavigate } from "react-router";

const CreatePartnerProfile = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [partnerData, setPartnerData] = useState({
    name: "",
    profileImage: "",
    subject: "",
    studyMode: "online",
    availabiityTime: "",
    location: "",
    experienceLevel: "Beginner",
    rating: 0,
    partnerCont: 0,
    email: user.email,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartnerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("http://localhost:3000/partners", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(partnerData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const createdPartnerId = data.result.insertedId; // <-- get the _id
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Partner Created Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(`/partnerDetails/${createdPartnerId}`);
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center min-h-screen items-center  p-4">
      <div className="card bg-base-100 w-full max-w-lg shadow-2xl py-5 space-y-3">
        <div className="text-center">
          <h4 className="font-semibold text-4xl mb-4">Add Study Partner</h4>
          <p className="text-primary text-sm">
            Fill the form to add a partner manually
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-body space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={partnerData.name}
            onChange={handleChange}
            className="input w-full"
            required
          />

          <input
            type="url"
            name="profileImage"
            placeholder="Profile Image URL"
            value={partnerData.profileImage}
            onChange={handleChange}
            className="input w-full"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={partnerData.subject}
            onChange={handleChange}
            className="input w-full"
          />

          <select
            name="studyMode"
            value={partnerData.studyMode}
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
            value={partnerData.availabiityTime}
            onChange={handleChange}
            className="input w-full"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={partnerData.location}
            onChange={handleChange}
            className="input w-full"
          />

          <select
            name="experienceLevel"
            value={partnerData.experienceLevel}
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
            value={partnerData.rating}
            onChange={handleChange}
            min={0}
            max={5}
            className="input w-full"
          />

          <input
            type="number"
            name="partnerCont"
            placeholder="Partner Count"
            value={partnerData.partnerCont}
            onChange={handleChange}
            min={0}
            className="input w-full"
          />

          <input
            type="email"
            name="email"
            value={partnerData.email}
            readOnly
            className="input w-full"
          />

          <button
            type="submit"
            className="btn btn-primary w-full mt-3"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Partner"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePartnerProfile;
