// @ts-check

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from './LoginForm.jsx';

const Login = () => (
  <Container fluid>
    <Row className="d-flex justify-content-center">
      <Col className="login flex-column py-3">
        <h1>Log In</h1>
        <LoginForm />
        <p className="mt-3 mb-0">
          {'New to Hexlet Chat? '}
          <Link to="/signup">Create an account</Link>
          .
        </p>
      </Col>
    </Row>
  </Container>
);

export default Login;
