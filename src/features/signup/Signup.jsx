// @ts-check

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import SignupForm from './SignupForm.jsx';

const Signup = () => {
  const { t } = useTranslation();

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center">
        <Col className="login flex-column py-3">
          <h1>{t('signUp.title')}</h1>
          <SignupForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
