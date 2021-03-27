import { logRoles } from "@testing-library/dom";
import React, { useState } from "react";
import {
  Container,
  Card,
  Col,
  Form,
  Button,
  Row,
  ProgressBar,
  Alert,
} from "react-bootstrap";
import { storageRef, db } from "../firebase";
const Admin = () => {
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(null);
  const [category, setCategory] = useState("remixes");

  const handleUpload = (e) => {
    if (file !== null) {
      if (
        file.type === "audio/mpeg" ||
        file.type === "audio/ogg" ||
        file.type === "audio/wav"
      ) {
        e.preventDefault();
        const title = file.name.slice(0, file.name.length - 4);
        setAlert(false);
        setCompleted(false);
        var metadata = {
          name: title,
          duration: duration,
        };
        const uploadTask = storageRef
          .child(`${category}/${metadata.name}`)
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
                db.collection(category).doc(metadata.name).set({
                  name: data.name,
                  duration: duration,
                });
              }),

              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                db.collection(category).doc(metadata.name).update({
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
      }
    } else {
      if (file == null || file.type !== "audio/mpeg") {
        setAlert(true);
        setMessage("Choose audio file before uploading.");
      }
    }
  };

  const getFileDuration = (input) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      audioContext.decodeAudioData(event.target.result, function (buffer) {
        const duration = buffer.duration;
        setDuration(convertAudioDuration(duration));
        return duration;
      });
    };
    reader.onerror = function (event) {
      console.error("An error ocurred reading the file: ", event);
    };

    reader.readAsArrayBuffer(input);
  };

  const convertAudioDuration = (convert) => {
    var minutes = "0" + Math.floor(convert / 60);
    var seconds = "0" + Math.floor(convert - minutes * 60);
    var dur = minutes.substr(-2) + ":" + seconds.substr(-2);
    return dur;
  };

  const setUserChoice = (choice) => {
    switch (choice) {
      case "0":
        setCategory("remixes");
        break;
      case "1":
        setCategory("dj-sets");
        break;
      case "2":
        setCategory("original-music");
        break;
      case "3":
        setCategory("projects");
        break;
      default:
        break;
    }
  };

  return (
    <Container className="text-center">
      <h2 className="display-4  mt-3 mb-4">Content management</h2>
      <p className="lead">Music upload system</p>
      <Card className="mt-5 mb-3 ">
        <Card.Title className="text-center mt-3 mb-3" md={4}>
          Choose category and file to upload.
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
                  <Form.Control
                    as="select"
                    className="mr-sm-2"
                    label="Choose category."
                    id="inlineFormCustomSelect"
                    custom
                    onChange={(e) => setUserChoice(e.target.value)}
                  >
                    <option value="0">Remixes</option>
                    <option value="1">Dj sets</option>
                    <option value="2">Original music</option>
                    <option value="3">Projects</option>
                  </Form.Control>
                  <Form.File
                    type="file"
                    name="song"
                    id="song"
                    label="Choose audio file to upload."
                    required
                    className="mt-4"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFile(file);
                      if (file.type !== null) {
                        getFileDuration(file);
                      }
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
