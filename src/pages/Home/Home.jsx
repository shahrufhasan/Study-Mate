import React from "react";
import Banner from "../../components/Banner";
import TopRatedPartner from "../TopRatedPartner/TopRatedPartner";

const Home = () => {
  return (
    <div className="h-screen">
      <Banner></Banner>
      <div>
        <TopRatedPartner></TopRatedPartner>
      </div>
    </div>
  );
};

export default Home;
