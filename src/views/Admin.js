import React, {useState, useEffect} from 'react';
import FileType from 'file-type/browser';
import {
  Container,
  Card,
  Col,
  Form,
  Button,
  Row,
  ProgressBar,
  Alert,
} from 'react-bootstrap';
import {storageRef, db} from '../firebase';
import ListItems from '../components/ListItems';
import './Admin.css';
import {getDateTime} from '../components/utilities/getDateTime';
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let container = [];

  const handleDelete = (item, disable) => {
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
    e.preventDefault();
    if (fileType === 'mp3' && duration) {
      setAlert(false);
      setCompleted(false);
      const metadata = {
        name: fileName,
        duration: duration,
        uploadTime: uploadTime,
      };
      const uploadTask = storageRef
        .child(`${category}/${metadata.name}`)
        .put(file, metadata);

      setProgress(0);
      uploadTask.on(
        'state_changed',
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
          const audioDataUpload = new Promise((resolve, reject) => {
            resolve(
              uploadTask.snapshot.ref.getMetadata().then((data) => {
                db.collection(category).doc(metadata.name).set({
                  name: data.name,
                  duration: duration,
                  uploadTime: uploadTime,
                });
              })
            );
          });

          audioDataUpload
            .then(() => {
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                db.collection(category).doc(metadata.name).update({
                  musicSrc: downloadURL,
                });
              });
            })
            .then(() => {
              setIsUploading(false);
              setCompleted(true);
              setDuration(null);
              setFileName('');
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
      if (file == null || fileType !== 'mp3') {
        setAlert(true);
        setMessage('Please choose mp3 file.');
      } else if (duration === null) {
        setAlert(true);
        setMessage('Wait a second... Duration data is being loaded.');
      }
    }
  };

  const checkFileType = (input) => {
    if (input.type) {
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
          if (type.ext === 'mp3') {
            setFileName(title);
          } else setFileName('');
        })
        .catch((e) => {
          setFileType(null);
          console.log(
            'There has been a problem with your fetch operation: ',
            e.message
          );
        });
    }
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
      console.error('An error ocurred reading the file: ', e);
    };
    if (input instanceof Blob) {
      reader.readAsArrayBuffer(input);
    }
  };

  const convertAudioDuration = (convert) => {
    var minutes = '0' + Math.floor(convert / 60);
    var seconds = '0' + Math.floor(convert - minutes * 60);
    var dur = minutes.substr(-2) + ':' + seconds.substr(-2);
    return dur;
  };

  const setUserChoice = (choice) => {
    switch (choice) {
      case '0':
        setCategory('remixes');
        break;
      case '1':
        setCategory('dj-sets');
        break;
      case '2':
        setCategory('original-music');
        break;
      case '3':
        setCategory('projects');
        break;
      default:
        break;
    }
  };

  const setTableCategoryName = (choice) => {
    switch (choice) {
      case 'remixes':
        return 'Remixes.';
      case 'dj-sets':
        return 'Dj sets.';
      case 'original-music':
        return 'Original music.';
      case 'projects':
        return 'Projects.';
      default:
        break;
    }
  };

  return (
    <Container fluid className="customAdminBackground">
      <Container className="text-center">
        <h2 className="display-5 pt-3 mb-4 text-light">Content management</h2>
        <p className="lead font-weight-bold text-light">Music upload system</p>
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
                    listStylePosition: 'inside',
                    textAlign: 'left',
                  }}
                >
                  <li>Choose music category.</li>
                  <li>Choose mp3 file to upload.</li>
                  <li>
                    Check if the file title looks good. (Not too long etc.)
                  </li>
                  <li>
                    Wait until all three fields in "Detected metadata" are
                    filled. (1-5s.)
                  </li>
                  <li>Click upload.</li>
                  <li>Message will appear when upload is completed.</li>
                  <li>
                    List of song in current category will be automatically
                    updated. (If not, refresh.)
                  </li>
                  <li>Refresh the page if you want to cancel the upload.</li>
                  <li>
                    Click delete button next to the file you want to remove.
                  </li>
                  <br />
                  <ul>
                    <li>
                      You may expierience some random crashes of this system and
                      it is expected at this point. (Simple refresh will bring
                      things back to normal) There' still some work to do with
                      stability and error handling of this system. Will fix that
                      soon. 🙂
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
                          onChange={(e) => setUserChoice(e.target.value)}
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
                downloadMusic={downloadMusic}
                category={category}
                setIsUploading={setIsUploading}
              />
            }
          </Col>
        </Row>
      </Container>
      <div className="question" onClick={() => setAlertD(!alertD)}>
        <svg
          version="1.1"
          id="quest"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="40px"
          height="40px"
          viewBox="0 0 93.936 93.936"
          fill="#fdf03e"
        >
          <g>
            <path
              d="M80.179,13.758c-18.342-18.342-48.08-18.342-66.422,0c-18.342,18.341-18.342,48.08,0,66.421
		c18.342,18.342,48.08,18.342,66.422,0C98.521,61.837,98.521,32.099,80.179,13.758z M44.144,83.117
		c-4.057,0-7.001-3.071-7.001-7.305c0-4.291,2.987-7.404,7.102-7.404c4.123,0,7.001,3.044,7.001,7.404
		C51.246,80.113,48.326,83.117,44.144,83.117z M54.73,44.921c-4.15,4.905-5.796,9.117-5.503,14.088l0.097,2.495
		c0.011,0.062,0.017,0.125,0.017,0.188c0,0.58-0.47,1.051-1.05,1.051c-0.004-0.001-0.008-0.001-0.012,0h-7.867
		c-0.549,0-1.005-0.423-1.047-0.97l-0.202-2.623c-0.676-6.082,1.508-12.218,6.494-18.202c4.319-5.087,6.816-8.865,6.816-13.145
		c0-4.829-3.036-7.536-8.548-7.624c-3.403,0-7.242,1.171-9.534,2.913c-0.264,0.201-0.607,0.264-0.925,0.173
		s-0.575-0.327-0.693-0.636l-2.42-6.354c-0.169-0.442-0.02-0.943,0.364-1.224c3.538-2.573,9.441-4.235,15.041-4.235
		c12.36,0,17.894,7.975,17.894,15.877C63.652,33.765,59.785,38.919,54.73,44.921z"
            />
          </g>
        </svg>
        <p className="instr">Instructions</p>
      </div>
    </Container>
  );
};

export default Admin;
