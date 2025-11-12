import React from "react";
import Banner from "../../components/Banner";
import TopRatedPartner from "../TopRatedPartner/TopRatedPartner";
import About from "../About/About";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TopRatedPartner></TopRatedPartner>
      <About></About>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
