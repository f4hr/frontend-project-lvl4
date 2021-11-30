// @ts-check

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { renameChannelRequest } from '../../slices/channelsSlice.js';
import CommonChannelModal from './CommonChannelModal.jsx';

const RenameChannelModal = ({ handleClose, modalData, channelId }) => {
  const dispatch = useDispatch();
  const { byId } = useSelector((state) => state.channels);
  const { t } = useTranslation();
  const initialValues = { name: channelId ? byId[channelId].name : '' };

  const handleSubmit = (name) => {
    dispatch(renameChannelRequest({ id: channelId, name }));
    toast.success(t('renameChannel.success'));
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
