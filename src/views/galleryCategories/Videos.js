import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Plyr from 'plyr-react';
import 'plyr-react/dist/plyr.css';
import styled from 'styled-components';
import vid1 from '../../assets/vid1.MP4';
import vid2 from '../../assets/vid2.MP4';
import vid3 from '../../assets/vid3.MP4';
import vid4 from '../../assets/vid4.MP4';
import vid5 from '../../assets/vid5.MP4';
import vid6 from '../../assets/vid6.MP4';
const arr1 = [vid5, vid6, vid1, vid2, vid3, vid4];

const Videos = () => {
  let source1 = [];
  let source2 = [];

  const handleVideoRendering = (input) => {
    let newArr = [];
    let newAr2 = [];
    const lnght = input.length;
    const firstArrLenght = Math.round(lnght / 2);
    newArr = input.slice(0, firstArrLenght);
    newAr2 = input.slice(firstArrLenght, input.length);
    newArr.forEach((item) => {
      source1.push({
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
            enabled: false,
          },
        ],
      });
    });
    newAr2.forEach((item) => {
      source2.push({
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
  };
  handleVideoRendering(arr1);

  return (
    <Container>
      <h2 className="display-4 mb-4 mt-4 pb-4 text-center text-dark border-bottom">
        Videos
      </h2>
      <Row>
        <Col sm={12} lg={6}>
          {source1.map((vid, i) => (
            <VideoContainer key={i}>
              <Plyr
                source={vid}
                options={{
                  volume: 0,
                }}
              />
            </VideoContainer>
          ))}
        </Col>
        <Col sm={12} lg={6}>
          {source2.map((vid, i) => (
            <VideoContainer key={i}>
              <Plyr
                source={vid}
                options={{
                  volume: 0,
                }}
              />
            </VideoContainer>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Videos;

const VideoContainer = styled.div`
  box-shadow: 0px 0px 24px -6px rgba(0, 0, 0, 0.75);
  margin-bottom: 1rem;
`;
