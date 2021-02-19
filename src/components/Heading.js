import React from "react";
import { Container, Button } from "react-bootstrap";
import "../components/Heading.css";

const Heading = () => {
  return (
    <div id="bgc_container">
      <Container className="text-center">
        <h1 className="main_heading display-2 mt-5 mb-5 font-weight-bold text-light">
          DJ SAM DAVID
        </h1>
        <p className="lead text-light  mb-5">Here put your catchy phrase</p>
        <Button className="custom_btn" variant="danger" size="lg">
          Contact
        </Button>
      </Container>
    </div>
  );
};

export default Heading;
