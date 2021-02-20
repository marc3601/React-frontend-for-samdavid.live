import React from "react";
import Heading from "../components/Heading";
import About from "../components/About";
import Gallery from "../components/Gallery";
const Home = ({ width }) => {
  return (
    <>
      <Heading />
      <About />
      <Gallery width={width} />
    </>
  );
};

export default Home;
