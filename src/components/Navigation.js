import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import "./Navigation.css";
import main_logo from "../assets/logo192.png";
const Navigation = () => {
  return (
    <nav className="navigation mb-5">
      <Container>
        <Navbar
          sticky="top"
          className="black_nav"
          collapseOnSelect
          expand="lg"
          variant="dark"
        >
          <Navbar.Brand href="#home" >
            <img className="main_logo" src={main_logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#deets">Home</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Music
              </Nav.Link>
              <Nav.Link eventKey={3} href="#memes">
                Services
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </nav>
  );
};

export default Navigation;
