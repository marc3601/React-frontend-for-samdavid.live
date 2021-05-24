import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {handleVideoRendering} from '../../components/utilities/handleVideoRendering';

const arr1 = [
  'https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/videos_temp%2Fvid1.mp4?alt=media&token=625ae518-3930-4f2a-b5e7-42eece32a01c',
  'https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/videos_temp%2Fvid2.mp4?alt=media&token=96ba1614-3623-4c5f-aaa9-961183171865',
  'https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/videos_temp%2Fvid3.mp4?alt=media&token=04508181-bebf-4699-8a4a-1480d90d93ef',
  'https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/videos_temp%2Fvid4.mp4?alt=media&token=0d1cda22-7bee-42a7-ab9d-ce1fe61ee0f7',
  'https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/videos_temp%2Fvid5.mp4?alt=media&token=a60ce6c2-e76d-47ba-ad38-4a98b2184438',
  'https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/videos_temp%2Fvid6.mp4?alt=media&token=b5bed95d-3bad-42cc-b882-9d345afe60fd',
];

const Videos = () => {
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(parseInt(window.innerWidth.toFixed(0)));
    });
    setData(arr1);
    handleVideoRendering(data);
    pausePlayers();
  }, [data, width]);

  const pausePlayers = () => {
    let players = document.getElementsByTagName('video');

    if (players.length > 0) {
      const allPlayers = Array.from(players);
      allPlayers.forEach((plyr, id) => {
        plyr.setAttribute('id', id);
        plyr.addEventListener('playing', (e) => {
          console.log('Event fired');
          allPlayers.forEach((instance) => {
            if (instance.id !== e.target.id) {
              instance.pause();
              instance.currentTime = 0;
            }
          });
        });
      });
    }
  };

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
