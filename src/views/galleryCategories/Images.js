import React, {useState} from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap';
import Modal from '../../components/Modal';
const storedImages = [
  'https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/images%2Fsam1.jpg?alt=media&token=30a1a71f-8e5d-42e8-9a0d-3d743a2f85f2',
  'https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/images%2Fsam2.jpg?alt=media&token=6704ab2d-cbe3-4695-87ce-ce55728ff102',
  'https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/images%2Fsam3.jpg?alt=media&token=804f875a-03cb-405e-ae6d-aa14d1e9b403',
  'https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/images%2Fsam4.jpg?alt=media&token=9b0dacc2-79b3-4fd7-b737-929094510871',
  'https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/images%2Fsam5.jpg?alt=media&token=968ddaa4-6f95-438f-a2d4-79074e5e8350',
  'https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/images%2Fsam6.jpg?alt=media&token=fcd7106a-7379-4917-b794-a01d9c07e290',
  'https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/images%2Fsam9.jpg?alt=media&token=eed96396-c8fc-4b4c-a8f2-2271daccfe1b',
  'https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/images%2Fsam10.jpg?alt=media&token=4c85f72f-4ee3-4d96-9992-268130a18662',
  'https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/images%2Fsam12.jpeg?alt=media&token=114e9040-b99f-42c8-84c4-7bd113ddeece',
  'https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/images%2Fsam13.jpg?alt=media&token=ed03d45b-a0de-41d1-a7a9-d1b525d58e2b',
];

const Images = () => {
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

      <Row>
        {storedImages.map((image, i) => (
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
        <Modal
          modal={modalHandlr}
          img={storedImages}
          currentImage={currentImage}
        />
      )}
    </Container>
  );
};

export default Images;
