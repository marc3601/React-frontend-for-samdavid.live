import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { storage } from "../firebase";

const Music = () => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const storageRef = storage.ref("songs");
  let container = [];

 
  const downloadMusic = () => {
    storageRef
      .listAll()
      .then((result) => {
        result.items.forEach((item) => {
          Promise.all([
            item.getMetadata().then((result) => result.name),
            item.getDownloadURL().then((url) => url),
          ]).then((values) => {
            container.push({
              name: values[0],
              musicSrc: values[1],
            });
          });
        });
        setData(container);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  useEffect(() => {
    downloadMusic();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  

  return (
    <Container>
      <h1 className="display-3 text-center text-dark">Music</h1>
      {!loading && (
        <ReactJkMusicPlayer
          audioLists={data}
          theme="auto"
          autoPlay={false}
          toogleMode={false}
          mode="full"
          delete={false}
          responsive={false}
        />
      )}
    </Container>
  );
};

export default Music;
