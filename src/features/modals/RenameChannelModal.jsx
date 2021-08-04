// @ts-check

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { renameChannelRequest } from '../chat/channelsSlice.js';
import { renameChannelModal, closeModal } from './modalsSlice.js';

const RenameChannelForm = ({ handleFormSubmit, handleClose, channelId }) => {
  const { t } = useTranslation();
  const { byId, allIds, status } = useSelector((state) => state.channels);
  const inputRef = useRef();
  const initialValues = { name: byId[channelId].name };

  const getChannelNames = () => allIds
    .map((id) => byId[id].name);

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const handleRenameChannel = (values, { setSubmitting }) => {
    const body = values.name.trim();

    handleFormSubmit(body);
    setSubmitting(false);
  };

  const schema = Yup.object({
    name: Yup.string()
      .notOneOf(getChannelNames(), t('renameChannelForm.errors.unique'))
      .trim(t('form.errors.whitespace'))
      .required(t('form.errors.required'))
      .strict(),
  });

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={schema}
      onSubmit={handleRenameChannel}
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
            <Modal.Title>{t('renameChannelModal.title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="newChannelName">
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                placeholder={t('renameChannelForm.namePlaceholder')}
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
              {t('renameChannelForm.submit')}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
};

const RenameChannelModal = () => {
  const dispatch = useDispatch();
  const { isOpened, type, meta } = useSelector((state) => state.modals);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = (name) => {
    dispatch(renameChannelRequest({ id: meta.channelId, name }));
  };

  if (type === renameChannelModal()) {
    return (
      <Modal show={isOpened} onHide={handleClose} centered>
        <RenameChannelForm
          handleFormSubmit={handleSubmit}
          handleClose={handleClose}
          channelId={meta.channelId}
        />
      </Modal>
    );
  }

  return null;
};

export default RenameChannelModal;
