import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Alert} from 'react-bootstrap';
import Plyr from 'plyr-react';
import 'plyr-react/dist/plyr.css';
import vid1 from '../../assets/vid1.MP4';
import vid2 from '../../assets/vid2.MP4';
import vid3 from '../../assets/vid3.MP4';
const arr1 = [vid1, vid2, vid3];

const Videos = () => {
  const [alert, setAlert] = useState(true);
  const newArr = [];

  arr1.forEach((item) => {
    newArr.push({
      type: 'video',
      sources: [
        {
          src: item,
        },
      ],
      options: [
        {
          muted: true,
          autopause: true,
        },
      ],
    });
  });

  return (
    <Container>
      <h2 className="display-4 mb-4 mt-4 pb-4 text-center text-dark border-bottom">
        Videos
      </h2>
      {alert && (
        <Alert onClose={() => setAlert(false)} dismissible variant="danger">
          <Alert.Heading>Work in progress.</Alert.Heading>
          Not all features are available yet.
        </Alert>
      )}
      <Row>
        {newArr.map((vid, i) => (
          <Col className="mb-3" id={i} key={i} xs={12} sm={12} lg={6}>
            <Plyr
              source={vid}
              options={{
                volume: 0,
              }}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Videos;
