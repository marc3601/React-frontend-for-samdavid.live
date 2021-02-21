import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    // validation here

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/admin")
    } catch {
      setLoading(false);
      return setError("Failed to log in");
    }
  }
  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col
          className="form_col mx-auto p-5"
          xs={10}
          sm={8}
          md={6}
          lg={5}
          xl={4}
        >
          <h4 className="text-center">Admin panel</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="login">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
                required
                isInvalid={false}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Enter password"
              />
            </Form.Group>
            <Button
              disabled={loading}
              className="mt-4"
              variant="primary"
              type="submit"
              block
            >
              Log in
            </Button>
          </Form>
          {error && (
            <Alert className="mt-3" variant="danger">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
