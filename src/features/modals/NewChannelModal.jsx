// @ts-check

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addNewChannel } from '../chat/channelsSlice.js';
import { newChannelModal, closeModal } from './modalsSlice.js';

const NewChannelForm = ({ handleFormSubmit, handleClose }) => {
  const { byId, allIds, status } = useSelector((state) => state.channels);
  const inputRef = useRef();
  const initialValues = { name: '' };

  const getChannelNames = () => allIds
    .map((id) => byId[id].name);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAddNewChannel = (values, { resetForm, setSubmitting }) => {
    const body = values.name.trim();

    handleFormSubmit(body);
    setSubmitting(false);
    resetForm({ values: initialValues });
  };

  const schema = Yup.object({
    name: Yup.string()
      .notOneOf(getChannelNames(), 'Name already exists')
      .trim('Whitespaces at beginning and end of the name are not allowed')
      .required('Required field')
      .strict(),
  });

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={schema}
      onSubmit={handleAddNewChannel}
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
            <Modal.Title>New channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="newChannelName">
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                placeholder="Enter new channel name..."
                ref={inputRef}
                onChange={handleChange}
                readOnly={status === 'pending'}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button
              type="submit"
              variant="primary"
              disabled={
                values.name === ''
                || status === 'pending'
              }
            >
              Add channel
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
};

const NewChannelModal = () => {
  const dispatch = useDispatch();
  const { isOpened, type } = useSelector((state) => state.modals);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = (name) => {
    dispatch(addNewChannel({ name }));
  };

  if (type === newChannelModal()) {
    return (
      <Modal show={isOpened} onHide={handleClose} centered>
        <NewChannelForm handleFormSubmit={handleSubmit} handleClose={handleClose} />
      </Modal>
    );
  }

  return null;
};

export default NewChannelModal;
