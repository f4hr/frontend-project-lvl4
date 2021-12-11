// @ts-check

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Form, Col, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/index.jsx';
import routes from '../../routes.js';

const SignupForm = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { signUp } = useAuth();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSignup = async (values, { setSubmitting, setFieldError }) => {
    try {
      setSubmitting(true);
      await signUp(values);
      history.replace({ pathname: routes.homePath() });
    } catch (err) {
      setFieldError('username', t('signUpForm.errors.unique'));
      setSubmitting(false);
    }
  };

  const schema = Yup.object({
    username: Yup.string()
      .min(3, t('form.errors.minmax', { min: 3, max: 20 }))
      .max(20, t('form.errors.minmax', { min: 3, max: 20 }))
      .required(t('form.errors.required')),
    password: Yup.string()
      .min(6, t('form.errors.min', { min: 6 }))
      .required(t('form.errors.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('form.errors.passwordMatch'))
      .required(t('form.errors.required')),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSignup}
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
        isValid,
        values,
        touched,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>{t('signUpForm.username')}</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={values.username}
              ref={inputRef}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.username && !!errors.username}
              isValid={touched.username && !errors.username}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>{t('signUpForm.password')}</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.password && !!errors.password}
              isValid={touched.password && !errors.password}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>{t('signUpForm.confirmPassword')}</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.confirmPassword && !!errors.confirmPassword}
              isValid={touched.confirmPassword && !errors.confirmPassword}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
          </Form.Group>
          <Col className="px-0">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              block
              disabled={isSubmitting || !isValid}
            >
              {t('signUpForm.submit')}
            </Button>
          </Col>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
