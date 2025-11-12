import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../provider/AuthContext";

import { Loader } from "lucide-react"; // optional spinner
import PartnerCard from "../../components/PartnerCard";

const MyConncetion = () => {
  const { user } = useContext(AuthContext);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/partners?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setPartners(data.data || []))
      .catch((err) => console.error("Error fetching partners:", err))
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin w-8 h-8 text-gray-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">My Connections</h1>

      {partners.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <PartnerCard key={partner._id} partner={partner} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          You haven’t created any connections yet.
        </p>
      )}
    </div>
  );
};

export default MyConncetion;
