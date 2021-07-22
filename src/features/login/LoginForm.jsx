// @ts-check

import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Col, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import useAuth from '../../common/hooks/index.jsx';
import routes from '../../routes';

const errorMessages = {
  network: () => 'Network error',
  auth: () => 'Invalid username or password',
};

const LoginForm = () => {
  const history = useHistory();
  const auth = useAuth();
  const inputRef = useRef();
  const [formState, setFormState] = useState('filling');
  const [authMessage, setAuthMessage] = useState('');

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleLogin = async (values) => {
    setFormState('processing');

    try {
      const res = await axios.post(routes.loginPath(), values);
      localStorage.setItem('userId', JSON.stringify(res.data));
      auth.logIn();
      setFormState('processed');
      history.replace({ pathname: '/' });
    } catch (err) {
      if (err.isAxiosError) {
        setAuthMessage((err.response.status === 401)
          ? errorMessages.auth()
          : errorMessages.network());
        setFormState('failed');
        inputRef.current.select();
        return;
      }
      throw err;
    }
  };

  const schema = Yup.object({
    username: Yup.string()
      .min(3, 'The number of characters must be at least 1')
      .required('Required field'),
    password: Yup.string()
      .required('Required field'),
  });

  return (
    <Formik
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
        values,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Nickname</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={values.username}
              ref={inputRef}
              onChange={handleChange}
              isInvalid={!!errors.username || formState === 'failed'}
              readOnly={formState === 'processing'}
            />
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password || formState === 'failed'}
              readOnly={formState === 'processing'}
            />
            <Form.Control.Feedback type="invalid">{(formState === 'failed') ? authMessage : errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Col className="px-0">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              block
              disabled={formState === 'processing'}
            >
              Log In
            </Button>
          </Col>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
