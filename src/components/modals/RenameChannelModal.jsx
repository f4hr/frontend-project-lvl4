// @ts-check

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renameChannelRequest } from '../chat/channelsSlice.js';
import CommonChannelModal from './CommonChannelModal.jsx';

const RenameChannelModal = ({ handleClose, modalData, channelId }) => {
  const dispatch = useDispatch();
  const { byId } = useSelector((state) => state.channels);
  const initialValues = { name: channelId ? byId[channelId].name : '' };

  const handleSubmit = (name) => {
    dispatch(renameChannelRequest({ id: channelId, name }));
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

export default RenameChannelModal;
