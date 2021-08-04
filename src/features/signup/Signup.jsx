// @ts-check

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SignupForm from './SignupForm.jsx';

const Signup = () => (
  <Container fluid>
    <Row className="d-flex justify-content-center">
      <Col className="login flex-column py-3">
        <h1>Sign Up</h1>
        <SignupForm />
      </Col>
    </Row>
  </Container>
);

export default Signup;
