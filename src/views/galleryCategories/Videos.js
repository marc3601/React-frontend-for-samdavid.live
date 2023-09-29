import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { handleVideoRendering } from "../../components/utilities/handleVideoRendering";
import { db } from "../../firebase";

const Videos = () => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [data, setData] = useState([]);

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
        setVideos(storedVideos.map((item) => item.imageSrc));
        setLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = () => {
      downloadVideos("videos");
    };
    return unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = () => {
      setData(videos);
      pausePlayers();
    };
    return unsubscribe();
  }, [data, loading]);

  const pausePlayers = () => {
    let players = document.getElementsByTagName("video");
    if (players.length > 0) {
      const allPlayers = Array.from(players);
      allPlayers.forEach((plyr, id) => {
        plyr.setAttribute("id", id);
        plyr.addEventListener("playing", (e) => {
          allPlayers.forEach((instance) => {
            if (instance.id !== e.target.id) {
              instance.pause();
              instance.currentTime = 0;
            }
          });
        });
        plyr.addEventListener("waiting", (e) => {
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

  return <div>Videos currently unavailable</div>;
};

export default Videos;
