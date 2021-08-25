import React, { useState } from 'react';
import { Row, Col, Image, Modal, Button, Alert } from 'react-bootstrap';
import './AdminImages.css';
import Delete from '../components/utilities/logos/Delete';
const AdminImages = ({
  images,
  load,
  isUploading,
  setIsUploading,
  handleDelete,
}) => {
  const [active, setActive] = useState(null);
  const [alert, setAlert] = useState(true);
  const [deleteBox, setDeleteBox] = useState(false);
  return !load ? (
    <>
      {alert && (
        <Alert onClose={() => setAlert(false)} dismissible variant="info">
          <Alert.Heading>Instruction.</Alert.Heading>
          <ul
            style={{
              paddingLeft: 0,
              listStylePosition: 'inside',
              textAlign: 'left',
            }}
          >
            <li>
              It is recommended to keep consistent aspect ratio across all
              images eg. 3:2. (For now)
            </li>
            <li>Various image sizes will cause uneven grid layout.</li>
            <li>Will change that to handle various image sizes later.</li>
            <li>Try to keep images as small as possible. (100,200kB)</li>
            <li>Only .jpg files.</li>
            <li>You can rename photos. Images are sorted alphabetically.</li>
          </ul>
        </Alert>
      )}
      <Row>
        {images.map((image, i) => (
          <Col className="image_container" id={i} key={i} xs={12} sm={6} lg={3}>
            <div className="image_plc mb-3">
              <Image className="w-100" src={image.imageSrc} />
            </div>
            <button
              onClick={() => {
                setActive(image);
                setDeleteBox(true);
              }}
              className="image_delete"
              disabled={isUploading}
            >
              <div className="button_inner">
                <Delete />
              </div>
            </button>
          </Col>
        ))}
        <Modal
          className="text-center"
          show={deleteBox}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
        >
          <Modal.Body>
            <p>Are you sure you want to delete this file?</p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button
              onClick={() => {
                handleDelete(active, setIsUploading);
                setDeleteBox(false);
              }}
              variant="success"
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                setDeleteBox(false);
              }}
              variant="danger"
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </>
  ) : (
    <h2 className="text-center text-dark pt-3 pb-3">Images loading...</h2>
  );
};
export default AdminImages;
