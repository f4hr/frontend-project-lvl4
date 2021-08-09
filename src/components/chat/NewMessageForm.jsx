// @ts-check

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../hooks/index.jsx';
import { sendMessage } from './messagesSlice.js';

const NewMessageForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => state.channels);
  const { status } = useSelector((state) => state.messages);
  const inputRef = useRef();
  const { username } = useAuth();
  const initialValues = { message: '' };

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  const handleMessageSend = (values, { resetForm, setSubmitting }) => {
    const body = values.message.trim();
    const message = {
      channelId: currentChannelId,
      username,
      body,
    };
    dispatch(sendMessage(message));

    setSubmitting(false);
    resetForm({ values: initialValues });
  };

  const schema = Yup.object({
    message: Yup.string()
      .trim(t('form.errors.whitespace'))
      .required(t('form.errors.required')),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleMessageSend}
      initialValues={initialValues}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
      }) => (
        <Form className="d-flex" noValidate onSubmit={handleSubmit}>
          <Form.Group className="flex-grow-1 mb-0 mr-3" controlId="message">
            <Form.Control
              type="text"
              name="message"
              value={values.message}
              data-testid="new-message"
              placeholder={t('newMessageForm.messagePlaceholder')}
              ref={inputRef}
              onChange={handleChange}
              readOnly={status === 'pending'}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            disabled={
              !!errors.message
              || values.message === ''
              || status === 'pending'
            }
          >
            {t('form.submit')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewMessageForm;