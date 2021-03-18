import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { db } from "../../firebase";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";

const Category1 = () => {
  const [data, setData] = useState([
    {
      name: "Secrets (Magic Free Release)",
      artist: "Tabba x Dj Goja",
      source:
        "https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/songs%2Ftabba-x-dj-goja-secrets-magic-free-release?alt=media&token=82f5a82d-824d-4ab3-8834-9154c6d2b50c",
    },
    {
      name: "Secrets (Magic Free Release)",
      artist: "Tabba x Dj Goja",
      source:
        "https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/songs%2Ftabba-x-dj-goja-secrets-magic-free-release?alt=media&token=82f5a82d-824d-4ab3-8834-9154c6d2b50c",
    },
    {
      name: "Secrets (Magic Free Release)",
      artist: "Tabba x Dj Goja",
      source:
        "https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/songs%2Ftabba-x-dj-goja-secrets-magic-free-release?alt=media&token=82f5a82d-824d-4ab3-8834-9154c6d2b50c",
    },
    {
      name: "Secrets (Magic Free Release)",
      artist: "Tabba x Dj Goja",
      source:
        "https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/songs%2Ftabba-x-dj-goja-secrets-magic-free-release?alt=media&token=82f5a82d-824d-4ab3-8834-9154c6d2b50c",
    },
    {
      name: "Secrets (Magic Free Release)",
      artist: "Tabba x Dj Goja",
      source:
        "https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/songs%2Ftabba-x-dj-goja-secrets-magic-free-release?alt=media&token=82f5a82d-824d-4ab3-8834-9154c6d2b50c",
    },
    {
      name: "Secrets (Magic Free Release)",
      artist: "Tabba x Dj Goja",
      source:
        "https://firebasestorage.googleapis.com/v0/b/dj-admin-e66f0.appspot.com/o/songs%2Ftabba-x-dj-goja-secrets-magic-free-release?alt=media&token=82f5a82d-824d-4ab3-8834-9154c6d2b50c",
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
