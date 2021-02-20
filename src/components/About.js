import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import about from "../assets/about.jpg";
import "./About.css";
const About = () => {
  return (
    <div className="about">
      <Container>
        <h2 className="custom_h2 lead display-3 text-dark text-center pt-5 pb-5">
          Another good line goes here
        </h2>
        <Row>
          <Col sm={12} md={6} className="p-3">
            <h1 className="display-6 mb-5">About me</h1>
            <p className="lead mr-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eius
              nulla quod magni vitae ducimus enim, tempora ipsam adipisci vero
              illo autem blanditiis quia, sunt pariatur aliquid odio commodi
              voluptate? Quis molestias quia voluptatum modi consequatur soluta
              enim dolor perferendis obcaecati aut ipsum pariatur cupiditate
              voluptate minus qui harum, hic repellat aliquam nostrum! Animi,
              neque porro quia nostrum sit quas.
            </p>
          </Col>
          <Col sm={12} md={6}>
            <Image className="p-3" src={about} roundedCircle fluid />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
