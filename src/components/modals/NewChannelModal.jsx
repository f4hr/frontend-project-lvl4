// @ts-check

import React from 'react';
import { useDispatch } from 'react-redux';
import { addNewChannel } from '../chat/channelsSlice.js';
import CommonChannelModal from './CommonChannelModal.jsx';

const NewChannelModal = ({ handleClose, modalData }) => {
  const dispatch = useDispatch();
  const initialValues = { name: '' };

  const handleSubmit = (name) => {
    dispatch(addNewChannel({ name }));
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
