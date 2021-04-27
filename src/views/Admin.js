import React, {useState, useEffect} from 'react';
import {
  Container,
  Card,
  Col,
  Form,
  Button,
  Row,
  ProgressBar,
  Alert,
  Tab,
  Tabs,
} from 'react-bootstrap';
import {storageRef, db} from '../firebase';
import ListItems from '../components/ListItems';
import AdminImages from '../components/AdminImages';
import QuestionMark from '../components/utilities/logos/QuestionMark';
import './Admin.css';
import {getDateTime} from '../components/utilities/getDateTime';
import {handleImageUpload} from '../components/utilities/mainFunctions';
import {handleMusicUpload} from '../components/utilities/mainFunctions';
import setTableCategoryName from '../components/utilities/setTableCategoryName';
import setUserChoice from '../components/utilities/setUserChoice';
import getFileDuration from '../components/utilities/getFileDuration';
import checkFileType from '../components/utilities/checkFileType';
const Admin = () => {
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState(false);
  const [alertD, setAlertD] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTime, setUploadTime] = useState('');
  const [category, setCategory] = useState('remixes');
  const [music, setMusic] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('music');
  let container = [];
  let storedImages = [];

  const handleMusicDelete = (item, disable) => {
    disable(true);
    const deleteRef = storageRef.child(`${category}/${item.name}`);
    deleteRef
      .delete()
      .then(() => {
        db.collection(category)
          .doc(item.name)
          .delete()
          .then(() => {
            downloadMusic(category);
            disable(false);
          });
      })
      .catch((e) => {
        setAlert(true);
        setMessage("It appears there's no such file in database!");
        disable(false);
        setTimeout(() => {
          setAlert(false);
          setMessage('');
        }, 2000);
      });
  };
  const handleImageDelete = (item, disable) => {
    disable(true);
    const deleteRef = storageRef.child(`images/${item.name}`);
    deleteRef
      .delete()
      .then(() => {
        db.collection('images')
          .doc(item.name)
          .delete()
          .then(() => {
            downloadImages('images');
            disable(false);
          });
      })
      .catch((e) => {
        console.log(e);
        setAlert(true);
        setMessage("It appears there's no such file in database!");
        disable(false);
        setTimeout(() => {
          setAlert(false);
          setMessage('');
        }, 2000);
      });
  };

  const downloadMusic = (location) => {
    setLoading(true);
    db.collection(location)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          container.push(doc.data());
        });
      })
      .finally(() => {
        setMusic(container);
        setLoading(false);
      });
  };

  const downloadImages = (category) => {
    setLoading(true);
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

  useEffect(() => {
    key === 'music' && downloadMusic(category);
    key === 'images' && downloadImages('images');
  }, [category, key]);

  return (
    <Container fluid className="customAdminBackground">
      <Container className="text-center">
        <h2 className="display-5 pt-3 mb-4 text-light">Content management</h2>
        <Tabs
          className="pt-4"
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => {
            setFile(null);
            setAlert(false);
            setAlertD(false);
            setCompleted(false);
            setMessage('');
            setProgress(0);
            setDuration(null);
            setFileName('');
            setFileType(null);
            setIsUploading(false);
            setUploadTime('');
            setKey(k);
          }}
        >
          <Tab eventKey="music" title="Music" disabled={isUploading}>
            <p className="lead pt-3 font-weight-bold text-light">
              Music upload system
            </p>
            <Row className="d-flex justify-content-center">
              <Col lg={12}>
                {alertD && (
                  <Alert
                    onClose={() => setAlertD(false)}
                    dismissible
                    variant="info"
                  >
                    <Alert.Heading>
                      Instruction. (Work in progress)
                    </Alert.Heading>
                    <ul
                      style={{
                        paddingLeft: 0,
                        listStylePosition: 'inside',
                        textAlign: 'left',
                      }}
                    >
                      <li>Choose music category.</li>
                      <li>Choose mp3 file to upload.</li>
                      <li>
                        Wait until all three fields in "Detected metadata" are
                        filled. (1-5s.)
                      </li>
                      <li>In "Detected metadata" you can change file title.</li>
                      <li>Click upload.</li>
                      <li>Message will appear when upload is completed.</li>
                      <li>
                        List of songs in current category will be automatically
                        updated. (If not, refresh.)
                      </li>
                      <li>
                        Refresh the page if you want to cancel the upload.
                      </li>
                      <li>
                        Click delete button next to the file you want to remove.
                      </li>
                      <br />
                      <ul>
                        <li>
                          You may expierience some random crashes of this system
                          and it is expected at this point. (Simple refresh will
                          bring things back to normal) There' still some work to
                          do with stability and error handling of this system.
                          Will fix that soon. 🙂
                        </li>
                        <li>More features soon.</li>
                      </ul>
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
                              onChange={(e) =>
                                setUserChoice(e.target.value, setCategory)
                              }
                            >
                              <option value="0">Remixes</option>
                              <option value="1">Dj sets</option>
                              <option value="2">Original music</option>
                              <option value="3">Projects</option>
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
                                setFileName('');
                                setFileType(null);
                                const file = e.target.files[0];
                                setFile(file);
                                if (file !== null && file !== undefined) {
                                  const time = getDateTime();
                                  setUploadTime(time);
                                  checkFileType(
                                    file,
                                    setFileType,
                                    setFileName,
                                    'mp3'
                                  );
                                  getFileDuration(file, setDuration);
                                }
                              }}
                            />
                            <ProgressBar className="mt-5" now={progress} />
                          </Form.Group>
                          <Button
                            onClick={
                              !isUploading
                                ? (e) =>
                                    handleMusicUpload(
                                      e,
                                      fileType,
                                      fileName,
                                      duration,
                                      setAlert,
                                      setCompleted,
                                      uploadTime,
                                      storageRef,
                                      category,
                                      file,
                                      setProgress,
                                      setIsUploading,
                                      setMessage,
                                      db,
                                      setDuration,
                                      setFileName,
                                      downloadMusic,
                                      setFileType
                                    )
                                : undefined
                            }
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
                          <input
                            minLength={5}
                            maxLength={100}
                            className="editable_title"
                            type="text"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            disabled={isUploading}
                          />
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
                <ListItems
                  isUploading={isUploading}
                  playlist={music}
                  load={loading}
                  handleDelete={handleMusicDelete}
                  setIsUploading={setIsUploading}
                />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="images" title="Images" disabled={isUploading}>
            <p className="lead pt-3 font-weight-bold text-light">
              Image upload system
            </p>
            <Row className="d-flex justify-content-center">
              <Col lg={6}>
                <Card className="mt-2 shadow p-3 mb-5 bg-white rounded">
                  <Card.Title className="text-center mt-2 mb-3" md={4}>
                    Choose file to upload.
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
                              disabled={isUploading}
                              type="file"
                              name="image"
                              id="image"
                              required
                              className="mt-4"
                              onChange={(e) => {
                                setAlert(false);
                                setMessage(false);
                                setFileName('');
                                setFileType(null);
                                const file = e.target.files[0];
                                setFile(file);
                                if (file !== null && file !== undefined) {
                                  const time = getDateTime();
                                  setUploadTime(time);
                                  checkFileType(
                                    file,
                                    setFileType,
                                    setFileName,
                                    'jpg'
                                  );
                                }
                              }}
                            />
                            <ProgressBar className="mt-5" now={progress} />
                          </Form.Group>
                          <Button
                            onClick={
                              !isUploading
                                ? (e) =>
                                    handleImageUpload(
                                      e,
                                      fileType,
                                      fileName,
                                      setAlert,
                                      setCompleted,
                                      uploadTime,
                                      storageRef,
                                      file,
                                      setProgress,
                                      setIsUploading,
                                      setMessage,
                                      db,
                                      setDuration,
                                      setFileName,
                                      setFileType,
                                      downloadImages
                                    )
                                : undefined
                            }
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
                          <input
                            minLength={5}
                            maxLength={100}
                            className="editable_title"
                            type="text"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            disabled={isUploading}
                          />
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
            <AdminImages
              images={images}
              load={loading}
              handleDelete={handleImageDelete}
              setIsUploading={setIsUploading}
            />
          </Tab>
          <Tab eventKey="videos" title="Videos" disabled>
            Videos
          </Tab>
        </Tabs>
      </Container>
      {key === 'music' && (
        <div className="question" onClick={() => setAlertD(!alertD)}>
          <QuestionMark />
          <p className="instr">Instructions</p>
        </div>
      )}
    </Container>
  );
};

export default Admin;
