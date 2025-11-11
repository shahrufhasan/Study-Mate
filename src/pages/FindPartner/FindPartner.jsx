import React from "react";
import { useLoaderData } from "react-router";
import PartnerCard from "../../components/PartnerCard";

const FindPartner = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="my-10">
      <h2 className="text-5xl text-center my-5">All the study partners</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((partner) => (
          <PartnerCard key={partner._id} partner={partner}></PartnerCard>
        ))}
      </div>
    </div>
  );
};

export default FindPartner;
