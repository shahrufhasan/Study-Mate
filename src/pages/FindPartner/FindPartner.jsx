import React, { useState } from "react";
import { useLoaderData } from "react-router";
import PartnerCard from "../../components/PartnerCard";

const FindPartner = () => {
  const data = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const filteredPartners = data
    .filter((partner) =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.rating - b.rating;
      if (sortOrder === "desc") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="my-10 max-w-7xl mx-auto px-4">
      <div className="flex flex-col justify-center items-center gap-3 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          All Study Partner
        </h1>
        <p className="text-gray-600 text-lg md:text-xl text-center">
          Connect with the best study partners and boost your learning
          experience
        </p>
      </div>

      <div className="flex justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="font-medium">Rating</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select select-bordered select-sm"
          >
            <option value="default">Default</option>
            <option value="asc">low - high</option>
            <option value="desc">high-low</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered input-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPartners.length > 0 ? (
          filteredPartners.map((partner) => (
            <PartnerCard key={partner._id} partner={partner} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full mt-10">
            No partners found.
          </p>
        )}
      </div>
    </div>
  );
};

export default FindPartner;
