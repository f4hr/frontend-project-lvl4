// @ts-check

import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form, Col, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '../../hooks/index.jsx';
import routes from '../../routes.js';

const LoginForm = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const auth = useAuth();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      const res = await axios.post(routes.apiLoginPath(), values);
      localStorage.setItem('userId', JSON.stringify(res.data));
      auth.logIn();
      history.replace({ pathname: routes.homePath() });
    } catch (err) {
      if (err.isAxiosError) {
        const errorMsg = (err.response.status === 401)
          ? t('logInForm.errors.auth')
          : t('errors.network');
        setFieldError('password', errorMsg);
        setSubmitting(false);
        inputRef.current.select();
        return;
      }
      throw err;
    }
  };

  const schema = Yup.object({
    username: Yup.string().required(t('form.errors.required')),
    password: Yup.string().required(t('form.errors.required')),
  });

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={schema}
      onSubmit={handleLogin}
      initialValues={{
        username: '',
        password: '',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        isSubmitting,
        values,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>{t('logInForm.username')}</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={values.username}
              ref={inputRef}
              onChange={handleChange}
              isInvalid={!!errors.username}
              readOnly={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>{t('logInForm.password')}</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              readOnly={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Col className="px-0">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              block
              disabled={isSubmitting}
            >
              {t('logInForm.submit')}
            </Button>
          </Col>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
