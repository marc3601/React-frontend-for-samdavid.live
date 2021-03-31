import React, { useState } from "react";
import FileType from "file-type/browser";
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
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [category, setCategory] = useState("remixes");
  const handleUpload = (e) => {
    if (fileType === "mp3" && duration) {
      e.preventDefault();
      setAlert(false);
      setCompleted(false);
      var metadata = {
        name: fileName,
        duration: duration,
      };
      const uploadTask = storageRef
        .child(`${category}/${metadata.name}`)
        .put(file, metadata);

      setProgress(0);
      uploadTask.on(
        "state_changed",
        (snapschot) => {
          setIsUploading(true);
          const progress = Math.round(
            (snapschot.bytesTransferred / snapschot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (err) => {
          setIsUploading(false);
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
              setIsUploading(false);
              setCompleted(true);
              setDuration(null);
              setFileName("");
              setFileType(null);
            })
            .catch((err) => {
              setIsUploading(false);
              setProgress(0);
              setAlert(true);
              setMessage(err.message);
            });
        }
      );
    } else {
      if (file == null || fileType !== "mp3") {
        setAlert(true);
        setMessage("Please choose mp3 file.");
      } else if (duration === null) {
        setAlert(true);
        setMessage("Wait a second... Duration data is being loaded.");
      }
    }
  };

  const checkFileType = (input) => {
    const url = URL.createObjectURL(input);
    const title = input.name.slice(0, input.name.length - 4);
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          setFileType(null);
        }
      })
      .then(async (blob) => {
        const type = await FileType.fromBlob(blob);
        setFileType(type.ext);
        if (type.ext === "mp3") {
          setFileName(title);
        } else setFileName("");
      })
      .catch((e) => {
        setFileType(null);
        console.log(
          "There has been a problem with your fetch operation: ",
          e.message
        );
      });
  };

  const getFileDuration = (input) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      audioContext.decodeAudioData(e.target.result, (buffer) => {
        const duration = buffer.duration;
        setDuration(convertAudioDuration(duration));
      });
    };
    reader.onerror = (e) => {
      console.error("An error ocurred reading the file: ", e);
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
      <Row className="d-flex justify-content-center">
        <Col lg={8}>
          <Card className="mt-5 shadow p-3 mb-5 bg-white rounded">
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
                          if (file !== null || file !== undefined) {
                            getFileDuration(file);
                            checkFileType(file);
                          }
                        }}
                      />
                      <ProgressBar className="mt-5" now={progress} />
                    </Form.Group>
                    <Button
                      onClick={!isUploading ? handleUpload : undefined}
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
        </Col>
      </Row>

      <Row className="d-flex justify-content-center">
        <Col lg={6}>
          <Card className="mt-5 shadow p-3 mb-5 bg-white rounded">
            <Card.Title className="text-center mt-3 mb-3">
              Detected metadata.
            </Card.Title>
            <Card.Body>
              <Row>
                <Col className="text-left">
                  <p className="lead">
                    <span className="font-weight-bold">Title: </span>
                    {fileName}
                  </p>
                  <p className="lead">
                    <span className="font-weight-bold">Duration: </span>
                    {duration}
                  </p>
                  <p className="lead">
                    <span className="font-weight-bold">File type: </span>
                    {fileType}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
