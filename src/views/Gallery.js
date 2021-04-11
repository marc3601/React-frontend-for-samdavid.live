import React from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import cat1 from '../assets/sam9.jpg';
import cat2 from '../assets/sam3.jpg';
const Gallery = () => {
  const categories = [
    {title: 'Images', image: cat1, link: 'images'},
    {title: 'Videos', image: cat2, link: 'videos'},
  ];

  return (
    <Container className="pb-4">
      <h2 className="display-4 mb-4 mt-4 text-center text-dark">Gallery</h2>
      <Row className="justify-content-md-center">
        {categories.map((item, i) => (
          <Col className="position-relative" key={i} id={i} xs={12} lg={6}>
            <Card className="position-relative mb-4">
              <Link
                style={{textDecoration: 'none'}}
                className="overflow-hidden text-center"
                to={'/gallery/' + item.link}
              >
                <HeadingContainer image={item.image}>
                  <HeadingOverlay />
                  <Heading>{item.title}</Heading>
                </HeadingContainer>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Gallery;

const Heading = styled.h3`
  position: relative;
  top: 50%;
  transform: translateY(-60%);
  color: white;
  font-size: 3rem;
  padding: 0 1rem;
  transition: 0.1s ease;
`;

const HeadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  opacity: 0.6;
  transition: 0.5s ease;
  display: none;
`;

const HeadingContainer = styled.div`
  position: relative;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
  height: 400px;
  text-align: center;
  transition: all 0.5s;
  &:hover ${Heading} {
    font-size: 3.2rem;
    transform: translateY(-50%);
  }
  &:hover ${HeadingOverlay} {
    display: block;
  }
  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 576px) {
    height: 330px;
    background-position: top;
  }
`;
