import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import main_logo from "../assets/logo192.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="pt-5 pb-5">
        <Row>
          <Col className="text-right border-right">
            <Image fluid className="main_logo" src={main_logo} alt="" />
            <p className="pt-2">DJ SAM DAVID</p>
          </Col>
          <Col>
            <h4 className="display-5">Contact</h4>
            <a className="text-dark" href="mailto:contact@domain.com"> contact@domain.com</a>
            <br></br>
            <a className="text-dark" href="tel:+123456789">+123456789</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
