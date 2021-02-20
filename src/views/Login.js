import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Login.css"
const Login = () => {
  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col className="form_col mx-auto p-5" xs={10} sm={8} md={6} lg={5} xl={4}>
          <h4 className="text-center">Admin panel</h4>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Login</Form.Label>
              <Form.Control type="text" placeholder="Enter login" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Button className="mt-4" variant="primary" type="submit" block>
              Log in
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
