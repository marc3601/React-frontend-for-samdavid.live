import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {handleVideoRendering} from '../../components/utilities/handleVideoRendering';
import vid1 from '../../assets/vid1.MP4';
import vid2 from '../../assets/vid2.MP4';
import vid3 from '../../assets/vid3.MP4';
import vid4 from '../../assets/vid4.MP4';

const arr1 = [vid1, vid2, vid3, vid4];
const Videos = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(arr1);
    handleVideoRendering(data);
  }, [data]);

  return (
    <Container>
      <h2 className="display-4 mb-4 mt-4 pb-4 text-center text-dark border-bottom">
        Videos
      </h2>
      <Row>
        {data.length > 0 ? (
          handleVideoRendering(data)
        ) : (
          <Col>
            <h2 className="text-center">Loading videos...</h2>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Videos;
