// @ts-check

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { useAuth, useSocket } from '../../hooks/index.jsx';
import { currentChannelSelector } from '../../slices/channelsSlice.js';

const NewMessageForm = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(currentChannelSelector);
  const inputRef = useRef(null);
  const { username } = useAuth();
  const { newMessage } = useSocket();

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  const handleMessageSend = async (values, { resetForm }) => {
    const body = values.message.trim();
    const message = {
      channelId: currentChannelId,
      username,
      body: filter.clean(body),
    };

    return newMessage(message)
      .then(() => {
        resetForm();
      })
      .catch(() => {
        toast.error(t('messages.errors.send'));
      });
  };

  const schema = Yup.object({
    message: Yup.string().trim().required(),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleMessageSend}
      initialValues={{ message: '' }}
    >
      {({
        handleSubmit,
        handleChange,
        isSubmitting,
        values,
        dirty,
      }) => (
        <Form className="d-flex" noValidate onSubmit={handleSubmit}>
          <Form.Group className="flex-grow-1 mb-0 mr-3" controlId="message">
            <Form.Control
              type="text"
              name="message"
              value={values.message}
              placeholder={t('newMessageForm.messagePlaceholder')}
              aria-label={t('newMessageForm.label')}
              ref={inputRef}
              onChange={handleChange}
              autoComplete="off"
              required
              disabled={isSubmitting}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            disabled={!dirty || isSubmitting}
          >
            {(isSubmitting)
              ? (
                <Spinner
                  className="mr-2"
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )
              : null}
            {t('form.submit')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewMessageForm;
