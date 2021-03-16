import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { db } from "../../firebase";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";

const Category1 = () => {
  const [data, setData] = useState([
    {
      name: "Not Afraid",
      artist: "Eminem",
      source:
      "https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/songs%2Feminem-not-afraid-official-video?alt=media&token=9a30df89-d808-491f-8994-52eca6e6c3e1",
    },
  ]);
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
    // downloadMusic("songs");
  }, []);

  return (
    <Container>
      <h5 className="display-4 text-center text-dark mb-4">Category 1</h5>
      <MusicPlayer playlist={data} />
    </Container>
  );
};

export default Category1;
