import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navigation.css";
import main_logo from "../assets/logo.png"
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
const Navigation = ({ width }) => {
  const [expanded, setExpanded] = useState(false);
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <nav className="navigation">
      <Container>
        <Navbar
          sticky="top"
          className="black_nav"
          collapseOnSelect
          expand="lg"
          variant="dark"
          expanded={expanded}
          onToggle={() => setExpanded(!expanded)}
        >
          <Link onClick={() => width < 992 && setExpanded(false)} to="/">
            <Image fluid className="main_logo" src={main_logo} alt="" />
          </Link>

          <Navbar.Toggle
            id="responsive-navbar-nav"
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse>
            <Nav className="ml-auto">
              <Link
                onClick={() => width < 992 && setExpanded(!expanded)}
                className="nav_element"
                to="/"
              >
                Home
              </Link>
              <Link
                onClick={() => width < 992 && setExpanded(!expanded)}
                className="nav_element"
                to="/music"
              >
                Music
              </Link>
              <Link
                onClick={() => width < 992 && setExpanded(!expanded)}
                className="nav_element"
                to="/services"
              >
                Services
              </Link>
              {currentUser && (
                <Button
                  variant="danger"
                  onClick={() => {
                    width < 992 && setExpanded(!expanded);
                    handleLogout();
                  }}
                  className={width > 992 && "ml-3"}
                >
                  Logout
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </nav>
  );
};

export default Navigation;
