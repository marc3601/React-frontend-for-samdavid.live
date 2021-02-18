import React from "react";
import { Container, Carousel } from "react-bootstrap";
import "./Slider.css";
import img1 from "../assets/Kontroler DJ jako prezent_cover.jpg"
import img2 from "../assets/unnamed.jpg"
const Slider = () => {
  return (
    <section className="slider">
      <Container fluid className="p-0">
        <Carousel>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              src={img1}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Music everywhere</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100"
              src={img2}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img1}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </section>
  );
};

export default Slider;
