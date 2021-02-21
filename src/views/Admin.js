import React from "react";
import { Container, Image } from "react-bootstrap";
import plc from "../assets/devel.png";

const Admin = () => {
  return (
    <Container className="text-center">
      <h2 className="display-3  mt-3 mb-3">CMS System</h2>
      <p className="lead">
        Here you will be able te manage all of the website contents like images,
        text or music.
      </p>
      <Image className="w-75" fluid src={plc} />
    </Container>
  );
};

export default Admin;
