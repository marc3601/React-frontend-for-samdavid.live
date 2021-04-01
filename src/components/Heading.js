import React from "react";
import { Container, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import main_text from "../assets/main_text.png";
import "../components/Heading.css";
const Heading = () => {
  return (
    <div id="bgc_container">
      <Container className="text-center">
        <Image src={main_text} fluid className="w-50 pt-4" />
        <p className="lead font-weight-bold text-light pt-5 mb-5 ml-3 mr-3">
        Just Feel the Heat, and move to the beat.
        </p>

        <Link to="/music">
          <Button className="custom_btn mb-5" variant="danger" size="lg">
            Explore Music
          </Button>
        </Link>
      </Container>
      <div className="cover"></div>
    </div>
  );
};

export default Heading;
