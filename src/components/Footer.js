import React from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap';
import main_logo from '../assets/logo.png';
import Facebook from './utilities/logos/Facebook';
import Instagram from './utilities/logos/Instagram';
import Tiktok from './utilities/logos/Tiktok';

const Footer = () => {
  return (
    <footer className="footer">
      <Container
        fluid
        className="pt-4 pb-3"
        style={{boxShadow: 'inset 0px 4px 2px -3px rgba(0,0,0,0.72)'}}
      >
        <h4 className="display-5 text-center">Contact</h4>
        <Row>
          <Col className="text-right border-right">
            <div className="sam_footer mt-4">
              <Image fluid className="main_logo" src={main_logo} alt="" />
              <p className="pt-2">SAM DAVID</p>
            </div>
          </Col>
          <Col>
            <div className="facebook mt-3">
              <a className="text-dark" href="https://www.facebook.com/">
                <Facebook />
                <span className="ml-2">facebook.com</span>
              </a>
            </div>
            <div className="instagram mt-3">
              <a className="text-dark" href="https://www.instagram.com/">
                <Instagram />
                <span className="ml-2">instagram.com</span>
              </a>
            </div>
            <div className="tiktok mt-3">
              <a className="text-dark" href="https://www.tiktok.com/">
                <Tiktok />
                <span className="ml-2">tiktok.com</span>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
