import React from "react";
import { useLoaderData } from "react-router";
import PartnerCard from "../../components/PartnerCard";

const TopRatedPartner = () => {
  const data = useLoaderData();
  console.log(data);

  return (
    <div className="my-10 max-w-7xl mx-auto">
      <div className="flex flex-col justify-center items-center gap-3 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          Top Study Partner
        </h1>
        <p className="text-gray-600 text-lg md:text-xl text-center">
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
