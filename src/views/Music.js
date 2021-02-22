import React from "react";
import { Container } from "react-bootstrap";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import song from "../assets/SoundHelix Song 1.mp3";
import cov from "../assets/about.jpg";
const Music = () => {
  const audioList = [
    {
      cover: cov,
      musicSrc: song,
      name: "My fisrst song played",
      singer: "Random singer",
    },
  ];
  return (
    <Container>
      <h1 className="display-3 text-center text-dark">Music</h1>
      <ReactJkMusicPlayer
        audioLists={audioList}
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
