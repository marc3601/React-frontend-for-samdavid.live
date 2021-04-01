import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import cat1 from "../assets/category1.jpg";
import cat2 from "../assets/category2.jpg";
import cat3 from "../assets/category3.jpg";
import cat4 from "../assets/category4.jpg";
const Music = () => {
  return (
    <Container>
      <h2 className="display-4 mb-2 mt-4 text-center text-dark">Music</h2>
      <p className="lead text-dark text-center pt-2  mb-5">
        Explore music categories.
      </p>
      <Row className="justify-content-md-center">
        <Col xl={6} lg={6}>
          {" "}
          <Card className="position-relative">
            <Link
              style={{ textDecoration: "none" }}
              className="overflow-hidden text-center"
              to="/music/remix"
            >
              <HeadingContainer image={cat1}>
                <HeadingOverlay />
                <Heading>Remix</Heading>
              </HeadingContainer>
            </Link>
          </Card>
          <Card className="position-relative">
            <Link
              style={{ textDecoration: "none" }}
              className="overflow-hidden text-center"
              to="/music/original-music"
            >
              {/* <h3 className="text-dark">Original music</h3>
              <Image fluid src={cat2} /> */}
              <HeadingContainer image={cat2}>
                <HeadingOverlay />
                <Heading>Original music</Heading>
              </HeadingContainer>
            </Link>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card className="position-relative">
            <Link
              style={{ textDecoration: "none" }}
              className="overflow-hidden text-center"
              to="/music/dj-sets"
            >
              {/* <h3 className="text-dark">Dj sets</h3>
              <Image fluid src={cat3} /> */}
              <HeadingContainer image={cat3}>
                <HeadingOverlay />
                <Heading>Dj sets</Heading>
              </HeadingContainer>
            </Link>
          </Card>
          <Card className="position-relative">
            <Link
              style={{ textDecoration: "none" }}
              className="overflow-hidden text-center"
              to="/music/projects"
            >
              {/* <h3 className="text-dark">Projects</h3>
              <Image fluid src={cat4} /> */}
              <HeadingContainer image={cat4}>
                <HeadingOverlay />
                <Heading>Projects</Heading>
              </HeadingContainer>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Music;

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
  transition: 0.1s ease;
  display: none;
`;

const HeadingContainer = styled.div`
  position: relative;
  background-image: url(${(props) => props.image});
  height: 400px;
  text-align: center;
  margin-bottom: 20px;
  &:hover ${Heading} {
    font-size: 3.2rem;
    transform: translateY(-50%);
  }
  &:hover ${HeadingOverlay} {
    display: block;
  }
`;
