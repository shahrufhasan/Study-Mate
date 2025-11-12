import React from "react";
import { useLoaderData } from "react-router";

const TopRatedPartner = () => {
  const data = useLoaderData();
  console.log(data);
  return <div>hello</div>;
};

export default TopRatedPartner;
