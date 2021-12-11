// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../hooks/index.jsx';
import { channelsSelectors } from '../../slices/channelsSlice';
import CommonChannelModal from './CommonChannelModal.jsx';

const RenameChannelModal = ({ closeModal, modalData, channelId }) => {
  const channels = useSelector(channelsSelectors.selectEntities);
  const { renameChannel } = useSocket();
  const initialValues = { name: channelId ? channels[channelId].name : '' };

  const handleSubmit = (name) => renameChannel({ id: channelId, name });

  return (
    <CommonChannelModal
      handleFormSubmit={handleSubmit}
      closeModal={closeModal}
      initialValues={initialValues}
      modalData={modalData}
    />
  );
};

export default RenameChannelModal;
