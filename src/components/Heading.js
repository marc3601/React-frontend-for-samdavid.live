import React from "react";
import { Container, Button, Image } from "react-bootstrap";
import main_text from "../assets/main_text.png"
import "../components/Heading.css";
const Heading = () => {
  return (
    <div id="bgc_container">
      <Container className="text-center">
        {/* <h1 className="main_heading display-2 pt-5 font-weight-bold text-light">
          DJ SAM DAVID
        </h1> */}
        <Image src={main_text} fluid className="w-50 pt-4"/>
        <p className="lead text-light pt-5  mb-5">Here put your catchy phrase.</p>
        <Button className="custom_btn mb-5" variant="danger" size="lg">
         Let's talk
        </Button>

      </Container>
      <div className="cover"></div>
    </div>
  );
};

export default Heading;
