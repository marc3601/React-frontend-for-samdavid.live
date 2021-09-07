import React from "react";
import Heading from "../components/Heading";
import About from "../components/About";
import Gallery from "../components/Gallery";
import "./Home.css"
const Home = ({ width }) => {
  return (
    <>
      <div id="bgc_container">
        <Heading />
        <Gallery width={width} />
      </div>
      <About />

    </>
  );
};

export default Home;
