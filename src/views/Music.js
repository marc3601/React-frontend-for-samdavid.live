import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import axios from "axios";

const Music = () => {
  const [data, setData] = useState([]);
  const downloadMusic = () => {
    axios.get("https://api-music-test.herokuapp.com/data").then((res) => {
      setData(res.data.files[0]);
    });
  };

  useEffect(() => {
    try {
      downloadMusic();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  


  return (
    <Container>
      <h1 className="display-3 text-center text-dark">Music</h1>

      <ReactJkMusicPlayer
        audioLists={data}
        theme="auto"
        autoPlay={false}
        toogleMode={false}
        mode="full"
        delete={false}
      />
    </Container>
  );
};

export default Music;
