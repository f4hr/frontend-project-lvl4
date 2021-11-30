// @ts-check

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const CommonChannelModal = ({
  handleFormSubmit,
  handleClose,
  initialValues,
  modalData,
}) => {
  const { t } = useTranslation();
  const { byId, allIds, status } = useSelector((state) => state.channels);
  const inputRef = useRef();
  const {
    modalTitle,
    label,
    submitButtonText,
  } = modalData;

  const getChannelNames = () => allIds
    .map((id) => byId[id].name);

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const handleChannelFormSubmit = (values, { setSubmitting }) => {
    const body = values.name.trim();

    handleFormSubmit(body);
    setSubmitting(false);
  };

  const schema = Yup.object({
    name: Yup.string()
      .notOneOf(getChannelNames(), t('channelForm.errors.unique'))
      .trim(t('form.errors.whitespace'))
      .required(t('form.errors.required'))
      .strict(),
  });

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={schema}
      onSubmit={handleChannelFormSubmit}
      initialValues={initialValues}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{t(modalTitle)}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="channelName">
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                placeholder={t(label)}
                aria-label={t(label)}
                ref={inputRef}
                onChange={handleChange}
                readOnly={status === 'pending'}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>{t('form.cancel')}</Button>
            <Button
              type="submit"
              variant="primary"
              disabled={
                values.name === ''
                || status === 'pending'
              }
            >
              {t(submitButtonText)}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
};

export default CommonChannelModal;
