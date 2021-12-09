// @ts-check

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import routes from '../../routes.js';
import SignupForm from './SignupForm.jsx';

const Signup = () => {
  const { t } = useTranslation();

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center">
        <Col className="login flex-column py-3">
          <h1>{t('signUp.title')}</h1>
          <SignupForm />
          <p className="mt-3 mb-0 text-center">
            {`${t('signUp.logInText')} `}
            <Link to={routes.loginPath()}>{t('signUp.logInLink')}</Link>
            .
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
