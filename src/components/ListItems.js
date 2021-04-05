import React, {useState} from 'react';
import {Table, Button, Modal} from 'react-bootstrap';
const ListItems = ({
  playlist,
  load,
  isUploading,
  setIsUploading,
  handleDelete,
}) => {
  const [deleteBox, setDeleteBox] = useState(false);
  const [active, setActive] = useState(null);

  return (
    <>
      <Table striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Artist</th>
            <th>Track</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!load ? (
            playlist.map((item, i) => (
              <tr key={i}>
                <td style={{width: '10%'}}>{i + 1}</td>
                <td style={{width: '20%'}}>Sam David</td>
                <td>{item.name}</td>
                <td style={{width: '10%'}}>
                  <Button
                    onClick={() => {
                      setActive(item);
                      setDeleteBox(true);
                    }}
                    disabled={isUploading}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={{width: '10%'}}>Loading...</td>
              <td style={{width: '20%'}}>Loading...</td>
              <td>Loading...</td>
              <td style={{width: '10%'}}>Loading...</td>
            </tr>
          )}
        </tbody>
      </Table>
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
            id="yes"
            variant="success"
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              setDeleteBox(false);
            }}
            id="no"
            variant="danger"
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListItems;
