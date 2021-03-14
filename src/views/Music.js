import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import cat1 from "../assets/category1.jpg";
import cat2 from "../assets/category2.jpg";
import cat3 from "../assets/category3.jpg";
import cat4 from "../assets/category4.jpg";
const Music = () => {
  return (
    <Container>
      <h2 className="display-3 text-center  text-dark">Music</h2>
      <p className="lead text-dark text-center pt-2  mb-5">
        Explore music categories.
      </p>
      <Row className="justify-content-md-center">
        <Col xl={6} lg={6}>
          {" "}
          <Card>
            <Link
              className="overflow-hidden text-center"
              to="/music/category1"
            >
              <h3 className="position-relative top-50 start-100 translate-middle text-dark">
                Category 1
              </h3>
              <Image fluid src={cat1} />
            </Link>
          </Card>
          <Card>
            <Link
              className="overflow-hidden text-center"
              to="/music/category2"
            >
              <h3 className="position-relative top-50 start-100 translate-middle text-dark">
                Category 2
              </h3>
              <Image fluid src={cat2} />
            </Link>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Link className="overflow-hidden text-center" to="/music/category3">
            <h3 className="position-relative top-50 start-100 translate-middle text-dark">
                Category 3
              </h3>
              <Image fluid src={cat3} />
            </Link>
          </Card>
          <Card>
            <Link className="overflow-hidden text-center" to="/music/category4">
            <h3 className="position-relative top-50 start-100 translate-middle text-dark">
                Category 4
              </h3>
              <Image fluid src={cat4} />
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Music;
