// @ts-check

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { some } from 'lodash';
import { channelNamesSelector } from '../../slices/channelsSlice';

const CommonChannelModal = ({
  handleFormSubmit,
  closeModal,
  initialValues,
  modalData,
}) => {
  const { t } = useTranslation();
  const channelNames = useSelector(channelNamesSelector);
  const inputRef = useRef();
  const {
    modalTitle,
    label,
    submitButtonText,
    success,
    error,
  } = modalData;

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const handleChannelFormSubmit = async (values, { setSubmitting }) => {
    const body = values.name.trim();

    try {
      setSubmitting(true);
      await handleFormSubmit(body);
      setSubmitting(false);
      closeModal();
      toast.success(t(success));
    } catch {
      setSubmitting(false);
      closeModal();
      toast.error(t(error));
    }
  };

  const schema = Yup.object({
    name: Yup.string()
      .notOneOf(channelNames, t('channelForm.errors.unique'))
      .trim(t('form.errors.whitespace'))
      .required(t('form.errors.required'))
      .strict(),
  });

  return (
    <Formik
      validateOnBlur={false}
      validationSchema={schema}
      onSubmit={handleChannelFormSubmit}
      initialValues={initialValues}
      validateOnMount
    >
      {({
        handleSubmit,
        handleChange,
        isSubmitting,
        values,
        errors,
        isValid,
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
                disabled={isSubmitting}
                isInvalid={!isValid}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>{t('form.cancel')}</Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!isValid || isSubmitting}
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
