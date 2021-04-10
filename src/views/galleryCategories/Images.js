import React, {useState} from 'react';
import {Container, Row, Col, Image, Alert} from 'react-bootstrap';
import img1 from '../../assets/sam1.jpg';
import img2 from '../../assets/sam2.jpg';
import img3 from '../../assets/sam3.jpg';
import img4 from '../../assets/sam4.jpg';
import img5 from '../../assets/sam5.jpg';
import img6 from '../../assets/sam6.jpg';
import img7 from '../../assets/sam7.jpg';
import img9 from '../../assets/sam9.jpg';
import img10 from '../../assets/sam10.jpg';
import img11 from '../../assets/sam11.jpg';
import img12 from '../../assets/sam12.jpeg';
import img13 from '../../assets/sam13.jpg';
import Modal from '../../components/Modal';
const arr1 = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img9,
  img10,
  img11,
  img12,
  img13,
];

const Images = () => {
  const [alert, setAlert] = useState(true);
  const [modal, isModalActive] = useState(false);
  const [currentImage, setCurentImage] = useState(null);

  const modalHandlr = (e) => {
    isModalActive(!modal);
    if (e.currentTarget.id !== undefined) setCurentImage(e.currentTarget.id);
  };
  return (
    <Container>
      <h2 className="display-4 mb-4 mt-4 pb-4 text-center text-dark border-bottom">
        Images
      </h2>
      {alert && (
        <Alert onClose={() => setAlert(false)} dismissible variant="danger">
          <Alert.Heading>Work in progress.</Alert.Heading>
          Not all features are available yet.
        </Alert>
      )}
      <Row>
        {arr1.map((image, i) => (
          <Col
            style={{cursor: 'pointer'}}
            onClick={modalHandlr}
            id={i}
            key={i}
            xs={12}
            sm={6}
            lg={6}
          >
            <Image className="w-100 pb-3" src={image} />
          </Col>
        ))}
      </Row>
      {modal && (
        <Modal modal={modalHandlr} img={arr1} currentImage={currentImage} />
      )}
    </Container>
  );
};

export default Images;
