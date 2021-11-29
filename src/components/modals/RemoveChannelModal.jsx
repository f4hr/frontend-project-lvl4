// @ts-check

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { removeChannelRequest } from '../chat/channelsSlice.js';

const RemoveChannelModal = ({ handleClose, channelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { byId, status } = useSelector((state) => state.channels);
  const name = (byId[channelId]) ? byId[channelId].name : '';

  const handleRemoveChannel = () => {
    dispatch(removeChannelRequest(channelId));
    toast.success(t('removeChannel.success'));
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('removeChannel.description', { name })}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>{t('form.cancel')}</Button>
        <Button
          type="submit"
          variant="danger"
          disabled={status === 'pending'}
          onClick={handleRemoveChannel}
        >
          {t('removeChannel.submit')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default RemoveChannelModal;
