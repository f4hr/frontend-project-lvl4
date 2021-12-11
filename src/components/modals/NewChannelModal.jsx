// @ts-check

import React from 'react';
import { useDispatch } from 'react-redux';
import { useSocket } from '../../hooks/index.jsx';
import actions from '../../slices/index.js';
import CommonChannelModal from './CommonChannelModal.jsx';

const NewChannelModal = ({ closeModal, modalData }) => {
  const initialValues = { name: '' };
  const dispatch = useDispatch();
  const { newChannel } = useSocket();

  const handleSubmit = (name) => newChannel({ name })
    .then(({ id }) => {
      dispatch(actions.setCurrentChannel(id));
    });

  return (
    <CommonChannelModal
      handleFormSubmit={handleSubmit}
      closeModal={closeModal}
      initialValues={initialValues}
      modalData={modalData}
    />
  );
};

export default NewChannelModal;
