import React, { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthContext";
import { Mail, User, Camera, LogOut } from "lucide-react";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user, updateUser, logOut, setUser } = useContext(AuthContext);
  const [updating, setUpdating] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  const handleUpdateProfile = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Update Profile",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Enter new name" value="${
          user.displayName || ""
        }">
        <input id="swal-photo" class="swal2-input" placeholder="Enter photo URL" value="${
          user.photoURL || ""
        }">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        return {
          displayName: document.getElementById("swal-name").value,
          photoURL: document.getElementById("swal-photo").value,
        };
      },
    });

    if (formValues) {
      setUpdating(true);
      updateUser(formValues)
        .then(() => {
          setUser({ ...user, ...formValues });
          Swal.fire({
            icon: "success",
            title: "Profile Updated!",
            text: "Your profile information has been updated.",
            timer: 1500,
            showConfirmButton: false,
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: "Something went wrong while updating your profile.",
          });
        })
        .finally(() => setUpdating(false));
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Logged out successfully!",
              timer: 1500,
              showConfirmButton: false,
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Logout Failed",
              text: "Please try again.",
            });
          });
      }
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center  p-4">
      <div className="card rounded-2xl shadow-xl w-full max-w-md overflow-hidden text-center">
        <div className="relative">
          <img
            src={
              user.photoURL ||
              "https://i.ibb.co/zVRpyFwF/freepik-assistant-1751885490117-2.png"
            }
            alt={user.displayName}
            className="w-full h-60 object-cover opacity-90"
          />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <img
              src={
                user.photoURL ||
                "https://i.ibb.co/zVRpyFwF/freepik-assistant-1751885490117-2.png"
              }
              alt={user.displayName}
              className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>
        </div>

        <div className="p-6 mt-12 flex flex-col gap-3 items-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <User className="text-primary" size={20} />
            {user.displayName || "Unnamed User"}
          </h2>

          <p className="text-gray-600 flex items-center gap-2">
            <Mail className="text-secondary" size={18} />
            {user.email}
          </p>

          <div className="flex justify-center gap-2 mt-3">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium shadow">
              Active User
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3 w-full">
            <button
              onClick={handleUpdateProfile}
              disabled={updating}
              className="btn btn-outline btn-primary w-full flex items-center justify-center gap-2"
            >
              <Camera size={18} />
              {updating ? "Updating..." : "Update Profile"}
            </button>

            <button
              onClick={handleLogout}
              className="btn btn-outline btn-secondary w-full flex items-center justify-center gap-2"
            >
              <LogOut size={18} /> Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
