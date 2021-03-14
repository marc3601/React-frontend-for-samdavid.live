import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { db } from "../../firebase";



const Category1 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let container = [];

  const downloadMusic = (location) => {
    db.collection(location)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          container.push(doc.data());
        });
      })
      .finally(() => {
        setData(container);
        setLoading(false);
      });
  };

  useEffect(() => {
    downloadMusic("songs");
  }, []);

  return (
    <Container>
      <h5 className="display-4 text-center text-dark">Category 1</h5>
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

export default Category1;
