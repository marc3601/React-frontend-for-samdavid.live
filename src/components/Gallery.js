import React from 'react';
import { Container, Image } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';
import '../assets/dist/assets/owl.carousel.min.css';
import '../assets/dist/assets/owl.theme.default.min.css';
import img1 from '../assets/u1.jpg';
import img2 from '../assets/u2.jpg';
import img3 from '../assets/u3.jpg';
import img4 from '../assets/u4.jpg';
import img5 from '../assets/u5.jpg';
import img6 from '../assets/u6.jpg';

const Gallery = ({ width }) => {
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
      className={`main_gallery ${width > 1000 ? 'p-5' : width > 750 ? 'p-4' : 'p-3'
        }`}
    >
      {/* <h2 className="custom_h2 lead display-3 text-light text-center pt-3 pb-5">
        My work
      </h2> */}
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
        <div className="item">
          <Image fluid src={img6}></Image>
        </div>
      </OwlCarousel>
    </Container>
  );
};

export default Gallery;
