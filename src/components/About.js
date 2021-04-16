import React, { useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import about from "../assets/about.jpeg";
import "./About.css";
const About = () => {
  const [more, setMore] = useState(false);
  return (
    <div className="about">
      <Container>
        <h3 className="custom_h2 lead display-3 text-dark pt-5 pb-4">
          Music is a state of mind. It gives you wings to surf the
          universe.
        </h3>
        <Row>
          <Col sm={12} md={6} className="p-3">
            <h1 className="display-6 mb-3">Sam David</h1>
            <p className="custom_p mr-4">
              Born and raised in Beirut, Lebanon in 1988, Sam David started his
              career as a DJ when he was 15 years old.<br></br><br></br>With years of
              experience he implemented multiple skills and styles throughout
              his journey.<br></br> Deep into the Musical universe, from House –
              Deep house – Tech House and Vocal house, to the EDM – Electro
              House – Electronics and Techno, and all the way to the R&amp;B –
              Hip Hop and the Urban style in the Funky/Pop and the Golden area
              of music. {!more && <span className="dots">...</span>}
              <br></br>
              {more && (
                <span className="more">
                  Started to Produce in 2015 with 30+ remixes and 15+ originals
                  in multiple styles.<br></br><br></br> Moved from Beirut nightlife to
                  Poland – Europe in 2015, and to China nightlife in 2017 where
                  he became the resident DJ in MIXER Club and TIKI Club for 4
                  years in Wenzhou – China.<br></br> The club experience, the
                  multiple events, the big gigs and the huge number of private
                  events throughout his DJ career has awarded him the Ultimate
                  understanding for the crowd needs and expectations to
                  establish the best musical experience live on stage in all the
                  styles he performs.<br></br> <br></br>Always ready to give his best in
                  every performance regardless of any factor brand him the title
                  of being the crowed most loved DJ in Wenzhou-china.
                </span>
              )}
            </p>
            {!more && (
              <div className="button d-flex justify-content-center mt-3">
                <Button onClick={() => setMore(!more)} variant="dark">
                  Read more
                </Button>
              </div>
            )}
            {more && (
              <div className="button d-flex justify-content-center mt-3">
                <Button onClick={() => setMore(!more)} variant="dark">
                  Show less
                </Button>
              </div>
            )}
          </Col>
          <Col sm={12} md={6}>
            <Image className="p-3 image" src={about} roundedCircle fluid />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
