import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { handleVideoRendering } from '../../components/utilities/handleVideoRendering';
import { db } from '../../firebase';

const Videos = () => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(0);
  let storedVideos = [];
  const downloadVideos = (category) => {
    setLoading(true);
    db.collection(category)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          storedVideos.push(doc.data());
        });
      })
      .finally(() => {
        setVideos(storedVideos.map(item => item.imageSrc));
        setLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = () => {
      downloadVideos("videos");
    }
    return unsubscribe();
  }, [])

  useEffect(() => {
    const unsubscribe = () => {
      window.addEventListener('resize', () => {
        setWidth(parseInt(window.innerWidth.toFixed(0)));
      });
      setData(videos);
      handleVideoRendering(data);
      pausePlayers();
    }
    return unsubscribe();

  }, [data, width, loading]);

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
