// @ts-check

import React from 'react';
import { useSocket } from '../../hooks/index.jsx';
import CommonChannelModal from './CommonChannelModal.jsx';

const NewChannelModal = ({ handleClose, modalData }) => {
  const initialValues = { name: '' };
  const { addNewChannel } = useSocket();

  const handleSubmit = (name) => {
    addNewChannel({ name });
  };

  return (
    <CommonChannelModal
      handleFormSubmit={handleSubmit}
      handleClose={handleClose}
      initialValues={initialValues}
      modalData={modalData}
    />
  );
};

export default NewChannelModal;
