import React from 'react';
import {Container, Image, Button, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import '../assets/dist/assets/owl.carousel.min.css';
import '../assets/dist/assets/owl.theme.default.min.css';
import img1 from '../assets/sm1.jpeg';
import img2 from '../assets/sm2.jpg';
import img3 from '../assets/sm3.jpg';
import img4 from '../assets/sm4.jpeg';
import img5 from '../assets/sm5.jpeg';
import './Gallery.css';
const Gallery = ({width}) => {
  const options = {
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 1,
      },
      700: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };
  return (
    <Container
      fluid
      className={`main_gallery ${
        width > 1000 ? 'p-5' : width > 750 ? 'p-4' : 'p-3'
      }`}
    >
      <h2 className="custom_h2 lead display-3 text-light text-center pt-3 pb-5">
        My work
      </h2>
      <OwlCarousel className="owl-theme" lazyLoad loop margin={10} {...options}>
        <div className="item">
          <Image fluid src={img5}></Image>
        </div>
        <div className="item">
          <Image fluid src={img1}></Image>
        </div>
        <div className="item">
          <Image fluid src={img2}></Image>
        </div>
        <div className="item">
          <Image fluid src={img3}></Image>
        </div>
        <div className="item">
          <Image fluid src={img4}></Image>
        </div>
      </OwlCarousel>
      <Row>
        <Col className="text-center">
          <Link to="/gallery">
            <Button className="custom_btn mb-5" variant="danger" size="lg">
              See more
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Gallery;
