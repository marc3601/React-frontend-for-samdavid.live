import styled from 'styled-components';
import { Col } from 'react-bootstrap';
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
  const controls = [
    'play-large', // The large play button in the center
    //'restart', // Restart playback
    'rewind', // Rewind by the seek time (default 10 seconds)
    'play', // Play/pause playback
    'fast-forward', // Fast forward by the seek time (default 10 seconds)
    'progress', // The progress bar and scrubber for playback and buffering
    'current-time', // The current time of playback
    'duration', // The full duration of the media
    'mute', // Toggle mute
    'volume', // Volume control
    'captions', // Toggle captions
    'settings', // Settings menu
    'pip', // Picture-in-picture (currently Safari only)
    'airplay', // Airplay (currently Safari only)
    'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
    'fullscreen', // Toggle fullscreen

  ];
  newArr.forEach((item) => {
    source1.push({
      type: 'video',
      sources: [
        {
          src: item,
          type: 'video/mp4',
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
          type: 'video/mp4',
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
              <Plyr id={i} source={vid} options={{
                controls, resetOnEnd: true,
                invertTime: false
              }} />
            </VideoContainer>
          ))}
      </Col>
      <Col sm={12} lg={6}>
        {source2.length > 0 &&
          source2.map((vid, i) => (
            <VideoContainer key={i}>
              <Plyr id={i} source={vid} options={controls, {
                controls, resetOnEnd: true,
                invertTime: false
              }} />
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
