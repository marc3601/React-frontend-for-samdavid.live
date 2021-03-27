import React, { useState } from "react";
import { Container, Row, Col, Image, Alert } from "react-bootstrap";
import img1 from "../assets/sam1.jpg";
import img2 from "../assets/sam2.jpg";
import img3 from "../assets/sam3.jpg";
import img4 from "../assets/sam4.jpg";
import img5 from "../assets/sam5.jpg";
import img6 from "../assets/sam6.jpg";

const arr1 = [img1, img2, img3];
const arr2 = [img4, img5, img6];
const Gallery = () => {
  const [alert, setAlert] = useState(true);
  return (
    <Container>
      <h2 className="display-3 text-center  text-dark">Gallery</h2>
      {alert && (
        <Alert onClose={() => setAlert(false)} dismissible variant="danger">
          <Alert.Heading>Work in progress.</Alert.Heading>
          Not all features are available yet.
        </Alert>
      )}
      <Row>
        <Col lg={6} md={12}>
          {arr1.map((item,i) => (
            <Image
              fluid
              src={item}
              rounded
              className="w-100 shadow-sm p-3 bg-white"
              key={i}
            />
          ))}
        </Col>
        <Col lg={6} md={12}>
          {arr2.map((item,i) => (
            <Image
              fluid
              src={item}
              rounded
              className="w-100 shadow-sm p-3 bg-white"
              key={i}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Gallery;
