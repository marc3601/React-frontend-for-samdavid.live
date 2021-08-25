import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import './ListItemsVideo.css';
const ListItemsVideo = ({
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
      <Table
        className="tableMain"
        striped
        bordered
        hover
        variant="dark"
        responsive
      >
        <thead className="tableMain">
          <tr>
            <th>#</th>
            <th>Video</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!load &&
            playlist.map((item, i) => (
              <tr key={i}>
                <td style={{ width: '10%' }}>{i + 1}</td>
                <td>
                  <div className="title_container">{item.name}</div>
                  <div className="time_container">
                    <span> {item.uploadTime || ''}</span>
                  </div>
                </td>
                <td style={{ width: '10%' }}>
                  <Button
                    onClick={() => {
                      setActive(item);
                      setDeleteBox(true);
                    }}
                    disabled={isUploading}
                    variant="danger"
                    className="btn_styles"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
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
    </>
  );
};

export default ListItemsVideo;
