import React from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap';
import main_logo from '../assets/logo.png';
import Facebook from './utilities/logos/Facebook';
import Instagram from './utilities/logos/Instagram';
import Tiktok from './utilities/logos/Tiktok';
import Whatsapp from './utilities/logos/Whatsapp';
import Phone from './utilities/logos/Phone';

const Footer = () => {
  return (
    <footer className="footer">
      <Container
        fluid
        className="p-4"
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
              <a
                className="text-dark"
                rel="noreferrer"
                target="_blank"
                href="https://www.facebook.com/DjSamDavid1"
              >
                <Facebook />
                <span style={{fontSize: '.8rem'}} className="ml-2">
                  DjSamDavid1
                </span>
              </a>
            </div>
            <div className="instagram mt-3">
              <a
                rel="noreferrer"
                target="_blank"
                className="text-dark"
                href="https://www.instagram.com/djsamdavid619/"
              >
                <Instagram />
                <span style={{fontSize: '.8rem'}} className="ml-2">
                  djsamdavid619
                </span>
              </a>
            </div>
            <div className="tiktok mt-3">
              <a
                rel="noreferrer"
                target="_blank"
                className="text-dark"
                href="https://vm.tiktok.com/ZMeaCUXr6/"
              >
                <Tiktok />
                <span style={{fontSize: '.8rem'}} className="ml-2">
                  djsamdavid
                </span>
              </a>
            </div>
            <div className="whatsapp mt-3">
              <a
                rel="noreferrer"
                target="_blank"
                className="text-dark"
                href="https://wa.me/8613738745657"
              >
                <Whatsapp />
                <span style={{fontSize: '.8rem'}} className="ml-2">
                  +8613738745657
                </span>
              </a>
            </div>
            <div className="phone mt-3">
              <a rel="noreferrer" className="text-dark" href="tel:+48511961344">
                <Phone />
                <span style={{fontSize: '.8rem'}} className="ml-2">
                  +48511961344
                </span>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
