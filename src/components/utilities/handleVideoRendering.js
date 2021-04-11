
import styled from 'styled-components';
import {Col} from 'react-bootstrap';
import Plyr from 'plyr-react';
import 'plyr-react/dist/plyr.css';
export const handleVideoRendering = (input) => {
  let newArr = [];
  let newAr2 = [];
  let source1 = [];
  let source2 = [];
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
  return (
    <>
      <Col sm={12} lg={6}>
        {source1.length > 0 &&
          source1.map((vid, i) => (
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
        {source2.length > 0 &&
          source2.map((vid, i) => (
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
    </>
  );
};

const VideoContainer = styled.div`
  box-shadow: 0px 0px 24px -6px rgba(0, 0, 0, 0.75);
  margin-bottom: 1rem;
`;
