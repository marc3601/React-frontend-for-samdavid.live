import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";
import "./Navigation.css";
import { Container, Navbar, Nav } from "react-bootstrap";
const Navigation = () => {
  return (
    <nav className="navigation">
      <Container fluid className="p-0">
        <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">DJ Logo</Navbar.Brand>
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
