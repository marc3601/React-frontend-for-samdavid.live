import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { storage } from "../firebase";

const Music = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const storageRef = storage.ref("songs");
  const container = [];
  const downloadMusic = () => {
    storageRef
      .listAll()
      .then((result) => {
        let name = "Default";
        result.items.forEach(function (songRef) {
          songRef.getMetadata().then((data) => name = data.name);
          songRef
            .getDownloadURL()
            .then((url) => container.push({ name: name, musicSrc: url }));
          
        });
      })
      .finally(() => {
        setData(container);
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  useEffect(() => {
    downloadMusic();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Container>
      <h1 className="display-3 text-center text-dark">Music</h1>

      {!isLoading && (
        <ReactJkMusicPlayer
          audioLists={data}
          theme="auto"
          autoPlay={false}
          toogleMode={false}
          mode="full"
          delete={false}
        />
      )}
    </Container>
  );
};

export default Music;
