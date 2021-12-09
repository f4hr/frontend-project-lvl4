// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../hooks/index.jsx';
import CommonChannelModal from './CommonChannelModal.jsx';

const RenameChannelModal = ({ handleClose, modalData, channelId }) => {
  const { byId } = useSelector((state) => state.channels);
  const { renameChannel } = useSocket();
  const initialValues = { name: channelId ? byId[channelId].name : '' };

  const handleSubmit = (name) => {
    renameChannel({ id: channelId, name });
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
