import React from "react";
import { useLoaderData } from "react-router";
import PartnerCard from "../../components/PartnerCard";

const TopRatedPartner = () => {
  const data = useLoaderData();
  console.log(data);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="max-w-4xl text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Top Study Partner
          </h1>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed">
          Explore our highest rated study partners and find your ideal learning
          match
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((partner) => (
          <PartnerCard key={partner._id} partner={partner}></PartnerCard>
        ))}
      </div>
    </div>
  );
};

export default TopRatedPartner;
