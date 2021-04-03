import React, { useState, useEffect } from "react";
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
import ListItems from "../components/ListItems";
import "./Admin.css";
const Admin = () => {
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState(false);
  const [alertD, setAlertD] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [category, setCategory] = useState("remixes");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let container = [];

  const handleDelete = (item) => {
    console.log(item.name);
  };

  const downloadMusic = (location) => {
    db.collection(location)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          container.push(doc.data());
        });
      })
      .finally(() => {
        setData(container);
        setLoading(false);
      });
  };

  useEffect(() => {
    downloadMusic(category);
  }, [category]);

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
            uploadTask.snapshot.ref
              .getMetadata()
              .then((data) => {
                db.collection(category).doc(metadata.name).set({
                  name: data.name,
                  duration: duration,
                });
              })
              .catch((e) => {
                setAlert(true);
                setMessage("Problem during upload with name or duration.");
              }),

            uploadTask.snapshot.ref
              .getDownloadURL()
              .then((downloadURL) => {
                db.collection(category).doc(metadata.name).update({
                  musicSrc: downloadURL,
                });
              })
              .catch((e) => {
                setAlert(true);
                setMessage("Problem during upload with file url.");
              }),
          ])
            .then(() => {
              setIsUploading(false);
              setCompleted(true);
              setDuration(null);
              setFileName("");
              setFileType(null);
              downloadMusic(category);
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
    if (input instanceof Blob) {
      reader.readAsArrayBuffer(input);
    }
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
      case "4":
        setCategory("test");
        break;
      default:
        break;
    }
  };

  const setTableCategoryName = (choice) => {
    switch (choice) {
      case "remixes":
        return "Remixes.";
      case "dj-sets":
        return "Dj sets.";
      case "original-music":
        return "Original music.";
      case "projects":
        return "Projects.";
      case "test":
        return "Test.";
      default:
        break;
    }
  };

  return (
    <Container fluid className="customAdminBackground">
      <Container className="text-center">
        <h2 className="display-4 pt-3 mb-4 text-light">Content management</h2>
        <p className="lead font-weight-bold">Music upload system</p>
        <Row className="d-flex justify-content-center">
          <Col lg={12}>
            {alertD && (
              <Alert
                onClose={() => setAlertD(false)}
                dismissible
                variant="info"
              >
                <Alert.Heading>Instruction. (Work in progress)</Alert.Heading>
                <ul
                  style={{
                    paddingLeft: 0,
                    listStylePosition: "inside",
                    textAlign: "left",
                  }}
                >
                  <li>Choose music category.</li>
                  <li>Choose mp3 file to upload.</li>
                  <li>
                    Wait until all three fields in "Detected metadata" are
                    filled. (1-5s.)
                  </li>
                  <li>Click upload.</li>
                  <li>Message will appear when upload is completed.</li>
                  <li>Refresh the page if you want to cancel the upload.</li>
                  <br />
                  <li>
                    Ability to upload images & delete songs etc. will be added
                    soon.
                  </li>
                  <li>
                    You may expierience some random crashes of this system and
                    it is expected at this point. (Simple refresh will bring
                    things back to normal) There' still some work to do with
                    stability and error handling of this system. Will fix that
                    soon. 🙂
                  </li>
                </ul>
              </Alert>
            )}
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col lg={6}>
            <Card className="mt-2 shadow p-3 mb-5 bg-white rounded">
              <Card.Title className="text-center mt-2 mb-3" md={4}>
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
                          disabled={isUploading}
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
                          <option value="4">Test</option>
                        </Form.Control>
                        <Form.File
                          disabled={isUploading}
                          type="file"
                          name="song"
                          id="song"
                          label="Choose audio file to upload."
                          required
                          className="mt-4"
                          onChange={(e) => {
                            setAlert(false);
                            setMessage(false);
                            setDuration(null);
                            setFileName("");
                            setFileType(null);
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
                      <Alert
                        className="mt-3"
                        variant="success"
                        show={completed}
                      >
                        Upload completed
                      </Alert>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="mt-2 shadow p-3 mb-5 bg-white rounded">
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
        <Row>
          <Col lg={12} className="pb-5">
            <h3 className="display-5 pt-3 mb-4 text-light">
              List of tracks in {setTableCategoryName(category)}
            </h3>
            {
              <ListItems
                isUploading={isUploading}
                playlist={data}
                load={loading}
                handleDelete={handleDelete}
              />
            }
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Admin;
