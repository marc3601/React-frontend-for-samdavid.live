import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap';
import Modal from '../../components/Modal';
import {db} from '../../firebase';

const Images = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [modal, isModalActive] = useState(false);
  const [currentImage, setCurentImage] = useState(null);
  const storedImages = [];
  const downloadImages = (category) => {
    db.collection(category)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          storedImages.push(doc.data());
        });
      })
      .finally(() => {
        setImages(storedImages);
        setLoading(false);
      });
  };

  const modalHandlr = (e) => {
    isModalActive(!modal);
    if (e.currentTarget.id !== undefined) setCurentImage(e.currentTarget.id);
  };

  useEffect(() => {
    downloadImages('images');
  }, []);
  return (
    <Container>
      <h2 className="display-4 mb-4 mt-4 pb-4 text-center text-dark border-bottom">
        Images
      </h2>

      {!loading ? (
        <>
          <Row>
            {images.map((image, i) => (
              <Col
                style={{cursor: 'pointer'}}
                onClick={modalHandlr}
                id={i}
                key={i}
                xs={12}
                sm={6}
                lg={6}
              >
                <Image className="w-100 pb-3" src={image.imageSrc} />
              </Col>
            ))}
          </Row>
          {modal && (
            <Modal
              modal={modalHandlr}
              img={images}
              currentImage={currentImage}
            />
          )}
        </>
      ) : (
        <h2 className="text-center text-dark pt-3 pb-3">Images loading...</h2>
      )}
    </Container>
  );
};

export default Images;
