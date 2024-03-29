import React from "react";
import { Container, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import main_text from "../assets/main_text.png";
import "../components/Heading.css";
const Heading = () => {
  return (
    // <div id="bgc_container">
    <>
      <Container className="text-center">
        <Image src={main_text} fluid className="w-50 pt-4" />
        <div className="phrase">
          <p className="custom_phrase text-light mb-3 ml-3 mr-3">
            Just Feel the Heat, and move to the beat.
          </p>
        </div>
        <div className="buttons">
          <Link to="/gallery">
            <Button className="custom_btn" variant="danger" size="lg">
              Gallery
            </Button>
          </Link>
          <Link to="/music">
            <Button className="custom_btn" variant="danger" size="lg">
              Explore music
            </Button>
          </Link>
        </div>
      </Container>
      {/* <div className="cover"></div> */}
      {/* </div> */}
    </>
  );
};

export default Heading;
