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
  // FormControl,
} from "react-bootstrap";
import plc from "../assets/devel.png";
import axios from "axios";
// import { storageRef, db } from "../firebase";
const Admin = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleUpload = (e) => {
    e.preventDefault();
    // const time = new Date().getMilliseconds();
    // const uploadTask = storageRef.child(`songs/${time}`).put(file);

    // uploadTask.on(
    //   "state_changed",
    //   (snapschot) => {
    //     const progress = Math.round(
    //       (snapschot.bytesTransferred / snapschot.totalBytes) * 100
    //     );
    //     setProgress(progress);
    //   },
    //   (err) => {
    //     console.log(err);
    //   },
    //   () => {
    //     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //       db.ref(`songs/${time}`).set({
    //         source: downloadURL,
    //       });
    //       try {
    //         console.log(downloadURL);
    //       } catch (e) {
    //         console.log(e);
    //       }
    //     });
    //     setProgress(0);
    //   }
    // );

    const data = new FormData();
    data.append("song", file);
    const config = {
      onUploadProgress: (progressEvent) => {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    };
    axios
      .post("https://api-music-test.herokuapp.com/data", data, config)
      .then((res) => console.log(res));
  };
  // useEffect(() => {
  //   var storageRef = storage().ref("songs");
  //   storageRef
  //     .listAll()
  //     .then(function (result) {
  //       result.items.forEach(function (imageRef) {
  //         console.log(imageRef);
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);
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
                {/* <FormControl>dfds</FormControl> */}
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Admin;
