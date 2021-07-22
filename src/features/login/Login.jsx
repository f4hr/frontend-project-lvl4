// @ts-check

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from './LoginForm.jsx';

const Login = () => (
  <Container fluid>
    <Row className="d-flex justify-content-center">
      <Col className="login flex-column py-3">
        <h1>Log In</h1>
        <LoginForm />
      </Col>
    </Row>
  </Container>
);

export default Login;
