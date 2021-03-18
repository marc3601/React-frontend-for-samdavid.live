import React, { useState } from "react";
import {
  Container,
  Image,
  Card,
  Col,
  Form,
  Button,
  Row,
  ProgressBar,
  Alert,
} from "react-bootstrap";
import plc from "../assets/devel.png";
import { storageRef, db } from "../firebase";
const Admin = () => {
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const handleUpload = (e) => {
    if (file !== null && file.type === "audio/mpeg") {
      e.preventDefault();
      const title = file.name.slice(0, file.name.length - 4);
      setAlert(false);
      setCompleted(false);
      var metadata = {
        name: title,
      };
      const uploadTask = storageRef
        .child(`songs/${metadata.name}`)
        .put(file, metadata);

      setProgress(0);
      uploadTask.on(
        "state_changed",
        (snapschot) => {
          const progress = Math.round(
            (snapschot.bytesTransferred / snapschot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (err) => {
          setProgress(0);
          setAlert(true);
          setMessage(err.message);
        },
        () => {
          Promise.all([
            uploadTask.snapshot.ref.getMetadata().then((data) => {
              db.collection("songs").doc(metadata.name).set({
                name: data.name,
              });
            }),
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              db.collection("songs").doc(metadata.name).update({
                musicSrc: downloadURL,
              });
            }),
          ])
            .then(() => {
              setCompleted(true);
            })
            .catch((err) => {
              setProgress(0);
              setAlert(true);
              setMessage(err.message);
            });
        }
      );
    } else {
      if (file !== null && file.type !== "audio/mpeg") {
        setAlert(true);
        setMessage("Choose audio file.");
      } else {
        setAlert(true);
        setMessage("Choose file before uploading.");
      }
    }
  };

  return (
    <Container className="text-center">
      <h2 className="display-3  mt-3 mb-3">CMS System</h2>
      <p className="lead">
        Here you will be able te manage all of the website contents like images,
        text or music.
      </p>
      <Image className="w-75" fluid src={plc} />
      <Card className="mt-3 mb-3 w-100 mx-auto" lg={4}>
        <Card.Title className="text-center mt-3 mb-3">
          Upload form for testing purposes.
        </Card.Title>
        <Card.Body>
          <Row>
            <Col className="mx-auto">
              <Form
                className="text-center"
                action="/data"
                method="post"
                encType="multipart/form-data"
              >
                <Form.Group>
                  <Form.File
                    type="file"
                    name="song"
                    id="song"
                    label="Example file input"
                    required
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFile(file);
                    }}
                  />
                  <ProgressBar className="mt-5" now={progress} />
                </Form.Group>
                <Button
                  onClick={handleUpload}
                  className="mt-4"
                  variant="success"
                >
                  Upload
                </Button>
                <Alert className="mt-3" variant="danger" show={alert}>
                  {message}
                </Alert>
                <Alert className="mt-3" variant="success" show={completed}>
                  Upload completed
                </Alert>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Admin;
