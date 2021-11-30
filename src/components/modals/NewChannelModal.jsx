// @ts-check

import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { addNewChannel } from '../../slices/channelsSlice.js';
import CommonChannelModal from './CommonChannelModal.jsx';

const NewChannelModal = ({ handleClose, modalData }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const initialValues = { name: '' };

  const handleSubmit = (name) => {
    dispatch(addNewChannel({ name }));
    toast.success(t('newChannel.success'));
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
