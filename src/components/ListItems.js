import React from 'react';
import {Table, Button} from 'react-bootstrap';
const ListItems = ({
  playlist,
  load,
  isUploading,
  setIsUploading,
  handleDelete
}) => {
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
                      handleDelete(item, setIsUploading);
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
    </>
  );
};

export default ListItems;
