// @ts-check

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import routes from '../../routes.js';
import LoginForm from './LoginForm.jsx';

const Login = () => {
  const { t } = useTranslation();

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center">
        <Col className="login flex-column py-3">
          <h1>{t('logIn.title')}</h1>
          <LoginForm />
          <p className="mt-3 mb-0 text-center">
            {`${t('logIn.signUpText')} `}
            <Link to={routes.signupPath()}>{t('logIn.signUpLink')}</Link>
            .
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
