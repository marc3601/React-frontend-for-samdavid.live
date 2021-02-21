import React from "react";
import { Container, Image } from "react-bootstrap";
import OwlCarousel from "react-owl-carousel";
import "../assets/dist/assets/owl.carousel.min.css";
import "../assets/dist/assets/owl.theme.default.min.css";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import "./Gallery.css";
const Gallery = ({ width }) => {
  return (
    <Container
      fluid
      className={`main_gallery ${
        width > 1000 ? "p-5" : width > 750 ? "p-4" : "p-3"
      }`}
    >
      <h2 className="custom_h2 lead display-3 text-light text-center pt-3 pb-5">
        My work
      </h2>
      <OwlCarousel
        items={width > 1000 ? 3 : width > 750 ? 2 : 1}
        className="owl-theme"
        lazyLoad
        loop
        margin={10}
        nav
      >
        <div className="item">
          <Image fluid src={img1}></Image>
        </div>
        <div className="item">
          <Image fluid src={img2}></Image>
        </div>
        <div className="item">
          <Image fluid src={img3}></Image>
        </div>
        <div className="item">
          <Image fluid src={img1}></Image>
        </div>
        <div className="item">
          <Image src={img2}></Image>
        </div>
        <div className="item">
          <Image fluid src={img3}></Image>
        </div>
      </OwlCarousel>
      ;
    </Container>
  );
};

export default Gallery;
