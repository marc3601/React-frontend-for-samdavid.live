import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import { db } from "../../firebase";

const Category2 = () => {
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
      <h5 className="display-4 text-center text-dark">Category 2</h5>
      {<MusicPlayer playlist={data} load={loading} />}
    </Container>
  );
};

export default Category2;
